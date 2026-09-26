/**
 * Ellipse « tracée à la main » du correcteur (scène Refonte) : un tour un peu
 * penché qui se referme sur son départ (côté gauche), le dépasse puis s'en
 * écarte en un petit coup de poignet. Partagée par le composant (tracé
 * statique à la taille nominale) et par la scène (tracé recalculé à la
 * taille mesurée, pour que DrawSVG travaille à échelle proportionnelle).
 */

type Point = [number, number];

const round = (value: number) => Math.round(value * 100) / 100;

/** Pas angulaire (°) : il divise 360 pour que le 2e passage recouvre le 1er. */
const STEP = 10;
/** Points d'un tour complet, puis du dépassement (recouvrement + envolée). */
const TURN = 360 / STEP;
const OVERLAP = 1;
const FLICK = 3;

/** Chemin SVG (courbes de Bézier) de l'ellipse inscrite dans `width × height`. */
export const refonteEllipsePath = (width: number, height: number) => {
  // Marge proportionnelle : le tracé ne dépend que du rapport largeur/hauteur.
  const inset = Math.min(width, height) * 0.08;
  const cx = width / 2;
  const cy = height / 2;
  const rx = width / 2 - inset;
  const ry = height / 2 - inset;
  const start = 165;
  const tilt = (-2 * Math.PI) / 180;

  const points: Point[] = [];
  for (let index = 0; index <= TURN + OVERLAP + FLICK; index++) {
    const angle = ((start + index * STEP) * Math.PI) / 180;
    // Légère irrégularité liée à l'angle (identique d'un tour à l'autre),
    // puis envolée vers l'extérieur une fois le départ dépassé.
    const flick = Math.max(0, index - TURN - OVERLAP) / FLICK;
    const k = 1 + 0.018 * Math.sin(angle * 2 + 0.6) + 0.09 * flick * flick;
    const x = rx * k * Math.cos(angle);
    const y = ry * k * Math.sin(angle);
    points.push([
      cx + x * Math.cos(tilt) - y * Math.sin(tilt),
      cy + x * Math.sin(tilt) + y * Math.cos(tilt),
    ]);
  }

  // Catmull-Rom → Bézier cubiques : une courbe continue passant par les points.
  const first = points[0] ?? [cx, cy];
  let d = `M${round(first[0])} ${round(first[1])}`;
  for (let index = 0; index < points.length - 1; index++) {
    const p0 = points[index - 1] ?? points[index];
    const p1 = points[index];
    const p2 = points[index + 1];
    const p3 = points[index + 2] ?? p2;
    if (!(p0 && p1 && p2 && p3)) continue;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${round(c1x)} ${round(c1y)} ${round(c2x)} ${round(c2y)} ${round(p2[0])} ${round(p2[1])}`;
  }
  return d;
};
