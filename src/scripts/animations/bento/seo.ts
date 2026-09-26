/**
 * Scène « SEO & mise en ligne » : la loupe.
 * Double calque synchronisé : la loupe se déplace de p, la copie grossie du
 * champ (dans le verre) de −ZOOM × p ; deux tweens jumeaux (MotionPath,
 * mêmes durées et eases) gardent les calques alignés à tout instant, sans
 * onUpdate : l'état est entièrement reproductible par seek.
 *
 * Cycle (~7,9 s) :
 * 0. remise à zéro : la loupe se soulève, « Vous » s'éteint, elle repart à
 *    gauche (label "build") ;
 * 1. elle glisse vers « Serrurier » et fait « non » ;
 * 2. elle hésite sur « Électricien » ;
 * 3. approche franche (power3.out) vers « Vous » : elle se pose, halo ;
 * 4. trouvé : nom bleu, souligné, métadonnées sous le nom, champ estompé.
 *
 * Survol (desktop) : la loupe suit le pointeur, s'aimante sur « Vous » et
 * rejoue « trouvé » ; au départ du pointeur, elle revient sur sa cible et
 * la timeline se pose sur son état final.
 */

import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { CustomWiggle } from "gsap/CustomWiggle";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import {
  SEO_NAME,
  SEO_STAGE,
  SEO_STOPS,
  type SeoPoint,
  seoCopyOffset,
} from "./seo-geometry";
import {
  BUILD_LABEL,
  type BentoScene,
  type BentoSceneContext,
  query,
  queryAll,
  scaleOf,
  toLocalPoint,
} from "./shared";

gsap.registerPlugin(CustomEase, CustomWiggle, MotionPathPlugin);

// Le « non » de la loupe : trois allers-retours qui s'amortissent.
CustomWiggle.create("seo-non", { type: "easeOut", wiggles: 3 });

/** Couleurs : identiques au CSS de BentoVisualSeo (état final = statique). */
const NAME_OFF = "#bcc4cf"; // gray-300, comme le reste du champ
const TWIN_OFF = "#9ba4b1"; // gray-400, comme le reste de la copie grossie
const NAME_ON = "#3152c7"; // blue-600
const FIELD_DIM = 0.6;
/** Loupe soulevée pendant la recherche. */
const LIFTED = 1.04;

/** Durée de la remise à zéro (état final → loupe au départ). */
const RESET = 0.9;
/** Arrivée sur « Vous » (secondes après "build"). */
const LAND = 3.15;
/** Durée de l'appui juste avant la pose. */
const LAND_PRESS = 0.12;
/** Fin du cycle (après "build") : tenue ≥ 2,5 s sur l'état final. */
const END = 7;

/** Aimant du survol : prise et lâcher (px de scène, autour du nom). */
const MAGNET_IN = 24;
const MAGNET_OUT = 40;
/** Suivi du pointeur. */
const FOLLOW = { duration: 0.5, ease: "power3.out" };

const PART_NAMES = [
  "stage",
  "field",
  "lens",
  "hover",
  "body",
  "halo",
  "lift",
  "copy",
  "name",
  "twin",
  "meta",
] as const;

type Parts = Record<(typeof PART_NAMES)[number], HTMLElement> & {
  underlines: HTMLElement[];
};

const getParts = (root: HTMLElement): Parts | null => {
  const parts: Partial<Parts> = {
    underlines: queryAll(root, "[data-seo-underline]"),
  };
  for (const key of PART_NAMES) {
    const el = query(root, `[data-seo-${key}]`);
    if (!el) return null;
    parts[key] = el;
  }
  return parts.underlines?.length ? (parts as Parts) : null;
};

type Travel = {
  duration: number;
  ease: string;
  points: SeoPoint[];
};

/** Déplacement jumeau : la loupe suit le tracé, la copie son inverse. */
const travel = (
  tl: gsap.core.Timeline,
  { copy, lens }: Parts,
  { duration, ease, points }: Travel,
  position: number
) => {
  const motion = (path: SeoPoint[]) => ({
    duration,
    ease,
    motionPath: { curviness: 1, fromCurrent: false, path },
  });
  tl.to(lens, motion(points), position).to(
    copy,
    motion(points.map(seoCopyOffset)),
    position
  );
};

/** Le « non » : la loupe oscille de ±5 px, la copie compense. */
const shake = (
  tl: gsap.core.Timeline,
  { copy, lens }: Parts,
  at: SeoPoint,
  position: number
) => {
  const vars = { duration: 0.6, ease: "seo-non" };
  tl.fromTo(lens, { x: at.x }, { ...vars, x: at.x + 5 }, position).fromTo(
    copy,
    { x: seoCopyOffset(at).x },
    { ...vars, x: seoCopyOffset({ ...at, x: at.x + 5 }).x },
    position
  );
};

