/**
 * Scène "Renfort front-end" — un bouton, tous ses états, en gros plan façon
 * Storybook. Tab : la touche s'enfonce, l'anneau de focus (en tirets) se
 * trace depuis le haut-centre et s'étiquette « focus ». Entrée : le bouton
 * s'écrase, son libellé remonte, la pilule se contracte en rond (tween
 * d'attributs x/width d'un rect rx = h/2) et un spinner tourne. Puis le rond
 * se redéploie en vert, la coche se trace, « Envoyé » monte lettre à lettre
 * et une onde valide. Le rail REPOS · FOCUS · ENVOI · SUCCÈS suit l'état ; la
 * cote « 44 px » accompagne le bord du bouton, qui ne quitte jamais l'écran.
 * Rythme sec (gestes de 0,5 s au plus). Cycle ~7,6 s, état final = SUCCÈS.
 */

import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

import {
  BUILD_LABEL,
  type BentoScene,
  type BentoSceneContext,
  query,
  queryAll,
  scaleOf,
} from "./shared";

gsap.registerPlugin(DrawSVGPlugin);

// Couleurs en hex (GSAP n'interpole pas les oklch de Tailwind 4).
const BLUE_500 = "#3e60d4";
const SUCCESS = "#047857";
const GRAY_400 = "#9ba4b1";
const GRAY_900 = "#1f2634";
const KEY_IDLE = {
  backgroundColor: "#ffffff",
  borderColor: "#d9dee6",
  color: "#5c626b",
};
const KEY_LIT = {
  backgroundColor: "#eef3ff",
  borderColor: "#b8c8ff",
  color: "#3152c7",
};

/** Durée de la remise à zéro, avant le label "build". */
const RESET = 0.8;
/** Tenue sur l'état final, en fin de cycle. */
const HOLD = 2.8;
/** Durée d'une pose instantanée (voir `put`). */
const SNAP = 0.001;

// L'indicateur du rail se cale sur la largeur des libellés : Geist chargée.
// Pas de needsMeasure : ces mesures sont en repère local et le rail ne dépend
// pas de la largeur de la zone (seule l'échelle change, par container query).
export const needsFonts = true;

/** Nœuds de la scène ; null si l'un manque (le HTML statique reste). */
const queryParts = (root: HTMLElement) => {
  const parts = {
    bar: query(root, "[data-fe-bar]"),
    btn: query(root, "[data-fe-btn]"),
    callout: query(root, "[data-fe-callout]"),
    calloutText: query(root, "[data-fe-callout-text]"),
    check: query<SVGPathElement>(root, "[data-fe-check]"),
    contact: query<SVGRectElement>(root, "[data-fe-contact]"),
    cote: query(root, "[data-fe-cote]"),
    doneIcon: query(root, "[data-fe-done-icon]"),
    flood: query<SVGCircleElement>(root, "[data-fe-flood]"),
    idle: query(root, "[data-fe-idle]"),
    keyEnter: query(root, '[data-fe-key="enter"]'),
    keyTab: query(root, '[data-fe-key="tab"]'),
    leader: query<SVGPathElement>(root, "[data-fe-leader]"),
    pill: query<SVGRectElement>(root, "[data-fe-pill]"),
    ring: query<SVGPathElement>(root, "[data-fe-ring]"),
    ringReveal: query<SVGPathElement>(root, "[data-fe-ring-reveal]"),
    ripple: query<SVGRectElement>(root, "[data-fe-ripple]"),
    shadow: query(root, "[data-fe-shadow]"),
    sheen: query<SVGRectElement>(root, "[data-fe-sheen]"),
    spinner: query<SVGPathElement>(root, "[data-fe-spinner]"),
    successFill: query<SVGRectElement>(root, "[data-fe-success]"),
    track: query<SVGPathElement>(root, "[data-fe-track]"),
  };
  const lists = {
    doneChars: queryAll(root, "[data-fe-done-ch]"),
    idleChars: queryAll(root, "[data-fe-idle-ch]"),
    states: queryAll(root, "[data-fe-state]"),
  };
  const complete =
    Object.values(parts).every(Boolean) &&
    Object.values(lists).every((list) => list.length > 0);
  return complete
    ? {
        ...(parts as {
          [K in keyof typeof parts]: NonNullable<(typeof parts)[K]>;
        }),
        ...lists,
      }
    : null;
};

/**
 * Arrêts de l'indicateur du rail : position et largeur de chaque libellé,
 * relatives à l'indicateur (posé en CSS sous l'état actif). Repère local,
 * insensible à l'échelle de la scène ; le tracking final est retranché.
 */
const measureRail = (states: HTMLElement[], bar: HTMLElement) => {
  const rail = bar.parentElement ?? bar;
  const k = scaleOf(rail) || 1;
  const barBox = bar.getBoundingClientRect();
  const boxes = states.map((state) => state.getBoundingClientRect());
  const active = states.findIndex((state) =>
    state.classList.contains("is-active")
  );
  const trailing = (boxes[active]?.width ?? barBox.width) - barBox.width;
  return boxes.map((box) => ({
    scaleX: barBox.width > 0 ? (box.width - trailing) / barBox.width : 1,
    x: (box.left - barBox.left) / k,
  }));
};

