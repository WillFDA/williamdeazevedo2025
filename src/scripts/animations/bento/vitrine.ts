/**
 * Scène "Création de site vitrine" — récit en deux actes :
 * 1. le curseur "William" construit la page (titres, image, CTA) ;
 * 2. le curseur "Prospect" arrive, lit, clique le CTA → toast "Nouveau message".
 * Cycle ~10 s avec pause lisible sur l'état final avant reset en fondu.
 */

import { animate, createTimeline, utils } from "animejs";

import { addPlayer, type BentoPlayer, query, queryAll } from "./shared";

export const animateVitrine = (root: HTMLElement, players: BentoPlayer[]) => {
  const page = query(root, "[data-bento-vitrine-page]");
  const rows = queryAll(root, "[data-bento-vitrine-row]");
  const image = query(root, "[data-bento-vitrine-image]");
  const cta = query(root, "[data-bento-vitrine-cta]");
  const ring = query(root, "[data-bento-vitrine-click-ring]");
  const toast = query(root, "[data-bento-vitrine-toast]");
  const builder = query(root, "[data-bento-vitrine-cursor-builder]");
  const visitor = query(root, "[data-bento-vitrine-cursor-visitor]");
  const glow = query(root, "[data-bento-vitrine-glow]");

  if (glow) {
    utils.set(glow, { opacity: 0.55, scale: 1 });
    addPlayer(
      players,
      animate(glow, {
        opacity: 0.95,
        scale: 1.07,
        alternate: true,
        duration: 4200,
        ease: "inOut(2)",
        loop: true,
      })
    );
  }

  if (!(page && cta && builder && visitor)) return;

  const builderStart = { x: 140, y: -18 };
  const visitorStart = { x: 330, y: 210 };

  utils.set(page, { opacity: 1 });
  if (rows.length) utils.set(rows, { scaleX: 0 });
  if (image) utils.set(image, { opacity: 0, scale: 0.86 });
  utils.set(cta, { opacity: 0, scale: 0.6 });
  if (ring) utils.set(ring, { opacity: 0, scale: 0.3 });
  if (toast) utils.set(toast, { opacity: 0, y: -6, scale: 0.96 });
  utils.set(builder, { ...builderStart, opacity: 0 });
  utils.set(visitor, { ...visitorStart, opacity: 0 });

  const timeline = createTimeline({ loop: true });

  // Acte 1 : William construit la page.
  timeline.add(builder, { opacity: 1, duration: 250 }, 100);
  timeline.add(
    builder,
    { x: 112, y: 48, duration: 650, ease: "inOut(3)" },
    150
  );
  if (rows[0]) {
    timeline.add(rows[0], { scaleX: 1, duration: 550, ease: "out(3)" }, 750);
  }
  timeline.add(
    builder,
    { x: 92, y: 72, duration: 420, ease: "inOut(3)" },
    1150
  );
  if (rows[1]) {
    timeline.add(rows[1], { scaleX: 1, duration: 500, ease: "out(3)" }, 1500);
  }
  timeline.add(
    builder,
    { x: 98, y: 94, duration: 380, ease: "inOut(3)" },
    1850
  );
  if (rows[2]) {
    timeline.add(rows[2], { scaleX: 1, duration: 480, ease: "out(3)" }, 2180);
  }
  timeline.add(
    builder,
    { x: 216, y: 100, duration: 520, ease: "inOut(3)" },
    2550
  );
  if (image) {
    timeline.add(
      image,
      { opacity: 1, scale: 1, duration: 520, ease: "out(4)" },
      2980
    );
  }
  timeline.add(
    builder,
    { x: 64, y: 132, duration: 480, ease: "inOut(3)" },
    3400
  );
  timeline.add(
    cta,
    { opacity: 1, scale: 1, duration: 460, ease: "out(4)" },
    3820
  );
  timeline.add(
    builder,
    { x: -40, y: -30, duration: 600, ease: "inOut(3)" },
    4200
  );
  timeline.add(builder, { opacity: 0, duration: 250 }, 4550);

  // Acte 2 : un prospect découvre la page et clique.
  timeline.add(visitor, { opacity: 1, duration: 250 }, 4700);
  timeline.add(
    visitor,
    { x: 180, y: 88, duration: 700, ease: "inOut(3)" },
    4750
  );
  timeline.add(
    visitor,
    { x: 58, y: 138, duration: 620, ease: "inOut(3)" },
    5850
  );
  timeline.add(cta, { scale: 0.93, duration: 140, ease: "out(2)" }, 6520);
  if (ring) {
    timeline.add(
      ring,
      { opacity: 0.85, scale: 0.55, duration: 120, ease: "out(2)" },
      6520
    );
    timeline.add(
      ring,
      { opacity: 0, scale: 1.3, duration: 480, ease: "out(2)" },
      6640
    );
  }
  timeline.add(cta, { scale: 1, duration: 220, ease: "out(3)" }, 6660);
  if (toast) {
    timeline.add(
      toast,
      { opacity: 1, y: 0, scale: 1, duration: 420, ease: "out(4)" },
      6850
    );
  }
  timeline.add(
    visitor,
    { x: 84, y: 156, duration: 700, ease: "inOut(2)" },
    6950
  );

  // Pause lisible (7650 → 9150) puis reset en fondu.
  if (toast) {
    timeline.add(
      toast,
      { opacity: 0, y: -4, duration: 320, ease: "in(2)" },
      9150
    );
  }
  timeline.add(visitor, { opacity: 0, duration: 300 }, 9150);
  timeline.add(page, { opacity: 0, duration: 260, ease: "in(2)" }, 9450);
  if (rows.length) timeline.add(rows, { scaleX: 0, duration: 1 }, 9740);
  if (image) {
    timeline.add(image, { opacity: 0, scale: 0.86, duration: 1 }, 9740);
  }
  timeline.add(cta, { opacity: 0, scale: 0.6, duration: 1 }, 9740);
  timeline.add(builder, { ...builderStart, duration: 1 }, 9740);
  timeline.add(visitor, { ...visitorStart, duration: 1 }, 9740);
  timeline.add(page, { opacity: 1, duration: 220 }, 9760);

  addPlayer(players, timeline);
};
