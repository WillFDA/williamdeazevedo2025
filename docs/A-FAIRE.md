# À faire

Backlog des améliorations identifiées mais non encore réalisées.

## OG image (à faire dans une branche dédiée)

- [ ] **Faire l'OG image.** Aujourd'hui l'image Open Graph par défaut est
      `/pictures/william-low.png` : c'est un portrait (mauvais ratio), pas une
      image sociale 1200×630. Résultat : rendu médiocre sur LinkedIn / X /
      iMessage.
- Pistes :
  - Soit une image statique `public/og.png` en 1200×630 (rapide, suffisant).
  - Soit un générateur dynamique (titre par page/article) avec
    [`@vercel/og` / Satori](https://github.com/vercel/satori) au build, ou un
    composant Astro rendu en image. La V1 Next utilisait déjà `@vercel/og`.
  - Ajouter `image` en frontmatter des articles + `og:image:width`/`height` et
    `twitter:image:alt` dans `Layout.astro`.

## Vidéos des projets (MP4) — pistes de compression / hébergement

Contexte : `public/motivai/`, `public/lefellic/`, `public/persistance/`
contiennent ~13 Mo de MP4 (jusqu'à 5,3 Mo l'unité). Servies en statique par
Cloudflare. Non bloquant (lazy + pause hors viewport) mais lourd en data mobile.

### Compresser davantage (sans changer d'hébergement)

- Ré-encoder en **AV1** (meilleur ratio) ou **VP9/WebM**, avec un fallback
  **H.264** via plusieurs `<source>`. Cible : < 1 Mo / vidéo.
- Baisser la résolution à la taille réellement affichée (le carousel ne dépasse
  pas ~1024 px de large → 720p voire moins suffit), réduire le framerate à
  24/30 fps, et augmenter le CRF.
- Exemple `ffmpeg` (AV1) :
  `ffmpeg -i in.mp4 -c:v libaom-av1 -crf 34 -b:v 0 -an -vf "scale=1280:-2" out.webm`
- Exemple `ffmpeg` (H.264 fallback) :
  `ffmpeg -i in.mp4 -c:v libx264 -crf 28 -preset slow -an -movflags +faststart -vf "scale=1280:-2" out.mp4`
- `-an` retire l'audio (les vidéos sont `muted`), `+faststart` met l'index en
  tête pour un démarrage plus rapide.

### Externaliser le stockage / la diffusion (recommandé à terme)

Oui, c'est intéressant pour les perfs **et** pour ne pas se prendre la tête :

- **Cloudflare Stream** : on upload la vidéo, Cloudflare gère l'encodage
  multi-débit, le **streaming adaptatif (HLS/DASH)** et un player. C'est l'option
  « zéro prise de tête » : la vidéo n'est plus un gros fichier monolithique
  téléchargé d'un bloc, mais servie par segments selon le réseau. Idéal pour des
  démos qui s'autoplay. Payant à l'usage (par minute stockée + minutes vues).
- **Cloudflare R2** (stockage objet, egress gratuit) : on y dépose les MP4/WebM
  et on les sert via une URL/CDN. Plus simple et moins cher que Stream, mais
  **pas** de streaming adaptatif : c'est juste un meilleur endroit que le bundle
  Git pour stocker de gros binaires (le dépôt ne grossit plus, le build reste
  léger). Bon compromis si on garde des fichiers déjà bien compressés.

Recommandation : commencer par **ré-encoder en AV1/WebM + H.264** (gain immédiat
sans coût). Si les vidéos deviennent nombreuses ou lourdes, passer le stockage
sur **R2**, et réserver **Stream** aux vidéos longues où l'adaptatif compte.

## Divers

- [ ] Liens externes des articles : ouvrir dans un nouvel onglet
      (`rehype-external-links`) si souhaité — actuellement même onglet.
- [ ] Médiateur de la consommation à ajouter aux mentions légales si activité
      B2C (non requis en B2B).
