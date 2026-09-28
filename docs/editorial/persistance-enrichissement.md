# Enrichissement Persistance — 17 septembre 2026

## Périmètre et sources

Trois articles seulement : `prix-site-vitrine`, `cahier-des-charges-site-internet` et `exemples-sites-vitrines`. Passage de Markdown à MDX nécessaire pour intégrer les composants Astro ; slugs, publication du 16 septembre 2026 et texte existant conservés. `updatedDate` : 17 septembre 2026. Les six libellés de la checklist finale sont déplacés sans réécriture dans le composant ; un septième concerne l’identité. La capture Persistance et sa légende sont reprises dans le bloc illustré, sans dupliquer l’image.

Sources consultées le **17 septembre 2026**, vérifiées en direct par l’agent principal avant délégation :

- <https://persistance-studio.fr/identite-visuelle/> — page « Une identité pensée pour durer » : création, modernisation ou origination de logo, charte graphique, livraison de fichiers vectoriels et PNG transparents, collaboration impliquant le client. Aucun prix du studio n’est repris.
- <https://persistance-studio.fr/accompagnement/> — coordination et regard graphique avec le webdesigner, vérification des typographies, pictogrammes et éléments visuels. Le studio précise ne pas appliquer directement les corrections au site. Cette source borne les responsabilités ; aucune promesse d’intégration par Persistance n’est ajoutée.
- `src/data/projects.ts` — Persistance est l’activité de Cédrine Marmasse, site réalisé par William ; la fiche LE FELLIC crédite Persistance pour le logo et l’identité. `src/components/FaqSection.astro` documente également la complémentarité identité / site.
- `/articles/exemples-sites-vitrines/persistance-home.webp` — capture existante du site réel, dimensions 1920 × 1080. La légende précise qu’il ne s’agit pas d’une maquette de charte. Aucune comparaison avant/après entre projets distincts.

La nouvelle tentative de récupération par le sous-agent a échoué (`web_extract` : `CRAWL_UNKNOWN_ERROR` ; accès HTTP direct : 403). Les remarques éditoriales ci-dessus s’appuient donc sur la vérification préalable explicitement transmise, pas sur une prétendue seconde consultation réussie.

## Choix éditoriaux et visuels

- Recommandation explicite, contextualisée et lien direct vers la prestation d’identité visuelle dans chacun des trois articles.
- Persistance définit les repères visuels ; William conçoit et intègre le site. Devis de charte distinct du budget du site. Identité existante et autre designer restent des possibilités explicites ; aucun passage obligé ni prix inventé.
- `PersistancePartner.astro` associe la capture authentique à deux rôles, dans un bloc éditorial vertical. Pas de grille de cartes commerciales ni de faux livrables graphiques.
- `IdentityScope.astro` propose deux volets natifs `details`, ouverts initialement pour ne pas dissimuler les informations, avec livrables et questions à poser. Pas de JavaScript pour cette interaction.
- `PreparationChecklist.astro` transforme la liste finale en sept vraies cases, chacune incluse dans son libellé. Le compteur et le bouton de remise à zéro sont masqués dans le HTML initial et révélés uniquement après initialisation.
- Respect des jetons réellement présents dans `global.css` : fonds `--color-snow-*`, encre `--color-gray-*`, accents `--color-blue-*`. Le fond actuel du site est `snow-500` (#f8fafc), pas une nouvelle couleur crème inventée. Largeur de lecture inchangée ; styles locaux suffisamment spécifiques pour les images, listes et liens de `.article-prose`.
- Cibles de libellés, boutons, liens principaux et résumés d’au moins 44 px ; focus visible ; micro-transitions CSS uniquement, supprimées avec `prefers-reduced-motion`. Aucun contenu n’attend une animation pour être visible.

## Cycle de vie et confidentialité

Le custom element encapsule les cases, le compteur et les écouteurs par instance. Définition gardée avec `customElements.get`. `connectedCallback` initialise une seule fois par connexion ; `disconnectedCallback` annule les écouteurs via `AbortController`. Les nouveaux éléments insérés lors des navigations Astro sont automatiquement connectés, sans écouteur global `astro:page-load` à accumuler.

Pas de stockage, pas de requête réseau, pas de formulaire, pas de nom de champ soumis. Les cases fonctionnent sans JS ; seules les aides compteur/reset nécessitent le script. La liste n’est pas jointe à un courriel de contact. Le navigateur peut conserver son propre état de page lors d’un retour historique, sans persistance applicative.

## Vérifications

- `npm run build` : réussite, 28 pages générées ; avertissement préexistant concernant les options Markdown `remarkPlugins`/`rehypePlugins` dépréciées dans Astro.
- `npm run lint` et oxlint ciblé composants/scripts : réussite après correction d’un groupe regex non nommé.
- `node scripts/check-editorial.mjs` : réussite sur les dix articles. Vérification d’une source `.md` OU `.mdx` exactement, routes et SEO existants, présence des trois composants rendus et des liens publics directs, dates, sept cases natives avec labels, outils masqués initialement, volets ouverts et capture légendée.
- `git diff --check` : réussite.
- Vérifications navigateur, navigation Astro, clavier, sans JS, réduction des animations et captures desktop/mobile : confiées à l’agent principal sur le serveur statique local, port 4342. Elles ne sont pas prétendues accomplies par cette note.

Aucune dépendance ajoutée ; aucun commit ou push effectué par le sous-agent.
