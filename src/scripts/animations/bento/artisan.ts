/**
 * Scène "Site internet artisan" — la carte locale : le pin de l'artisan se
 * plante sur le quartier, sa fiche s'ouvre, la zone d'intervention se
 * dessine, les maisons s'allument puis envoient leurs demandes de devis
 * vers le pin (toast, puis compteur "2 demandes"). Cycle ~9 s avec pause
 * lisible sur la carte pleine. Trajets maison → pin mesurés au chargement.
 */

import { createTimeline, type Timeline, utils } from "animejs";

import {
  addPlayer,
  type BentoPlayer,
  centerDelta,
  query,
  queryAll,
} from "./shared";

type Delta = { x: number; y: number };

type ArtisanScene = {
  badges: HTMLElement[];
  counter: HTMLElement | null;
  fiche: HTMLElement | null;
  pin: HTMLElement;
  pinShadow: HTMLElement | null;
  radius: HTMLElement;
  requests: HTMLElement[];
  rings: HTMLElement[];
  toast: HTMLElement;
};

const setInitialState = (scene: ArtisanScene) => {
  utils.set(scene.radius, { opacity: 0, scale: 0.3 });
  utils.set(scene.pin, { opacity: 0, y: -70 });
  if (scene.pinShadow) utils.set(scene.pinShadow, { opacity: 0, scale: 0.4 });
  if (scene.fiche) utils.set(scene.fiche, { opacity: 0, scale: 0.92, y: 6 });
  utils.set(scene.badges, { opacity: 0, scale: 0.5 });
  if (scene.rings.length) utils.set(scene.rings, { opacity: 0, scale: 1 });
  utils.set(scene.requests, { opacity: 0 });
  utils.set(scene.toast, { opacity: 0, scale: 0.96, y: -6 });
  if (scene.counter) {
    utils.set(scene.counter, { opacity: 0, scale: 0.92, y: 6 });
  }
};

// Le pin se plante, la fiche s'ouvre, la zone d'intervention se pose.
const addArrivalPhase = (timeline: Timeline, scene: ArtisanScene) => {
  timeline.add(scene.pin, { opacity: 1, duration: 200 }, 300);
  timeline.add(scene.pin, { y: 0, duration: 520, ease: "out(3)" }, 300);
  timeline.add(
    scene.pin,
    {
      scale: [
        { to: 0.94, duration: 120, ease: "out(2)" },
        { to: 1, duration: 240, ease: "inOut(2)" },
      ],
    },
    820
  );
  if (scene.pinShadow) {
    timeline.add(
      scene.pinShadow,
      { opacity: 0.45, scale: 1, duration: 260, ease: "out(2)" },
      820
    );
  }
  if (scene.fiche) {
    timeline.add(
      scene.fiche,
      { opacity: 1, scale: 1, y: 0, duration: 380, ease: "out(4)" },
      1200
    );
  }
  timeline.add(
    scene.radius,
    { opacity: 1, scale: 1, duration: 680, ease: "out(3)" },
    1800
  );
};

// Les maisons du quartier s'allument une à une.
const addHousesPhase = (timeline: Timeline, scene: ArtisanScene) => {
  scene.badges.forEach((badge, index) => {
    const at = 2650 + index * 330;
    timeline.add(badge, { opacity: 1, duration: 160 }, at);
    timeline.add(
      badge,
      {
        scale: [
          { to: 1.35, duration: 180, ease: "out(2)" },
          { to: 1, duration: 220, ease: "inOut(2)" },
        ],
      },
      at
    );
    const ring = scene.rings[index];
    if (ring) {
      timeline.add(
        ring,
        {
          opacity: [
            { to: 0.55, duration: 120, ease: "out(2)" },
            { to: 0, duration: 520, ease: "out(2)" },
          ],
          scale: { to: 2.3, duration: 640, ease: "out(2)" },
        },
        at + 80
      );
    }
  });
};

const pinReact = (timeline: Timeline, pin: HTMLElement, at: number) => {
  timeline.add(
    pin,
    {
      scale: [
        { to: 1.09, duration: 140, ease: "out(3)" },
        { to: 1, duration: 220, ease: "inOut(2)" },
      ],
      y: [
        { to: -3, duration: 140, ease: "out(2)" },
        { to: 0, duration: 200, ease: "inOut(2)" },
      ],
    },
    at
  );
};

