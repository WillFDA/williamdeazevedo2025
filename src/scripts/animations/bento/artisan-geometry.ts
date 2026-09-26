/**
 * Géométrie de la scène « Site internet artisan » (carte isochrone),
 * calculée au rendu Astro : elle n'est jamais envoyée au navigateur, le
 * module client (artisan.ts) ne lit que des attributs du HTML.
 *
 * Tout est en unités du viewBox 340 × 200 (le « cadre de sécurité »,
 * toujours visible). Le fond de carte déborde largement du cadre pour
 * remplir la zone quelle que soit la variante de carte :
 * - relief : courbes de niveau d'un champ de hauteur synthétique
 *   (marching squares, puis simplification et lissage Catmull-Rom) ;
 * - la Vilaine, la rocade et les routes du secteur (Pacé, Cesson, Bruz…) ;
 * - l'isochrone « 20 min » : un contour polaire qui s'étire le long des
 *   routes rapides, et son germe (petit cercle sous l'atelier) ;
 * - les comètes : la partie visible de chaque grande route, parcourue vers
 *   l'atelier, avec le point où elle dépose son chantier.
 */

export type Point = readonly [number, number];
type Cubic = readonly [Point, Point, Point, Point];

export const ARTISAN_VIEW = { height: 200, width: 340 } as const;
/** L'atelier, au cœur de la carte. */
export const ATELIER: Point = [170, 96];
/** Rayon du disque de l'atelier (unités SVG). */
export const ATELIER_RADIUS = 11;

const round = (value: number, digits = 1) => Number(value.toFixed(digits));
const fmt = ([x, y]: Point, digits = 1) =>
  `${round(x, digits)} ${round(y, digits)}`;
const distance = (a: Point, b: Point) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const last = <T>(items: readonly T[]) => items.at(-1) as T;

/* ------------------------------------------------------------------ */
/* Courbes lisses                                                      */
/* ------------------------------------------------------------------ */

/** Catmull-Rom uniforme → segments cubiques passant par chaque point. */
const catmullRom = (points: Point[], closed: boolean): Cubic[] => {
  const count = points.length;
  const at = (index: number): Point =>
    closed
      ? points[(index + count) % count]
      : points[Math.max(0, Math.min(count - 1, index))];
  const segments: Cubic[] = [];
  const total = closed ? count : count - 1;
  for (let i = 0; i < total; i++) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    segments.push([
      p1,
      [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6],
      [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6],
      p2,
    ]);
  }
  return segments;
};

const toPath = (segments: Cubic[], closed = false, digits = 1) => {
  if (!segments.length) return "";
  let d = `M${fmt(segments[0][0], digits)}`;
  for (const [, c1, c2, end] of segments) {
    d += `C${fmt(c1, digits)} ${fmt(c2, digits)} ${fmt(end, digits)}`;
  }
  return closed ? `${d}Z` : d;
};

const smoothPath = (points: Point[], closed = false, digits = 1) =>
  toPath(catmullRom(points, closed), closed, digits);

const reverseCubics = (segments: Cubic[]): Cubic[] =>
  segments.toReversed().map(([p0, c1, c2, p1]) => [p1, c2, c1, p0] as const);

const cubicAt = ([p0, c1, c2, p1]: Cubic, t: number): Point => {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return [
    a * p0[0] + b * c1[0] + c * c2[0] + d * p1[0],
    a * p0[1] + b * c1[1] + c * c2[1] + d * p1[1],
  ];
};

/** Échantillonne une suite de cubiques (points + longueur cumulée). */
const sampleCubics = (segments: Cubic[], perSegment = 48) => {
  const points: Point[] = [segments[0][0]];
  const lengths = [0];
  for (const segment of segments) {
    for (let step = 1; step <= perSegment; step++) {
      const point = cubicAt(segment, step / perSegment);
      lengths.push(last(lengths) + distance(last(points), point));
      points.push(point);
    }
  }
  return { lengths, points, total: last(lengths) };
};

