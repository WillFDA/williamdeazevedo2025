# Recherche éditoriale : IA, accessibilité et GEO

Consultation et rédaction : 16 septembre 2026. Périmètre : `creer-site-internet-ia`, `tester-accessibilite-site-web`, `referencement-chatgpt`. Les deux premiers textes ont été conservés après relecture ; corrections limitées aux métadonnées, à une attribution Wix et à une référence juridique. Le troisième a été rédigé intégralement.

Méthode : recherche de comparables, lecture du contenu des pages (et des passages intermédiaires en cache lorsque l’extraction était tronquée), puis vérification des affirmations dans les sources qui en sont responsables. Les comparables servent à repérer les questions et les angles insuffisamment traités, pas à fournir des formulations. Aucun essai client, gain de trafic, délai de production ou expérience personnelle n’a été inventé. Les exemples sont des consignes ou des situations explicitement hypothétiques. Les recherches du travail interrompu ont été identifiées dans la trace de délégation, puis les sources utiles ont été rouvertes.

## 1. Créer un site internet avec l’IA

### Deux articles comparables lus

1. [Wix — Comment créer un site web avec l’IA : le guide complet](https://fr.wix.com/blog/comment-creer-un-site-web-avec-l-ia). Guide français structuré autour du brief, de la génération, de la personnalisation et de la publication. Utile pour identifier la demande d’un débutant. Source commerciale : les affirmations de résultat professionnel automatique, de responsive parfait et d’économie ne sont pas reprises comme garanties. Sa FAQ distingue démarrage gratuit et options de domaine/e-commerce payantes.
2. [Madra — Créer un site web professionnel avec l’IA : le guide complet](https://madra.io/blog/creer-site-web-ia). Présente constructeurs, assistants conversationnels et service accompagné ; insiste sur la relecture et les coûts récurrents. Fort biais en faveur de son offre. Non retenus : durées minimales universelles, prix généralisés, prétendue impossibilité des chatbots à produire du design, absence de SSL imputée aux offres gratuites sans vérification, efficacité SEO promise.

### Sources primaires et décisions

- [Page officielle du créateur IA Wix](https://fr.wix.com/ai-website-builder) : génération par conversation, modifications et publication. Elle a été lue, mais sa version consultée ne formulait pas précisément la restriction sur les paiements invoquée dans le brouillon. Le texte pointe désormais vers le guide Wix ci-dessus et parle de fonctionnalités e-commerce, sans inventer un forfait ou un tarif.
- [Google Search Central — contenu généré par IA](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content?hl=fr) : IA possible pour rechercher et structurer ; génération de nombreuses pages sans valeur ajoutée susceptible d’enfreindre la politique contre l’abus de contenu à grande échelle. Aucun automatisme « contenu IA = pénalité » retenu.

Angle propre : choisir les responsabilités que l’on garde, préparer les faits commerciaux, tester une page et son formulaire, examiner l’exploitation et les conditions de sortie. Le texte ne classe pas les outils et ne promet aucun résultat commercial. Tags : `création de site`, `IA`, `site vitrine`.

## 2. Tester l’accessibilité d’un site web

### Deux guides comparables lus

1. [DesignGouv — Diagnostic flash](https://design.numerique.gouv.fr/outils/diagnostic-flash/) : contrôle rapide et explicitement partiel, navigation au clavier, contrastes, formulaires, structure et agrandissement. Utile pour la forme d’une vérification accessible aux non-spécialistes. Les seuils techniques ont été revérifiés au W3C plutôt que repris depuis les simplifications du guide.
2. [MDN — Outils d’accessibilité et technologies d’assistance](https://developer.mozilla.org/fr/docs/Learn_web_development/Core/Accessibility/Tooling) : outils automatiques, WAVE/axe/Lighthouse, apprentissage de NVDA et VoiceOver, tests utilisateurs. Confirme qu’aucun outil automatique ne suffit à établir une vision complète. Lecture des explications, du tableau des commandes et des exemples de tests ; l’article publié ne prétend pas reproduire un audit.

### Sources primaires et points vérifiés

- [W3C — contraste minimum, WCAG 2.2 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) : niveau AA, 4,5:1 pour le texte courant, 3:1 pour le grand texte ; seuil de grand texte à 18 points ou 14 points en gras. Exceptions pour logotypes et certains textes accessoires ; ne pas confondre points et pixels CSS ni arrondir un ratio insuffisant.
- [W3C — contraste non textuel 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) : 3:1 pour l’information visuelle nécessaire à l’identification des composants/états et des graphiques concernés, avec exceptions. Une bordure de bouton n’est pas toujours exigée. Le seuil ne s’applique pas indistinctement à toute décoration.
- [W3C — redimensionnement 1.4.4](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) : agrandissement jusqu’à 200 % sans perte de contenu ou de fonctionnalité ; ne pas confondre ce test avec celui de redistribution.
- [W3C — redistribution 1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) : 320 pixels CSS pour un contenu à défilement vertical, équivalence d’une fenêtre de 1 280 pixels CSS à 400 % ; exceptions pour les parties nécessitant réellement deux dimensions, dont cartes et tableaux. L’exception ne rend pas toute une page exemptée.
- [W3C — libellés des formulaires](https://www.w3.org/WAI/tutorials/forms/labels/) : association du libellé au contrôle, idéalement explicite ; intitulé visuel voisin insuffisant pour prouver l’association. Les libellés masqués ont des usages spécifiques, sans justifier le remplacement général par un placeholder.
- [W3C — compatibilité clavier](https://www.w3.org/WAI/perspective-videos/keyboard/fr) : commandes utilisables sans souris, composants natifs, ordre de tabulation logique. La traduction signale une version anglaise plus récente ; les principes utilisés sont également présents dans DesignGouv et MDN.
- [DINUM — champ d’application du RGAA](https://accessibilite.numerique.gouv.fr/obligations/champ-application/) : article 47, catégories d’organismes publics/privés et seuil de chiffre d’affaires pour certaines entreprises, exemptions et dérogations encadrées. Ce périmètre ne doit pas être présenté comme l’ensemble des obligations françaises. Le texte n’affirme ni que tout site vitrine doit publier une déclaration ni qu’une petite entreprise est nécessairement exemptée de tout régime sectoriel. Il ne confond pas WCAG 2.2 et norme juridique automatiquement applicable.

Angle propre : relever un obstacle reproductible, documenter l’état de l’interface, prioriser les blocages du parcours de contact et retester. L’absence d’erreurs automatiques n’est jamais annoncée comme conformité. Tags : `accessibilité`, `site vitrine`.

## 3. Référencement sur ChatGPT / GEO

### Deux articles comparables lus

1. [WebRankInfo — Comment optimiser son référencement sur ChatGPT Search](https://www.webrankinfo.com/dossiers/ia/chatgpt-search). Liste de pistes techniques, contenu, indexation, liens et robots. Utile pour repérer la confusion possible entre agents OpenAI. L’instruction de ne bloquer aucun des trois agents n’est pas reprise : la documentation OpenAI rend indépendants recherche et entraînement. Pas de reprise des assertions sur le modèle sous-jacent, le fournisseur de chaque recherche ou un effet assuré des mises à jour.
2. [Abondance — Ce que le GEO change pour le SEO local](https://www.abondance.com/20260402-2090914-ce-que-le-geo-change-concretement-pour-le-seo-local.html). Article explicitement sponsorisé par Foxglove, orienté entreprise locale, informations d’activité, sources tierces et contenus. Retenu comme inventaire de besoins de prospects, pas comme preuve de causalité. Non repris : pourcentages d’études hors contexte, impossibilité absolue d’être cité avec une page courte, augmentation « mécanique » de la citation grâce à Schema.org ou FAQPage.

### Sources primaires et points vérifiés

- [OpenAI — Overview of OpenAI Crawlers](https://platform.openai.com/docs/bots) : OAI-SearchBot pour la recherche ; GPTBot pour des contenus susceptibles de servir à l’entraînement ; ChatGPT-User pour certaines actions d’utilisateurs, non utilisé pour déterminer l’éligibilité à Search. Réglages indépendants. Autoriser OAI-SearchBot tout en bloquant GPTBot est explicitement possible. Vérifier aussi l’hébergement/CDN et les plages IP publiées, sans supprimer toutes les protections.
- [OpenAI — Searching the web with ChatGPT](https://help.openai.com/en/articles/9237897-chatgpt-search) : absence de placement garanti ; citations possibles, parfois incomplètes ou incorrectes ; influence possible du contexte et de la localisation. Une réponse testée n’est pas un classement général stable.
- [OpenAI — Publishers and Developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq) : accès OAI-SearchBot pour les résumés/extraits et paramètre de provenance `utm_source=chatgpt.com`. Un blocage d’exploration n’empêche pas nécessairement tout lien de navigation ; pas de promesse de suppression totale dans le texte.
- [Google — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) : base SEO, page indexée et éligible avec extrait pour les liens d’appui dans AI Overviews/AI Mode. Cette page, datée de décembre 2025 à la consultation, décrit un suivi dans le rapport Web.
- [Google — Optimizing your website for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) : guide plus récent, daté du 10 juillet 2026 à la consultation. Confirme l’absence de fichier IA ou de balisage spécial nécessaire, précise que Google Search n’utilise pas `llms.txt` comme dispositif spécial et ne demande aucun Schema.org spécifique. Mentionne désormais un réglage d’inclusion et un rapport de performance IA générative dans Search Console. Le texte cite ce guide récent et évite l’affirmation datée selon laquelle aucun rapport distinct n’existerait.
- [Journal documentaire Google, retrait de FAQ rich result](https://developers.google.com/search/updates#removing-faq-rich-result) : l’ancienne URL de documentation FAQPage redirige ici. Le journal indique arrêt d’affichage à compter du 7 mai 2026 puis retrait de la documentation en juin. L’article ne recommande donc pas l’ancien dispositif de résultats enrichis FAQ comme levier IA.

Angle propre : séparer accès, sélection/citation et apport commercial ; expliquer les robots sans imposer une configuration à copier aveuglément ; enrichir une prestation réelle ; suivre des observations datées puis les contacts. Le menuisier est explicitement fictif. Aucune promesse de citation, aucun résultat inventé, aucun coefficient GEO et aucune longueur prétendument optimale pour les IA. Tags : `SEO`, `IA`, `site vitrine`.

## Limites de collecte et contrôles éditoriaux

Une première adresse OpenAI FAQ contenait un identifiant erroné et retournait une page absente ; la bonne page a été retrouvée par recherche puis lue. Une tentative de page Wix d’assistance et une tentative de fiche DGCCRF ont également retourné des pages absentes ; elles ne servent pas de sources. L’énoncé Wix a été limité à ce que son guide lu établit. Le volet juridique reste volontairement borné, sans conclusion sur le statut d’un lecteur.

Les textes utilisent le schéma de frontmatter de la collection Astro existante, la date `2026-09-16`, l’auteur William De Azevedo et `draft: false`. Les descriptions alternatives des trois couvertures sont celles du manifeste, recopiées exactement. Aucun fichier d’image, composant, configuration ou autre article n’est modifié dans cette intervention.
