/**
 * Scène « Site internet professionnel » : le socle, en vue éclatée
 * isométrique. Le socle sombre (base technique) ne quitte jamais la scène ;
 * les trois plaques tombent dessus une à une, avec rebond et squash & stretch
 * (CustomBounce), et chaque impact se propage vers le bas :
 * 1. Services tombe, ses cubes sautillent ;
 * 2. Preuves tombe, les cinq étoiles s'allument une à une ;
 * 3. Pages clés tombe (temps fort) : le bouton de contact émet deux ondes,
 *    une impulsion court dans les pistes du socle jusqu'à la LED, qui
 *    s'allume franchement (et le point « en ligne » du libellé avec elle) ;
 * 4. les lignes de rappel se tracent de bas en haut, les libellés suivent ;
 * 5. tenue : les plaques flottent légèrement, la LED respire.
 * Remise à zéro sans « pop » : libellés éteints, rappels rentrés, puis les
 * plaques décollent dans l'ordre inverse (Pages clés d'abord) et ne
 * s'effacent qu'une fois dégagées de la pile. Cycle ≈ 8,8 s.
 * Tout est en unités de viewBox : aucune mesure du DOM (pas de needsMeasure).
 */

import { gsap } from "gsap";
import { CustomBounce } from "gsap/CustomBounce";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

import {
  BUILD_LABEL,
  type BentoScene,
  type BentoSceneContext,
  query,
  queryAll,
} from "./shared";

gsap.registerPlugin(CustomEase, CustomBounce, DrawSVGPlugin);

// Chute qui rebondit, et l'écrasement synchronisé sur chaque contact.
CustomBounce.create("pro-bounce", {
  squash: 2,
  squashID: "pro-squash",
  strength: 0.3,
});

/** Durée de la remise à zéro (état final → socle seul). */
const RESET = 0.95;
/** Décollage d'une plaque, et fondu final (une fois dégagée de la pile). */
const LIFT_OFF = 0.5;
const LIFT_FADE = 0.16;
/** Durée d'une chute. */
const DROP = 0.7;
/** Départ des chutes (Services, Preuves, Pages clés) après "build". */
const DROP_AT = [0.2, 0.65, 1.1] as const;
/** Hauteur de chute, en unités SVG. */
const FALL = 64;
/** Amplitude du contrecoup des étages inférieurs, du plus proche au socle. */
const THUD = [2.2, 1.6, 1.1];
/** Ondes du bouton de contact (l'état final = RING_TO, invisible). */
const RING_FROM = { rx: 16, ry: 8 };
const RING_TO = { rx: 64, ry: 32 };
/** Couleurs : doivent rester identiques au SVG de BentoVisualProfessional. */
const STAR_ON = "#3e60d4";
const STAR_OFF = "#d9dee6";
/** Rayon des pastilles d'accroche des lignes de rappel (cf. SVG). */
const PIN_R = 1.7;
/** Opacité de repos des pistes et du halo de la LED (cf. SVG). */
const TRACES_IDLE = 0.6;
const HALO_IDLE = 0.75;

/** Premier contact de la chute (part de la durée où l'ease atteint 1). */
const firstContact = () => {
  const ease = gsap.parseEase("pro-bounce");
  for (let step = 0; step <= 1000; step++) {
    if (ease(step / 1000) >= 0.999) return step / 1000;
  }
  return 0.6;
};

