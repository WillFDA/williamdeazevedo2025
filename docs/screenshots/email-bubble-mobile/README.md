# Bulle e-mail : stabilité mobile

## Cause et choix

Sur la base `c5eee3f` (#82), l'IntersectionObserver masque la bulle dès qu'un texte, lien, bouton ou visuel entre dans son empreinte. À 390 × 844 sur `/`, elle est cachée aux positions 0, 200, 400, 600 et 800 px, puis visible à 1000, 1200 et 1400 px. C'est la politique de collision, pas la disparition du composant ni l'animation Anime.js.

Le correctif réserve une **colonne latérale de 76 px** à droite du contenu principal sous 768 px (56 px de bouton + 8 px de respiration + 12 px de bord ; prise en compte de la safe area). Le contenu défile donc à côté de la bulle plutôt que dessous. C'est un compromis de mise en page explicite : la colonne de lecture mobile devient plus étroite. Un simple padding en bas de page ne protégerait pas les textes pendant le défilement.

Les sections pleine largeur, tailles intrinsèques des grilles et longs titres respectent cette colonne. La liste de compétences choisit ses colonnes selon la largeur réellement disponible pour éviter de couper « Performance » au milieu du mot.

Le garde-fou de collision reste actif, ainsi que le retrait devant le pied de page, le menu et les dialogues. Le header et le footer conservent leur largeur. Aucun changement au mailto, à l'analytics, au cercle 56 × 56, à l'expansion desktop mesurée avec Anime.js ni à la gestion du focus.

## Vérification locale

- `npm install --package-lock=false` : pas de lockfile npm dans le dépôt ; aucun changement de dépendance.
- `npm run build` : succès, 18 routes HTML.
- `npx oxlint src/components/FloatingEmailBubble.astro src/components/CapabilitiesStrip.astro scripts/check-floating-email-mobile.mjs` : succès.
- `npm run lint` : échec préexistant, 15 erreurs dans cinq fichiers non modifiés (ProblemComparison, ArticleFilters, fadeIn, Marquee, index).
- `git diff --check` : succès.
- Test navigateur rouge avant correction puis vert : `node scripts/check-floating-email-mobile.mjs http://127.0.0.1:4332/`. Même contrôle de défilement exercé sur `/services/`, `/tarifs/` et `/about/`.
- Agent-browser / Chromium : inventaire `routes.json`, 18 routes × 3 viewports × 3 positions (haut / milieu / bas), soit 162 échantillons. Mobile 390 × 844, tablette 768 × 1024, desktop 1440 × 900. Résultats dans `verification.json`.
- Interactions : masquage menu/dialogue, un seul `contact_email_click`, activation clavier après véritable navigation Astro vers `/services/`, redimensionnements à 320, 360, 390 et 767 px. Résultats dans `interactions.json`.
- Desktop avec capacités hover/fine réellement vérifiées : repos 56 px, hover/focus 211,640625 px et paddings de 17 px des deux côtés ; texte allongé 416,546875 px ; repli et reduced motion. Résultats dans `desktop-interactions.json`.
- Analytics interceptées avant chargement dans le navigateur de QA ; pas de conversion Rybbit réelle, pas d'ouverture d'un client mail.

Ces contrôles sont des échantillons dans Chromium, pas une preuve de tous les offsets ni un test sur iPhone/Safari physique. Le retrait au footer reste intentionnel ; sur une page courte comme la 404, celui-ci peut être visible dès le haut.

## Captures réelles (sans forcer la visibilité)

- `mobile-top.png` : `/`, haut de page, 390 × 844.
- `mobile-scroll.png` : `/`, défilement à 400 px, 390 × 844.
- `tablet.png` : `/`, défilement à 200 px, 768 × 1024.
- `desktop.png` et `desktop-hover.png` : `/`, haut de page, 1440 × 900, images réduites à 780 px.
