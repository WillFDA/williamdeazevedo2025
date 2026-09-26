/**
 * Scène « Site internet artisan » : l'isochrone, le territoire dessiné.
 * Le fond de carte (relief, Vilaine, routes, toponymes) et l'atelier ne
 * bougent jamais ; seul le premier plan raconte :
 * 1. l'atelier émet une onde, et la zone d'intervention naît d'un point
 *    pour s'étaler en isochrone « 20 min » (MorphSVG, type rotational) ;
 * 2. les chantiers réalisés se posent au passage du front de la zone ;
 * 3. trois comètes emerald remontent les routes de Pacé, Cesson et Bruz
 *    vers l'atelier (DrawSVG en fenêtre glissante + MotionPath pour la
 *    tête) et déposent chacune un nouveau chantier : la légende passe de
 *    9 à 12 chantiers.
 * Remise à zéro sans « pop » : la zone se replie dans l'atelier (son germe
 * est caché sous le disque) pendant que les marqueurs rentrent. Tout est en
 * unités de viewBox : aucune mesure.
 *
 * Survol et focus clavier : CSS seul (la zone s'agrandit, « 20 min » devient
 * « 30 min »). Une relecture replierait la zone au moment même où elle
 * s'agrandit : la scène garde donc son état final tant que dure le focus.
 */

import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import {
  BUILD_LABEL,
  type BentoScene,
  type BentoSceneContext,
  query,
  queryAll,
} from "./shared";

gsap.registerPlugin(DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin);

/** Durée de la remise à zéro (état final → carte seule). */
const RESET = 0.9;
/** Naissance de la zone (après "build"). */
const ZONE_AT = 0.14;
const ZONE_DURATION = 1.5;
const ZONE_EASE = "power2.out";
/** Comètes : départ de la première, écart entre deux, durée du trajet. */
const COMET_AT = 1.85;
const COMET_GAP = 0.68;
const COMET_DURATION = 1.3;
const COMET_EASE = "power1.inOut";
/** Longueur de la traîne et du noyau, en part du trajet. */
const TRAIL = 0.26;
const CORE = 0.075;
/** Tenue sur l'état final avant la fin du cycle. */
const HOLD = 2.2;

const readNumber = (el: Element, name: string, fallback: number) => {
  const value = Number.parseFloat(el.getAttribute(`data-${name}`) ?? "");
  return Number.isFinite(value) ? value : fallback;
};

/** Temps (0…1) auquel une ease atteint `value` (bissection). */
const easeTime = (ease: gsap.EaseFunction, value: number) => {
  let low = 0;
  let high = 1;
  for (let step = 0; step < 24; step++) {
    const mid = (low + high) / 2;
    if (ease(mid) < value) low = mid;
    else high = mid;
  }
  return (low + high) / 2;
};

const pct = (value: number) => `${Math.round(value * 1000) / 10}%`;