export const createScene = ({ root }: BentoSceneContext): BentoScene | null => {
  const floors = queryAll<SVGGElement>(root, "[data-pro-floor]");
  const shades = queryAll<SVGGElement>(root, "[data-pro-shade]");
  const traces = query<SVGGElement>(root, "[data-pro-traces]");
  const halo = query<SVGCircleElement>(root, "[data-pro-led-halo]");
  const cubes = queryAll<SVGGElement>(root, "[data-pro-cube]");
  const stars = queryAll<SVGPathElement>(root, "[data-pro-star]");
  const rings = queryAll<SVGEllipseElement>(root, "[data-pro-ring]");
  const pulses = queryAll<SVGPathElement>(root, "[data-pro-pulse]");
  const leaders = queryAll<SVGPathElement>(root, "[data-pro-leader]");
  const pins = queryAll<SVGCircleElement>(root, "[data-pro-pin]");
  const labels = queryAll(root, "[data-pro-label]");
  const dot = query(root, "[data-pro-dot]");

  const [base, ...plates] = floors;
  if (
    !(
      base &&
      plates.length === 3 &&
      shades.length === 3 &&
      traces &&
      halo &&
      cubes.length &&
      stars.length &&
      rings.length &&
      pulses.length &&
      leaders.length === 4 &&
      pins.length === 3 &&
      labels.length === 3 &&
      dot
    )
  ) {
    return null;
  }

  const plateLeaders = leaders.slice(1);
  const impact = firstContact() * DROP;
  /** Point d'appui de l'écrasement : milieu de l'arête basse avant. */
  const originOf = (el: SVGElement) => el.dataset.proOrigin ?? "";

  const tl = gsap.timeline({ paused: true });

  // --- Remise à zéro : on éteint, on rentre les rappels, les plaques s'en vont.
  tl.to(
    labels.toReversed(),
    {
      autoAlpha: 0,
      duration: 0.24,
      ease: "power2.in",
      stagger: 0.05,
      x: -6,
    },
    0
  )
    .to(
      plateLeaders.toReversed(),
      {
        drawSVG: "0% 0%",
        duration: 0.28,
        ease: "power2.in",
        stagger: 0.05,
      },
      0.04
    )
    .to(
      pins.toReversed(),
      {
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.in",
        stagger: 0.05,
      },
      0.22
    )
    // Un trait de longueur nulle garde une pastille (bouts ronds) : on le masque.
    .set(plateLeaders, { autoAlpha: 0 }, 0.44);

  // Le fondu n'arrive qu'en fin de montée : une plaque translucide encore
  // posée sur le socle sombre y dessinerait un losange gris.
  plates.toReversed().forEach((plate, index) => {
    const at = 0.18 + index * 0.09;
    const shade = shades[plates.length - 1 - index];
    tl.to(plate, { duration: LIFT_OFF, ease: "back.in(1.4)", y: -FALL }, at)
      .to(
        plate,
        { autoAlpha: 0, duration: LIFT_FADE, ease: "power1.in" },
        at + LIFT_OFF - LIFT_FADE
      )
      .to(shade ?? [], { duration: 0.3, ease: "power1.in", opacity: 0 }, at);
  });

  // --- État initial : le socle seul, allumé. -------------------------------
  // Un set() est annulé en dernier par revert() (après les tweens datés) :
  // on le réserve aux propriétés qu'aucun tween antérieur n'a touchées, et on
  // passe par fromTo() pour les autres.
  tl.addLabel(BUILD_LABEL, RESET).set(stars, { fill: STAR_OFF }, RESET);

  const at = (offset: number) => RESET + offset;

  /** Éclat bref puis retour au repos (opacité). */
  const flash = (
    target: Element,
    idle: number,
    time: number,
    settle: number
  ) => {
    tl.to(
      target,
      {
        keyframes: [
          { duration: 0.08, ease: "power1.out", opacity: 1 },
          { duration: settle, ease: "power1.inOut", opacity: idle },
        ],
      },
      time
    );
  };

  // --- 1 à 3. Les chutes, et l'onde d'impact vers le bas. --------------------
  plates.forEach((plate, index) => {
    const start = at(DROP_AT[index] ?? 0);
    const contact = start + impact;
    const shade = shades[index];

    tl.to(plate, { autoAlpha: 1, duration: 0.14, ease: "none" }, start)
      .fromTo(
        plate,
        { y: -FALL },
        { duration: DROP, ease: "pro-bounce", immediateRender: false, y: 0 },
        start
      )
      .to(
        plate,
        {
          duration: DROP,
          ease: "pro-squash",
          scaleX: 1.06,
          scaleY: 0.92,
          svgOrigin: originOf(plate),
        },
        start
      )
      // L'ombre se précise à mesure que la plaque approche.
      .to(
        shade ?? [],
        { duration: impact, ease: "power2.in", opacity: 1 },
        start
      );

    // Contrecoup : les étages du dessous encaissent, du plus proche au socle.
    const below = plates.slice(0, index).toReversed().concat(base);
    below.forEach((floor, depth) => {
      const amplitude = THUD[depth] ?? 1;
      tl.to(
        floor,
        {
          keyframes: [
            { duration: 0.09, ease: "power2.out", y: amplitude },
            { duration: 0.18, ease: "power2.inOut", y: 0 },
          ],
        },
        contact + depth * 0.04
      );
    });

    // L'énergie descend dans les fondations : les pistes flashent.
    const reach = contact + (below.length - 1) * 0.04;
    flash(traces, TRACES_IDLE, reach, 0.4);
    // La LED répond aux deux premiers impacts (éclat bref : il doit être
    // retombé avant le suivant) ; au dernier, elle attend l'impulsion qui
    // court dans les pistes (voir plus bas).
    if (index < plates.length - 1) flash(halo, HALO_IDLE, reach, 0.36);
  });

  const [servicesAt, proofsAt, pagesAt] = DROP_AT.map(
    (offset) => at(offset) + impact
  ) as [number, number, number];

  // Services : les cubes, emportés par l'inertie, sautillent à l'impact.
  cubes.forEach((cube, index) => {
    tl.to(
      cube,
      {
        keyframes: [
          { duration: 0.14, ease: "power2.out", y: -4 },
          { duration: 0.22, ease: "power2.in", y: 0 },
        ],
      },
      servicesAt + 0.02 + index * 0.035
    );
  });

  // Preuves : les étoiles s'allument une à une.
  stars.forEach((star, index) => {
    const start = proofsAt + 0.12 + index * 0.08;
    tl.to(
      star,
      { duration: 0.16, ease: "power1.out", fill: STAR_ON },
      start
    ).to(
      star,
      {
        keyframes: [
          { duration: 0.12, ease: "power2.out", scale: 1.4 },
          { duration: 0.28, ease: "back.out(2.4)", scale: 1 },
        ],
        svgOrigin: star.dataset.origin ?? "",
      },
      start
    );
  });

  // Pages clés : le bouton de contact émet deux ondes.
  rings.forEach((ring, index) => {
    const start = pagesAt + 0.04 + index * 0.24;
    tl.fromTo(
      ring,
      { attr: RING_FROM },
      {
        attr: RING_TO,
        duration: 1,
        ease: "power2.out",
        immediateRender: false,
      },
      start
    ).fromTo(
      ring,
      { opacity: 0.85 },
      { duration: 1, ease: "power1.in", immediateRender: false, opacity: 0 },
      start
    );
  });

  // Le socle s'illumine : une impulsion court de la puce vers les bords et
  // la LED, qui s'allume franchement à son arrivée.
  const PULSE = pagesAt + 0.1;
  const PULSE_RUN = 0.6;
  tl.set(pulses, { autoAlpha: 1, drawSVG: "0% 0%" }, PULSE)
    .to(
      pulses,
      {
        drawSVG: "78% 100%",
        duration: PULSE_RUN,
        ease: "power1.inOut",
        stagger: 0.03,
      },
      PULSE
    )
    .to(
      pulses,
      { autoAlpha: 0, duration: 0.18, ease: "power1.in", stagger: 0.03 },
      PULSE + PULSE_RUN - 0.12
    );
  const ONLINE = PULSE + PULSE_RUN + 0.1;
  const ONLINE_SETTLE = 0.7;
  flash(halo, HALO_IDLE, ONLINE, ONLINE_SETTLE);
  // Le point « en ligne » du libellé répond à la LED.
  tl.to(
    dot,
    {
      keyframes: [
        { duration: 0.12, ease: "power2.out", scale: 1.7 },
        { duration: 0.45, ease: "back.out(2)", scale: 1 },
      ],
    },
    ONLINE
  );

  // --- 4. Lignes de rappel (bas → haut), puis libellés. ----------------------
  const LEADERS = at(1.9);
  plateLeaders.forEach((leader, index) => {
    const start = LEADERS + index * 0.1;
    const label = labels[index];
    const pin = pins[index];
    tl.fromTo(
      pin ?? [],
      { attr: { r: 0 }, autoAlpha: 0 },
      {
        attr: { r: PIN_R },
        autoAlpha: 1,
        duration: 0.3,
        ease: "back.out(3)",
        immediateRender: false,
      },
      start - 0.04
    )
      .fromTo(
        leader,
        { autoAlpha: 1, drawSVG: "0% 0%" },
        {
          autoAlpha: 1,
          drawSVG: "0% 100%",
          duration: 0.32,
          ease: "power2.out",
          immediateRender: false,
        },
        start
      )
      .fromTo(
        label ?? [],
        { autoAlpha: 0, x: -6 },
        {
          autoAlpha: 1,
          duration: 0.3,
          ease: "power3.out",
          immediateRender: false,
          x: 0,
        },
        start + 0.14
      );
  });

  // --- 5. Tenue : les plaques flottent, la LED respire. ----------------------
  const HOLD = at(2.75);
  const FLOAT = 1.15;
  plates.forEach((plate, index) => {
    tl.to(
      plate,
      {
        keyframes: [-1.5, 0, -1.5, 0].map((y) => ({
          duration: FLOAT,
          ease: "sine.inOut",
          y,
        })),
      },
      HOLD + index * 0.2
    );
  });
  // La respiration part une fois l'éclat « en ligne » retombé (jamais deux
  // tweens d'opacité en même temps sur le halo).
  tl.to(
    halo,
    {
      keyframes: [0.4, HALO_IDLE, 0.4, HALO_IDLE].map((opacity) => ({
        duration: 1.2,
        ease: "sine.inOut",
        opacity,
      })),
    },
    ONLINE + 0.08 + ONLINE_SETTLE
  );

  return { timeline: tl };
};
