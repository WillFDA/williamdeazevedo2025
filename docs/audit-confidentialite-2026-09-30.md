# Audit confidentialité et traceurs — 30 septembre 2026

## Conclusion

La page publique contient une base de mentions légales et cite Rybbit et Zaraz, mais elle ne décrit pas tous les traitements observés. La conformité RGPD et traceurs ne peut pas être confirmée en l'état. Compléter le texte seul ne résoudrait pas les questions de consentement et de configuration.

Audit en lecture seule du site publié, du code local, de la configuration publique Rybbit et de la configuration Zaraz publiée. Aucun réglage de production ni texte public modifié. Ce document ne constitue pas une certification juridique générale du site.

## Constats vérifiés

| Élément | Observation | Écart ou vérification nécessaire |
| --- | --- | --- |
| Mentions légales | Identité EI, adresse, SIREN/SIRET, publication, email, hébergeur et TVA figurent sur `/mentions-legales/`. | Le téléphone de Cloudflare manque. Le téléphone professionnel est dans l'en-tête, mais pas dans la rubrique contact. Situation administrative et régime TVA non contrôlés dans cet audit. |
| Information RGPD | Réponse aux emails, collecte technique, plusieurs droits et réclamation CNIL sont mentionnés. | Bases légales par finalité, durées, catégories précises, destinataires/prestataires, transferts et garanties absents. Le responsable du traitement doit être explicitement identifié. Les droits doivent être présentés selon leur applicabilité. |
| Rybbit | Script chargé automatiquement depuis `https://analytics.williamdeazevedo.fr/api/script.js`, site `9713c4825fc7`, confirmé dans le DOM publié. | L'information ne couvre pas le détail des fonctions actives. Hébergement réel, conservation, conservation IP et rotation des identifiants serveur non vérifiés. Le sous-domaine seul ne prouve pas un hébergement en UE. |
| Stockage Rybbit | Le script servi crée/lit `rybbit-visitor-id` dans `localStorage` avant de charger la configuration. Aucune expiration explicite dans cette fonction. | Ce stockage n'est pas décrit. « Sans cookie » ne signifie pas « sans traceur ». La réutilisation de cet identifiant pour les événements ordinaires n'a pas été démontrée ; sa présence ne suffit pas à établir son usage exact côté serveur. |
| File d'événements du site | `src/scripts/analytics.ts` lit/écrit `wui:rybbit-events` dans `sessionStorage`, jusqu'à 20 événements en attente. | Stockage de mesure non décrit et sans contrôle de consentement dans ce module. |
| Google via Zaraz | Configuration publiée : Google Analytics 4 et Google Ads activés, pages vues/événements et conversion configurés. Zaraz est chargé dans le navigateur sur la page publique. | Ces deux destinataires ne sont pas nommés dans la page. Aucun objet de gestion de consentement Zaraz, aucune finalité de consentement associée aux outils/actions, aucun déclencheur bloquant dans les actions examinées. |
| Consent Mode Google | `googleConsentV2Default: true`, `hideIPAddress: true`. | Cloudflare documente ce réglage comme un refus par défaut des catégories Google. Cela ne démontre ni un recueil de choix utilisateur ni l'absence de requêtes sans cookies vers Google. Ne pas affirmer que des cookies Google sont effectivement déposés sur cette seule preuve. |
| Cal.com | Module tiers de réservation absent des mentions. Il est monté au clic, mais aussi dès le survol, le focus clavier ou le toucher d'un bouton de réservation. | Décrire la réservation, ses données, sa base légale, le prestataire et la conservation. Éviter le préchargement au simple survol/focus ; inventorier les traceurs du module et bloquer ceux qui nécessitent un consentement. Cliquer pour réserver ne vaut pas consentement général au suivi. |
| Cloudflare Web Analytics | Un script `static.cloudflareinsights.com/beacon.min.js` est présent dans le DOM public. | Décrire les traitements de performance/sécurité réellement actifs ; vérifier leur périmètre et leurs durées. |
| Search Console | Aucune balise Google Analytics/GTM codée directement dans le layout ; Google Analytics est configuré séparément via Zaraz. | Search Console fournit des rapports sur les recherches Google et l'indexation. Sa validation DNS/HTML n'installe pas un traceur de navigation. L'état du compte et sa connexion éventuelle à Rybbit n'ont pas été vérifiés. |

### Configuration publique Rybbit observée

Réponse de `GET https://analytics.williamdeazevedo.fr/api/site/tracking-config/9713c4825fc7` :