export const createScene = ({ root }: BentoSceneContext): BentoScene | null => {
  const zone = query<SVGPathElement>(root, "[data-artisan-zone]");
  const seed = zone?.dataset.seed;
  // Après un revert, MorphSVG a pu réécrire `d` (arrondi) : on repart de
  // la forme d'origine qu'il a mémorisée.
  const shape = zone?.dataset.original ?? zone?.getAttribute("d");
  const atelier = query<SVGGElement>(root, "[data-artisan-atelier]");
  const pulse = query<SVGCircleElement>(root, "[data-artisan-pulse]");
  const tag = query(root, "[data-artisan-tag]");
  const legend = query(root, "[data-artisan-legend]");
  const count = query(root, "[data-artisan-count]");
  const sites = queryAll<SVGRectElement>(root, "[data-artisan-site]");
  const fresh = queryAll<SVGRectElement>(root, "[data-artisan-new]");
  const pings = queryAll<SVGCircleElement>(root, "[data-artisan-ping]");
  const comets = queryAll<SVGGElement>(root, "[data-artisan-comet]");

  if (
    !(zone && seed && shape && atelier && pulse && tag && legend && count) ||
    !sites.length ||
    comets.length !== fresh.length
  ) {
    return null;
  }

  // La légende finit sur le nombre du HTML statique (12) ; chaque comète
  // y ajoute son chantier, elle part donc de 12 − 3.
  const finalCount = Number.parseInt(count.textContent ?? "", 10);
  if (!Number.isFinite(finalCount)) return null;
  const countFrom = finalCount - fresh.length;
  const share = (site: Element) => readNumber(site, "share", 1);
  const zoneEase = gsap.parseEase(ZONE_EASE);
  const cometEase = gsap.parseEase(COMET_EASE);
  const markers = [...sites, ...fresh];

  const tl = gsap.timeline({ paused: true });

  /* 1. Remise à zéro : la zone se replie dans l'atelier. */
  tl.to([tag, legend], { autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 0);
  // Du bord vers le centre : les marqueurs rentrent avec la zone.
  markers.forEach((marker) => {
    tl.to(
      marker,
      {
        duration: 0.26,
        ease: "power2.in",
        scale: 0,
        transformOrigin: "50% 50%",
      },
      (1 - share(marker)) * 0.36
    );
  });
  // Pas de fondu : le germe finit sous le disque de l'atelier. (Un
  // tl.set(opacity: 1) à "build" mémoriserait 0 comme valeur de départ, et
  // revert() — les sets passent après les tweens — cacherait la zone.)
  tl.to(
    zone,
    {
      duration: 0.8,
      ease: "power2.in",
      morphSVG: { shape: seed, type: "rotational" },
    },
    0.1
  );

  /* 2. État initial : la carte et l'atelier seuls. */
  tl.addLabel(BUILD_LABEL, RESET);
  tl.set(count, { textContent: String(countFrom) }, BUILD_LABEL);
  tl.set(tag, { x: -4 }, BUILD_LABEL);
  tl.set(legend, { y: 4 }, BUILD_LABEL);

  const at = (time: number) => RESET + time;

  // L'atelier se ramasse puis émet une onde : la zone en sort.
  tl.to(
    atelier,
    {
      duration: 0.14,
      ease: "power2.in",
      scale: 0.88,
      transformOrigin: "50% 50%",
    },
    at(0)
  );
  tl.to(atelier, { duration: 0.6, ease: "back.out(3)", scale: 1 }, at(0.14));
  tl.set(pulse, { attr: { r: 11 }, opacity: 0.75 }, at(0.14));
  tl.to(
    pulse,
    { attr: { r: 46 }, duration: 1.3, ease: "power2.out", opacity: 0 },
    at(0.14)
  );

  tl.to(
    zone,
    {
      duration: ZONE_DURATION,
      ease: ZONE_EASE,
      morphSVG: { shape, type: "rotational" },
    },
    at(ZONE_AT)
  );

  // Chaque chantier réalisé apparaît quand le front de la zone le franchit.
  sites.forEach((site) => {
    const reached = easeTime(zoneEase, Math.min(0.98, share(site) + 0.04));
    tl.to(
      site,
      { duration: 0.42, ease: "back.out(3)", scale: 1 },
      at(ZONE_AT + ZONE_DURATION * reached)
    );
  });

  tl.to(
    tag,
    { autoAlpha: 1, duration: 0.45, ease: "power3.out", x: 0 },
    at(ZONE_AT + 0.95)
  );
  tl.to(
    legend,
    { autoAlpha: 1, duration: 0.45, ease: "power3.out", y: 0 },
    at(ZONE_AT + 1.45)
  );

  /* 3. Les comètes remontent les routes et déposent un chantier. */
  let end = 0;
  comets.forEach((comet, index) => {
    const trail = query<SVGPathElement>(comet, "[data-comet-trail]");
    const core = query<SVGPathElement>(comet, "[data-comet-core]");
    const head = query<SVGGElement>(comet, "[data-comet-head]");
    const site = fresh[index];
    const ping = pings[index];
    if (!(trail && core && head && site)) return;

    const headEnd = readNumber(comet, "head-end", 0.93);
    const deposit = readNumber(comet, "deposit", 0.5);
    const start = at(COMET_AT + index * COMET_GAP);
    const arrive = start + COMET_DURATION;
    const drop =
      start + COMET_DURATION * easeTime(cometEase, deposit / headEnd);
    const strokes = [trail, core];

    tl.set(strokes, { drawSVG: "0% 0%" }, BUILD_LABEL);
    tl.set(
      head,
      { scale: 0, transformOrigin: "50% 50%", x: 0, y: 0 },
      BUILD_LABEL
    );
    tl.set(
      site,
      { x: readNumber(site, "from-x", 0), y: readNumber(site, "from-y", 0) },
      BUILD_LABEL
    );

    // Trajet : la tête (MotionPath) et le bord avant des traits avancent
    // ensemble (même durée, même ease : le bord avant vaut headEnd·e(t)).
    tl.set([...strokes, head], { autoAlpha: 1 }, start);
    tl.to(head, { duration: 0.22, ease: "back.out(3)", scale: 1 }, start);
    tl.to(
      head,
      {
        duration: COMET_DURATION,
        ease: COMET_EASE,
        motionPath: { end: headEnd, path: core, start: 0 },
      },
      start
    );
    tl.to(
      trail,
      {
        drawSVG: `${pct(headEnd - TRAIL)} ${pct(headEnd)}`,
        duration: COMET_DURATION,
        ease: COMET_EASE,
      },
      start
    );
    tl.to(
      core,
      {
        drawSVG: `${pct(headEnd - CORE)} ${pct(headEnd)}`,
        duration: COMET_DURATION,
        ease: COMET_EASE,
      },
      start
    );

    // Arrivée : la traîne se résorbe dans l'atelier.
    tl.to(
      strokes,
      {
        drawSVG: `${pct(headEnd)} ${pct(headEnd)}`,
        duration: 0.3,
        ease: "power2.in",
      },
      arrive
    );
    tl.to(head, { duration: 0.24, ease: "power2.in", scale: 0 }, arrive);
    tl.set([...strokes, head], { autoAlpha: 0 }, arrive + 0.3);

    // Dépôt : le chantier se détache de la route, la légende compte.
    tl.to(
      site,
      { duration: 0.5, ease: "back.out(2.2)", scale: 1, x: 0, y: 0 },
      drop
    );
    if (ping) {
      tl.set(ping, { attr: { r: 3 }, autoAlpha: 0.75 }, drop);
      tl.to(
        ping,
        { attr: { r: 13 }, autoAlpha: 0, duration: 0.8, ease: "power2.out" },
        drop
      );
    }
    tl.set(count, { textContent: String(countFrom + index + 1) }, drop + 0.08);
    tl.fromTo(
      count,
      { opacity: 0.25, yPercent: 45 },
      {
        duration: 0.32,
        ease: "power3.out",
        immediateRender: false,
        opacity: 1,
        yPercent: 0,
      },
      drop + 0.08
    );

    end = Math.max(end, arrive + 0.3);
  });

  // Fin du cycle : état final (identique au HTML statique), tenu HOLD s.
  tl.set(count, { textContent: String(finalCount) }, end);
  tl.set({}, {}, end + HOLD);

  // customHover : ni le survol ni le focus clavier ne relancent le cycle
  // (le CSS group-hover / :focus-visible agrandit la zone).
  return { customHover: true, timeline: tl };
};
