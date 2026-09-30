# Recherche éditoriale — fiche Google et site internet d’un artisan

Consultation et préparation : 30 septembre 2026. Marché visé : France, langue française (`2250/fr`). Le texte reste `draft: true`. Angle proposé : vérifier les informations qui doivent rester exactes entre une fiche d’établissement Google et le site d’un artisan, en distinguant une entreprise qui reçoit le public d’une activité qui se déplace chez ses clients.

## OpenSEO et limites de mesure

`list_projects` a renvoyé un seul projet, `Default`, ID `9b6e4752-255c-4c5e-8e3c-d30160f0537f`, marché `2250/fr`, sans domaine associé. `get_project_context` a répondu, mais les sections métier, objectif, positionnement, préférences éditoriales et journal de recherche sont vides. Le projet ne confirme donc pas son lien avec `williamdeazevedo.fr` ; aucune donnée de ce contexte partagé n’a été utilisée et aucune modification n’a été faite.

Le 30 septembre, une recherche OpenSEO ciblée a été soumise pour le terme « fiche Google artisan site internet », en France/français (`2250/fr`). L’outil a répondu `INSUFFICIENT_CREDITS` (0 terme recherché sur 1). Il n’existe donc aucun volume, difficulté, intention mesurée, classement ou SERP OpenSEO pour ce sujet ; les formulations du titre et du tableau éditorial restent candidates, pas des mots-clés validés. Le projet n’a ni domaine ni contexte métier confirmant son lien avec le site. Aucune demande de suivi récurrent n’a été créée.

## Corpus inspecté et différenciation

Base éditoriale consultée : `origin/2026` au commit `d499610af93dac15fa74a8cbdecc2c1fc575f61c`. Les guides existants couvrent notamment le prix, le coût mensuel, le cahier des charges, les contenus d’un site d’artisan, la refonte et le SEO, l’accessibilité, l’IA/GEO et les mentions légales. Le guide `site-internet-artisan-contenus` traite déjà de la zone d’intervention et met en garde contre les pages de ville sans utilité propre ; le nouvel article ne le réécrit pas et n’ajoute pas de série de pages locales. La landing `/creation-site-internet-artisan/` cible une prestation commerciale ; l’article répond à une question informative sur la cohérence des informations entre les supports.

La PR éditoriale #85 est fusionnée. La seule PR ouverte issue de l’inventaire complet est #77, consacrée aux FAQ de pages commerciales : elle ne contient pas cet article. La PR #94 et sa branche `WIL/editorial-2026-09-29` sont fusionnées. Aucune PR ni branche `WIL/editorial-2026-09-30` ni aucun fichier portant le slug n’existaient au contrôle préalable.

## Comparables réellement lus

1. [France Num / Simplébo — Google Business Profile : le service de référencement indispensable à la visibilité locale](https://www.francenum.gouv.fr/guides-et-conseils/communication-et-publicite/referencement/google-business-profile-le-service-de) (publié le 24 octobre 2025, mis à jour le 17 mars 2026 selon la page ; lecture par TinyFish le 30 septembre 2026). Guide pratique centré sur la création, la complétion, les avis et les statistiques de la fiche. Le contenu est rédigé par Simplébo, prestataire commercial : ses recommandations et chiffres promotionnels ne sont pas traités comme preuves indépendantes. Il répond à l’optimisation de la fiche, tandis que l’angle ici est le parcours et la cohérence avec le site.
2. [Partoo — Google My Business : le guide complet pour votre référencement local](https://www.partoo.co/fr/presence-en-ligne/google-my-business/) (consulté le 30 septembre 2026). Guide plus large sur la gestion et les facteurs de visibilité, publié par un fournisseur de solutions de présence locale. Les pourcentages et affirmations commerciales de la page n’ont pas été repris ; elle sert à repérer les questions de complétude, d’avis et de coordonnées.
3. [Shine — Artisans : comment améliorer votre référencement local ?](https://www.shine.fr/blog/referencement-local-artisan) (consulté le 30 septembre 2026). Met en regard fiche, site et annuaires ; c’est le comparable le plus proche de l’audience visée. Le texte présente la localisation comme critère principal et recommande des pages par ville. Ces simplifications ne sont pas reprises : la documentation Google décrit plusieurs facteurs de classement, et le guide déjà présent dans le dépôt avertit contre les pages locales sans valeur propre.

Les trois pages ont été ouvertes et leurs corps extraits, pas seulement repérées dans des extraits de recherche. Les faits Google ci-dessous priment sur les affirmations marketing des comparables.

## Sources primaires consultées

- [Google — Conseils pour améliorer votre classement local](https://support.google.com/business/answer/7091?hl=fr), récupéré en français le 30 septembre 2026 : informations complètes et exactes, pertinence, distance et proéminence ; pas de demande payante ou garantie de meilleur classement.
- [Google — Consignes relatives à la représentation d’un établissement](https://support.google.com/business/answer/3038177?hl=fr), récupéré le 30 septembre 2026 : nom représenté dans la réalité, téléphone ou site représentant l’établissement, précision de l’adresse/zone, une fiche par établissement, règles des entreprises de services à domicile.
- [Google — Gérer l’adresse d’un établissement](https://support.google.com/business/answer/2853879?hl=fr) et [les zones desservies](https://support.google.com/business/answer/9157481?hl=fr), récupérés le 30 septembre 2026 : l’adresse de la fiche est publique ; lorsqu’une entreprise ne reçoit pas de clients sur place et se rend chez eux, elle peut/ doit masquer l’adresse dans ce contexte et indiquer sa zone ; une activité mixte répond à des conditions différentes.
- [Service Public — Mentions d’un site d’entrepreneur individuel](https://entreprendre.service-public.fr/vosdroits/F31228) et [d’une société](https://entreprendre.service-public.fr/vosdroits/F37351). Ces deux références figuraient déjà dans la note de recherche du 29 septembre, après vérification de leurs périmètres distincts. Elles fondent uniquement la précaution selon laquelle le réglage d’adresse Google ne détermine pas les mentions légales d’un site.

## Angle, vérifications et exclusions

Le texte distingue fiche de découverte/contact et site de détail/confiance, puis propose une fiche de référence, une vérification des cas d’adresse/zone desservie et une revue du parcours mobile. Il ne présente pas la cohérence NAP comme un facteur de classement démontré, ne prétend pas que le site augmente à lui seul le classement de la fiche, et n’assimile pas vue, clic, appel lancé, demande reçue et vente.

Aucun volume, classement, résultat commercial, tarif, expérience client ou promesse de trafic n’est avancé. Aucun partenariat Persistance n’est pertinent pour cet angle. L’illustration de couverture est symbolique, générée pour l’article, sans logo Google, texte, avis ou métriques. Le lien interne renvoie à la landing artisan existante, sans lien vers un article `draft: true`.

Publication : après relecture et accord de William, vérifier le statut de l’entreprise et le contenu métier, choisir la date de publication, passer `draft` à `false`, puis fusionner manuellement dans `2026` et déployer. L’URL n’est pas annoncée comme publique avant vérification du déploiement.
