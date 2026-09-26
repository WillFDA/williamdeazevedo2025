/**
 * Contrat et utilitaires partagés par les scènes animées du bento services
 * (GSAP). Chaque scène est un module chargé à la demande par runtime.ts et
 * expose `createScene(ctx)`, appelée de façon SYNCHRONE dans un
 * gsap.matchMedia/context : tout ce qu'elle crée (timelines, sets, SplitText)
 * est donc annulé par `revert()` et le DOM retrouve son état statique.
 *
 * Règle d'or : le HTML statique (sans JS, prefers-reduced-motion) EST l'état
 * final de la scène. La timeline décrit un cycle complet :
 *   0 (état final) → remise à zéro → label "build" (état initial) → … → fin
 *   (de nouveau l'état final).
 * On peut donc la rejouer (`restart`) ou s'y poser (`progress(1)`) sans saut.
 */

import { gsap } from "gsap";

/** Pause (s) sur l'état final entre deux cycles. */
export const HOLD_DELAY = 2.4;
/** Nombre de cycles joués à la première apparition de la carte. */
export const FIRST_VIEW_CYCLES = 2;
/** Label de la timeline où la scène est dans son état initial. */
export const BUILD_LABEL = "build";

export type BentoSceneContext = {
  /** Élément `[data-bento-visual]` de la scène. */
  root: HTMLElement;
  /** Carte-lien parente (`a.group`), cible du survol et du focus. */
  card: HTMLElement | null;
  /** Variante de carte (`feature`, `wide`, `relatedCompact`…). */
  variant: string;
  /** Pointeur fin capable de survol (desktop). */
  canHover: boolean;
  /** Ajoute un écouteur retiré automatiquement au nettoyage de la scène. */
  listen: (
    target: EventTarget,
    type: string,
    handler: EventListener,
    options?: AddEventListenerOptions
  ) => void;
  /** Suspend la lecture automatique : la scène pilote elle-même (ex. survol). */
  takeOver: () => void;
  /** Rend la main : la timeline se pose sur son état final. */
  release: () => void;
};

export type BentoScene = {
  /**
   * Un cycle complet, créé avec `paused: true`, contenant le label
   * BUILD_LABEL. Son état à 0 et à la fin doit être identique au HTML
   * statique.
   */
  timeline: gsap.core.Timeline;
  /** La scène gère elle-même le survol (pas de relecture automatique). */
  customHover?: boolean;
};

export type BentoSceneModule = {
  createScene: (ctx: BentoSceneContext) => BentoScene | null | undefined;
  /** Attendre `document.fonts.ready` avant de construire (SplitText, mesures de texte). */
  needsFonts?: boolean;
  /** Reconstruire la scène quand la largeur de la zone change (mesures DOM). */
  needsMeasure?: boolean;
};

export const query = <T extends Element = HTMLElement>(
  root: ParentNode,
  selector: string
) => root.querySelector<T>(selector);

export const queryAll = <T extends Element = HTMLElement>(
  root: ParentNode,
  selector: string
) => Array.from(root.querySelectorAll<T>(selector));

/**
 * Échelle visuelle héritée d'un élément HTML (`--bento-scene-scale`,
 * transforms parents) : rapport entre sa taille rendue et sa taille de layout.
 */
export const scaleOf = (el: HTMLElement) => {
  const width = el.offsetWidth;
  return width > 0 ? el.getBoundingClientRect().width / width : 1;
};

/** Convertit un point écran en coordonnées locales (non scalées) de `el`. */
export const toLocalPoint = (
  el: HTMLElement,
  clientX: number,
  clientY: number
) => {
  const rect = el.getBoundingClientRect();
  const scale = scaleOf(el);
  return {
    x: (clientX - rect.left) / scale,
    y: (clientY - rect.top) / scale,
  };
};

/**
 * Décalage centre-à-centre entre deux éléments, en pixels.
 * Les scènes bento peuvent être scalées via `--bento-scene-scale` : les
 * `getBoundingClientRect` renvoient alors des px visuels déjà scalés alors
 * que les transforms GSAP s'appliquent dans le repère local (non scalé)
 * de `to`. On divise donc le delta par l'échelle héritée de `to`.
 */
export const centerDelta = (from: HTMLElement, to: HTMLElement) => {
  const fromRect = from.getBoundingClientRect();
  const toRect = to.getBoundingClientRect();
  const scale = to.offsetWidth > 0 ? toRect.width / to.offsetWidth : 1;
  return {
    x:
      (fromRect.left + fromRect.width / 2 - (toRect.left + toRect.width / 2)) /
      scale,
    y:
      (fromRect.top + fromRect.height / 2 - (toRect.top + toRect.height / 2)) /
      scale,
  };
};

type PlaybackState = "idle" | "playing" | "waiting" | "resting" | "manual";

export type BentoPlayback = ReturnType<typeof createPlayback>;

/**
 * Pilote la lecture d'une scène : quelques cycles à la première apparition,
 * puis pause sur l'état final. Rejoue au survol / focus clavier (en boucle
 * tant que le survol dure) et au retour dans le viewport. Pause hors écran.
 */
export const createPlayback = (timeline: gsap.core.Timeline) => {
  let visible = false;
  let hovered = false;
  let started = false;
  let leftViewport = false;
  let queued = 0;
  let state: PlaybackState = "idle";
  let wait: gsap.core.Tween | null = null;
  const buildPosition =
    timeline.labels[BUILD_LABEL] === undefined ? 0 : BUILD_LABEL;

  const clearWait = () => {
    wait?.kill();
    wait = null;
  };

  const playFrom = (position: number | string) => {
    clearWait();
    leftViewport = false;
    state = "playing";
    timeline.play(position);
  };

  const scheduleNext = () => {
    state = "waiting";
    wait = gsap.delayedCall(HOLD_DELAY, () => {
      wait = null;
      playFrom(0);
    });
    if (!visible) wait.pause();
  };

  timeline.eventCallback("onComplete", () => {
    if (state !== "playing") return;
    if (hovered || queued > 0) {
      queued = Math.max(0, queued - 1);
      scheduleNext();
      return;
    }
    state = "resting";
  });

  // Tant qu'elle n'a pas été vue, la scène attend dans son état initial.
  timeline.pause(buildPosition);

  return {
    setVisible(next: boolean) {
      if (next === visible) return;
      visible = next;

      if (!next) {
        leftViewport = true;
        if (state === "playing") timeline.pause();
        wait?.pause();
        return;
      }

      // La scène pilote elle-même (survol) : l'observer ne relance rien.
      if (state === "manual") return;
      if (!started) {
        started = true;
        queued = FIRST_VIEW_CYCLES - 1;
        playFrom(buildPosition);
        return;
      }
      if (state === "playing") timeline.resume();
      else if (state === "waiting") wait?.resume();
      else if (state === "resting" && leftViewport) {
        queued = 0;
        playFrom(0);
      }
    },
    hoverStart() {
      hovered = true;
      if (state === "resting") playFrom(0);
    },
    hoverEnd() {
      hovered = false;
    },
    takeOver() {
      clearWait();
      timeline.pause();
      started = true;
      state = "manual";
    },
    release() {
      clearWait();
      state = "manual";
      // suppressEvents=false : les onUpdate (compteurs, horloges) se recalent.
      timeline.pause();
      timeline.progress(1, false);
      started = true;
      state = "resting";
    },
    destroy() {
      clearWait();
      timeline.eventCallback("onComplete", null);
      state = "idle";
    },
  };
};
