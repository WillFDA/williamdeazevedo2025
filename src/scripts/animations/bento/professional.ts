/**
 * Scène "Site internet professionnel" — de la page seule au site complet :
 * Accueil se déploie en Services, Preuves et Contact, les connexions
 * dessinent l'arborescence, la base technique s'ancre puis Contact reçoit
 * le focus final. Cycle ~8,8 s avec pause lisible.
 */

import { animate, createTimeline, utils } from "animejs";

import {
  addPlayer,
  type BentoPlayer,
  centerDelta,
  query,
  queryAll,
} from "./shared";

type SitemapScene = {
  badge: HTMLElement | null;
  base: HTMLElement | null;
  contact: HTMLElement | null;
  drops: HTMLElement[];
  glow: HTMLElement | null;
  home: HTMLElement;
  pages: HTMLElement[];
  ping: HTMLElement | null;
  rail: HTMLElement | null;
  signal: HTMLElement | null;
  trunk: HTMLElement | null;
};

const PAGE_OFFSETS = [
  { x: -16, y: -10 },
  { x: 0, y: -4 },
  { x: 16, y: -10 },
] as const;

const setInitialState = (scene: SitemapScene) => {
  const pageDeltas = scene.pages.map((page) => centerDelta(scene.home, page));

  utils.set(scene.home, { rotate: -4, scale: 1, y: 4 });

  scene.pages.forEach((page, index) => {
    const delta = pageDeltas[index] ?? { x: 0, y: 0 };
    const offset = PAGE_OFFSETS[index] ?? { x: 0, y: 0 };
    utils.set(page, {
      opacity: 0,
      rotate: offset.x / 4,
      scale: 0.76,
      x: delta.x + offset.x,
      y: delta.y + offset.y,
    });
  });

  if (scene.trunk) utils.set(scene.trunk, { opacity: 0, scaleY: 0 });
  if (scene.rail) utils.set(scene.rail, { opacity: 0, scaleX: 0 });
  if (scene.drops.length) utils.set(scene.drops, { opacity: 0, scaleY: 0 });
  if (scene.base) utils.set(scene.base, { opacity: 0, scale: 0.94, y: 8 });
  if (scene.badge) utils.set(scene.badge, { opacity: 0, scale: 0.92, y: 6 });
  if (scene.signal) utils.set(scene.signal, { opacity: 0 });

  return pageDeltas;
};

const addPageUnfoldPhase = (scene: SitemapScene) => {
  const timeline = createTimeline({ loop: true });

  // La page seule se redresse avant de se déployer.
  timeline.add(
    scene.home,
    { rotate: 0, scale: 1.03, y: 0, duration: 520, ease: "out(3)" },
    420
  );
  timeline.add(scene.home, { scale: 1, duration: 260, ease: "inOut(2)" }, 920);

  scene.pages.forEach((page, index) => {
    const at = 1120 + index * 360;
    timeline.add(page, { opacity: 1, duration: 180 }, at);
    timeline.add(
      page,
      {
        rotate: 0,
        scale: [
          { to: 1.04, duration: 430, ease: "out(3)" },
          { to: 1, duration: 280, ease: "inOut(2)" },
        ],
        x: 0,
        y: 0,
      },
      at
    );
  });

  return timeline;
};

const addConnectionPhase = (
  timeline: ReturnType<typeof createTimeline>,
  scene: SitemapScene
) => {
  if (scene.trunk) {
    timeline.add(
      scene.trunk,
      { opacity: 1, scaleY: 1, duration: 430, ease: "out(3)" },
      2700
    );
  }

  if (scene.rail) {
    timeline.add(
      scene.rail,
      { opacity: 1, scaleX: 1, duration: 520, ease: "out(3)" },
      3020
    );
  }

  scene.drops.forEach((drop, index) => {
    const at = 3400 + index * 260;
    timeline.add(
      drop,
      { opacity: 1, scaleY: 1, duration: 320, ease: "out(3)" },
      at
    );

    const page = scene.pages[index];
    if (!page) return;
    timeline.add(
      page,
      {
        scale: [
          { to: 1.06, duration: 150, ease: "out(2)" },
          { to: 1, duration: 230, ease: "inOut(2)" },
        ],
      },
      at + 170
    );
  });
};

