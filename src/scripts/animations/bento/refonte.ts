/**
 * Scène "Refonte" — l'épreuve corrigée. La vieille accroche est relue au
 * stylo bleu : le chargement s'égrène jusqu'à 4,2 s, un trait barre
 * « Bienvenue sur notre site ! » (bloque), une ellipse entoure « depuis 1998 »
 * (rassure), un crochet souligne « Chargement… 4,2 s » (ralentit). Le mot
 * gardé est recomposé en Geist dans son ellipse puis voyage (FLIP manuel)
 * jusqu'à sa place dans la nouvelle accroche, où il reçoit son point final ;
 * les autres mots montent de leur masque et « Devis en 48 h. » est enfin
 * souligné en vert.
 * Les ratures sont des dégradés CSS pilotés par variables (ils suivent le
 * texte à la ligne) ; seule l'ellipse passe par DrawSVG, recalculée à sa
 * taille réelle pour tracer à échelle proportionnelle.
 * Survol volontairement calme (CSS du composant) : c'est la carte qu'on lit,
 * la scène ne se relance donc pas au pointeur (customHover).
 */

import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

import { refonteEllipsePath } from "./refonte-ellipse";
import {
  BUILD_LABEL,
  type BentoScene,
  type BentoSceneContext,
  centerDelta,
  query,
  queryAll,
  scaleOf,
} from "./shared";

gsap.registerPlugin(CustomEase, DrawSVGPlugin);

/** Geste du stylo : attaque hésitante, trait rapide, fin posée. */
const STYLO = CustomEase.create(
  "refonteStylo",
  "M0,0 C0.3,0 0.35,0.2 0.5,0.55 0.62,0.85 0.8,1 1,1"
);

/** Durée de la remise à zéro, avant le label "build". */
const RESET = 1;
/** Tenue sur l'état final, en fin de cycle. */
const HOLD = 3.3;
/** Durée d'une pose instantanée (voir `put`). */
const SNAP = 0.001;
/** Temps de chargement affiché par la vieille page. */
const LOAD_TIME = 4.2;

const formatSeconds = (value: number) =>
  (Math.round(Number(value) * 10) / 10).toFixed(1).replace(".", ",");

export const needsFonts = true;
export const needsMeasure = true;

