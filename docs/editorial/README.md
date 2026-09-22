# Série éditoriale SEO / GEO

Cette série complète les pages de prestations avec des réponses pratiques aux questions de préparation, de budget et de qualité d'un site. Les contenus sont originaux ; les articles comparables servent à identifier les questions utiles, pas à reprendre leurs formulations. Les notes `recherche-*.md` recensent les lectures et sources par sujet.

## Où modifier un article ?

Le site utilise déjà les collections Astro. Les dix textes sont dans `src/content/articles/*.md`, les visuels de couverture dans `public/articles/<slug>/cover.webp`. Aucun CMS ni service tiers supplémentaire n'est nécessaire.

Les couvertures actuelles sont des aplats gris provisoires. Pour chaque article, remplacer `cover.webp` par le visuel définitif (16:9, 1600×900, WebP) et renseigner `image.alt`, laissé vide tant que l'image est décorative.

Le frontmatter contient le titre, la description SEO, la date, les tags, l'auteur et le visuel. Le corps est du Markdown : titres `##`, listes, liens, tableaux et images. Ne pas ajouter de titre `#` dans le corps : le modèle de page génère déjà le H1.

- `draft: true` exclut l'article du build de production, du listing et du sitemap.
- `draft: false` et une `pubDate` atteinte rendent l'article publiable au prochain build.
- En développement, les brouillons et les dates futures sont visibles pour relecture.
- Une date future ne programme pas un déploiement : il faut un nouveau build après cette date.

Les dix nouveaux articles sont proposés avec `draft: false` et `pubDate: 2026-09-16` : ils seront donc publiés ensemble si la PR est fusionnée et déployée après cette date. La PR seule ne les publie pas. Pour échelonner la publication, modifier ces champs et prévoir les builds correspondants. Éviter des liens vers des articles encore masqués.

## Ciblage

Volumes estimés mensuels France/français provenant de la recherche OpenSEO réalisée dans cette conversation. Ce ne sont ni des promesses de trafic ni des données Search Console : cette dernière n'était pas connectée au projet. Ne pas additionner les variantes proches. Une difficulté basse fournie par un outil ne suffit pas à prévoir un classement.

| Slug                             | Requête principale                      | Volume estimé | Intention / distinction                                                                  |
| -------------------------------- | --------------------------------------- | ------------: | ---------------------------------------------------------------------------------------- |
| prix-site-vitrine                | prix site internet vitrine              |           320 | Budget et périmètre concret ; complète l'essai existant sur les offres à 600/2 000 euros |
| cout-site-internet-par-mois      | combien coûte un site internet par mois |            90 | Frais récurrents, pas prix de création                                                   |
| prix-refonte-site-internet       | refonte site internet prix              |           110 | Arbitrage réparation / refonte, pas landing de prestation                                |
| refonte-seo                      | refonte seo                             |           320 | Préserver les acquis lors d'une migration                                                |
| cahier-des-charges-site-internet | cahier des charges site internet        |           320 | Préparer le projet avec un modèle utilisable                                             |
| exemples-sites-vitrines          | site vitrine exemple                    |           320 | Analyse qualitative des projets réels, sans gains inventés                               |
| site-internet-artisan-contenus   | création site internet artisan          |           140 | Guide des pages et contenus ; renvoi vers la landing commerciale                         |
| creer-site-internet-ia           | créer un site web gratuit avec ia       |           260 | Capacités et limites ; audience gratuite moins proche d'un achat                         |
| tester-accessibilite-site-web    | test accessibilité site web             |           140 | Premiers tests, distincts d'un audit de conformité                                       |
| referencement-chatgpt            | référencement chatgpt                   |           210 | Conditions et limites de visibilité, aucune garantie de citation                         |

## Vérification avant fusion

```sh
bun install --frozen-lockfile
npm run build
node scripts/check-editorial.mjs
npm run lint
```

Le contrôle éditorial vérifie explicitement les dix fichiers, leur présence dans le listing et le sitemap, le H1, la canonical, les données structurées, la couverture Open Graph, les images WebP et les liens locaux du HTML généré. Ce contrôle technique ne remplace pas la relecture humaine du contenu et des sources.

Les essais de navigation doivent être faits sur une prévisualisation locale, en bloquant les requêtes de mesure externes pour ne pas créer de fausses visites ou conversions de production. Ne pas envoyer de formulaire ni réserver de rendez-vous réel.

## Relecture métier et suivi

Avant fusion, relire notamment les indications de prix et de périmètre, la description des réalisations et le ton employé sous le nom de William. Les illustrations pédagogiques ne sont pas des graphiques de résultats clients. Aucun résultat commercial ni promesse de classement ne doit être ajouté sans preuve.

Après publication : connecter Search Console, contrôler l'indexation, distinguer les requêtes informatives des requêtes de prestation, puis suivre les demandes de contact réelles. Les pages tarifaires et la landing artisan peuvent partager un vocabulaire avec les articles : vérifier leurs requêtes d'entrée avant de créer de nouvelles variantes.