type FoundState = {
  field: number;
  line: number;
  meta: number;
  metaY: number;
  name: string;
  twin: string;
};

const FOUND_OFF: FoundState = {
  field: 1,
  line: 0,
  meta: 0,
  metaY: 3,
  name: NAME_OFF,
  twin: TWIN_OFF,
};
const FOUND_ON: FoundState = {
  field: FIELD_DIM,
  line: 1,
  meta: 1,
  metaY: 0,
  name: NAME_ON,
  twin: NAME_ON,
};

/** Tempo de l'allumage (in) et de l'extinction (out) de « trouvé ». */
const FOUND_TEMPO = {
  in: {
    ease: "power2.out",
    field: 0.6,
    line: { at: 0.1, duration: 0.5, ease: "power3.out" },
    meta: { at: 0.22, duration: 0.45 },
    origin: "0% 50%",
  },
  out: {
    ease: "power2.in",
    field: 0.45,
    line: { at: 0, duration: 0.3, ease: "power2.in" },
    meta: { at: 0, duration: 0.25 },
    origin: "100% 50%",
  },
};

/**
 * « Trouvé » : nom bleu et souligné, métadonnées, champ estompé.
 * `on` = allumage, sinon extinction. Toujours en fromTo : l'état ne dépend
 * jamais du DOM au moment du rendu (le survol a pu le modifier).
 */
const found = (
  tl: gsap.core.Timeline,
  { field, meta, name, twin, underlines }: Parts,
  on: boolean,
  at: number
) => {
  const [from, to] = on ? [FOUND_OFF, FOUND_ON] : [FOUND_ON, FOUND_OFF];
  const tempo = on ? FOUND_TEMPO.in : FOUND_TEMPO.out;
  const { ease, origin } = tempo;
  tl.fromTo(
    name,
    { color: from.name },
    { color: to.name, duration: 0.35, ease },
    at
  )
    .fromTo(
      twin,
      { color: from.twin },
      { color: to.twin, duration: 0.35, ease },
      at
    )
    .fromTo(
      underlines,
      { scaleX: from.line, transformOrigin: origin },
      {
        duration: tempo.line.duration,
        ease: tempo.line.ease,
        scaleX: to.line,
        transformOrigin: origin,
      },
      at + tempo.line.at
    )
    .fromTo(
      meta,
      { autoAlpha: from.meta, y: from.metaY },
      { autoAlpha: to.meta, duration: tempo.meta.duration, ease, y: to.metaY },
      at + tempo.meta.at
    )
    .fromTo(
      field,
      { opacity: from.field },
      { duration: tempo.field, ease: "power1.inOut", opacity: to.field },
      at
    );
};

/** Part de « trouvé » visible à l'instant `time` de la timeline principale. */
const foundAt = (time: number) => {
  if (time <= 0 || time >= RESET + LAND + 0.7) return 1;
  if (time < RESET) return gsap.utils.clamp(0, 1, 1 - time / 0.35);
  return gsap.utils.clamp(0, 1, (time - RESET - LAND) / 0.6);
};

/**
 * Survol : la loupe suit le pointeur (quickTo), s'aimante sur « Vous » et
 * rejoue « trouvé » (timeline indépendante, jamais imbriquée) ; au départ,
 * elle revient sur sa cible puis la timeline principale reprend la main.
 */
