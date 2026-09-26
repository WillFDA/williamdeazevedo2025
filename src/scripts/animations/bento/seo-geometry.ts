/**
 * Géométrie de la scène « SEO & mise en ligne » (la loupe), partagée par le
 * composant (état statique, calculé au build) et par la scène animée.
 * Unités : px de la scène avant mise à l'échelle, origine au centre de la
 * zone visuelle (x vers la droite, y vers le bas).
 */

export type SeoPoint = { x: number; y: number };

/** Plateau du champ de noms : il déborde largement de la zone visible. */
export const SEO_STAGE = { height: 320, width: 840 };

/** Rayon du verre de la loupe. */
export const SEO_LENS_RADIUS = 46;

/** Grossissement du verre. */
export const SEO_ZOOM = 1.4;

/** Interligne du champ (les rangées sont calées sur la ligne de « Vous »). */
export const SEO_ROW_GAP = 25;

/** Centre du nom « Vous » dans le champ. */
export const SEO_NAME: SeoPoint = { x: 58, y: -8 };

/**
 * Arrêts de la loupe (centre du verre) : départ, deux concurrents sur
 * lesquels elle hésite, puis la cible (le nom et sa ligne de métadonnées
 * centrés dans le verre). Le départ reste entier dans une zone de 280 px
 * (small sur un écran de 320 px).
 */
export const SEO_STOPS = {
  first: { x: -58, y: SEO_NAME.y - SEO_ROW_GAP },
  rest: { x: SEO_NAME.x, y: SEO_NAME.y + 5 },
  second: { x: -6, y: SEO_NAME.y + SEO_ROW_GAP },
  start: { x: -92, y: SEO_NAME.y },
} satisfies Record<string, SeoPoint>;

/** Position de la copie grossie (dans le verre) pour une loupe centrée en `p`. */
export const seoCopyOffset = (p: SeoPoint): SeoPoint => ({
  x: -SEO_ZOOM * p.x,
  y: -SEO_ZOOM * p.y,
});
