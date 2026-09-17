# Vérification de l’enrichissement — 17 septembre 2026

Build de production local, Chromium piloté avec agent-browser. Requêtes HTTPS externes bloquées dans la session principale pour ne pas alimenter les statistiques de production.

- `npm run build` : 28 pages ; avertissement Markdown Astro déjà documenté.
- `node scripts/check-editorial.mjs` : dix articles, liens/images/métadonnées et trois composants.
- `npm run lint` et `git diff --check` réussis.
- Les dix articles testés aux largeurs 390, 768 et 1440 px, avec défilement : pas de débordement horizontal de page ni d’image cassée.
- Checklist : trois cases cochées dont une avec Espace au clavier, compteur 3/7, remise à zéro à 0/7, bouton désactivé et focus rendu à la première case. Retour après navigation Astro : cocher fonctionne, compteur 1/7.
- Comparatif : Entrée ferme le premier volet, Espace le rouvre ; états observés `[false,true]` puis `[true,true]`.
- Réduction des mouvements : média activé, transition de label calculée à 0s.
- Session distincte avec scripts désactivés (`--blink-settings=scriptEnabled=false`) : custom element non enregistré, sept cases natives utilisables, outils compteur/reset masqués. Le comparatif reste repliable.
- axe 4.12.1 ciblé : zéro violation et zéro contrôle incomplet sur chacun des trois composants. Cela ne constitue pas un audit global ou une certification d’accessibilité.
- Captures des composants inspectées ; tailles réduites pour la PR et le chat. Safari non exécuté.

Images : `persistance-desktop.webp`, `scope-desktop.webp`, `checklist-desktop.webp`, `checklist-mobile.webp`.
