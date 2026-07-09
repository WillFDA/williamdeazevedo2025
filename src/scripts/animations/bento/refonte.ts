/**
 * Scène "Refonte" — les contenus quittent la fenêtre "Avant" (terne, penchée)
 * et volent un par un vers leurs emplacements en pointillés dans la fenêtre
 * "Après", avec un petit arc de trajectoire. Balayage lumineux et badge final.
 * Les décalages de vol sont mesurés au chargement (robuste au responsive).
 */

import { createTimeline, utils } from "animejs";

import {
  addPlayer,
  type BentoPlayer,
  centerDelta,
  query,
  queryAll,
} from "./shared";

export const animateRefonte = (root: HTMLElement, players: BentoPlayer[]) => {
  const sources = queryAll(root, "[data-bento-refonte-source]");
  const flies = queryAll(root, "[data-bento-refonte-fly]");
  const slots = queryAll(root, "[data-bento-refonte-slot]");
  const arrow = query(root, "[data-bento-refonte-arrow]");
  const chip = query(root, "[data-bento-refonte-chip]");
  const shine = query(root, "[data-bento-refonte-shine]");
  const apres = query(root, "[data-bento-refonte-apres]");

  if (!(sources.length && flies.length) || sources.length !== flies.length) {
    return;
  }

  // Remise à zéro avant mesure (utile lors d'un re-init après resize),
  // puis mesure des trajets.
  utils.set(flies, { scale: 1, x: 0, y: 0 });
  const deltas = flies.map((fly, index) => {
    const source = sources[index];
    return source ? centerDelta(source, fly) : { x: 0, y: 0 };
  });
  const shineDistance =
    apres && shine ? apres.offsetWidth + shine.offsetWidth * 2 : 0;

  flies.forEach((fly, index) => {
    const delta = deltas[index];
    if (delta) utils.set(fly, { x: delta.x, y: delta.y, opacity: 0 });
  });
  utils.set(sources, { opacity: 1 });
  if (slots.length) utils.set(slots, { opacity: 0.9 });
  if (chip) utils.set(chip, { opacity: 0, y: 6, scale: 0.92 });
  if (shine) utils.set(shine, { x: 0, opacity: 0 });

  const timeline = createTimeline({ loop: true });

  flies.forEach((fly, index) => {
    const delta = deltas[index];
    const source = sources[index];
    const slot = slots[index];
    if (!(delta && source)) return;

    const start = 700 + index * 1150;

    timeline.add(source, { opacity: 0.3, duration: 320, ease: "in(2)" }, start);
    timeline.add(fly, { opacity: 1, duration: 180 }, start);
    timeline.add(
      fly,
      {
        x: { to: 0, duration: 720, ease: "inOut(2)" },
        y: [
          { to: delta.y - 14, duration: 330, ease: "out(2)" },
          { to: 0, duration: 390, ease: "in(1.6)" },
        ],
      },
      start + 120
    );
    timeline.add(
      fly,
      {
        scale: [
          { to: 1.05, duration: 140, ease: "out(2)" },
          { to: 1, duration: 200, ease: "inOut(2)" },
        ],
      },
      start + 840
    );
    if (slot) {
      timeline.add(slot, { opacity: 0, duration: 260 }, start + 780);
    }
    if (arrow) {
      timeline.add(
        arrow,
        {
          scale: [
            { to: 1.18, duration: 160, ease: "out(2)" },
            { to: 1, duration: 260, ease: "inOut(2)" },
          ],
        },
        start + 380
      );
    }
  });

  const transfersEnd = 700 + (flies.length - 1) * 1150 + 1100;

  if (chip) {
    timeline.add(
      chip,
      { opacity: 1, y: 0, scale: 1, duration: 420, ease: "out(4)" },
      transfersEnd + 150
    );
  }
  if (shine && shineDistance > 0) {
    timeline.add(
      shine,
      {
        x: { to: shineDistance, duration: 750, ease: "inOut(2)" },
        opacity: [
          { to: 0.8, duration: 220, ease: "out(2)" },
          { to: 0.8, duration: 230 },
          { to: 0, duration: 300, ease: "in(2)" },
        ],
      },
      transfersEnd + 450
    );
  }

  // Pause lisible puis retour à l'état initial.
  const resetAt = transfersEnd + 2650;

  timeline.add(flies, { opacity: 0, duration: 260, ease: "in(2)" }, resetAt);
  timeline.add(sources, { opacity: 1, duration: 300 }, resetAt + 60);
  if (slots.length) {
    timeline.add(slots, { opacity: 0.9, duration: 300 }, resetAt + 60);
  }
  if (chip) {
    timeline.add(
      chip,
      { opacity: 0, y: 6, scale: 0.92, duration: 260, ease: "in(2)" },
      resetAt
    );
  }
  flies.forEach((fly, index) => {
    const delta = deltas[index];
    if (!delta) return;
    timeline.add(
      fly,
      { x: delta.x, y: delta.y, scale: 1, duration: 1 },
      resetAt + 340
    );
  });
  if (shine) timeline.add(shine, { x: 0, duration: 1 }, resetAt + 340);

  addPlayer(players, timeline);
};
