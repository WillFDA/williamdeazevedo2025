/**
 * Scène « Création de site vitrine » : la devanture du soir.
 * Récit en six temps, en unités de viewBox (aucune mesure de mise en page,
 * le cadrage responsive est fait en CSS) :
 * 1. 18:30, le rideau métallique se lève (ease « rideau », léger rebond) ;
 * 2. la lumière : la vitrine s'éclaire, le store se déroule, l'enseigne
 *    « votre-nom.fr » s'allume lettre par lettre ;
 * 3. la nuit tombe : le crépuscule s'efface, lune, étoiles, lampadaires,
 *    l'horloge de la puce défile jusqu'à 22:47 ;
 * 4. une enveloppe tombe du ciel le long de la façade et glisse dans la
 *    fente de la porte ;
 * 5. la clochette oscille une fois ;
 * 6. la puce devient « 22:47 · 1 demande ».
 * Remise à zéro sans « pop » : le rideau redescend et masque les changements
 * pendant que le crépuscule revient (le ciel reste toujours « soir »).
 */

import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { CustomWiggle } from "gsap/CustomWiggle";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

import {
  BUILD_LABEL,
  type BentoScene,
  type BentoSceneContext,
  query,
  queryAll,
} from "./shared";

gsap.registerPlugin(CustomEase, CustomWiggle, DrawSVGPlugin);

// Le rideau part vite, dépasse un peu en haut puis se pose.
CustomEase.create(
  "vitrine-rideau",
  "M0,0 C0.3,0 0.24,1.07 0.6,1.035 0.76,1.02 0.86,1 1,1"
);
CustomWiggle.create("vitrine-cloche", { type: "easeOut", wiggles: 3 });

/** Durée de la remise à zéro (état final → 18:30, boutique fermée). */
const RESET = 1.1;
/** Position du rideau levé (seule sa lame basse dépasse), en unités SVG. */
const SHUTTER_UP = -82;
/** Point d'accroche de la clochette (unités SVG, cf. BentoVisualVitrine). */
const BELL_PIVOT = "248 173.75";
/** Couleurs : doivent rester identiques au CSS de BentoVisualVitrine. */
const LIGHT = "#eef3ff";
const LETTER_OFF = "#2744a8";
const LAMP_OFF = "#707a87";
/** Horloge de la puce, en minutes depuis minuit. */
const CLOCK_FROM = 18 * 60 + 30;
const CLOCK_TO = 22 * 60 + 47;

const formatClock = (value: number) => {
  const minutes = Math.round(value);
  const hours = Math.floor(minutes / 60);
  return `${hours}:${String(minutes % 60).padStart(2, "0")}`;
};

/**
 * Points régulièrement espacés (en longueur) le long du tracé de vol,
 * exprimés en décalage par rapport à la position posée de l'enveloppe.
 */
const sampleFlight = (path: SVGPathElement, rest: { x: number; y: number }) => {
  const length = path.getTotalLength();
  const steps = 16;
  const points = Array.from({ length: steps + 1 }, (_, index) =>
    path.getPointAtLength((length * index) / steps)
  );
  return points.map((point, index) => {
    const next = points[Math.min(index + 1, steps)] ?? point;
    const prev = points[Math.max(index - 1, 0)] ?? point;
    const angle =
      (Math.atan2(next.y - prev.y, next.x - prev.x) * 180) / Math.PI;
    // Pente du vol ramenée à ±90° : le bord avant plonge, que l'enveloppe
    // vole vers la gauche ou vers la droite.
    const slope = angle > 90 ? angle - 180 : angle < -90 ? angle + 180 : angle;
    // Légère inclinaison dans le sens du vol, redressée à l'approche.
    const settle = Math.min(1, (steps - index) / 4);
    const tilt = gsap.utils.clamp(-20, 20, slope * 0.35) * settle;
    return { r: tilt, x: point.x - rest.x, y: point.y - rest.y };
  });
};

