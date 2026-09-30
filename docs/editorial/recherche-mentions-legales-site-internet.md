# Recherche éditoriale — mentions légales d’un site professionnel

Consultation : 29 septembre 2026. Marché ciblé : France/français. Article préparé en `draft: true` pour éviter toute publication avant validation de William.

## État OpenSEO et limites de ciblage

La commande `list_projects` a renvoyé un projet `Default` avec le marché `2250/fr`, mais sans domaine déclaré. `get_project_context` a retourné des sections business overview, objectif, positionnement, préférences de rédaction et journal de recherche vides. Le projet n’établit donc pas de correspondance avec `williamdeazevedo.fr` et aucune donnée métier de ce contexte n’a été utilisée. Aucun projet partagé n’a été modifié.

La recherche OpenSEO `research_keywords` pour la requête `mentions légales site internet`, avec le marché France/fr (2250), a échoué avec `INSUFFICIENT_CREDITS`. Une demande complémentaire `get_keyword_metrics` pour la même requête a également échoué avec `INSUFFICIENT_CREDITS`. Pas de volume, difficulté, intention mesurée, historique, SERP ni conclusion de positionnement disponibles. Aucun chiffre n’est estimé ou extrapolé ; aucun autre appel payant n’a été tenté après ces retours. La SERP OpenSEO n’a donc pas été collectée.

Le sujet est retenu à titre éditorial parce qu’il complète le corpus existant et s’adresse à des TPE/artisans qui préparent ou mettent à jour un site professionnel. Ce choix n’est pas une validation de demande de recherche : le projet OpenSEO doit être relié au bon site et disposer de crédits avant d’interpréter le potentiel SEO.

## Corpus et différenciation

L’`origin/2026` inspectée est au commit `c46a4c7245d1ccffa5bf6de16baf315110e9b5e6`, après la fusion de la PR #85. Le dépôt contient notamment le guide `site-internet-artisan-contenus`, qui traite du choix des rubriques et mentionne brièvement les informations légales au moment de préparer un formulaire, ainsi qu’un cahier des charges, des guides sur le budget, la refonte, l’accessibilité et l’IA/GEO. La présente proposition se limite à une checklist de vérification : statut de l’éditeur, hébergeur, fonctionnalités du site et distinction entre documents/régimes voisins. Elle ne refait ni la rédaction des contenus de pages, ni un guide général de création de site.

Les PR ouvertes vérifiées le 29 septembre sont #89 (dépendances), #86 (intentions SEO/pages tarifaires) et #77 (FAQ/structure du site). Aucune PR éditoriale n’est ouverte et aucune branche/PR `WIL/editorial-2026-09-29` n’existait avant la création de la branche dédiée.

## Comparables réellement consultés