/** Ramer-Douglas-Peucker : allège une polyligne avant lissage. */
const simplify = (points: Point[], tolerance: number): Point[] => {
  if (points.length < 3) return points;
  const [ax, ay] = points[0];
  const [bx, by] = last(points);
  const length = Math.hypot(bx - ax, by - ay) || 1;
  let farthest = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i];
    const gap =
      Math.abs((bx - ax) * (ay - py) - (ax - px) * (by - ay)) / length;
    if (gap > farthest) {
      farthest = gap;
      index = i;
    }
  }
  if (farthest <= tolerance) return [points[0], last(points)];
  return [
    ...simplify(points.slice(0, index + 1), tolerance).slice(0, -1),
    ...simplify(points.slice(index), tolerance),
  ];
};

/* ------------------------------------------------------------------ */
/* Relief : champ de hauteur et courbes de niveau                      */
/* ------------------------------------------------------------------ */

/** Collines : [x, y, étalement, hauteur]. Le centre-ville reste plat. */
const HILLS: [number, number, number, number][] = [
  [292, -34, 78, 1],
  [-42, 58, 70, 0.92],
  [372, 232, 74, 0.86],
  [548, 70, 92, 1.05],
  [-236, 190, 96, 1],
  [96, -128, 84, 0.9],
  [196, 318, 88, 0.9],
  [-248, -92, 88, 0.95],
  [620, 300, 90, 0.9],
  [-80, 330, 80, 0.8],
];

const heightAt = (x: number, y: number) => {
  let height =
    0.07 * Math.sin(x / 43 + y / 71) + 0.05 * Math.cos(x / 31 - y / 53 + 1.7);
  for (const [hx, hy, spread, peak] of HILLS) {
    const d2 = (x - hx) ** 2 + (y - hy) ** 2;
    height += peak * Math.exp(-d2 / (2 * spread * spread));
  }
  return height;
};

const GRID = { step: 8, x0: -336, x1: 680, y0: -104, y1: 304 } as const;
/**
 * La zone n'est jamais visible hors d'une « croix » : en `meet`, soit le
 * cadre est plus large que 340 × 200 et seule la bande y 0…200 déborde en x,
 * soit il est plus haut et seule la bande x 0…340 déborde en y. On ne trace
 * le relief que dans cette croix (marge : traits et parallaxe du survol).
 */
const CROSS_MARGIN = 10;
const inCross = (x0: number, y0: number, x1: number, y1: number) =>
  (x1 >= -CROSS_MARGIN && x0 <= ARTISAN_VIEW.width + CROSS_MARGIN) ||
  (y1 >= -CROSS_MARGIN && y0 <= ARTISAN_VIEW.height + CROSS_MARGIN);
/** Niveaux tracés ; le 4e est une courbe maîtresse (trait plus marqué). */
const LEVELS = [0.16, 0.3, 0.44, 0.58, 0.72, 0.86];
const INDEX_LEVEL = 0.58;

/**
 * Marching squares : segments de chaque cas, entre arêtes de la cellule
 * (0 haut, 1 droite, 2 bas, 3 gauche). Cas 5 et 10 (cols) : centre bas ;
 * SADDLE_HIGH donne la variante quand le centre est au-dessus du niveau.
 */
const CASES: (readonly (readonly [number, number])[])[] = [
  [],
  [[3, 2]],
  [[2, 1]],
  [[3, 1]],
  [[0, 1]],
  [
    [3, 2],
    [0, 1],
  ],
  [[0, 2]],
  [[3, 0]],
  [[3, 0]],
  [[0, 2]],
  [
    [3, 0],
    [2, 1],
  ],
  [[0, 1]],
  [[3, 1]],
  [[2, 1]],
  [[3, 2]],
  [],
];
const SADDLE_HIGH: Record<number, (readonly [number, number])[]> = {
  5: [
    [3, 0],
    [2, 1],
  ],
  10: [
    [0, 1],
    [3, 2],
  ],
};