```json
{
  "type": "web",
  "featureFlagsEnabled": false,
  "sessionReplay": false,
  "webVitals": false,
  "trackErrors": true,
  "trackOutbound": true,
  "trackUrlParams": true,
  "trackInitialPageView": true,
  "trackSpaNavigation": true,
  "trackButtonClicks": true,
  "trackCopy": true,
  "trackFormInteractions": true
}
```

Ces réglages indiquent des capacités activées, pas la présence effective de données pour chacune. Le site n'a pas de formulaire de contact ; le filtre d'articles et le module Cal.com doivent être distingués. Les champs d'une iframe tierce ne sont pas automatiquement accessibles au script du site parent.

Les paramètres d'URL peuvent contenir des données personnelles selon les liens utilisés. Le code des événements manuels transmet aussi des URL de liens externes. Définir une liste de paramètres autorisés et limiter les données aux besoins réels.

### Vérification de la configuration Zaraz publiée

La zone utilise le workflow `preview`. L'endpoint de configuration courante peut donc renvoyer un brouillon. L'audit a également lu la dernière version publiée via l'historique : version `1391680`, publiée le 23 septembre 2026. Elle confirme les outils Google activés et les réglages décrits ci-dessus. Aucun secret de configuration n'est reproduit ici.

## Corrections à réaliser

1. Choisir le périmètre de collecte : conserver Google Analytics/Ads avec un consentement adapté, ou les désactiver s'ils sont inutiles. Rybbit doit lui aussi être bloqué avant consentement tant que l'exemption de sa configuration n'est pas documentée. Évaluer la suppression des stockages et des captures inutiles si une mesure exemptée est recherchée.
2. Si des traceurs soumis au consentement sont conservés, proposer accepter/refuser de façon équivalente, régler par finalité et permettre de retirer son choix. Bloquer les opérations concernées avant le choix et après un refus ; ne pas simplement masquer une bannière.
3. Vérifier les réglages privés de Rybbit : hébergeur et pays, accès aux données, durée de conservation et purge, IP brutes, salage/rotation, contrats applicables. La documentation Rybbit explique que le salage quotidien et la conservation d'IP sont des options ; aucun de ces réglages n'est déduit de la réponse publique ci-dessus.
4. Documenter les traitements email et rendez-vous, les bases légales adaptées, les durées réellement appliquées, les destinataires et les transferts éventuels. Ne pas publier une durée ou une localisation inventée.
5. Compléter la page avec une rubrique cookies et autres traceurs accessible depuis le pied de page ; nommer tous les services conservés et expliquer leurs fonctions. Une page séparée n'est pas obligatoire si l'information reste claire et accessible.
6. Vérifier dans un navigateur neuf les requêtes et stockages avant choix, après refus, après acceptation, après retrait et pendant la réservation. Vérifier aussi les événements transmis côté serveur par Zaraz, invisibles dans le seul réseau du navigateur.
7. Retirer ou nuancer l'affirmation générale « Rybbit, respectueux du RGPD, sans bannière de cookies » dans `src/content/articles/site-600-euros-vs-site-2000-euros.mdx` : elle dépend de la configuration et des autres outils du site.

Si des prestations sont vendues à des consommateurs, examiner aussi la médiation de la consommation et les informations précontractuelles applicables. Le périmètre B2B/B2C n'est pas établi dans cet audit.

## Références officielles

- [CNIL — Cookies et traceurs : que dit la loi ?](https://cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi) : le cadre concerne les opérations de stockage/lecture du terminal, au-delà des seuls cookies HTTP.
- [CNIL — Exemption des outils de mesure d'audience](https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience) : finalité limitée, statistiques anonymes, absence de recoupement et conditions de configuration ; l'outil seul ne prouve pas l'exemption.
- [CNIL — Information et transparence](https://www.cnil.fr/fr/conformite-rgpd-information-des-personnes-et-transparence) : informations à communiquer sur les traitements.
- [Service Public — Mentions d'un entrepreneur individuel](https://entreprendre.service-public.gouv.fr/vosdroits/F31228) : identité, coordonnées et hébergeur.
- [Cloudflare — Google Consent Mode](https://developers.cloudflare.com/zaraz/advanced/google-consent-mode/) : refus par défaut, transmission des signaux et distinction avec la gestion du consentement.
- [Rybbit — Réglages de site](https://rybbit.com/docs/site-settings) : salage, IP, paramètres d'URL et connexion Search Console.
- [Rybbit — Autocapture](https://rybbit.com/docs/autocapture) : suivi automatique des interactions.
- [Google — À propos de Search Console](https://support.google.com/webmasters/answer/9128668?hl=fr) et [validation de propriété](https://support.google.com/webmasters/answer/9008080?hl=fr) : rapports de recherche, ajout et validation du site.