1. [France Num — Quelles sont les mentions légales pour un site internet professionnel ?](https://www.francenum.gouv.fr/guides-et-conseils/developpement-commercial/site-web/quelles-sont-les-mentions-legales-pour-un-site), fiche publiée en 2021 et mise à jour le 25 juillet 2025. Le guide traite de l’identification, de la structure, des données personnelles et des cookies. Il montre la richesse du besoin mais regroupe des obligations distinctes ; il ne sert pas de texte juridique exhaustif ni de modèle à reprendre.
2. [Siteline — Mentions légales, CGV, RGPD : ce que tout site d’artisan doit contenir](https://siteline.fr/blog/sites-internet-vitrine/mentions-legales-site-internet-artisan/), consulté dans sa version datée du 16 février 2026. La page vise directement les artisans et propose une checklist mêlant identification, CGV, données et cookies. Plusieurs assertions sont formulées sans condition de statut ou de fonctionnalité (par exemple bannière de cookies, CGV ou lien vers une plateforme de litiges) ; elles ne sont pas reprises sans validation dans les sources officielles.
3. [Legalstart — Mentions légales : exemples et explications](https://www.legalstart.fr/fiches-pratiques/proteger-une-creation/mentions-legales/), mis à jour le 2 mars 2026. Le guide détaille les types de mentions et propose son générateur. Source commerciale utile pour repérer les questions et le vocabulaire, mais pas source de droit ; son exemple d’entreprise ne doit pas servir de modèle universel.

Aucune formulation ni organisation distinctive de ces contenus n’a été reprise. Les comparables servent à confronter la couverture du sujet et ses limites, pas à prouver une demande ou un résultat commercial.

## Sources primaires consultées et décisions éditoriales

- [Service Public — Mentions obligatoires sur le site internet d’un entrepreneur individuel](https://entreprendre.service-public.fr/vosdroits/F31228). La fiche consultée est indiquée comme vérifiée le 31 juillet 2023. Elle détaille l’identité et la mention « entrepreneur individuel » ou « EI », le courriel et le téléphone de contact, les références d’immatriculation et de TVA, les coordonnées de l’hébergeur (nom, adresse, téléphone), ainsi que l’autorité d’agrément en cas d’activité réglementée. L’article invite à vérifier l’applicabilité selon le statut et l’activité.
- [Service Public — Mentions obligatoires sur le site internet d’une société](https://entreprendre.service-public.fr/vosdroits/F37351). Fiche séparée pour une société, citée pour distinguer la dénomination, la forme juridique, le siège social et le capital des mentions propres à l’entrepreneur individuel.
- [Service Public — Faire du commerce en ligne : règles à respecter](https://entreprendre.service-public.fr/vosdroits/F23455). La page indique avoir été vérifiée le 21 janvier 2026. Elle distingue les informations de vente et la clientèle ; elle signale qu’à compter du 19 juin 2026, une fonctionnalité en ligne de rétractation doit être proposée au consommateur pour les contrats à distance concernés. Le texte reste prudent et précise que les mentions légales ne remplacent pas les règles du parcours de vente.
- [CNIL — RGPD en pratique : communiquer en ligne](https://www.cnil.fr/fr/rgpd-en-pratique-communiquer-en-ligne). La section relative aux sites vitrines mentionne l’information au niveau du formulaire, un moyen électronique d’exercer les droits et les mentions identifiant l’éditeur. Le texte de l’article distingue donc les mentions légales des informations liées aux traitements.
- [CNIL — Cookies et traceurs : que dit la loi ?](https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi), datée du 29 septembre 2020 lors de la consultation. La page distingue traceurs soumis au consentement préalable et traceurs exemptés, avec des conditions. L’article reste volontairement général et renvoie à la CNIL ; il ne dit pas qu’un bandeau est toujours nécessaire ou qu’un outil d’audience est automatiquement exempté.
- La page [Légifrance — loi LCEN, article 6](https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000054744218) a été recherchée mais la récupération directe a renvoyé `bot_blocked`. Elle n’est pas utilisée pour une interprétation détaillée dans le brouillon. L’article renvoie aux fiches administratives consultées pour les explications pratiques.
- La page du ministère de l’Économie sur les mentions légales apparaît dans les résultats de recherche avec une checklist générale EI/société et des activités particulières, mais la récupération directe du corps a été bloquée. Elle n’est pas utilisée comme preuve détaillée dans le texte.

## Angle retenu et contrôles de prudence

Angle : préparer une vérification avant publication, plutôt que fournir un exemple de mentions à copier. Le déroulé part du type de site, identifie l’éditeur et l’hébergeur, puis sépare les mentions légales, l’information RGPD au formulaire, les cookies/traceurs et les règles de vente à distance. Le développeur peut intégrer et tester les pages ; les informations exactes sur le statut, l’activité et les traitements doivent être validées par l’entreprise et, si nécessaire, un conseil compétent.

Aucun témoignage, tarif, classement, volume, gain de trafic ou expérience personnelle n’est avancé. Pas de partenariat Persistance : il n’est pas pertinent pour cet angle juridique. La couverture a été générée comme illustration éditoriale sans texte lisible et son alternative décrit uniquement les éléments visibles. Le lien interne renvoie à la page existante de création de site pour artisan ; aucun article masqué n’est lié.

## Publication

Le frontmatter reste `draft: true`; le build de production doit donc exclure la page, le listing et le sitemap. La PR est laissée en brouillon tant que l’OpenSEO ne peut pas fournir les données ciblées et que la correspondance du projet avec le site n’est pas établie. Une validation éditoriale et métier de William reste requise avant de changer le statut du contenu.

## Révision du 30 septembre 2026

Article passé en MDX avec trois composants : comparaison EI / société (`PublisherIdentity`), carte des quatre sujets voisins (`LegalPagesMap`) et checklist interactive (`PreparationChecklist` paramétrée). Ajouts vérifiés sur les fiches Service Public F31228 et F37351 relues le 30 septembre : sanctions (1 an d’emprisonnement et 75 000 € d’amende pour un entrepreneur individuel, 375 000 € d’amende pour une société) et lien vers la médiation de la consommation pour les ventes aux particuliers. Le directeur de la publication est mentionné d’après l’article 6 de la LCEN ; Légifrance restant inaccessible à la récupération automatique, ce point doit être confirmé à la relecture.