export const createScene = ({ root }: BentoSceneContext): BentoScene | null => {
  const parts = queryParts(root);
  if (!parts) return null;
  const {
    bar,
    btn,
    callout,
    calloutText,
    check,
    contact,
    cote,
    doneChars,
    doneIcon,
    flood,
    idle,
    idleChars,
    keyEnter,
    keyTab,
    leader,
    pill,
    ring,
    ringReveal,
    ripple,
    shadow,
    sheen,
    spinner,
    states,
    successFill,
    track,
  } = parts;

  // Géométrie du bouton, lue sur le SVG (unités = px de la scène).
  const pillX = pill.x.baseVal.value;
  const pillY = pill.y.baseVal.value;
  const pillW = pill.width.baseVal.value;
  const pillH = pill.height.baseVal.value;
  const roundX = pillX + (pillW - pillH) / 2;
  const origin = `${pillX + pillW / 2} ${pillY + pillH / 2}`;

  const stops = measureRail(states, bar);

  // DrawSVG ne restaure pas ses tirets au revert : sans ce nettoyage, la
  // coche resterait masquée dans l'état statique.
  gsap.context(() => () => {
    for (const path of [check, leader, spinner]) {
      path.style.removeProperty("stroke-dasharray");
      path.style.removeProperty("stroke-dashoffset");
    }
  });

  gsap.set(spinner, { svgOrigin: origin });
  // Pression du bouton en 2D : un calque composité laissé par un scale 3D
  // décale le libellé d'un pixel physique au repos (écart avec le statique).
  gsap.set(btn, { force3D: false });

  const timeline = gsap.timeline({ paused: true });
  // Pose instantanée mais datée : au revert, GSAP annule les tweens par date
  // et les `set` purs en dernier, qui restaureraient un état intermédiaire.
  const put = (targets: gsap.TweenTarget, vars: gsap.TweenVars, at: number) =>
    timeline.to(targets, { ...vars, duration: SNAP, ease: "none" }, at);

  /** L'indicateur glisse ; le libellé s'allume quand il arrive dessous. */
  const railTo = (
    index: number,
    at: number,
    duration = 0.42,
    ease = "power3.out",
    lightAt = 0.06
  ) => {
    const stop = stops[index];
    if (!stop) return;
    timeline.to(bar, { ...stop, duration, ease }, at).to(
      states,
      {
        color: (i: number) => (i === index ? GRAY_900 : GRAY_400),
        duration: 0.24,
        ease: "power1.out",
      },
      at + lightAt
    );
  };

  /** Frappe d'une touche : la face s'enfonce, s'allume, puis s'éteint. */
  const press = (key: HTMLElement, at: number, lit: number) => {
    timeline
      .to(key, { duration: 0.08, ease: "power2.in", y: 2 }, at)
      .to(key, { duration: 0.2, ease: "power2.out", y: 0 }, at + 0.1)
      .to(key, { ...KEY_LIT, duration: 0.1, ease: "power1.out" }, at)
      .to(key, { ...KEY_IDLE, duration: 0.36, ease: "power1.inOut" }, at + lit);
  };

  /** Pilule ↔ rond : la forme, son reflet, son ombre et la cote suivent. */
  const morph = (
    round: boolean,
    at: number,
    duration: number,
    ease: string
  ) => {
    timeline
      .to(
        [pill, successFill, sheen, contact],
        {
          attr: round
            ? { width: pillH, x: roundX }
            : { width: pillW, x: pillX },
          duration,
          ease,
        },
        at
      )
      .to(shadow, { duration, ease, scaleX: round ? pillH / pillW : 1 }, at)
      .to(cote, { duration, ease, x: round ? pillX - roundX : 0 }, at);
  };

  const floodR = flood.r.baseVal.value;
  // Tour de l'anneau : longueur du tiret unique du masque de révélation.
  const ringLength =
    Number.parseFloat(ringReveal.getAttribute("stroke-dasharray") ?? "") ||
    ringReveal.getTotalLength();
  /** Part tracée de l'anneau (0 → 1), symétrique autour du haut-centre. */
  const ringDraw = (part: number) => ({
    "stroke-dasharray": `${part * ringLength} ${ringLength}`,
    "stroke-dashoffset": ((part - 1) * ringLength) / 2,
  });

  // --- Remise à zéro : « Envoyé » remonte, le vert se retire vers le centre
  // et découvre le bleu, « Envoyer » revient d'en bas ; l'indicateur
  // repart sur REPOS.
  timeline.to(
    [doneIcon, ...doneChars],
    { duration: 0.26, ease: "power2.in", stagger: 0.016, yPercent: -120 },
    0
  );
  put(pill, { fill: BLUE_500 }, 0);
  timeline.to(
    flood,
    { attr: { r: 0 }, duration: 0.36, ease: "power2.in" },
    0.04
  );
  railTo(0, 0.06, 0.62, "power3.inOut", 0.3);
  // Entrée calée pour finir avant le label : l'état initial est posé net.
  put(idle, { autoAlpha: 1 }, 0.38);
  put(idleChars, { yPercent: 120 }, 0.38);
  timeline.to(
    idleChars,
    { duration: 0.3, ease: "power3.out", stagger: 0.016, yPercent: 0 },
    0.38 + SNAP
  );

  // --- État initial (REPOS), posé hors champ avant le label.
  const ready = RESET - 0.02;
  put(doneChars, { yPercent: 120 }, ready);
  put(doneIcon, { yPercent: 0 }, ready);
  put(check, { autoAlpha: 0, drawSVG: "0%" }, ready);
  put(ringReveal, { attr: ringDraw(0) }, ready);
  put(leader, { drawSVG: "0%" }, ready);
  put(calloutText, { autoAlpha: 0, x: 5 }, ready);
  put(spinner, { drawSVG: "0% 12%", rotation: 0 }, ready);
  timeline.addLabel(BUILD_LABEL, RESET);

  const at = (time: number) => RESET + time;

  // --- Tab : REPOS → FOCUS. L'anneau se trace, l'étiquette de spec pointe.
  press(keyTab, at(0.35), 1.1);
  put(ring, { autoAlpha: 0.9 }, at(0.4));
  timeline.to(
    ringReveal,
    { attr: ringDraw(1), duration: 0.46, ease: "power2.inOut" },
    at(0.4) + SNAP
  );
  railTo(1, at(0.44));
  put(callout, { autoAlpha: 1 }, at(0.72));
  timeline
    .to(
      leader,
      { drawSVG: "100%", duration: 0.2, ease: "power2.out" },
      at(0.72) + SNAP
    )
    .to(
      calloutText,
      { autoAlpha: 1, duration: 0.3, ease: "power3.out", x: 0 },
      at(0.82)
    );

  // --- Entrée : FOCUS → ENVOI. Le bouton s'écrase, le libellé remonte,
  // la pilule devient un rond qui charge.
  const enter = at(1.85);
  press(keyEnter, enter, 0.8);
  timeline
    .to(btn, { duration: 0.08, ease: "power2.in", scale: 0.96 }, enter)
    .to(btn, { duration: 0.36, ease: "power3.out", scale: 1 }, enter + 0.09)
    .to(
      [ring, callout],
      { autoAlpha: 0, duration: 0.18, ease: "power1.out" },
      enter + 0.04
    )
    .to(
      idleChars,
      { duration: 0.2, ease: "power2.in", stagger: 0.012, yPercent: -120 },
      enter + 0.04
    );
  put(idle, { autoAlpha: 0 }, enter + 0.36);
  const contract = enter + 0.16;
  morph(true, contract, 0.46, "power3.inOut");
  railTo(2, contract);

  const spin = contract + 0.26;
  timeline
    .to([track, spinner], { autoAlpha: 1, duration: 0.16 }, spin)
    .to(spinner, { duration: 0.86, ease: "none", rotation: 450 }, spin)
    .to(
      spinner,
      { drawSVG: "30% 85%", duration: 0.42, ease: "power1.inOut" },
      spin
    )
    .to(
      spinner,
      { drawSVG: "80% 100%", duration: 0.44, ease: "power1.inOut" },
      spin + 0.42
    )
    .to([track, spinner], { autoAlpha: 0, duration: 0.14 }, spin + 0.74);

  // --- ENVOI → SUCCÈS : le vert inonde le rond depuis son centre, qui se
  // redéploie en pilule ; la coche se trace, « Envoyé » monte, une onde valide.
  const success = spin + 0.84;
  timeline.to(
    flood,
    { attr: { r: pillH / 2 + 1 }, duration: 0.2, ease: "power2.out" },
    spin + 0.64
  );
  // Rond entièrement vert : la base prend la teinte (pas de liseré bleu
  // pendant le redéploiement), le disque s'agrandit ensuite sans se voir.
  put(pill, { fill: SUCCESS }, success);
  morph(false, success, 0.52, "back.out(1.3)");
  timeline.to(
    flood,
    { attr: { r: floodR }, duration: 0.3, ease: "none" },
    success + SNAP
  );
  railTo(3, success + 0.04);
  put(check, { autoAlpha: 1 }, success + 0.12);
  timeline
    .to(
      check,
      { drawSVG: "100%", duration: 0.3, ease: "power2.out" },
      success + 0.12 + SNAP
    )
    .to(
      doneChars,
      { duration: 0.4, ease: "power3.out", stagger: 0.022, yPercent: 0 },
      success + 0.16
    );
  put(ripple, { autoAlpha: 0.55 }, success + 0.22);
  timeline
    .to(
      ripple,
      {
        attr: {
          height: pillH + 18,
          rx: pillH / 2 + 9,
          width: pillW + 18,
          x: pillX - 9,
          y: pillY - 9,
        },
        autoAlpha: 0,
        duration: 0.7,
        ease: "power2.out",
      },
      success + 0.22 + SNAP
    )
    // Tenue : le bouton validé, lisible.
    .to({}, { duration: HOLD }, success + 0.92);

  return { timeline };
};
