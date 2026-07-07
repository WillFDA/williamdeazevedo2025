/**
 * Scène "Site internet artisan" — l'établi vu de dessus : quatre pièces
 * posées en léger désordre se rangent une à une dans leurs emplacements
 * tracés en pointillés, le long de la règle qui se dessine d'abord.
 * "Devis" se cale en dernier, plus affirmé, puis "Demande claire" valide.
 * Cycle ~8 s avec pause lisible sur l'état rangé.
 */

import { createTimeline, utils } from "animejs";

import { addPlayer, type BentoPlayer, query, queryAll } from "./shared";

const SCATTER = [
  { rotate: -6, x: -14, y: 10 },
  { rotate: 5, x: 14, y: -8 },
  { rotate: 4, x: -11, y: -11 },
  { rotate: -5, x: 13, y: 11 },
];

export const animateArtisan = (root: HTMLElement, players: BentoPlayer[]) => {
  const ruler = query(root, "[data-bento-artisan-ruler]");
  const ticks = queryAll(root, "[data-bento-artisan-tick]");
  const slots = queryAll(root, "[data-bento-artisan-slot]");
  const pieces = queryAll(root, "[data-bento-artisan-piece]");
  const chip = query(root, "[data-bento-artisan-chip]");

  if (!pieces.length) return;

  if (ruler) utils.set(ruler, { opacity: 0.4, scaleX: 0.14 });
  if (ticks.length) utils.set(ticks, { opacity: 0.2, scale: 0.7 });
  if (slots.length) utils.set(slots, { opacity: 0.9 });
  pieces.forEach((piece, index) => {
    const offset = SCATTER[index % SCATTER.length];
    if (offset) utils.set(piece, { ...offset, scale: 1 });
  });
  if (chip) utils.set(chip, { opacity: 0, y: 8 });

  const timeline = createTimeline({ loop: true });

  // La règle se dessine : "on cadre" avant de ranger.
  if (ruler) {
    timeline.add(
      ruler,
      { opacity: 1, scaleX: 1, duration: 700, ease: "out(3)" },
      500
    );
  }

  // Rangement dans l'ordre : Prestations → Réalisations → Zone locale → Devis.
  pieces.forEach((piece, index) => {
    const isLast = index === pieces.length - 1;
    const start = 1300 + index * 760;
    const slot = slots[index];
    const tick = ticks[index];

    timeline.add(
      piece,
      {
        rotate: 0,
        x: 0,
        y: 0,
        duration: isLast ? 680 : 620,
        ease: "out(4)",
      },
      start
    );
    timeline.add(
      piece,
      {
        scale: [
          { to: isLast ? 1.05 : 0.985, duration: 160, ease: "out(2)" },
          { to: 1, duration: 240, ease: "inOut(2)" },
        ],
      },
      start + 520
    );
    if (slot) {
      timeline.add(slot, { opacity: 0, duration: 300 }, start + 430);
    }
    if (tick) {
      timeline.add(
        tick,
        {
          opacity: 1,
          scale: [
            { to: 1.25, duration: 200, ease: "out(2)" },
            { to: 1, duration: 240, ease: "inOut(2)" },
          ],
        },
        start + 470
      );
    }
  });

  // Validation finale.
  if (chip) {
    timeline.add(
      chip,
      { opacity: 1, y: 0, duration: 420, ease: "out(4)" },
      4700
    );
  }

  // Pause lisible (5100 → 7200) puis retour au désordre initial.
  pieces.forEach((piece, index) => {
    const offset = SCATTER[index % SCATTER.length];
    if (!offset) return;
    timeline.add(
      piece,
      { ...offset, duration: 720, ease: "inOut(2)" },
      7200 + index * 60
    );
  });
  if (slots.length) {
    timeline.add(slots, { opacity: 0.9, duration: 400 }, 7300);
  }
  if (ticks.length) {
    timeline.add(
      ticks,
      { opacity: 0.2, scale: 0.7, duration: 400, ease: "in(2)" },
      7250
    );
  }
  if (ruler) {
    timeline.add(
      ruler,
      { opacity: 0.4, scaleX: 0.14, duration: 500, ease: "inOut(2)" },
      7250
    );
  }
  if (chip) {
    timeline.add(
      chip,
      { opacity: 0, y: 8, duration: 300, ease: "in(2)" },
      7200
    );
  }

  addPlayer(players, timeline);
};
