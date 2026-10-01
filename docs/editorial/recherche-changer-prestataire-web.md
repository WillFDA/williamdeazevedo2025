# Recherche éditoriale — changer de prestataire web

Consultation : 1er octobre 2026. Marché visé : France/français. Slug : `changer-prestataire-web`. L’article est préparé en `draft: true` et n’a pas d’URL publique.

## OpenSEO : état du projet et limites

`list_projects` renvoie un seul projet `Default`, ID `9b6e4752-255c-4c5e-8e3c-d30160f0537f`, marché `2250/fr`, sans domaine déclaré. `get_project_context` répond, mais les rubriques métier, l’objectif, le positionnement, les préférences éditoriales et le journal de recherche sont vides. La correspondance entre ce projet partagé et `williamdeazevedo.fr` n’est donc pas établie.

Aucun appel payant de recherche de mots-clés ou de SERP n’a été effectué : utiliser un projet sans domaine ni contexte confirmé reviendrait à réemployer des données partagées sans preuve qu’elles s’appliquent au site. Le journal OpenSEO disponible est vide. Aucun volume, KD, CPC, historique, SERP, classement ou intention n’est avancé ; aucun rapport ni suivi récurrent n’a été créé. Search Console n’a pas fourni de mesure pour ce sujet. La requête « changer de prestataire pour son site internet » est un angle éditorial à valider, pas une demande de recherche mesurée.

## Corpus, pages et PR inspectés

- Base examinée : `origin/2026` au commit `e816ca7166d4940d30db3e16650ea0d60eddac36`.
- PR #85 (`WIL/articles-seo-geo`) est fusionnée. Ses guides couvrent notamment les prix et coûts d’un site, la refonte et le SEO, le cahier des charges, les contenus d’un site d’artisan, l’IA, l’accessibilité, le GEO et les mentions légales. Les recherches documentaires de cette série ont été relues dans `docs/editorial/README.md` et ses notes `recherche-*.md`.
- Parmi les textes existants, `cout-site-internet-par-mois` parle brièvement de maîtrise des comptes ; `prix-refonte-site-internet` évoque les accès à récupérer ; `cahier-des-charges-site-internet` demande de prévoir les accès et la remise. Le nouvel article ne refait ni le budget, ni le brief de création, ni la migration SEO : il détaille l’inventaire opérationnel et l’ordre de passation entre prestataires. Aucun lien vers ces articles n’est ajouté, car les brouillons du corpus ne sont pas publics.
- La PR éditoriale #95 est toujours ouverte en brouillon sur « Fiche Google et site internet d’un artisan ». L’article du jour n’en reprend pas le sujet. La PR #77 ouverte concerne les FAQ et pages de service, pas un article éditorial. Aucune branche ni PR `WIL/editorial-2026-10-01` n’existait avant la création de la branche isolée du jour.
- La page commerciale actuelle `/refonte-site-internet/` a été contrôlée sur `origin/2026` : elle présente l’audit de l’existant, la conservation des pages, la reconstruction et la préparation des redirections. Le lien de l’article renvoie uniquement vers cette page, sans promettre une offre de transfert ou de dépannage spécifique.

## Articles comparables consultés

