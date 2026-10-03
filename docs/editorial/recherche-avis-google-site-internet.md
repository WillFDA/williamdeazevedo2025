# Recherche éditoriale — avis Google sur un site internet

- **Date de recherche :** 3 octobre 2026
- **Marché envisagé :** France, français (`2250/fr`)
- **Site concerné :** `williamdeazevedo.fr` — canonical de la page d’accueil vérifié. Le site se présente comme un développeur front-end freelance et s’adresse notamment aux petites structures.
- **Statut :** recherche pour un article de relecture ; aucun texte publié ni modification du projet OpenSEO.

## Ciblage et limites de mesure

- **Requête principale envisagée :** afficher des avis Google sur son site internet.
- **Requêtes secondaires à valider :** avis clients sur un site internet ; widget d’avis Google ; témoignages clients sur un site vitrine.
- **Intention éditoriale :** comparer les façons de présenter les retours clients et expliquer la différence entre un lien vers une plateforme, une citation choisie et un système de collecte sur le site.
- **Demande, volume, difficulté et classement :** non mesurés. Aucun chiffre n’est avancé.

OpenSEO a été interrogé dans l’ordre demandé : `list_projects`, puis `get_project_context`. Le seul projet disponible est `Default` (`9b6e4752-255c-4c5e-8e3c-d30160f0537f`), marché France/fr, sans domaine déclaré. Son contexte métier, son objectif, son positionnement et son historique de recherche sont vides. `list_reports` ne renvoie aucun rapport et `list_saved_keywords` aucun mot-clé. Le lien de ce projet partagé avec `williamdeazevedo.fr` n’est donc pas établi. Je ne l’ai pas utilisé pour une recherche payante de mots-clés ou de SERP, et je ne l’ai ni modifié ni réaffecté au domaine. Les résultats d’une recherche web exploratoire ne sont pas présentés comme une SERP Google.

## Doublons et différenciation

La branche `origin/2026` a été examinée au commit `199c6a70aa8c7f73daff4a40967df2a1bbd07db0`. La PR #85 est fusionnée ; elle couvre déjà prix, budget mensuel, refonte, cahier des charges, contenus d’artisan, accessibilité, IA, exemples de sites et GEO. Les PR éditoriales ouvertes #95 (fiche Google et site d’artisan), #99 (reprise d’un site après changement de prestataire) et #101 (du clic au contact confirmé) ont été lues sur leurs branches actuelles. La PR #77, également ouverte, réécrit les FAQ de l’accueil et des pages services : sa FAQ artisan mentionne la présentation d’avis, sans détailler le choix lien/citation/widget ni l’éligibilité aux étoiles. L’intention du nouvel article est distincte, mais aucune donnée de requête ne permet de quantifier le chevauchement.

L’article du 30 septembre sur la fiche Google traite principalement de cohérence des informations locales et du parcours de contact. Celui du 2 octobre distingue les clics des demandes réellement reçues. Le présent sujet se limite à **la présentation des avis sur le site** : nature de la preuve, source et contexte, choix entre citation, lien et widget, puis limite des étoiles Google. Il ne reprend ni la checklist de la fiche locale ni le suivi des conversions.

## Pages comparables consultées

1. **France Num, “Comment obtenir des avis clients, y répondre et les mettre en avant ?”** — publication du 9 juillet 2021, mise à jour constatée le 6 juillet 2026. Guide institutionnel large sur la collecte, la réponse et la réputation. Il aborde aussi l’affichage des avis. Son conseil sur les étoiles/rich snippets est confronté à la documentation Google actuelle, plus précise pour les avis portant sur sa propre entreprise.
2. **Simplébo, “Comment afficher ses avis Google sur son site internet ?”** — 22 juillet 2025. Tutoriel orienté widgets, plugins, intégration et emplacement des avis. Le contenu recommande également l’offre locale de son éditeur : ses promesses SEO/conversion sont commerciales, pas des résultats indépendamment vérifiés. L’article n’explique pas la restriction Google sur les avis auto-publiés.

Ces pages servent à comparer le traitement du sujet ; ni leurs formulations ni leurs chiffres marketing ne sont repris comme preuves. La différenciation retenue est un guide de choix transparent qui n’assimile pas témoignage, flux d’avis et système de collecte, et qui ne présente pas les étoiles dans Google comme une conséquence de l’intégration.