const addFinalPhase = (
  timeline: ReturnType<typeof createTimeline>,
  scene: SitemapScene
) => {
  if (scene.base) {
    timeline.add(
      scene.base,
      { opacity: 1, scale: 1, y: 0, duration: 420, ease: "out(4)" },
      4700
    );
  }

  if (scene.contact) {
    timeline.add(
      scene.contact,
      {
        scale: [
          { to: 1.08, duration: 190, ease: "out(2)" },
          { to: 1, duration: 260, ease: "inOut(2)" },
        ],
      },
      5450
    );
  }

  if (scene.signal) {
    timeline.add(scene.signal, { opacity: 1, duration: 220 }, 5550);
  }

  if (scene.badge) {
    timeline.add(
      scene.badge,
      { opacity: 1, scale: 1, y: 0, duration: 420, ease: "out(4)" },
      6020
    );
  }
};

const addResetPhase = (
  timeline: ReturnType<typeof createTimeline>,
  scene: SitemapScene
) => {
  if (scene.badge) {
    timeline.add(
      scene.badge,
      { opacity: 0, scale: 0.92, y: 6, duration: 240, ease: "in(2)" },
      7900
    );
  }
  if (scene.signal)
    timeline.add(scene.signal, { opacity: 0, duration: 220 }, 7940);
  if (scene.base) {
    timeline.add(
      scene.base,
      { opacity: 0, scale: 0.94, y: 8, duration: 260, ease: "in(2)" },
      8060
    );
  }

  scene.drops.toReversed().forEach((drop, index) => {
    timeline.add(
      drop,
      { opacity: 0, scaleY: 0, duration: 220, ease: "in(2)" },
      8180 + index * 120
    );
  });
  if (scene.rail) {
    timeline.add(
      scene.rail,
      { opacity: 0, scaleX: 0, duration: 280, ease: "in(2)" },
      8460
    );
  }
  if (scene.trunk) {
    timeline.add(
      scene.trunk,
      { opacity: 0, scaleY: 0, duration: 240, ease: "in(2)" },
      8620
    );
  }

  scene.pages.forEach((page, index) => {
    const offset = PAGE_OFFSETS[index] ?? { x: 0, y: 0 };
    const delta = centerDelta(scene.home, page);
    timeline.add(
      page,
      {
        opacity: 0,
        rotate: offset.x / 4,
        scale: 0.76,
        x: delta.x + offset.x,
        y: delta.y + offset.y,
        duration: 360,
        ease: "in(2)",
      },
      8620 + index * 90
    );
  });

  timeline.add(
    scene.home,
    { rotate: -4, y: 4, duration: 320, ease: "inOut(2)" },
    8920
  );
};

export const animateProfessional = (
  root: HTMLElement,
  players: BentoPlayer[]
) => {
  const home = query(root, "[data-bento-pro-home]");
  const pages = queryAll(root, "[data-bento-pro-page]");

  if (!home || pages.length !== 3) return;

  const scene: SitemapScene = {
    badge: query(root, "[data-bento-pro-badge]"),
    base: query(root, "[data-bento-pro-base]"),
    contact: query(root, "[data-bento-pro-contact]"),
    drops: queryAll(root, "[data-bento-pro-drop]"),
    glow: query(root, "[data-bento-pro-glow]"),
    home,
    pages,
    ping: query(root, "[data-bento-pro-signal-ping]"),
    rail: query(root, "[data-bento-pro-rail]"),
    signal: query(root, "[data-bento-pro-signal]"),
    trunk: query(root, "[data-bento-pro-trunk]"),
  };

  if (scene.glow) {
    utils.set(scene.glow, { opacity: 0.34, scale: 1 });
    addPlayer(
      players,
      animate(scene.glow, {
        opacity: 0.58,
        scale: 1.06,
        alternate: true,
        duration: 4600,
        ease: "inOut(2)",
        loop: true,
      })
    );
  }

  if (scene.ping) {
    addPlayer(
      players,
      animate(scene.ping, {
        opacity: [0.55, 0],
        scale: [1, 2.25],
        duration: 1600,
        ease: "out(2)",
        loop: true,
      })
    );
  }

  setInitialState(scene);

  const timeline = addPageUnfoldPhase(scene);
  addConnectionPhase(timeline, scene);
  addFinalPhase(timeline, scene);
  addResetPhase(timeline, scene);

  addPlayer(players, timeline);
};
