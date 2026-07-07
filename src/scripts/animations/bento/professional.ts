/**
 * Scène "Site internet professionnel" — la carte de décision : un point
 * visiteur part des doutes, la route se dessine étape par étape
 * (Comprendre → Rassurer → Contacter) et le point se colore à chaque
 * jalon (bleu → vert → gris foncé). "Parcours clair" conclut.
 * Cycle ~9 s, séquentiel, avec pause lisible sur le parcours complet.
 */

import { createTimeline, type Timeline, utils } from "animejs";

import { addPlayer, type BentoPlayer, query, queryAll } from "./shared";

const activateNote = (timeline: Timeline, note: HTMLElement, at: number) => {
  timeline.add(
    note,
    {
      opacity: 1,
      y: [
        { to: -3, duration: 260, ease: "out(3)" },
        { to: 0, duration: 300, ease: "inOut(2)" },
      ],
    },
    at
  );
};

const activateStep = (
  timeline: Timeline,
  step: HTMLElement,
  layer: HTMLElement | undefined,
  at: number
) => {
  timeline.add(step, { opacity: 1, y: 0, duration: 320, ease: "out(3)" }, at);
  timeline.add(
    step,
    {
      scale: [
        { to: 1.035, duration: 220, ease: "out(3)" },
        { to: 1, duration: 280, ease: "inOut(2)" },
      ],
    },
    at + 120
  );
  if (layer) {
    timeline.add(layer, { opacity: 1, duration: 300 }, at + 140);
  }
};

export const animateProfessional = (
  root: HTMLElement,
  players: BentoPlayer[]
) => {
  const route = query(root, "[data-bento-professional-route]");
  const segments = queryAll(root, "[data-bento-professional-line]");
  const arrow = query(root, "[data-bento-professional-arrow]");
  const dot = query(root, "[data-bento-professional-dot]");
  const dotLayers = queryAll(root, "[data-bento-professional-dot-layer]");
  const steps = queryAll(root, "[data-bento-professional-step]");
  const notes = queryAll(root, "[data-bento-professional-note]");
  const chip = query(root, "[data-bento-professional-chip]");

  const required =
    route &&
    arrow &&
    dot &&
    chip &&
    segments.length >= 2 &&
    steps.length === 3 &&
    notes.length === 3;
  if (!required) return;

  const routeWidth = route.offsetWidth;
  // Point de départ : à gauche de "Comprendre", visible sur la carte
  // (le point passe sous les étapes, il n'est visible qu'entre elles).
  const startX = -(routeWidth + (steps[0] as HTMLElement).offsetWidth / 2 + 14);

  utils.set(segments, { scaleX: 0 });
  utils.set(arrow, { opacity: 0, scale: 0.82 });
  utils.set(dot, { opacity: 0.95, x: startX });
  utils.set(dotLayers, { opacity: 0 });
  utils.set(steps, { opacity: 0.55, scale: 0.97, y: 4 });
  utils.set(notes, { opacity: 0.45, y: 0 });
  utils.set(chip, { opacity: 0, y: 8 });

  const timeline = createTimeline({ loop: true });

  // Le visiteur arrive avec ses doutes et entre dans "Comprendre".
  activateNote(timeline, notes[0] as HTMLElement, 400);
  timeline.add(
    dot,
    {
      scale: [
        { to: 1.35, duration: 220, ease: "out(2)" },
        { to: 1, duration: 300, ease: "inOut(2)" },
      ],
    },
    600
  );
  timeline.add(dot, { x: -routeWidth, duration: 560, ease: "inOut(2)" }, 1000);
  activateStep(timeline, steps[0] as HTMLElement, dotLayers[0], 1400);

  // Comprendre → Rassurer.
  timeline.add(
    segments[0] as HTMLElement,
    { scaleX: 1, duration: 620, ease: "out(3)" },
    2100
  );
  timeline.add(
    dot,
    { x: -routeWidth / 2, duration: 680, ease: "inOut(2)" },
    2140
  );
  activateNote(timeline, notes[1] as HTMLElement, 2500);
  activateStep(timeline, steps[1] as HTMLElement, dotLayers[1], 2900);

  // Rassurer → Contacter.
  timeline.add(
    segments[1] as HTMLElement,
    { scaleX: 1, duration: 620, ease: "out(3)" },
    3800
  );
  timeline.add(dot, { x: 0, duration: 680, ease: "inOut(2)" }, 3840);
  timeline.add(
    arrow,
    {
      opacity: 1,
      scale: [
        { to: 1.12, duration: 220, ease: "out(3)" },
        { to: 1, duration: 280, ease: "inOut(2)" },
      ],
    },
    4150
  );
  activateNote(timeline, notes[2] as HTMLElement, 4200);
  activateStep(timeline, steps[2] as HTMLElement, dotLayers[2], 4600);

  // Conclusion.
  timeline.add(chip, { opacity: 1, y: 0, duration: 420, ease: "out(4)" }, 5400);

  // Pause lisible (5820 → 8200) puis retour au départ.
  timeline.add(
    steps,
    { opacity: 0.55, scale: 0.97, y: 4, duration: 480, ease: "inOut(2)" },
    8200
  );
  timeline.add(notes, { opacity: 0.45, duration: 420, ease: "inOut(2)" }, 8200);
  timeline.add(segments, { scaleX: 0, duration: 420, ease: "in(2)" }, 8200);
  timeline.add(
    arrow,
    { opacity: 0, scale: 0.82, duration: 300, ease: "in(2)" },
    8200
  );
  timeline.add(chip, { opacity: 0, y: 8, duration: 300, ease: "in(2)" }, 8200);
  timeline.add(dot, { opacity: 0, duration: 260, ease: "in(2)" }, 8250);
  timeline.add(dot, { x: startX, duration: 1 }, 8600);
  timeline.add(dotLayers, { opacity: 0, duration: 1 }, 8600);
  timeline.add(dot, { opacity: 0.95, duration: 240 }, 8700);

  addPlayer(players, timeline);
};