## Faits contrôlés dans les sources primaires

- **Google Search Central — Review snippet :** Google dit pouvoir afficher un résultat enrichi si les données sont valides, sans le garantir. Si l’entité évaluée contrôle ses propres avis, ses pages utilisant les données structurées `LocalBusiness` ou `Organization` ne sont pas éligibles aux étoiles ; la règle couvre aussi les avis montrés par un widget tiers.
- **Règlement Google Maps :** une demande neutre d’avis relatant une expérience réelle est autorisée. Les avantages, la pression et la sollicitation sélective d’avis positifs sont interdits.
- **DGCCRF :** les faux avis, leur commande et la modification d’avis de consommateurs pour promouvoir un service sont visés par les règles contre les pratiques trompeuses. Le guide signale également des pratiques de modération biaisée.
- **Ministère de l’Économie :** pour des avis de consommateurs publiés sur le site du professionnel, sa fiche mentionne des informations comme les dates, critères de classement, contreparties, délais de publication/conservation et modalités de contrôle/modération. L’article distingue cette fonctionnalité d’une citation ponctuelle ; il ne donne pas d’avis juridique sur tous les formats.

## Sources consultées

### Comparables

- [France Num — Comment obtenir des avis clients, y répondre et les mettre en avant ?](https://www.francenum.gouv.fr/guides-et-conseils/developpement-commercial/gestion-de-la-relation-client/comment-obtenir-des-avis)
- [Simplébo — Comment afficher ses avis Google sur son site internet ?](https://blog.simplebo.fr/afficher-avis-google-site)
- [France Num / Avis Vérifiés — Les avis clients vérifiés](https://www.francenum.gouv.fr/guides-et-conseils/protection-contre-les-risques/gestion-de-la-reputation-de-lentreprise/les-avis) — dossier explicitement réalisé par un fournisseur d’avis ; consulté comme source commerciale, pas comme référence juridique neutre.

### Références primaires

- [Google Search Central — Review snippet (`Review`, `AggregateRating`)](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
- [Google Maps — Contenus interdits et soumis à des restrictions](https://support.google.com/contributionpolicy/answer/7400114?hl=fr)
- [DGCCRF — Avis en ligne : attention aux faux commentaires !](https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/avis-en-ligne-attention-aux-faux-commentaires)
- [Ministère de l’Économie — Peut-on faire confiance aux avis en ligne ?](https://www.economie.gouv.fr/particuliers/mes-droits-conso/bien-consommer/peut-faire-confiance-aux-avis-en-ligne)

**Limite d’accès le 3 octobre 2026 :** Google Search Central et Google Maps ont répondu HTTP 200 aux requêtes directes. Les deux pages `economie.gouv.fr` ont répondu HTTP 403 depuis cet environnement. L’extrait officiel retrouvé pour la page du ministère confirme les principales informations sur la publication d’avis ; la page DGCCRF n’a pas pu être relue directement aujourd’hui et son lien est à vérifier en relecture. L’article reste un guide éditorial, pas un avis juridique.

## Visuel éditorial

- Illustration originale générée le 3 octobre 2026 avec `gpt-image-2-medium`, 1672 × 941 px ; conversion Lanczos en WebP 1600 × 900.
- Fichier source conservé dans `docs/editorial/visuals/2026-10-03/avis-google-source.png` ; couverture publiée dans `public/articles/avis-google-site-internet/cover.webp`.
- Texte alternatif : « Des extraits de témoignages reliés à leur page source dans l’interface d’un site, sans note ni étoiles affichées. »
- L’illustration montre des cartes génériques et des lignes abstraites, sans marque, texte lisible, note ni citation réelle.
- Captures de la prévisualisation après défilement progressif : `preview-desktop.webp` (haut de l’article) et `preview-mobile-guide.webp` (section « Choisir le format selon le besoin », option fiche Google ouverte). La bulle e-mail mobile chevauche légèrement le paragraphe suivant en bas à droite ; elle n’a pas été masquée pour la capture.

## Publication et approbation

L’article est `draft: true`, daté du 3 octobre 2026. Il restera absent de la production jusqu’à approbation de William et modification explicite de `draft`. Le fichier LinkedIn de la PR est un texte à relire, pas un brouillon enregistré sur LinkedIn. Aucun lien public n’est annoncé avant fusion et déploiement manuels.
