/**
 * Scène "SEO & mise en ligne" — la loupe pulse, la ligne du client grimpe
 * de la 3e à la 2e puis à la 1re position, un balayage lumineux souligne
 * l'arrivée et le badge "1ʳᵉ position" confirme. Cycle ~7,6 s.
 */

import { createTimeline, utils } from "animejs";

import { addPlayer, type BentoPlayer, query } from "./shared";

const ROW_STEP = 25;

export const animateSeo = (root: HTMLElement, players: BentoPlayer[]) => {
  const list = query(root, "[data-bento-seo-list]");
  const lens = query(root, "[data-bento-seo-lens]");
  const ownRow = query(root, '[data-bento-seo-row="mine"]');
  const firstRow = query(root, '[data-bento-seo-row="other-1"]');
  const secondRow = query(root, '[data-bento-seo-row="other-2"]');
  const sweep = query(root, "[data-bento-seo-sweep]");
  const chip = query(root, "[data-bento-seo-chip]");

  if (!(list && ownRow && firstRow && secondRow)) return;

  utils.set(list, { opacity: 1 });
  utils.set(ownRow, { y: ROW_STEP * 2 });
  utils.set([firstRow, secondRow], { y: -ROW_STEP });
  if (sweep) utils.set(sweep, { x: -34, opacity: 0 });
  if (chip) utils.set(chip, { opacity: 0, scale: 0.84 });

  const timeline = createTimeline({ loop: true });

  if (lens) {
    timeline.add(
      lens,
      {
        scale: [
          { to: 1.14, duration: 220, ease: "out(2)" },
          { to: 1, duration: 320, ease: "inOut(2)" },
        ],
      },
      400
    );
  }

  // Montée 3e → 2e → 1re, une place à la fois.
  timeline.add(ownRow, { y: ROW_STEP, duration: 620, ease: "inOut(3)" }, 1300);
  timeline.add(secondRow, { y: 0, duration: 620, ease: "inOut(3)" }, 1300);
  timeline.add(ownRow, { y: 0, duration: 620, ease: "inOut(3)" }, 2700);
  timeline.add(firstRow, { y: 0, duration: 620, ease: "inOut(3)" }, 2700);

  if (sweep) {
    timeline.add(
      sweep,
      {
        x: { to: 210, duration: 620, ease: "inOut(2)" },
        opacity: [
          { to: 0.75, duration: 180, ease: "out(2)" },
          { to: 0.75, duration: 160 },
          { to: 0, duration: 280, ease: "in(2)" },
        ],
      },
      3450
    );
  }
  timeline.add(
    ownRow,
    {
      scale: [
        { to: 1.03, duration: 200, ease: "out(2)" },
        { to: 1, duration: 260, ease: "inOut(2)" },
      ],
    },
    3550
  );
  if (chip) {
    timeline.add(
      chip,
      { opacity: 1, scale: 1, duration: 380, ease: "out(4)" },
      3700
    );
    timeline.add(
      chip,
      { opacity: 0, scale: 0.9, duration: 300, ease: "in(2)" },
      5750
    );
  }

  // Pause lisible en 1re position puis reset masqué par un fondu du bloc.
  timeline.add(list, { opacity: 0, duration: 180, ease: "linear" }, 6150);
  timeline.add(ownRow, { y: ROW_STEP * 2, duration: 1 }, 6340);
  timeline.add([firstRow, secondRow], { y: -ROW_STEP, duration: 1 }, 6340);
  if (sweep) timeline.add(sweep, { x: -34, duration: 1 }, 6340);
  timeline.add(list, { opacity: 1, duration: 180, ease: "linear" }, 6420);

  addPlayer(players, timeline);
};