const setupHover = (
  ctx: BentoSceneContext,
  tl: gsap.core.Timeline,
  parts: Parts
) => {
  const { body, copy, halo, hover, lens, lift, stage } = parts;
  const { card } = ctx;
  if (!card) return;

  const { rest } = SEO_STOPS;
  const lensX = gsap.quickTo(lens, "x", FOLLOW);
  const lensY = gsap.quickTo(lens, "y", FOLLOW);
  const copyX = gsap.quickTo(copy, "x", FOLLOW);
  const copyY = gsap.quickTo(copy, "y", FOLLOW);
  const soft = { duration: 0.35, ease: "power2.out" };
  // « scale » est un raccourci : quickTo exige scaleX et scaleY séparés.
  const hoverScaleX = gsap.quickTo(hover, "scaleX", soft);
  const hoverScaleY = gsap.quickTo(hover, "scaleY", soft);
  const liftOpacity = gsap.quickTo(lift, "opacity", soft);
  const followers = [
    lensX,
    lensY,
    copyX,
    copyY,
    hoverScaleX,
    hoverScaleY,
    liftOpacity,
  ];

  const foundTl = gsap.timeline({
    defaults: { immediateRender: false },
    paused: true,
  });
  found(foundTl, parts, true, 0);

  // Les tweens créés plus tard (dans les écouteurs) rejoignent ce contexte,
  // lui-même rattaché à celui de la scène : tout est annulé au revert.
  const scope = gsap.context(() => {});

  /** Pointeur au-dessus de la carte. */
  let active = false;
  /** La scène pilote la loupe (de la prise de main jusqu'au release). */
  let manual = false;
  let fresh = true;
  let magnet = false;
  let pointer: { x: number; y: number } | null = null;
  let settle: gsap.core.Tween | null = null;

  // Toujours relancé (sans effet s'il est déjà au bout) : à la reprise,
  // « trouvé » peut être à mi-course.
  const setFound = (on: boolean) => {
    if (on) foundTl.play();
    else foundTl.reverse();
  };

  const moveTo = (point: SeoPoint, magnetized: boolean) => {
    const twin = seoCopyOffset(point);
    const values: Array<[gsap.QuickToFunc, number, HTMLElement, string]> = [
      [lensX, point.x, lens, "x"],
      [lensY, point.y, lens, "y"],
      [copyX, twin.x, copy, "x"],
      [copyY, twin.y, copy, "y"],
      [hoverScaleX, magnetized ? 1 : 1.03, hover, "scaleX"],
      [hoverScaleY, magnetized ? 1 : 1.03, hover, "scaleY"],
      [liftOpacity, magnetized ? 0 : 1, lift, "opacity"],
    ];
    for (const [to, value, el, prop] of values) {
      // Premier appel : on repart de la valeur réelle (la timeline a pu
      // déplacer la loupe depuis le dernier survol).
      if (fresh) to(value, Number(gsap.getProperty(el, prop)));
      else to(value);
    }
    fresh = false;
    setFound(magnetized);
  };

  const track = () => {
    if (!(active && pointer)) return;
    // La lecture automatique a pu reprendre (entrée dans le viewport).
    if (tl.isActive()) {
      ctx.takeOver();
      fresh = true;
    }

    const rect = ctx.root.getBoundingClientRect();
    const inside =
      pointer.x >= rect.left &&
      pointer.x <= rect.right &&
      pointer.y >= rect.top &&
      pointer.y <= rect.bottom;
    if (!inside) {
      // Pointeur sur le texte de la carte : la loupe reste sur « Vous ».
      magnet = true;
      moveTo(rest, true);
      return;
    }

    const scale = scaleOf(stage);
    const local = toLocalPoint(stage, pointer.x, pointer.y);
    const halfW = Math.min(rect.width / scale / 2 - 24, 250);
    const halfH = rect.height / scale / 2 - 20;
    const point = {
      x: gsap.utils.clamp(-halfW, halfW, local.x - SEO_STAGE.width / 2),
      y: gsap.utils.clamp(-halfH, halfH, local.y - SEO_STAGE.height / 2),
    };
    const distance = Math.hypot(point.x - SEO_NAME.x, point.y - SEO_NAME.y);
    magnet = distance < (magnet ? MAGNET_OUT : MAGNET_IN);
    moveTo(magnet ? rest : point, magnet);
  };

  const readPointer = (event: Event) => {
    const { clientX, clientY } = event as PointerEvent;
    pointer = { x: clientX, y: clientY };
  };

  const enter = (event: Event) => {
    if ((event as PointerEvent).pointerType === "touch") return;
    settle?.kill();
    settle = null;
    readPointer(event);
    fresh = true;
    active = true;
    // Retour pendant le recentrage : on garde l'état en cours tel quel.
    if (!manual) {
      manual = true;
      ctx.takeOver();
      // « Trouvé » repart de ce qui est visible à l'instant de la reprise.
      const progress = foundAt(tl.time());
      foundTl
        .progress(progress > 0.5 ? 0 : 1)
        .progress(progress)
        .pause();
      // La loupe se pose (appui de la timeline neutralisé) et une onde part
      // du verre : elle est désormais pilotable.
      scope.add(() => {
        gsap.to(body, { ...soft, scale: 1 });
        gsap.fromTo(
          halo,
          { opacity: 0.45, scale: 1 },
          { duration: 0.7, ease: "power2.out", opacity: 0, scale: 1.4 }
        );
      });
    }
    track();
  };

  const leave = () => {
    if (!active) return;
    active = false;
    pointer = null;
    magnet = true;
    moveTo(rest, true);
    // Une fois revenue sur « Vous » (et « trouvé » rejoué jusqu'au bout),
    // la timeline se pose sur son état final.
    const delay = Math.max(FOLLOW.duration, foundTl.duration()) + 0.05;
    scope.add(() => {
      settle = gsap.delayedCall(delay, () => {
        settle = null;
        manual = false;
        followers.forEach((follower) => follower.tween.pause());
        foundTl.pause();
        // Rendu forcé : le survol a pu modifier des propriétés que la
        // timeline, déjà au bout, ne réécrirait pas d'elle-même.
        tl.pause().seek(0, true);
        ctx.release();
      });
    });
  };

  ctx.listen(card, "pointerenter", enter);
  ctx.listen(card, "pointermove", (event) => {
    if (!active) return;
    readPointer(event);
    track();
  });
  ctx.listen(card, "pointerleave", leave);
  // Défilement à la molette pendant le survol : pas de pointermove.
  ctx.listen(window, "scroll", track, { passive: true });
};