const requestFlight = (
  timeline: Timeline,
  request: HTMLElement,
  delta: Delta,
  at: number
) => {
  timeline.add(request, { opacity: 1, duration: 140 }, at);
  timeline.add(
    request,
    {
      x: { to: delta.x, duration: 620, ease: "inOut(2)" },
      y: [
        { to: delta.y * 0.45 - 16, duration: 300, ease: "out(2)" },
        { to: delta.y, duration: 320, ease: "in(1.7)" },
      ],
    },
    at + 40
  );
  timeline.add(request, { opacity: 0, duration: 140 }, at + 610);
};

// Deux demandes voyagent vers le pin : toast, puis compteur "2 demandes".
const addRequestsPhase = (
  timeline: Timeline,
  scene: ArtisanScene,
  deltas: Delta[]
) => {
  const firstRequest = scene.requests[0];
  const firstDelta = deltas[0];
  if (firstRequest && firstDelta) {
    requestFlight(timeline, firstRequest, firstDelta, 3950);
    pinReact(timeline, scene.pin, 4630);
  }
  timeline.add(
    scene.toast,
    { opacity: 1, scale: 1, y: 0, duration: 420, ease: "out(4)" },
    4750
  );

  const secondRequest = scene.requests[1];
  const secondDelta = deltas[1];
  if (!(secondRequest && secondDelta)) return;
  requestFlight(timeline, secondRequest, secondDelta, 5450);
  pinReact(timeline, scene.pin, 6130);
  timeline.add(
    scene.toast,
    {
      scale: [
        { to: 1.05, duration: 140, ease: "out(2)" },
        { to: 1, duration: 200, ease: "inOut(2)" },
      ],
    },
    6170
  );
  if (scene.counter) {
    timeline.add(
      scene.counter,
      { opacity: 1, scale: 1, y: 0, duration: 380, ease: "out(4)" },
      6350
    );
  }
};

// Pause lisible (6750 → 8300) puis fondu de reset.
const addResetPhase = (timeline: Timeline, scene: ArtisanScene) => {
  timeline.add(
    scene.toast,
    { opacity: 0, scale: 0.96, y: -6, duration: 260, ease: "in(2)" },
    8300
  );
  if (scene.counter) {
    timeline.add(
      scene.counter,
      { opacity: 0, scale: 0.92, y: 6, duration: 260, ease: "in(2)" },
      8300
    );
  }
  if (scene.fiche) {
    timeline.add(
      scene.fiche,
      { opacity: 0, scale: 0.92, y: 6, duration: 280, ease: "in(2)" },
      8340
    );
  }
  timeline.add(
    scene.badges,
    { opacity: 0, scale: 0.5, duration: 260, ease: "in(2)" },
    8380
  );
  timeline.add(
    scene.radius,
    { opacity: 0, duration: 300, ease: "in(2)" },
    8440
  );
  if (scene.pinShadow) {
    timeline.add(scene.pinShadow, { opacity: 0, duration: 200 }, 8560);
  }
  timeline.add(scene.pin, { opacity: 0, duration: 240, ease: "in(2)" }, 8580);
  timeline.add(scene.pin, { y: -70, duration: 1 }, 8860);
  timeline.add(scene.radius, { scale: 0.3, duration: 1 }, 8860);
  if (scene.rings.length) {
    timeline.add(scene.rings, { scale: 1, duration: 1 }, 8860);
  }
  timeline.add(scene.requests, { x: 0, y: 0, duration: 1 }, 8860);
};

export const animateArtisan = (root: HTMLElement, players: BentoPlayer[]) => {
  const radius = query(root, "[data-bento-artisan-radius]");
  const pin = query(root, "[data-bento-artisan-pin]");
  const toast = query(root, "[data-bento-artisan-toast]");
  const badges = queryAll(root, "[data-bento-artisan-house-badge]");
  const requests = queryAll(root, "[data-bento-artisan-request]");

  if (!(pin && radius && toast && badges.length && requests.length)) return;

  const scene: ArtisanScene = {
    badges,
    counter: query(root, "[data-bento-artisan-counter]"),
    fiche: query(root, "[data-bento-artisan-fiche]"),
    pin,
    pinShadow: query(root, "[data-bento-artisan-pin-shadow]"),
    radius,
    requests,
    rings: queryAll(root, "[data-bento-artisan-house-ring]"),
    toast,
  };

  // Remise à zéro avant mesure (utile lors d'un re-init après resize),
  // puis mesure des trajets maison → pin.
  utils.set([pin, ...requests], { scale: 1, x: 0, y: 0 });
  const deltas = requests.map((request) => centerDelta(pin, request));

  setInitialState(scene);

  const timeline = createTimeline({ loop: true });

  addArrivalPhase(timeline, scene);
  addHousesPhase(timeline, scene);
  addRequestsPhase(timeline, scene, deltas);
  addResetPhase(timeline, scene);

  addPlayer(players, timeline);
};