/** Polylignes d'un niveau, raccordées bout à bout. */
const contourLines = (values: number[][], level: number): Point[][] => {
  const { step, x0, y0 } = GRID;
  const rows = values.length - 1;
  const cols = values[0].length - 1;
  const pointOf = new Map<string, Point>();
  const links = new Map<string, string[]>();

  const edgePoint = (key: string): Point => {
    const cached = pointOf.get(key);
    if (cached) return cached;
    const horizontal = key[0] === "h";
    const [i, j] = key.slice(1).split(",").map(Number);
    const va = values[j][i];
    const vb = horizontal ? values[j][i + 1] : values[j + 1][i];
    const t = (level - va) / (vb - va);
    const point: Point = horizontal
      ? [x0 + (i + t) * step, y0 + j * step]
      : [x0 + i * step, y0 + (j + t) * step];
    pointOf.set(key, point);
    return point;
  };

  const link = (a: string, b: string) => {
    edgePoint(a);
    edgePoint(b);
    links.set(a, [...(links.get(a) ?? []), b]);
    links.set(b, [...(links.get(b) ?? []), a]);
  };

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const cx = x0 + i * step;
      const cy = y0 + j * step;
      if (!inCross(cx, cy, cx + step, cy + step)) continue;
      const corners = [
        values[j][i],
        values[j][i + 1],
        values[j + 1][i + 1],
        values[j + 1][i],
      ];
      const code = corners.reduce(
        (sum, value, index) => sum + (value > level ? 8 / 2 ** index : 0),
        0
      );
      const edges = [
        `h${i},${j}`,
        `v${i + 1},${j}`,
        `h${i},${j + 1}`,
        `v${i},${j}`,
      ];
      const centerHigh =
        corners.reduce((sum, value) => sum + value, 0) / 4 > level;
      const segments = (centerHigh && SADDLE_HIGH[code]) || CASES[code];
      for (const [a, b] of segments) link(edges[a], edges[b]);
    }
  }

  // Parcours des chaînes : d'abord les ouvertes (bords de grille), puis les boucles.
  const visited = new Set<string>();
  const chains: Point[][] = [];
  const walk = (start: string) => {
    const keys = [start];
    visited.add(start);
    let current = start;
    for (;;) {
      const next = (links.get(current) ?? []).find((key) => !visited.has(key));
      if (!next) break;
      visited.add(next);
      keys.push(next);
      current = next;
    }
    chains.push(keys.map((key) => edgePoint(key)));
  };
  for (const [key, neighbours] of links) {
    if (neighbours.length === 1 && !visited.has(key)) walk(key);
  }
  for (const key of links.keys()) {
    if (!visited.has(key)) walk(key);
  }
  return chains;
};

const buildRelief = () => {
  const { step, x0, x1, y0, y1 } = GRID;
  const values: number[][] = [];
  for (let y = y0; y <= y1; y += step) {
    const row: number[] = [];
    for (let x = x0; x <= x1; x += step) row.push(heightAt(x, y));
    values.push(row);
  }
  // Un seul <path> par famille de courbes (sous-chemins concaténés).
  const trace = (levels: number[]) =>
    levels
      .flatMap((level) => contourLines(values, level))
      .filter((chain) => chain.length > 5)
      .map((chain) => {
        const closed = distance(chain[0], last(chain)) < step * 1.5;
        const points = simplify(closed ? chain.slice(0, -1) : chain, 1.5);
        // Traits de fond à 1 px écran : l'unité près suffit.
        return smoothPath(points, closed, 0);
      })
      .join("");
  return {
    major: trace([INDEX_LEVEL]),
    minor: trace(LEVELS.filter((level) => level !== INDEX_LEVEL)),
  };
};

/* ------------------------------------------------------------------ */
/* Réseau : rivière, routes, rocade                                    */
/* ------------------------------------------------------------------ */

/** La Vilaine, d'est en ouest, qui passe au sud de l'atelier. */
const RIVER: Point[] = [
  [720, 168],
  [600, 150],
  [500, 160],
  [420, 142],
  [356, 140],
  [304, 136],
  [258, 134],
  [222, 140],
  [192, 138],
  [160, 134],
  [128, 138],
  [96, 134],
  [62, 142],
  [34, 160],
  [6, 180],
  [-34, 210],
  [-120, 244],
  [-220, 258],
  [-380, 296],
];

type RoadName = "bruz" | "cesson" | "pace";

