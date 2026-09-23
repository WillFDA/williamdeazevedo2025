# Google Ads « Click to call » via Cloudflare Zaraz

## Portée et état

Cette procédure raccorde les événements téléphone **déjà émis par le site** à la conversion Google Ads. Aucun deuxième écouteur de clic, script gtag ou conteneur GTM n'est nécessaire dans Astro.

**Le merge de cette PR ne configure ni ne publie Zaraz.** La configuration Cloudflare actuelle n'a pas pu être consultée ; appliquer les étapes ci-dessous dans la zone `williamdeazevedo.fr`, après vérification des actions existantes. Ne pas importer ce document comme une configuration JSON et ne pas remplacer la configuration complète de la zone.

Un clic sur un lien `tel:` est une intention d'appel, pas la preuve d'un appel abouti, d'un prospect qualifié ou d'une signature. Garder ces indicateurs distincts dans les rapports et les objectifs d'enchères.

## Destination fournie

| Champ                             | Valeur                 |
| --------------------------------- | ---------------------- |
| Nom de conversion                 | `Click to call`        |
| Conversion ID (Zaraz, sans `AW-`) | `18129381954`          |
| Conversion label                  | `a0dCCPfms4IdEMLU4cRD` |

Valeurs transcrites de la capture Google Ads fournie : recopier/vérifier le label directement depuis Google Ads avant publication, notamment la casse et les caractères visuellement proches. Ne pas mettre `AW-18129381954/` dans le champ label.

## Événements existants

`src/layout/Layout.astro` possède un écouteur délégué unique, conservé lors des navigations Astro. Il appelle `trackAnalytics()` dans `src/scripts/analytics.ts`, qui transmet le même événement à Zaraz (si disponible) et Rybbit.

| Lien                                           | Event Name            |
| ---------------------------------------------- | --------------------- |
| Téléphone navbar, attribut `data-navbar-phone` | `navbar_phone_click`  |
| Autres liens `tel:`                            | `contact_phone_click` |

Un clic navbar n'émet **pas** aussi `contact_phone_click`. Les propriétés incluent `path`, `location`, `label` et `phone` (numéro du site, pas celui du visiteur). Ne pas utiliser ce numéro comme donnée utilisateur pour les conversions améliorées.

## Configuration dans Cloudflare

1. Ouvrir Zaraz / Tag setup pour `williamdeazevedo.fr`. Inspecter les outils, actions, déclencheurs et l'historique publiés. Sauvegarder la version de départ sans exposer les clés de debug ou autres secrets.
2. Réutiliser l'outil natif **Google Ads** correspondant à `18129381954`, ou l'ajouter s'il n'existe pas. Ne pas écraser l'ID d'un outil destiné à un autre compte. Dans les paramètres de l'outil, utiliser l'ID numérique ci-dessus, sans `AW-`.
3. Créer un déclencheur nommé **Phone click** : variable **Event Name**, opérateur de correspondance regex, expression exacte `^(navbar_phone_click|contact_phone_click)$`. Une seule règle suffit. Ne pas mettre deux règles « égale » dans le même déclencheur : elles seraient combinées en AND.
4. Dans l'outil Google Ads, créer ou corriger **une seule action de conversion**, nommée **Click to call**, avec le label ci-dessus et le déclencheur **Phone click**. Ne pas utiliser le déclencheur Pageview, un catch-all ou un déclencheur DOM supplémentaire. Ne pas inventer de valeur monétaire.
5. Vérifier qu'aucune autre action, balise GTM/gtag ou import GA4 n'enregistre le même clic dans cette conversion. Conserver les événements Rybbit existants.
6. Vérifier l'injection Zaraz, le chargement de l'outil et son fonctionnement après navigation Astro. Appliquer la politique de consentement publicitaire du site : rattacher l'outil au consentement approprié et vérifier Google Consent Mode v2. Ne pas forcer le consentement à « granted » ni contourner un refus.
7. La capture décrit une installation GTM (dont Conversion Linker). Ici, utiliser l'intégration native Zaraz, pas une installation GTM parallèle. Vérifier l'attribution publicitaire et les diagnostics Google Ads après activation ; les tests locaux ne valident pas ce point.
8. Examiner le diff de configuration, puis publier la version dans Cloudflare si le mode Preview & Publish est activé. Relire la version publiée et ses valeurs : sauvegarder un brouillon ne signifie pas publier.

## Validation locale sans envoyer de conversion

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4340
# Dans un autre terminal :
npm run check:phone-tracking -- http://127.0.0.1:4340/
```

Le test utilise agent-browser sur une URL locale uniquement. Rybbit et Zaraz sont remplacés avant chargement par des collecteurs locaux ; les liens `tel:`/`mailto:` n'ouvrent aucune application. Il vérifie les événements navbar et génériques, les propriétés, l'absence de doublons après navigation Astro et l'absence de conversion téléphone pour un clic e-mail, sur desktop et mobile. Le lien téléphone générique est une fixture ajoutée au DOM pour exercer le même écouteur délégué.

## Validation externe restant à faire

- Vérifier le label par copie depuis Google Ads, la configuration publiée et le consentement.
- En environnement de prévisualisation avec destination de test, vérifier dans Zaraz Debugger qu'un seul événement téléphone déclenche une seule action Google Ads et qu'un pageview/e-mail n'en déclenche pas.
- Ne pas envoyer de conversions synthétiques à la destination de production sans autorisation explicite. Le debug n'est pas une garantie d'absence d'envoi.
- Après un clic réel et consenti, vérifier la réception/les diagnostics dans Google Ads, puis l'attribution aux annonces. Ne pas confondre événement émis, requête reçue et conversion attribuée.
- Pour compter des prospects plutôt que tous les clics répétés, examiner le réglage Google Ads « Une » et le statut principal/secondaire de l'action. Ne pas modifier automatiquement la stratégie d'enchères.

## Retour arrière

Désactiver seulement l'action **Click to call** ajoutée ici, ou restaurer la version Zaraz précédente après contrôle du diff. Ne pas supprimer les autres outils/actions. Aucun rollback Astro n'est nécessaire : cette PR n'ajoute pas de code de tracking en production.

## Références

- [Zaraz : format de l'ID et du label Google Ads](https://developers.cloudflare.com/zaraz/faq/#what-is-the-expected-format-for-conversion-id-and-conversion-label)
- [Créer un déclencheur](https://developers.cloudflare.com/zaraz/custom-actions/create-trigger/)
- [Google Consent Mode](https://developers.cloudflare.com/zaraz/advanced/google-consent-mode/)
- [Preview & Publish](https://developers.cloudflare.com/zaraz/history/preview-mode/)