export const createScene = ({ root }: BentoSceneContext): BentoScene | null => {
  const strike = query(root, "[data-refonte-strike]");
  const keptOld = query(root, "[data-refonte-kept-old]");
  const keptInk = query(root, "[data-refonte-kept-ink]");
  const ellipseSvg = query<SVGSVGElement>(root, "[data-refonte-ellipse-svg]");
  const ellipse = query<SVGPathElement>(root, "[data-refonte-ellipse]");
  const slow = query(root, "[data-refonte-slow]");
  const counter = query(root, "[data-refonte-counter]");
  const kept = query(root, "[data-refonte-kept]");
  const keptText = query(root, "[data-refonte-kept-text]");
  const keptDot = query(root, "[data-refonte-kept-dot]");
  const promise = query(root, "[data-refonte-promise]");
  const headlineWords = queryAll(root, '[data-refonte-word="headline"]');
  const promiseWords = queryAll(root, '[data-refonte-word="promise"]');
  const legend = queryAll(root, "[data-refonte-legend]");

  if (
    !(
      strike &&
      keptOld &&
      keptInk &&
      ellipseSvg &&
      ellipse &&
      slow &&
      counter &&
      kept &&
      keptText &&
      keptDot &&
      promise &&
      headlineWords.length &&
      promiseWords.length
    )
  ) {
    return null;
  }
  const words = [...headlineWords, ...promiseWords];

  // Mesures, sur l'état statique (= final) : l'ellipse à sa taille réelle,
  // puis le trajet du mot gardé (centre à centre) et son échelle de départ.
  const scale = scaleOf(root);
  const box = ellipseSvg.getBoundingClientRect();
  const width = Math.round((box.width / scale) * 10) / 10;
  const height = Math.round((box.height / scale) * 10) / 10;
  // DrawSVG ne sait pas mesurer un tracé non-scaling-stroke : échelle 1:1.
  gsap.set(ellipse, { vectorEffect: "none" });
  if (width > 0 && height > 0) {
    gsap.set(ellipseSvg, { attr: { viewBox: `0 0 ${width} ${height}` } });
    gsap.set(ellipse, { attr: { d: refonteEllipsePath(width, height) } });
  }
  // Le voyage se mesure sur le texte seul (sans le point final, qui n'existe
  // pas dans la vieille phrase) : échelle et origine centrées sur ce texte.
  const delta = centerDelta(keptInk, keptText);
  const startScale =
    keptText.offsetWidth > 0 ? keptInk.offsetWidth / keptText.offsetWidth : 1;
  const keptBox = kept.getBoundingClientRect();
  const textBox = keptText.getBoundingClientRect();
  const keptScale = scaleOf(kept);
  const originX = (textBox.left + textBox.width / 2 - keptBox.left) / keptScale;
  const originY = (textBox.top + textBox.height / 2 - keptBox.top) / keptScale;
  gsap.set(kept, { transformOrigin: `${originX}px ${originY}px` });
  const oldColor = getComputedStyle(keptOld).color;
  const newColor = getComputedStyle(kept).color;

  // DrawSVG ne restaure pas ses tirets au revert : sans ce nettoyage,
  // l'ellipse resterait invisible dans l'état statique.
  gsap.context(() => () => {
    ellipse.style.removeProperty("stroke-dasharray");
    ellipse.style.removeProperty("stroke-dashoffset");
  });

  const timeline = gsap.timeline({ paused: true });
  // Pose instantanée mais datée : au revert, GSAP annule les tweens par date
  // et les `set` purs en dernier, qui restaureraient alors un état
  // intermédiaire (mots cachés). Une durée infime garde l'ordre chronologique.
  const put = (targets: gsap.TweenTarget, vars: gsap.TweenVars, at: number) =>
    timeline.to(targets, { ...vars, duration: SNAP, ease: "none" }, at);

  // --- Remise à zéro : la nouvelle accroche s'efface vers le haut, les
  // marques se dé-tracent vers l'avant, le chargement repart de zéro.
  timeline
    .to(
      words,
      { duration: 0.36, ease: "power2.in", stagger: 0.022, yPercent: -120 },
      0
    )
    // Le mot gardé n'a pas de masque : il sort avec les autres en fondu.
    .to(
      kept,
      { autoAlpha: 0, duration: 0.32, ease: "power2.in", yPercent: -60 },
      0.08
    );
  put(promise, { "--refonte-underline-x": "100%" }, 0);
  timeline.to(
    promise,
    { "--refonte-underline": 0, duration: 0.34, ease: "power2.in" },
    SNAP
  );
  put(strike, { "--refonte-strike-x": "100%" }, 0.18);
  timeline
    .to(
      strike,
      { "--refonte-strike": 0, duration: 0.42, ease: "power2.in" },
      0.18 + SNAP
    )
    .to(
      ellipse,
      { drawSVG: "100% 100%", duration: 0.45, ease: "power2.in" },
      0.26
    );
  put(ellipse, { autoAlpha: 0 }, 0.71);
  put(slow, { "--refonte-bracket-x": "100%" }, 0.34);
  timeline
    .to(slow, { "--refonte-tick-start": 0, duration: 0.1 }, 0.34)
    .to(
      slow,
      { "--refonte-bracket": 0, duration: 0.34, ease: "power2.in" },
      0.4
    )
    .to(slow, { "--refonte-tick-end": 0, duration: 0.1 }, 0.72)
    .to(legend, { duration: 0.4, opacity: 0.35, stagger: 0.06 }, 0.3)
    .to(counter, { duration: 0.18, opacity: 0 }, 0.5);
  put(counter, { textContent: formatSeconds(0) }, 0.7);
  timeline.to(counter, { duration: 0.22, opacity: 1 }, 0.72);

  // --- État initial : la vieille page, nue.
  const ready = RESET - SNAP;
  put(words, { yPercent: 120 }, ready);
  put(
    kept,
    {
      color: oldColor,
      scale: startScale,
      x: delta.x,
      y: delta.y,
      yPercent: 0,
    },
    ready
  );
  put(keptDot, { opacity: 0 }, ready);
  put(ellipse, { drawSVG: "0% 0%" }, ready);
  put(strike, { "--refonte-strike-x": "0%" }, ready);
  put(slow, { "--refonte-bracket-x": "0%" }, ready);
  put(promise, { "--refonte-underline-x": "0%" }, ready);
  timeline.addLabel(BUILD_LABEL, RESET);

  const at = (time: number) => RESET + time;

  // --- Relecture : le chargement traîne, le stylo annote.
  timeline
    .fromTo(
      counter,
      { textContent: 0 },
      {
        duration: 1.15,
        ease: "none",
        immediateRender: false,
        modifiers: { textContent: formatSeconds },
        textContent: LOAD_TIME,
      },
      at(0.1)
    )
    .to(strike, { "--refonte-strike": 1, duration: 0.6, ease: STYLO }, at(0.28))
    .to(legend[0] ?? {}, { duration: 0.3, opacity: 1 }, at(0.62));
  put(ellipse, { autoAlpha: 1 }, at(0.82));
  timeline
    .to(
      ellipse,
      { drawSVG: "0% 100%", duration: 0.72, ease: STYLO },
      at(0.82) + SNAP
    )
    .to(legend[1] ?? {}, { duration: 0.3, opacity: 1 }, at(1.22))
    .to(
      slow,
      { "--refonte-tick-start": 1, duration: 0.08, ease: "power1.out" },
      at(1.34)
    )
    .to(slow, { "--refonte-bracket": 1, duration: 0.36, ease: STYLO }, at(1.4))
    .to(
      slow,
      { "--refonte-tick-end": 1, duration: 0.08, ease: "power1.out" },
      at(1.76)
    )
    .to(legend[2] ?? {}, { duration: 0.3, opacity: 1 }, at(1.62));

  // --- Le mot gardé est recomposé sur place (son encre d'origine pâlit,
  // l'ellipse reste), puis voyage jusqu'à sa place dans la nouvelle
  // accroche ; les autres mots montent autour de lui.
  timeline
    .to(
      keptInk,
      { duration: 0.14, ease: "power1.out", opacity: 0.25 },
      at(1.98)
    )
    .to(kept, { autoAlpha: 1, duration: 0.2, ease: "power1.out" }, at(2.02))
    .to(kept, { duration: 0.8, ease: "power3.inOut", x: 0 }, at(2.16))
    .to(kept, { duration: 0.8, ease: "power2.inOut", y: 0 }, at(2.16))
    .to(
      kept,
      { color: newColor, duration: 0.8, ease: "power3.inOut", scale: 1 },
      at(2.16)
    )
    .to(keptDot, { duration: 0.24, ease: "power1.out", opacity: 1 }, at(2.86))
    .to(
      headlineWords,
      { duration: 0.6, ease: "power3.out", stagger: 0.06, yPercent: 0 },
      at(2.5)
    )
    .to(
      promiseWords,
      { duration: 0.6, ease: "power3.out", stagger: 0.07, yPercent: 0 },
      at(2.74)
    )
    .to(
      promise,
      { "--refonte-underline": 1, duration: 0.5, ease: STYLO },
      at(3.02)
    )
    .to(keptInk, { duration: 0.5, ease: "power1.inOut", opacity: 1 }, at(3))
    // Tenue : l'épreuve corrigée et la nouvelle accroche, lisibles ensemble.
    .to({}, { duration: HOLD }, at(3.52));

  return { customHover: true, timeline };
};