export const createScene = ({ root }: BentoSceneContext): BentoScene | null => {
  const dusk = query(root, "[data-vitrine-dusk]");
  const moon = query<SVGGElement>(root, "[data-vitrine-moon]");
  const stars = queryAll<SVGCircleElement>(root, "[data-vitrine-star]");
  const lampGlass = query<SVGPathElement>(root, "[data-vitrine-lamp-glass]");
  const lampHalos = queryAll<SVGElement>(root, "[data-vitrine-lamp-halo]");
  const lampPools = queryAll<SVGElement>(root, "[data-vitrine-lamp-pool]");
  const spill = query<SVGGElement>(root, "[data-vitrine-spill]");
  const signGlow = query<SVGEllipseElement>(root, "[data-vitrine-sign-glow]");
  const letters = queryAll<SVGTSpanElement>(root, "[data-vitrine-letter]");
  const lit = queryAll<SVGElement>(root, "[data-vitrine-lit]");
  const hero = queryAll<SVGElement>(root, "[data-vitrine-hero]");
  const bell = query<SVGGElement>(root, "[data-vitrine-bell]");
  const awning = query<SVGGElement>(root, "[data-vitrine-awning]");
  const trail = query<SVGPathElement>(root, "[data-vitrine-trail]");
  const envelope = query<SVGGElement>(root, "[data-vitrine-envelope]");
  const shutter = query<SVGGElement>(root, "[data-vitrine-shutter]");
  const time = query(root, "[data-vitrine-time]");
  const more = query(root, "[data-vitrine-more]");
  const dot = query(root, "[data-vitrine-dot]");

  if (
    !(
      dusk &&
      moon &&
      lampGlass &&
      spill &&
      signGlow &&
      letters.length &&
      bell &&
      awning &&
      trail &&
      envelope &&
      shutter &&
      time &&
      more &&
      dot
    )
  ) {
    return null;
  }

  // Trajectoire de l'enveloppe : le tracé de la traîne, qui tombe du ciel le
  // long du bord droit de la façade et finit juste au-dessus de la fente
  // (12 unités au-dessus de l'enveloppe posée).
  const box = envelope.getBBox();
  if (!box.width) return null;
  const flight = sampleFlight(trail, {
    x: box.x + box.width / 2,
    y: box.y + box.height / 2,
  });
  const [start] = flight;
  if (!start) return null;

  /** Opacité finale d'une étoile ou d'une flaque de lumière : son attribut. */
  const staticOpacity = (_: number, el: Element) =>
    Number(el.getAttribute("opacity") ?? 1);

  const tl = gsap.timeline({ paused: true });

  // --- Remise à zéro : le rideau redescend, le crépuscule revient, 18:30. --
  tl.to(shutter, { duration: 0.75, ease: "power2.inOut", y: 0 }, 0)
    .to(spill, { duration: 0.6, ease: "power1.in", opacity: 0 }, 0.05)
    .to(
      letters,
      {
        duration: 0.25,
        fill: LETTER_OFF,
        stagger: { each: 0.02, from: "end" },
      },
      0
    )
    .to(signGlow, { duration: 0.4, opacity: 0 }, 0)
    .to(
      awning,
      {
        duration: 0.5,
        ease: "power2.in",
        scaleY: 0.12,
        transformOrigin: "50% 0%",
      },
      0.2
    )
    .to(dusk, { duration: RESET, ease: "sine.inOut", opacity: 1 }, 0)
    .to(stars, { duration: 0.5, opacity: 0 }, 0)
    .to(moon, { autoAlpha: 0, duration: 0.8, ease: "power2.in", y: 14 }, 0)
    .to([...lampHalos, ...lampPools], { duration: 0.5, opacity: 0 }, 0.1)
    .to(lampGlass, { duration: 0.5, fill: LAMP_OFF }, 0.1)
    // Derrière le rideau baissé : on éteint et on range sans être vu.
    .set(lit, { opacity: 0 }, 0.8)
    .set(hero, { autoAlpha: 0, y: 5 }, 0.8)
    .set(
      envelope,
      {
        autoAlpha: 0,
        rotation: start.r,
        transformOrigin: "50% 50%",
        x: start.x,
        y: start.y,
      },
      0.8
    )
    .set(trail, { drawSVG: "0% 0%" }, 0.8)
    // Puce : l'heure repasse à 18:30, « 1 demande » se replie.
    .to(time, { autoAlpha: 0, duration: 0.2 }, 0)
    .set(time, { textContent: formatClock(CLOCK_FROM) }, 0.2)
    .to(time, { autoAlpha: 1, duration: 0.3 }, 0.25)
    .fromTo(
      more,
      { gridTemplateColumns: "1fr", opacity: 1 },
      {
        duration: 0.5,
        ease: "power2.inOut",
        gridTemplateColumns: "0fr",
        immediateRender: false,
        opacity: 0,
      },
      0
    )
    .set(dot, { scale: 0 }, 0.5)
    .addLabel(BUILD_LABEL, RESET);

  const at = (offset: number) => RESET + offset;

  // --- 1. Le rideau se lève. -------------------------------------------------
  tl.to(
    shutter,
    { duration: 1.15, ease: "vitrine-rideau", y: SHUTTER_UP },
    at(0.15)
  )
    // --- 2. La lumière : vitrine, store, enseigne. ---------------------------
    .to(lit, { duration: 0.6, ease: "power2.out", opacity: 1 }, at(0.45))
    .to(spill, { duration: 0.8, ease: "power2.out", opacity: 1 }, at(0.55))
    .to(awning, { duration: 0.65, ease: "back.out(1.5)", scaleY: 1 }, at(0.95))
    .to(
      hero,
      {
        autoAlpha: 1,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.08,
        y: 0,
      },
      at(1)
    )
    .to(
      letters,
      {
        duration: 0.3,
        ease: "power1.out",
        fill: LIGHT,
        stagger: 0.035,
      },
      at(1.45)
    )
    .to(signGlow, { duration: 0.6, opacity: 1 }, at(1.85))
    // --- 3. La nuit tombe, l'horloge défile. ---------------------------------
    .to(dusk, { duration: 2.6, ease: "sine.inOut", opacity: 0 }, at(2.2))
    .fromTo(
      time,
      { textContent: CLOCK_FROM },
      {
        duration: 2.5,
        ease: "power1.inOut",
        immediateRender: false,
        modifiers: { textContent: formatClock },
        textContent: CLOCK_TO,
      },
      at(2.2)
    )
    .to(
      moon,
      { autoAlpha: 1, duration: 2.2, ease: "power2.out", y: 0 },
      at(2.4)
    )
    .to(lampGlass, { duration: 0.5, fill: LIGHT }, at(2.7))
    // Les lampadaires s'allument de proche en proche depuis la boutique.
    .to(
      lampHalos,
      {
        duration: 0.7,
        opacity: 1,
        stagger: { each: 0.12, from: "center" },
      },
      at(2.75)
    )
    .to(
      lampPools,
      {
        duration: 0.7,
        opacity: staticOpacity,
        stagger: { each: 0.12, from: "center" },
      },
      at(2.85)
    )
    .to(
      stars,
      {
        duration: 0.8,
        opacity: staticOpacity,
        stagger: 0.14,
      },
      at(2.9)
    );

  // --- 4. L'enveloppe tombe du ciel et glisse dans la fente. -----------------
  const FLIGHT = at(4.85);
  const FLIGHT_DURATION = 0.95;
  const LANDED = FLIGHT + FLIGHT_DURATION;
  // Traîne en opacité seule (jamais visibility: hidden, qui change le rendu
  // de ses voisins dans Chrome : l'état final ne serait plus au pixel près).
  tl.set(trail, { opacity: 1 }, FLIGHT)
    .to(envelope, { autoAlpha: 1, duration: 0.2, ease: "none" }, FLIGHT)
    .to(
      envelope,
      {
        duration: FLIGHT_DURATION,
        ease: "power1.inOut",
        // Le 1er point (0 %) est la position de départ posée par le set.
        keyframes: {
          easeEach: "none",
          rotation: flight.map((point) => point.r),
          x: flight.map((point) => point.x),
          y: flight.map((point) => point.y),
        },
      },
      FLIGHT
    )
    // Traîne courte : la tête suit l'enveloppe, la queue la rattrape. Elle se
    // dissout quand l'enveloppe quitte le ciel pour descendre vers la porte.
    .to(
      trail,
      {
        drawSVG: "72% 100%",
        duration: FLIGHT_DURATION,
        ease: "power1.inOut",
      },
      FLIGHT
    )
    .to(trail, { duration: 0.35, ease: "power1.in", opacity: 0 }, FLIGHT + 0.45)
    .to(envelope, { duration: 0.3, ease: "power2.in", y: 0 }, LANDED)
    // --- 5. La clochette oscille. ------------------------------------------
    .to(
      bell,
      {
        duration: 1.2,
        ease: "vitrine-cloche",
        rotation: 14,
        svgOrigin: BELL_PIVOT,
      },
      LANDED + 0.25
    )
    // --- 6. « 22:47 · 1 demande ». -------------------------------------------
    .fromTo(
      more,
      { gridTemplateColumns: "0fr" },
      {
        duration: 0.65,
        ease: "power2.out",
        gridTemplateColumns: "1fr",
        immediateRender: false,
      },
      LANDED + 0.4
    )
    .fromTo(
      more,
      { opacity: 0 },
      {
        duration: 0.25,
        ease: "power1.out",
        immediateRender: false,
        opacity: 1,
      },
      LANDED + 0.4
    )
    // Le point emerald éclot pendant que la puce s'ouvre.
    .to(dot, { duration: 0.45, ease: "back.out(3)", scale: 1 }, LANDED + 0.42)
    // Tenue sur l'état final (identique au HTML statique).
    .to({}, { duration: 2.1 }, LANDED + 1.45);

  return { timeline: tl };
};
