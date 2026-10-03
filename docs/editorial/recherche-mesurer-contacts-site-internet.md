# Recherche éditoriale — mesurer les contacts d’un site

Consultation : 2 octobre 2026. Marché éditorial visé : France/français. Article proposé : `src/content/articles/mesurer-contacts-site-internet.mdx`. Il reste en `draft: true` en attente de relecture et de validation de William.

## OpenSEO : données disponibles et limites

`list_projects` renvoie un projet unique `Default`, ID `9b6e4752-255c-4c5e-8e3c-d30160f0537f`, marché `2250/fr`, sans domaine. `get_project_context` répond, mais le domaine, l’activité, l’objectif, le positionnement, les préférences éditoriales et le journal de recherche ne sont pas renseignés. La liaison de ce projet partagé à `williamdeazevedo.fr` n’est donc pas établie.

`list_saved_keywords` : aucun mot-clé enregistré. `list_reports` : aucun rapport enregistré. Aucune recherche payante de mots-clés ou de SERP n’a été relancée, et aucun suivi n’a été créé. Faute de contexte de domaine vérifiable, les données de ce projet ne sont pas attribuées au site. Aucun volume, CPC, difficulté, classement ni intention mesurée n’est avancé. « Mesurer les contacts d’un site internet » est un angle de travail à valider, pas une requête dont la demande a été mesurée.

## Corpus et différenciation

- La branche `origin/2026` a été récupérée et contrôlée au commit `e816ca7166d4940d30db3e16650ea0d60eddac36`.
- La PR #85, fusionnée le 28 septembre, apporte dix guides sur les prix, les coûts récurrents, la refonte, le cahier des charges, les sites vitrines et artisans, l’IA, l’accessibilité et le GEO. Les notes `recherche-budget-refonte.md`, `recherche-projet-exemples-artisans.md` et `recherche-ia-accessibilite-geo.md` ont été lues : les angles séparent les recommandations des preuves, les exemples des résultats mesurés, et les offres vérifiées des simulations.
- PR #95 reste ouverte en brouillon sur la fiche Google et le site d’un artisan ; PR #99 reste ouverte en brouillon sur la passation entre prestataires ; PR #77 concerne les FAQ et pages de service. Aucun de ces sujets n’est repris.
- Les pages commerciales existantes présentent création de site et parcours de contact. L’article traite du contrôle des mesures après mise en ligne, et non de la création d’une page de conversion ou d’une promesse commerciale.
- Deux pages secondaires consultées par TinyFish abordent déjà largement le sujet des leads : [Digitalead — Comment mesurer les demandes générées par un site web ?](https://digitalead.fr/mesurer-demandes-site/) (page déclarée publiée le 10 septembre 2026 dans les métadonnées extraites) et [Big Neurons — Votre site web génère-t-il vraiment des leads ?](https://www.bigneurons.com/big-bang/site-web-qui-genere-des-leads/) (page déclarée publiée en mars 2026 et mise à jour en septembre dans les métadonnées extraites). Les extractions étaient partielles ; elles suffisent à constater un chevauchement éditorial général, pas à établir le classement Google ni le volume de recherche.

Différenciation retenue : expliquer la qualité de la preuve, canal par canal. Séparer clic, demande effectivement reçue, qualification et résultat commercial ; conserver les cas inconnus ; ne pas compter plusieurs interactions d’un même parcours comme plusieurs clients. Les comparables n’ont fourni ni structure ni formulations à réutiliser.

## Sources primaires vérifiées

Les pages officielles suivantes ont été lues le 2 octobre 2026 avec TinyFish `fetch_content` :

1. [Google Analytics — Événements recommandés](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?hl=fr). La documentation décrit des événements supplémentaires que l’éditeur peut configurer, dont `generate_lead`. L’article précise que le nom recommandé ne configure pas à lui seul le moment juste ni la réception réelle du contact.
2. [Google Ads — Suivi des conversions par appel téléphonique](https://support.google.com/google-ads/answer/6100664?hl=fr). La documentation distingue plusieurs types d’appels et permet, selon la configuration, un seuil de durée. Une durée minimale n’est pas traitée comme preuve automatique de qualification ou de vente.
3. [Rybbit — Suivre des événements](https://rybbit.com/docs/track-events). La documentation décrit les déclenchements d’événements personnalisés par code ou attributs HTML ; un compteur d’événements ne prouve pas à lui seul qu’un message ou un appel est arrivé.
4. [CNIL — Cookies : solutions pour les outils de mesure d’audience](https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience), datée du 4 juillet 2025. L’exemption évoquée dépend de conditions portant notamment sur la finalité limitée et les données anonymes. Le texte ne dit pas que tout outil analytique ou toute configuration est automatiquement exempté.

Le résultat de recherche Web direct a confirmé une limite de configuration (`web_extract` indisponible sur le backend search-only). Les extraits TinyFish sont la provenance effectivement utilisée ; aucune lecture exhaustive de toutes les pages des comparables n’est revendiquée.

## Garde-fous rédactionnels

- Pas de volume, taux, gain commercial, témoignage, tarif ou résultat client inventé.
- Les exemples `tel:`, `mailto:`, formulaire et calendrier décrivent les limites ordinaires d’un signal navigateur ; ils ne prétendent pas diagnostiquer l’implémentation d’un site particulier.
- Aucun conseil juridique universel : la conformité dépend du traitement, des réglages et de la situation ; renvoi vers les conditions publiées par la CNIL.
- Aucune donnée personnelle ou contenu de message dans les exemples d’événements. Pas d’envoi de formulaire, d’appel test ni de réservation en production.
- La checklist réutilise `PreparationChecklist.astro`, garde les cases natives fonctionnelles sans JavaScript, ne sauvegarde pas les réponses et n’envoie aucune donnée.
- Pas de recommandation Persistance : l’identité visuelle n’est pas un besoin traité dans cet article.

Publication : conserver `draft: true` jusqu’à validation. Après accord de William, choisir/confirmer la date, passer le brouillon à `draft: false`, contrôler les liens entre articles publics, puis fusionner et déployer manuellement. Le post LinkedIn joint est un fichier Markdown d’approbation, pas un brouillon enregistré sur LinkedIn.
