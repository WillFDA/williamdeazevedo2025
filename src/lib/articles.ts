import { type CollectionEntry, getCollection } from "astro:content";

export type Article = CollectionEntry<"articles">;

/**
 * An article is visible once it is not a draft and its scheduled release date
 * (`pubDate`) has been reached.
 */
export function isArticleVisible(article: Article, now: Date = new Date()): boolean {
  if (article.data.draft) {
    return false;
  }
  return article.data.pubDate.getTime() <= now.getTime();
}

/**
 * Returns published articles, newest first.
 *
 * In production only visible articles are returned, so scheduled (future-dated)
 * and draft articles get no page at all and are unreachable until a rebuild
 * happens after their `pubDate`. In dev, everything is shown so you can preview.
 */
export async function getVisibleArticles(): Promise<Article[]> {
  const articles = await getCollection("articles", (article) =>
    import.meta.env.PROD ? isArticleVisible(article) : true
  );

  return articles.toSorted(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}

export function formatArticleDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
