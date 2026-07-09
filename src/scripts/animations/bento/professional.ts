/**
 * Scène "Site internet professionnel" — de la page seule au site complet :
 * la page Accueil se démultiplie en Services, Preuves et Contact, les
 * connexions dessinent l'arborescence jusqu'à la base technique, un signal
 * s'allume sur Contact puis le badge "Présence complète" valide le tout.
 * Cycle ~9,3 s avec pause lisible. Trajets Accueil → pages mesurés au
 * chargement.
 */

import { animate, createTimeline, type Timeline, utils } from "animejs";

import {
  addPlayer,
  type BentoPlayer,
  centerDelta,
  query,
  queryAll,
} from "./shared";

type Delta = { x: number; y: number };

type ProScene = {
  badge: HTMLElement | null;
  base: HTMLElement | null;
  children: HTMLElement[];
  drops: HTMLElement[];
  glow: HTMLElement | null;
  home: HTMLElement;
  labels: HTMLElement[];
  rail: HTMLElement | null;
  signal: HTMLElement | null;
  signalPing: HTMLElement | null;
  trunk: HTMLElement | null;
};

const CHILD_TILTS = [-6, 0, 6];
const FLY_AT = [1200, 1680, 2160];

const setInitialState = (scene: ProScene, deltas: Delta[]) => {
  utils.set(scene.home, { rotate: -2.5, y: 2 });

  scene.children.forEach((child, index) => {
    const delta = deltas[index];
    if (!delta) return;
    utils.set(child, {
      opacity: 0,
      rotate: CHILD_TILTS[index],
      scale: 0.72,
      x: delta.x,
      y: delta.y,
    });
  });

  if (scene.labels.length) utils.set(scene.labels, { opacity: 0, y: 4 });
  if (scene.trunk) utils.set(scene.trunk, { scaleY: 0 });
  if (scene.drops.length) utils.set(scene.drops, { scaleY: 0 });
  if (scene.rail) utils.set(scene.rail, { scaleX: 0 });
  if (scene.base) utils.set(scene.base, { opacity: 0, y: 8 });
  if (scene.signal) utils.set(scene.signal, { opacity: 0 });
  if (scene.badge) utils.set(scene.badge, { opacity: 0, scale: 0.92, y: 6 });
};

// La page Accueil se redresse puis chaque page enfant s'envole vers sa place.
const addUnfoldPhase = (
  timeline: Timeline,
  scene: ProScene,
  deltas: Delta[]
) => {
  timeline.add(
    scene.home,
    { rotate: 0, y: 0, duration: 420, ease: "out(3)" },
    1100
  );

  scene.children.forEach((child, index) => {
    const delta = deltas[index];
    const at = FLY_AT[index];
    if (!(delta && at !== undefined)) return;

    timeline.add(child, { opacity: 1, duration: 180 }, at);
    timeline.add(
      child,
      {
        rotate: { to: 0, duration: 680, ease: "inOut(2)" },
        scale: { to: 1, duration: 680, ease: "inOut(2)" },
        x: { to: 0, duration: 680, ease: "inOut(2)" },
        y: [
          { to: delta.y * 0.5 - 10, duration: 320, ease: "out(2)" },
          { to: 0, duration: 360, ease: "in(1.6)" },
        ],
      },
      at + 60
    );
    timeline.add(
      child,
      {
        scale: [
          { to: 1.04, duration: 130, ease: "out(2)" },
          { to: 1, duration: 210, ease: "inOut(2)" },
        ],
      },
      at + 760
    );
  });
};

// Le tronc, le rail puis les branches relient Accueil aux pages enfants.
const addConnectPhase = (timeline: Timeline, scene: ProScene) => {
  if (scene.trunk) {
    timeline.add(
      scene.trunk,
      { scaleY: 1, duration: 360, ease: "out(3)" },
      3300
    );
  }

  if (scene.rail) {
    timeline.add(
      scene.rail,
      { scaleX: 1, duration: 480, ease: "out(3)" },
      3660
    );
  }

  scene.drops.forEach((drop, index) => {
    const dropAt = 4140 + index * 260;
    timeline.add(drop, { scaleY: 1, duration: 240, ease: "out(2)" }, dropAt);

    const label = scene.labels[index];
    if (label) {
      timeline.add(
        label,
        { opacity: 1, y: 0, duration: 300, ease: "out(3)" },
        dropAt + 120
      );
    }

    const child = scene.children[index];
    if (child) {
      timeline.add(
        child,
        {
          scale: [
            { to: 1.05, duration: 150, ease: "out(3)" },
            { to: 1, duration: 220, ease: "inOut(2)" },
          ],
        },
        dropAt + 140
      );
    }
  });
};