1. [La Coquille Web — Ce qu’il faut savoir pour changer d’agence web](https://lacoquilleweb.com/quil-faut-savoir-changer-dagence-web/), page datée de 2017 avec métadonnée de mise à jour ultérieure. Les sections récupérées abordent le registrar, les contacts, le courriel et les fichiers du site. C’est une checklist utile pour repérer les questions ; certains délais et affirmations générales sur les domaines, les e-mails ou les droits sont datés ou dépendants de la configuration. Ils ne sont pas repris comme règles.
2. [Mission Internet — Comment changer de webmaster ou d’agence web en toute sécurité ?](https://www.mission-internet.fr/comment-changer-de-webmaster-ou-dagence-web-en-toute-securite/), publié en 2019. Le texte souligne sauvegarde, accès au domaine et précautions de bascule. Il s’agit d’un article d’agence comprenant un récit fourni par l’éditeur ; les risques et délais présentés ne sont pas traités comme une preuve indépendante.

Ces sources secondaires servent à comparer les questions abordées, pas à démontrer un volume de recherche ou à fournir des formulations à reprendre.

## Sources primaires vérifiées

- [Afnic — Gérer son nom de domaine](https://www.afnic.fr/noms-de-domaine/tout-savoir/gerer-son-nom-de-domaine/) et [FAQ de l’Afnic](https://www.afnic.fr/noms-de-domaine/faq/) : l’Afnic décrit le changement de bureau d’enregistrement pour les extensions gérées par elle, dont `.fr`, avec un code `Auth_info`. La FAQ distingue l’opération de transfert du nom et sa gestion technique. L’article ne généralise pas cette procédure aux `.com` ou autres extensions.
- [ICANN — Inter-Registrar Transfer Policy](https://www.icann.org/en/contracted-parties/accredited-registrars/resources/domain-name-transfers/policy) : politique applicable dans son champ, aux transferts entre registrars concernés. Les délais ou blocages de 60 jours ne sont pas présentés comme universels.
- [OVHcloud — Éditer une zone DNS](https://docs.ovhcloud.com/fr/guides/web-cloud/domains/dns-zone-edit) : la documentation avertit qu’une ancienne zone DNS peut cesser de s’appliquer après un changement de serveurs si la nouvelle zone n’a pas été préparée. La documentation est propre à OVHcloud ; le texte ne généralise pas l’interface ni les délais du fournisseur.
- [WordPress.org — Backups](https://developer.wordpress.org/advanced-administration/security/backup/) : documentation WordPress sur la sauvegarde de la base et des fichiers. Cette composition n’est pas attribuée à tous les CMS ou sites développés sur mesure.
- [ANSSI — Gestion des identités, ReCyF en pratique](https://messervices.cyber.gouv.fr/documents-guides/Fiche_Gestion-des-identites_Protection_VF.pdf), version septembre 2026 : la fiche se dit non prescriptive et destinée à un contexte technique déterminé. Elle sert uniquement à soutenir une recommandation de comptes identifiables et d’accès retirés lorsqu’ils ne sont plus nécessaires ; aucune obligation n’est généralisée à toutes les TPE.
- [CNIL — RGPD, chapitre IV, article 28](https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre4#Article28) : base pour conseiller de vérifier les clauses sur les données personnelles lorsque le prestataire intervient comme sous-traitant. Cette exigence ne vaut pas transfert automatique des fichiers de code, des licences ou des droits d’auteur.

## Angle et limites éditoriales

Angle différenciant : traiter le changement comme une passation de contrôle, pas comme un transfert de domaine par défaut. Le guide sépare registrar, DNS, hébergement, CMS/fichiers, e-mail et comptes associés ; il recommande d’inventorier et de sauvegarder avant de décider ce qui change, de valider la nouvelle version avant la bascule et de révoquer ensuite les accès devenus inutiles.

Aucune affirmation générique n’est faite sur la propriété juridique du site ou du code : les livrables, licences, contenus et droits doivent être vérifiés dans les documents applicables. Aucun délai de migration, prix, témoignage, résultat SEO, volume ou garantie d’absence d’interruption n’est inventé. La checklist interactive réutilise le composant Astro existant ; ses cases restent utilisables sans JavaScript et ses réponses ne sont pas enregistrées ni transmises.

Publication : conserver `draft: true` jusqu’à validation de William. Après accord, vérifier les informations spécifiques au projet, choisir la date de publication, passer `draft` à `false`, puis fusionner manuellement dans `2026` et déployer. Le post LinkedIn est un fichier Markdown d’approbation, pas un brouillon enregistré dans LinkedIn.