/** Grandes routes, de l'atelier vers l'extérieur. */
const MAIN_ROADS: Record<RoadName, Point[]> = {
  bruz: [
    ATELIER,
    [162, 114],
    [150, 132],
    [134, 148],
    [116, 162],
    [96, 176],
    [76, 192],
    [48, 214],
    [4, 246],
    [-60, 290],
    [-140, 350],
  ],
  cesson: [
    ATELIER,
    [198, 92],
    [226, 88],
    [254, 84],
    [282, 80],
    [314, 74],
    [352, 66],
    [420, 56],
    [510, 46],
    [720, 30],
  ],
  pace: [
    ATELIER,
    [150, 84],
    [126, 72],
    [102, 60],
    [80, 48],
    [54, 34],
    [24, 18],
    [-30, -8],
    [-130, -52],
    [-380, -150],
  ],
};

/** Routes secondaires (fond de carte seulement). */
const MINOR_ROADS: Point[][] = [
  // Nord (Saint-Malo)
  [
    ATELIER,
    [176, 70],
    [182, 42],
    [186, 12],
    [190, -24],
    [198, -90],
    [206, -180],
  ],
  // Sud-est (Angers)
  [
    ATELIER,
    [198, 110],
    [228, 126],
    [262, 146],
    [298, 170],
    [342, 198],
    [410, 240],
    [500, 290],
    [660, 390],
  ],
  // Ouest (Lorient)
  [
    ATELIER,
    [140, 100],
    [106, 104],
    [72, 104],
    [36, 100],
    [-20, 96],
    [-120, 94],
    [-380, 90],
  ],
  // Liaisons locales
  [
    [254, 84],
    [262, 116],
    [262, 146],
  ],
  [
    [102, 60],
    [106, 84],
    [106, 104],
  ],
  [
    [314, 74],
    [330, 40],
    [352, -4],
    [380, -60],
    [420, -170],
  ],
  [
    [36, 100],
    [22, 64],
    [24, 18],
  ],
  [
    [76, 192],
    [40, 176],
    [6, 172],
    [-40, 150],
    [-140, 140],
  ],
];

/** La rocade : anneau irrégulier autour du centre. */
const RING: Point[] = Array.from({ length: 14 }, (_, index) => {
  const angle = (index / 14) * Math.PI * 2;
  const wobble = 1 + 0.06 * Math.sin(angle * 3 + 0.8);
  return [
    ATELIER[0] + Math.cos(angle) * 44 * wobble,
    ATELIER[1] + 2 + Math.sin(angle) * 31 * wobble,
  ] as const;
});

/* ------------------------------------------------------------------ */
/* Isochrone « 20 min »                                                */
/* ------------------------------------------------------------------ */

const angleTo = ([x, y]: Point) => Math.atan2(y - ATELIER[1], x - ATELIER[0]);
const wrap = (angle: number) => Math.atan2(Math.sin(angle), Math.cos(angle));

/** Doigts de l'isochrone : elle s'étire le long des routes rapides. */
const LOBES = [
  { amp: 34, angle: angleTo([80, 48]), width: 0.26 },
  { amp: 36, angle: angleTo([282, 80]), width: 0.24 },
  { amp: 30, angle: angleTo([116, 162]), width: 0.26 },
  { amp: 14, angle: angleTo([182, 42]), width: 0.24 },
  { amp: 18, angle: angleTo([262, 146]), width: 0.26 },
  { amp: 10, angle: angleTo([72, 104]), width: 0.3 },
];

export const zoneRadius = (angle: number) => {
  const rx = 74;
  const ry = 48;
  let radius =
    (rx * ry) / Math.hypot(ry * Math.cos(angle), rx * Math.sin(angle));
  for (const lobe of LOBES) {
    const gap = wrap(angle - lobe.angle);
    radius += lobe.amp * Math.exp(-(gap * gap) / (2 * lobe.width ** 2));
  }
  return (
    radius + 2.5 * Math.sin(3 * angle + 0.6) + 1.6 * Math.sin(7 * angle + 1.3)
  );
};

const zonePoint = (angle: number, scale = 1): Point => {
  const radius = zoneRadius(angle) * scale;
  return [
    ATELIER[0] + Math.cos(angle) * radius,
    ATELIER[1] + Math.sin(angle) * radius,
  ];
};

const ZONE_POINTS = 40;
const zone = smoothPath(
  Array.from({ length: ZONE_POINTS }, (_, index) =>
    zonePoint(-Math.PI + (index / ZONE_POINTS) * Math.PI * 2)
  ),
  true
);