export const createScene = (ctx: BentoSceneContext): BentoScene | null => {
  const parts = getParts(ctx.root);
  if (!parts) return null;

  const { body, halo, lift } = parts;
  const { first, rest, second, start } = SEO_STOPS;
  const at = (offset: number) => RESET + offset;
  // immediateRender: false : rien n'est rendu à la construction, seul le
  // label "build" (posé par le runtime) décide de l'état de départ.
  const tl = gsap.timeline({
    defaults: { immediateRender: false },
    paused: true,
  });

  // --- 0. Remise à zéro : la loupe se soulève et repart à gauche. ---------
  tl.fromTo(
    body,
    { scale: 1 },
    { duration: 0.35, ease: "power2.out", scale: LIFTED },
    0
  ).fromTo(lift, { opacity: 0 }, { duration: 0.35, opacity: 1 }, 0);
  found(tl, parts, false, 0);
  travel(
    tl,
    parts,
    {
      duration: 0.8,
      ease: "power2.inOut",
      points: [rest, { x: -24, y: -20 }, start],
    },
    0.08
  );
  tl.addLabel(BUILD_LABEL, RESET);

  // --- 1. Premier concurrent : « Serrurier »… non. ------------------------
  travel(
    tl,
    parts,
    {
      duration: 0.9,
      ease: "power2.inOut",
      points: [start, { x: -90, y: -28 }, first],
    },
    at(0.12)
  );
  shake(tl, parts, first, at(1.1));

  // --- 2. Deuxième concurrent : « Électricien », un temps d'hésitation. ---
  travel(
    tl,
    parts,
    {
      duration: 0.7,
      ease: "power2.inOut",
      points: [first, { x: -44, y: 8 }, second],
    },
    at(1.8)
  );

  // --- 3. Approche franche vers « Vous » : la loupe se pose. -------------
  travel(
    tl,
    parts,
    {
      duration: 0.6,
      ease: "power3.out",
      points: [second, { x: 30, y: 14 }, rest],
    },
    at(2.8)
  );
  tl.fromTo(
    body,
    { scale: LIFTED },
    { duration: LAND_PRESS, ease: "power2.in", scale: 0.985 },
    at(LAND - LAND_PRESS)
  )
    .fromTo(
      body,
      { scale: 0.985 },
      { duration: 0.45, ease: "back.out(3)", scale: 1 },
      at(LAND)
    )
    .fromTo(
      lift,
      { opacity: 1 },
      { duration: 0.3, ease: "power2.out", opacity: 0 },
      at(LAND - LAND_PRESS)
    )
    // Halo : un éclair puis une onde. Il part de 0 (état statique) pour
    // qu'un retour en arrière (restart, seek) le laisse éteint.
    .fromTo(
      halo,
      { opacity: 0, scale: 1 },
      { duration: 0.1, ease: "power1.out", opacity: 0.6, scale: 1.08 },
      at(LAND)
    )
    .to(
      halo,
      { duration: 0.75, ease: "power2.out", opacity: 0, scale: 1.55 },
      at(LAND + 0.1)
    );

  // --- 4. Trouvé, puis tenue sur l'état final (identique au statique). ---
  found(tl, parts, true, at(LAND + 0.05));
  tl.to({}, { duration: 0.01 }, at(END - 0.01));

  if (!(ctx.canHover && ctx.card)) return { timeline: tl };
  setupHover(ctx, tl, parts);
  return { customHover: true, timeline: tl };
};
