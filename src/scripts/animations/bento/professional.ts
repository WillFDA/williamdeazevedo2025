/**
 * Scène "Site internet professionnel" — l'immeuble qui se construit :
 * la dalle "Base technique" se pose, puis les niveaux Services et Preuves
 * s'empilent (chaque pose tasse légèrement les étages du dessous), le fil
 * à plomb vérifie l'alignement, le niveau Contact coiffe le tout et son
 * signal s'allume. "Présence durable" valide. Cycle ~9 s avec pause.
 */

import { animate, createTimeline, utils } from "animejs";

import { addPlayer, type BentoPlayer, query, queryAll } from "./shared";

// Ordre de pose : Base technique, Services, Preuves, puis Contact
// (après le passage du fil à plomb).
const FLOOR_DROPS = [400, 1300, 2150, 3750];

export const animateProfessional = (
  root: HTMLElement,
  players: BentoPlayer[]
) => {
  const floors = queryAll(root, "[data-bento-pro-floor]");
  const plumbLine = query(root, "[data-bento-pro-plumb]");
  const plumbBob = query(root, "[data-bento-pro-plumb-bob]");
  const beacon = query(root, "[data-bento-pro-beacon]");
  const ping = query(root, "[data-bento-pro-beacon-ping]");
  const badge = query(root, "[data-bento-pro-badge]");
  const glow = query(root, "[data-bento-pro-glow]");

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

  // Le signal du niveau Contact pulse en continu ; sa visibilité est
  // pilotée par l'opacité du conteneur beacon dans la timeline.
  if (ping) {
    utils.set(ping, { opacity: 0.7, scale: 1 });
    addPlayer(
      players,
      animate(ping, {
        opacity: [0.7, 0],
        scale: [1, 2.4],
        duration: 1900,
        ease: "out(2)",
        loop: true,
      })
    );
  }

  if (floors.length !== FLOOR_DROPS.length) return;

  utils.set(floors, { opacity: 0, y: -46 });
  if (plumbLine) utils.set(plumbLine, { scaleY: 0 });
  if (plumbBob) utils.set(plumbBob, { opacity: 0, scale: 0.5 });
  if (beacon) utils.set(beacon, { opacity: 0 });
  if (badge) utils.set(badge, { opacity: 0, scale: 0.92, y: 6 });

  const timeline = createTimeline({ loop: true });

  floors.forEach((floor, index) => {
    const at = FLOOR_DROPS[index] ?? 0;
    const isTop = index === floors.length - 1;

    timeline.add(floor, { opacity: 1, duration: 200 }, at);
    timeline.add(
      floor,
      { y: 0, duration: isTop ? 500 : 460, ease: "out(3)" },
      at
    );
    timeline.add(
      floor,
      {
        scale: [
          { to: isTop ? 0.95 : 0.966, duration: 130, ease: "out(2)" },
          { to: 1, duration: 230, ease: "inOut(2)" },
        ],
      },
      at + (isTop ? 470 : 430)
    );

    // Chaque pose tasse légèrement les étages déjà en place.
    for (let below = index - 1; below >= 0; below -= 1) {
      const floorBelow = floors[below];
      if (!floorBelow) continue;
      timeline.add(
        floorBelow,
        {
          y: [
            { to: 1.5, duration: 110, ease: "out(2)" },
            { to: 0, duration: 190, ease: "inOut(2)" },
          ],
        },
        at + 450 + (index - 1 - below) * 40
      );
    }
  });

  // Le fil à plomb vérifie l'alignement avant le dernier niveau.
  if (plumbLine) {
    timeline.add(plumbLine, { scaleY: 1, duration: 520, ease: "out(3)" }, 2950);
  }
  if (plumbBob) {
    timeline.add(
      plumbBob,
      { opacity: 0.9, scale: 1, duration: 240, ease: "out(2)" },
      3430
    );
  }

  // Le signal s'allume au sommet, la validation conclut.
  if (beacon) timeline.add(beacon, { opacity: 1, duration: 280 }, 4450);
  if (badge) {
    timeline.add(
      badge,
      { opacity: 1, scale: 1, y: 0, duration: 400, ease: "out(4)" },
      4750
    );
  }

  // Pause lisible (5150 → 7900) puis démontage en fondu, de haut en bas.
  floors.forEach((floor, index) => {
    const order = floors.length - 1 - index;
    timeline.add(
      floor,
      { opacity: 0, y: -8, duration: 260, ease: "in(2)" },
      7900 + order * 130
    );
  });
  if (plumbBob) timeline.add(plumbBob, { opacity: 0, duration: 200 }, 8480);
  if (plumbLine) {
    timeline.add(plumbLine, { scaleY: 0, duration: 300, ease: "in(2)" }, 8480);
  }
  if (beacon) timeline.add(beacon, { opacity: 0, duration: 240 }, 7900);
  if (badge) {
    timeline.add(
      badge,
      { opacity: 0, scale: 0.92, y: 6, duration: 240, ease: "in(2)" },
      7950
    );
  }
  timeline.add(floors, { y: -46, duration: 1 }, 8850);

  addPlayer(players, timeline);
};
