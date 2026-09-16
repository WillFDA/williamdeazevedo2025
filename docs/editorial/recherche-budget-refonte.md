# Recherche éditoriale — budget et refonte

Consultation et rédaction : 16 septembre 2026. Périmètre : quatre articles, sans modification de l’essai existant sur les offres à 600 et 2 000 euros. Reprise de la recherche interrompue, puis relecture des sources utiles et vérification des sources techniques. Les comparatifs commerciaux servent à identifier les questions et les postes, pas à établir un prix moyen indépendant.

## Offre réellement vérifiée

- `src/components/PricingPreview.astro` : offre « Site web », `priceValue: 2000`, architecture, design responsive, développement, SEO technique/performance et mise en ligne. Options affichées : animations 500 €, formulaire personnalisé 500 €, CMS 1 000 €. Le composant affiche les prix HT et présente des budgets de départ.
- Référence publique correspondante : https://williamdeazevedo.fr/#tarifs (lien éditorial ; vérification du code local, pas prétendue vérification indépendante du déploiement).
- `src/content/articles/site-600-euros-vs-site-2000-euros.mdx` lu : essai sur le travail et le positionnement achetés. Les nouveaux articles le relient sans reprendre ses anecdotes ni en inventer d’autres.
- Aucun tarif mensuel de maintenance ni prix universel de refonte déduit de l’offre. Tous les autres montants présentés sont explicitement hypothétiques et hors taxes.

## 1. Prix d’un site vitrine

Fichier : `src/content/articles/prix-site-vitrine.md`.

### Comparables lus

1. https://wecomm.fr/prix-site-vitrine/
   - Lecture du comparatif : prestataires, personnalisation, modules, hébergement, maintenance et contenus.
   - Limites : présentation commerciale, fourchettes sans protocole de baromètre indépendant ; affirmations générales sur la qualité selon le prestataire non reprises.
2. https://mondevis.com/blog/site-vitrine-5-pages-prix/
   - Lecture : livrables à demander, distinction entre contenus et technique, frais de fonctionnement.
   - Limites : fourchettes variables dans l’article, chiffres de conflits et exemples non utilisés comme preuves.

### Source primaire lue

https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=fr

Utilisation : titres, liens, contenu utile, absence de garantie d’indexation ou de première position. Pas de promesse de trafic.

### Angle original et séparation des intentions

Construire le devis à partir des pages que le client doit faire lire, puis décomposer les livrables et les exclusions. Tableau d’une entreprise fictive et simulation pédagogique indépendante de la grille commerciale. Contrairement à l’essai 600/2 000 €, il s’agit d’un outil de préparation budgétaire et non d’un plaidoyer comparatif sur le positionnement.

Le nouvel article `prix-site-vitrine.md`, déjà rédigé avant l’interruption de travail, a été conservé après relecture ; son alt a été aligné sur le manifeste. L’article antérieur `site-600-euros-vs-site-2000-euros.mdx` n’a pas été modifié.

## 2. Coût mensuel d’un site

Fichier : `src/content/articles/cout-site-internet-par-mois.md`.

### Comparables lus

1. https://www.hostinger.com/fr/tutoriels/prix-hebergement-site-internet/
   - URL initialement demandée sans barre finale : https://www.hostinger.com/fr/tutoriels/prix-hebergement-site-internet
   - Lecture des sections sur les types d’hébergement, la durée d’engagement, les inclusions et les paiements mensuels/annuels.
2. https://www.hostinger.com/fr/tutoriels/prix-maintenance-site-internet
   - Lecture des postes domaine, hébergement, messagerie, extensions, assistance et fréquence de maintenance.

Ces deux articles appartiennent au même fournisseur et ne constituent pas deux enquêtes indépendantes. Les prix promotionnels, dollars et moyennes annoncées n’ont pas été transposés en tarifs français prétendument constatés.

### Source primaire lue

https://developer.wordpress.org/advanced-administration/security/backup/

Utilisation : distinction fichiers/base de données, sauvegardes dans différents emplacements, nécessité de prévoir la restauration. Les conseils WordPress sont explicitement limités à ce système, pas attribués à tous les sites.

### Angle original

Séparer coût moyen et décaissement réel, classer quatre familles de dépenses et comparer les engagements sur trois ans. Ajouter les conditions de sortie, les propriétaires des comptes et les dépassements de quotas. Aucun abonnement inventé pour William.

