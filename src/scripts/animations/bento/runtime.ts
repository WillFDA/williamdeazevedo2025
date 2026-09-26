/**
 * Orchestrateur des scènes du bento services.
 * - Chaque scène (module) n'est importée que quand SA zone approche du viewport.
 * - Construction synchrone dans un gsap.matchMedia : prefers-reduced-motion
 *   (même activé en cours de visite) revert tout vers le HTML statique.
 * - Lecture pilotée par createPlayback (cycles limités, pause hors écran,
 *   relecture au survol / focus clavier / retour dans le viewport).
 * - Les scènes qui mesurent le DOM sont reconstruites quand la largeur change.
 */

import { gsap } from "gsap";

import {
  type BentoPlayback,
  type BentoSceneContext,
  type BentoSceneModule,
  createPlayback,
} from "./shared";

const loaders: Record<string, () => Promise<BentoSceneModule>> = {
  artisan: () => import("./artisan"),
  frontend: () => import("./frontend"),
  professional: () => import("./professional"),
  refonte: () => import("./refonte"),
  seo: () => import("./seo"),
  vitrine: () => import("./vitrine"),
};

const MOTION_OK = "(prefers-reduced-motion: no-preference)";
const CAN_HOVER = "(hover: hover) and (pointer: fine)";
/** Part visible de la zone à partir de laquelle la scène démarre. */
const PLAY_RATIO = 0.35;

let generation = 0;
const teardowns = new Set<() => void>();

const isCurrent = (gen: number, root: HTMLElement) =>
  gen === generation && root.isConnected;

/** Construit la scène et sa lecture. Appelé dans un matchMedia (synchrone). */
const startScene = (root: HTMLElement, mod: BentoSceneModule) => {
  const cleanups: Array<() => void> = [];
  const card = root.closest<HTMLElement>("a, [data-bento-card]");
  let playback: BentoPlayback | undefined;

  const listen: BentoSceneContext["listen"] = (
    target,
    type,
    handler,
    options
  ) => {
    target.addEventListener(type, handler, options);
    cleanups.push(() => target.removeEventListener(type, handler, options));
  };

  const ctx: BentoSceneContext = {
    card,
    canHover: window.matchMedia(CAN_HOVER).matches,
    listen,
    release: () => playback?.release(),
    root,
    takeOver: () => playback?.takeOver(),
    variant:
      root.closest<HTMLElement>("[data-bento-variant]")?.dataset.bentoVariant ??
      "",
  };

  let scene: ReturnType<BentoSceneModule["createScene"]>;
  try {
    scene = mod.createScene(ctx);
  } catch (error) {
    // Une scène cassée garde son HTML statique sans bloquer les autres.
    console.error(`[bento] scène "${root.dataset.bentoVisual}"`, error);
  }
  const runCleanups = () => {
    playback?.destroy();
    cleanups.splice(0).forEach((cleanup) => cleanup());
  };
  if (!scene) return runCleanups;

  const rect = root.getBoundingClientRect();
  playback = createPlayback(scene.timeline, {
    visibleAtMount:
      rect.width > 0 && rect.bottom > 0 && rect.top < window.innerHeight,
  });
  const current = playback;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry) return;
      if (entry.intersectionRatio >= PLAY_RATIO) current.setVisible(true);
      else if (!entry.isIntersecting) current.setVisible(false);
    },
    { threshold: [0, PLAY_RATIO] }
  );
  observer.observe(root);
  cleanups.push(() => observer.disconnect());

  // customHover : la scène gère elle-même survol ET focus clavier.
  if (card && !scene.customHover) {
    if (ctx.canHover) {
      listen(card, "pointerenter", () => current.hoverStart());
      listen(card, "pointerleave", () => current.hoverEnd());
    }
    listen(card, "focusin", () => {
      if (card.matches(":focus-visible")) current.hoverStart();
    });
    listen(card, "focusout", () => current.hoverEnd());
  }

  return runCleanups;
};

/** Monte une scène chargée ; se reconstruit si la largeur change (needsMeasure). */
const mountScene = (root: HTMLElement, mod: BentoSceneModule) => {
  let mm = gsap.matchMedia();
  const build = () => {
    mm.add(MOTION_OK, () => startScene(root, mod), root);
  };
  build();

  let resizeObserver: ResizeObserver | undefined;
  let resizeTimer: ReturnType<typeof setTimeout> | undefined;
  if (mod.needsMeasure && "ResizeObserver" in window) {
    let lastWidth = root.offsetWidth;
    resizeObserver = new ResizeObserver(() => {
      const width = root.offsetWidth;
      // La barre d'URL mobile change la hauteur : seule la largeur compte.
      if (width === lastWidth) return;
      lastWidth = width;
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        mm.revert();
        mm = gsap.matchMedia();
        build();
      }, 240);
    });
    resizeObserver.observe(root);
  }

  return () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeObserver?.disconnect();
    mm.revert();
  };
};

const loadVisual = async (root: HTMLElement, gen: number) => {
  const loader = loaders[root.dataset.bentoVisual ?? ""];
  if (!loader) return;

  const motionQuery = window.matchMedia(MOTION_OK);
  if (!motionQuery.matches) {
    // Animations réactivées pendant la visite : on charge à ce moment-là.
    const retry = () => {
      if (!motionQuery.matches) return;
      motionQuery.removeEventListener("change", retry);
      teardowns.delete(stopRetry);
      if (isCurrent(gen, root)) void loadVisual(root, gen);
    };
    const stopRetry = () => motionQuery.removeEventListener("change", retry);
    motionQuery.addEventListener("change", retry);
    teardowns.add(stopRetry);
    return;
  }

  let mod: BentoSceneModule;
  try {
    mod = await loader();
  } catch (error) {
    console.error(`[bento] chargement "${root.dataset.bentoVisual}"`, error);
    return;
  }
  if (!isCurrent(gen, root)) return;

  if (mod.needsFonts && document.fonts) {
    await document.fonts.ready;
    if (!isCurrent(gen, root)) return;
  }

  teardowns.add(mountScene(root, mod));
};

export const initBentoVisuals = () => {
  const gen = generation;
  const visuals = Array.from(
    document.querySelectorAll<HTMLElement>("[data-bento-visual]")
  ).filter((visual) => !visual.dataset.bentoMounted);
  if (!visuals.length) return;

  if (!("IntersectionObserver" in window)) return;

  const loadObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        loadObserver.unobserve(entry.target);
        void loadVisual(entry.target as HTMLElement, gen);
      }
    },
    { rootMargin: "400px 0px" }
  );

  for (const visual of visuals) {
    visual.dataset.bentoMounted = "true";
    loadObserver.observe(visual);
  }
  teardowns.add(() => loadObserver.disconnect());
};

export const destroyBentoVisuals = () => {
  generation++;
  teardowns.forEach((teardown) => teardown());
  teardowns.clear();
  document
    .querySelectorAll<HTMLElement>("[data-bento-visual]")
    .forEach((visual) => delete visual.dataset.bentoMounted);
};