// La base technique s'ancre, Contact réagit puis le badge valide le site.
const addFinalePhase = (timeline: Timeline, scene: ProScene) => {
  if (scene.base) {
    timeline.add(
      scene.base,
      { opacity: 1, y: 0, duration: 420, ease: "out(3)" },
      5300
    );
  }

  const contact = scene.children[2];
  if (contact) {
    timeline.add(
      contact,
      {
        y: [
          { to: -3, duration: 150, ease: "out(3)" },
          { to: 0, duration: 220, ease: "inOut(2)" },
        ],
      },
      5900
    );
  }

  if (scene.signal) {
    timeline.add(scene.signal, { opacity: 1, duration: 260 }, 5950);
  }

  if (scene.badge) {
    timeline.add(
      scene.badge,
      { opacity: 1, scale: 1, y: 0, duration: 400, ease: "out(4)" },
      6300
    );
  }
};

// Pause lisible (6700 → 8400) puis les pages rentrent dans l'Accueil.
const addResetPhase = (
  timeline: Timeline,
  scene: ProScene,
  deltas: Delta[]
) => {
  if (scene.badge) {
    timeline.add(
      scene.badge,
      { opacity: 0, scale: 0.92, y: 6, duration: 240, ease: "in(2)" },
      8400
    );
  }
  if (scene.labels.length) {
    timeline.add(
      scene.labels,
      { opacity: 0, y: 4, duration: 240, ease: "in(2)" },
      8400
    );
  }
  if (scene.signal) {
    timeline.add(scene.signal, { opacity: 0, duration: 200 }, 8400);
  }
  if (scene.base) {
    timeline.add(
      scene.base,
      { opacity: 0, y: 8, duration: 260, ease: "in(2)" },
      8420
    );
  }
  if (scene.drops.length) {
    timeline.add(
      scene.drops,
      { scaleY: 0, duration: 220, ease: "in(2)" },
      8450
    );
  }
  if (scene.rail) {
    timeline.add(scene.rail, { scaleX: 0, duration: 260, ease: "in(2)" }, 8560);
  }
  if (scene.trunk) {
    timeline.add(
      scene.trunk,
      { scaleY: 0, duration: 220, ease: "in(2)" },
      8700
    );
  }

  scene.children.forEach((child, index) => {
    const delta = deltas[index];
    if (!delta) return;
    timeline.add(
      child,
      {
        rotate: CHILD_TILTS[index],
        scale: 0.72,
        x: delta.x,
        y: delta.y,
        duration: 480,
        ease: "inOut(2)",
      },
      8500 + index * 90
    );
  });

  if (scene.children.length) {
    timeline.add(
      scene.children,
      { opacity: 0, duration: 180, ease: "in(2)" },
      8880
    );
  }

  timeline.add(
    scene.home,
    { rotate: -2.5, y: 2, duration: 300, ease: "inOut(2)" },
    8980
  );
};

export const animateProfessional = (
  root: HTMLElement,
  players: BentoPlayer[]
) => {
  const glow = query(root, "[data-bento-pro-glow]");
  const home = query(root, "[data-bento-pro-home]");
  const children = queryAll(root, "[data-bento-pro-child]");
  const labels = queryAll(root, "[data-bento-pro-label]");
  const trunk = query(root, "[data-bento-pro-trunk]");
  const rail = query(root, "[data-bento-pro-rail]");
  const drops = queryAll(root, "[data-bento-pro-drop]");
  const base = query(root, "[data-bento-pro-base]");
  const signal = query(root, "[data-bento-pro-signal]");
  const signalPing = query(root, "[data-bento-pro-signal-ping]");
  const badge = query(root, "[data-bento-pro-badge]");

  if (glow) {
    utils.set(glow, { opacity: 0.35, scale: 1 });
    addPlayer(
      players,
      animate(glow, {
        opacity: 0.6,
        scale: 1.06,
        alternate: true,
        duration: 4600,
        ease: "inOut(2)",
        loop: true,
      })
    );
  }

  if (signalPing) {
    utils.set(signalPing, { opacity: 0.7, scale: 1 });
    addPlayer(
      players,
      animate(signalPing, {
        opacity: [0.7, 0],
        scale: [1, 2.4],
        duration: 1900,
        ease: "out(2)",
        loop: true,
      })
    );
  }

  if (!(home && children.length === 3)) return;

  const scene: ProScene = {
    badge,
    base,
    children,
    drops,
    glow,
    home,
    labels,
    rail,
    signal,
    signalPing,
    trunk,
  };

  // Remise à zéro avant mesure (utile lors d'un re-init après resize),
  // puis mesure des trajets Accueil → pages enfants.
  utils.set(children, { rotate: 0, scale: 1, x: 0, y: 0 });
  const deltas = children.map((child) => centerDelta(home, child));

  setInitialState(scene, deltas);

  const timeline = createTimeline({ loop: true });

  addUnfoldPhase(timeline, scene, deltas);
  addConnectPhase(timeline, scene);
  addFinalePhase(timeline, scene);
  addResetPhase(timeline, scene, deltas);

  addPlayer(players, timeline);
};