Calculs vérifiés par Python : 24 + 144 + 120 + 600 = 888 €/an ; 888 / 12 = 74 €/mois ; 2 400 + 600 × 3 = 4 200 € ; 150 × 36 = 5 400 €. Simulations, pas devis ni moyennes.

## 3. Prix d’une refonte

Fichier : `src/content/articles/prix-refonte-site-internet.md`.

### Comparables lus

1. https://www.ideagency.fr/blog/prix-refonte-site-internet
   - Lecture : types de projets et de prestataires, nombre de pages, fonctions, design, migration des contenus.
   - Extraction initiale partielle complétée par récupération HTML directe ; article consulté au-delà de son introduction.
2. https://wecomm.fr/devis-refonte-site-internet/
   - Lecture via extraction : introduction, sommaire détaillé et tableau des budgets par type de projet. Recherche associée consultée pour les périmètres.
   - Une tentative de récupération directe complémentaire a renvoyé 403 ; la lecture utile est celle de l’extraction disponible, pas une prétendue lecture HTML intégrale.

### Source primaire lue

https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes?hl=fr

Utilisation : migration, correspondance d’URL, redirections, suivi et fluctuations possibles. La récupération HTML directe de cette documentation a permis de lire les sections techniques au-delà de l’extrait initial.

### Angle original

Décider d’abord entre correction ciblée et reconstruction. Chiffrer ce qu’il faut préserver, rendre les inconnues explicites, prévoir la bascule et les doubles abonnements temporaires. Ni « vieux = à refaire », ni prix à la page présenté comme universel.

Simulation vérifiée : 400 + 900 + 1 200 + 500 = 3 000 € ; avec 600 € de réécriture hypothétique, 3 600 €.

## 4. Refonte et SEO

Fichier : `src/content/articles/refonte-seo.md`.

### Comparables lus

1. https://www.blogdumoderateur.com/refonte-site-web-checklist-seo/
   - Lecture complète des étapes via HTML direct après une extraction initiale partielle : audit, préproduction, arborescence, redirections, sitemap, suivi et backlinks.
2. https://www.webhorspiste.com/blog/refonte-site-web-checklist-seo-referencement-naturel/
   - Lecture complète du corps via HTML direct : raisons de migrer, collecte des URL, contrôle des canoniques, anciens domaines, liens et suivi.
   - Réserves : formulations datées sur Search Console, délai fixe entre étapes, affirmation sur l’affaiblissement du PageRank et diagnostic automatique après un mois non repris. La documentation Google actuelle prime.
3. https://learn.showit.com/en/articles/2321993-seo-checklist-moving-to-showit-or-a-new-site-design
   - Lecture complémentaire en anglais : maintien des URL, redirections et continuité des contenus ; conseils dépendant de Showit non généralisés.

### Sources primaires lues

- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes?hl=fr : inventaire, mappage, 301/308, destination pertinente, 404/410, mise à jour des liens et canoniques, sitemap, changement d’adresse, fluctuations, redirections généralement au moins un an.
- https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=fr : balise noindex, en-tête X-Robots-Tag et nécessité de distinguer blocage d’exploration et désindexation.

### Angle original

Checklist centrée sur les preuves à livrer et les décisions page par page, avec tableau fictif conserver/déplacer/fusionner/supprimer. Distinguer préproduction et production, panne technique et fluctuation, suivi et garantie. L’article répond à une intention opérationnelle, distincte du budget et de l’essai commercial.

### Limites de collecte

Une recherche web a échoué puis a été relancée avec une autre formulation. L’URL exploratoire https://www.luneos.fr/blog/refonte-seo a renvoyé une page 404 : exclue des preuves et de la bibliographie publiée. Les extractions courtes ne sont pas présentées comme des lectures intégrales ; les compléments HTML utiles sont indiqués ci-dessus.

## Contrôles éditoriaux

- Quatre corps d’articles dans la cible de 850–1 300 mots, comptés par séparation des espaces hors frontmatter : 1 175, 1 122, 1 166 et 1 232 mots respectivement.
- Date demandée `2026-09-16`, auteur exact, `draft: false`, vocabulaire de tags autorisé.
- Quatre chemins d’image et textes alternatifs conformes à `scripts/editorial/manifest.json` ; fichiers WebP présents.
- Aucun récit client, résultat de mission, certification ou chiffre de performance inventé.
- Les sources comparables servent à l’analyse des questions ; formulations, structures d’exemples et simulations rédigées indépendamment.
- La validation du build commun et des dix articles relève de l’intégration globale ; cette livraison contrôle les quatre fichiers de son périmètre.
