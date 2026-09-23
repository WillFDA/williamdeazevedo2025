# Conversions du site : Zaraz et Google Ads

Le site appelle `trackAnalytics()` dans `src/scripts/analytics.ts`. Cette fonction envoie les événements à Cloudflare Zaraz et à Rybbit. Zaraz est injecté par Cloudflare en production : aucun identifiant Google Ads n'est à ajouter dans le code du site.

## Événements disponibles

| Événement                   | Déclenchement réel                                                           | Usage recommandé dans Google Ads                                                                       |
| --------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `cal_booking_success`       | Cal.com annonce la création réussie d'un rendez-vous dans le module intégré. | **Principale** : prise de rendez-vous.                                                                 |
| `contact_email_click`       | Clic sur un lien `mailto:`.                                                  | **Secondaire** si l'on veut observer cette intention. Le clic ne prouve pas qu'un e-mail a été envoyé. |
| `contact_phone_click`       | Clic sur un lien `tel:`, y compris dans la navigation.                       | **Secondaire** si l'on veut observer cette intention. Le clic ne prouve pas qu'un appel a eu lieu.     |
| `cal_open`, `cal_cta_click` | Ouverture du calendrier ou clic sur son bouton.                              | Analyse du parcours dans GA4/Rybbit uniquement ; ne pas les importer comme conversions Ads.            |

Le site n'a pas de formulaire de contact ou de devis. Il n'existe donc pas d'événement « formulaire envoyé » à mesurer. Un e-mail reçu, un appel abouti ou un devis signé nécessitent une autre source de preuve que le clic sur un lien.

## Configuration déjà observée dans Zaraz

Audit de la zone `williamdeazevedo.fr` le 23 septembre 2026 : Zaraz est injecté automatiquement, Google Analytics 4 reçoit les pages vues et les événements, et l'outil Google Ads est actif avec Conversion Linker. Une action Google Ads nommée « Prise de rendez-vous » se déclenche lorsque le nom de l'événement est exactement `cal_booking_success`. Les clics e-mail et téléphone ne possèdent pas d'action Google Ads dans Zaraz à cette date.

La configuration des actions Google Ads et leur statut principal/secondaire se gèrent dans les tableaux de bord. Le dépôt ne permet pas de confirmer que l'action « Prise de rendez-vous » est principale dans Google Ads, qu'elle est incluse dans l'objectif de la campagne, ni que son identifiant et son libellé correspondent à la conversion créée dans Google Ads.

## Réglages Google Ads à vérifier

1. Dans **Objectifs → Conversions**, ouvrir l'action « Prise de rendez-vous ». Comparer son identifiant et son libellé avec ceux de l'action Google Ads dans **Cloudflare → Zaraz → Outils → Google Ads**.
2. Pour cette action, choisir **Principale**, la catégorie « Prise de rendez-vous » ou « Prospect », et le comptage **Une** conversion par clic publicitaire. Vérifier que la campagne utilise l'objectif qui contient cette action.
3. Ne pas inventer de valeur en euros. Choisir temporairement l'option sans valeur monétaire si la valeur d'un rendez-vous n'est pas connue. Plus tard, on peut estimer une valeur par rendez-vous avec `marge moyenne par contrat signé × taux de transformation des rendez-vous en contrats`, à partir de données réelles.
4. Vérifier qu'aucun import GA4 de `cal_booking_success` n'est aussi défini comme conversion principale : cela créerait deux actions pour le même rendez-vous.

Les [actions principales et secondaires](https://support.google.com/google-ads/answer/11461796) ont des rôles différents dans les enchères ; une action secondaire placée dans un objectif personnalisé peut toutefois servir aux enchères. Le réglage [« Une »](https://support.google.com/google-ads/answer/3438531) est adapté à une génération de prospect.

## Si les clics de contact doivent apparaître dans Google Ads

Créer deux actions **secondaires** distinctes dans Google Ads, par exemple « Clic e-mail » et « Clic téléphone », toutes deux comptées **Une** fois et sans valeur monétaire. Relever l'identifiant et le libellé de chacune. Dans Zaraz, créer un déclencheur sur **Event Name equals** `contact_email_click`, puis un autre sur `contact_phone_click`. Ajouter une action **Google Ads → Conversion** par déclencheur en y renseignant le libellé correspondant. Utiliser l'identifiant de conversion du même compte Google Ads. Les [déclencheurs Zaraz](https://developers.cloudflare.com/zaraz/custom-actions/create-trigger/) peuvent cibler directement les événements envoyés par [`zaraz.track()`](https://developers.cloudflare.com/zaraz/web-api/track/).

Cette étape est facultative. Pour mesurer un **vrai appel** plutôt qu'un clic sur le numéro, utiliser ensuite une [conversion d'appel Google Ads](https://support.google.com/google-ads/answer/6095882) avec une durée minimale adaptée. Pour un e-mail, seul un suivi côté messagerie ou CRM pourrait confirmer la prise de contact.

## Vérification après déploiement

1. Dans Zaraz, utiliser **Monitoring** ou le mode débogage sur le site publié. Cliquer sur les liens e-mail/téléphone et vérifier les noms `contact_email_click` et `contact_phone_click`. Ne pas envoyer de coordonnées du visiteur dans les propriétés de ces événements.
2. Faire une réservation de test réelle dans Cal.com, puis vérifier **un seul** `cal_booking_success`, le déclencheur « book success » et l'action Google Ads « Prise de rendez-vous ». Annuler ensuite le rendez-vous de test.
3. Dans Google Ads, vérifier le diagnostic de la balise puis les colonnes **Conversions** et **Toutes les conversions** après traitement. Une visite directe de test sans clic sur une annonce peut prouver que la balise se déclenche, mais ne garantit pas une conversion attribuée à Google Ads.

Zaraz propose [Monitoring](https://developers.cloudflare.com/zaraz/monitoring/) pour voir les événements, déclencheurs et actions exécutés.