/** Germe du morphing : petit cercle (en cubiques) caché sous l'atelier. */
const seed = (() => {
  const [cx, cy] = ATELIER;
  const r = 5;
  const k = r * 0.5523;
  return (
    `M${cx - r} ${cy}` +
    `C${cx - r} ${cy - k} ${cx - k} ${cy - r} ${cx} ${cy - r}` +
    `C${cx + k} ${cy - r} ${cx + r} ${cy - k} ${cx + r} ${cy}` +
    `C${cx + r} ${cy + k} ${cx + k} ${cy + r} ${cx} ${cy + r}` +
    `C${cx - k} ${cy + r} ${cx - r} ${cy + k} ${cx - r} ${cy}Z`
  );
})();

/** Part du rayon de l'isochrone à laquelle se trouve un point (0 = atelier). */
const radialShare = (point: Point) =>
  Math.min(1, distance(ATELIER, point) / zoneRadius(angleTo(point)));

/* ------------------------------------------------------------------ */
/* Villes, chantiers, comètes                                          */
/* ------------------------------------------------------------------ */

type Side = "above" | "below" | "left" | "right";

export const TOWNS: { at: Point; name: string; side: Side }[] = [
  { at: [80, 48], name: "Pacé", side: "above" },
  { at: [282, 80], name: "Cesson", side: "above" },
  { at: [116, 162], name: "Bruz", side: "left" },
];

/** Chantiers déjà réalisés (dans la zone, à l'écart des routes). */
const DONE_SITES: Point[] = [
  [146, 56],
  [216, 74],
  [250, 112],
  [206, 124],
  [118, 118],
  [98, 86],
  [186, 116],
  [144, 110],
  [232, 98],
];

export const doneSites = DONE_SITES.map((at) => ({
  at,
  share: round(radialShare(at), 2),
}));

/** Comètes : départ (indice du point de route au bord du cadre) et dépôt. */
const COMETS: {
  deposit: number;
  road: RoadName;
  side: 1 | -1;
  start: number;
}[] = [
  { deposit: 0.6, road: "pace", side: -1, start: 6 },
  { deposit: 0.5, road: "cesson", side: 1, start: 5 },
  { deposit: 0.55, road: "bruz", side: 1, start: 5 },
];

const DEPOSIT_OFFSET = 7.5;

export const comets = COMETS.map(({ deposit, road, side, start }) => {
  const roadSegments = catmullRom(MAIN_ROADS[road], false);
  // Même courbe que la route, parcourue du bord du cadre vers l'atelier.
  const path = reverseCubics(roadSegments.slice(0, start));
  const { lengths, points, total } = sampleCubics(path);
  const index = lengths.findIndex((length) => length >= deposit * total);
  const on = points[index];
  const before = points[Math.max(0, index - 1)];
  const after = points[Math.min(points.length - 1, index + 1)];
  const tangent = Math.atan2(after[1] - before[1], after[0] - before[0]);
  const site: Point = [
    on[0] - Math.sin(tangent) * DEPOSIT_OFFSET * side,
    on[1] + Math.cos(tangent) * DEPOSIT_OFFSET * side,
  ];
  return {
    d: toPath(path),
    deposit: round(lengths[index] / total, 3),
    // La tête s'arrête au bord du disque de l'atelier.
    headEnd: round(1 - (ATELIER_RADIUS + 1.5) / total, 3),
    length: round(total),
    offset: [round(on[0] - site[0]), round(on[1] - site[1])] as Point,
    share: round(radialShare(site), 2),
    site,
  };
});

/* ------------------------------------------------------------------ */
/* Export                                                              */
/* ------------------------------------------------------------------ */

const TAG_ANGLE = -0.95;

export const artisanMap = {
  relief: buildRelief(),
  river: smoothPath(RIVER, false, 0),
  roads: {
    // Grandes routes et rocade (double trait), puis routes secondaires.
    main: [
      ...Object.values(MAIN_ROADS).map((points) => smoothPath(points)),
      smoothPath(RING, true),
    ].join(""),
    minor: MINOR_ROADS.map((points) => smoothPath(points, false, 0)).join(""),
  },
  seed,
  /** Étiquette « 20 min » posée sur le bord de l'isochrone. */
  tag: zonePoint(TAG_ANGLE).map(round) as unknown as Point,
  zone,
};
