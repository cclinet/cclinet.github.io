import type { BlogSection, BlogSeries, BlogTag } from "@/config/content";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/utils";
import { type CollectionEntry, getCollection } from "astro:content";

export type BlogPost = CollectionEntry<"blog"> & {
  locale: Locale;
  slug: string;
};

export type MathPost = CollectionEntry<"mathCollection"> & {
  locale: Locale;
  category: string;
  slug: string;
};

function parseLocaleId(id: string) {
  const [locale, ...path] = id.split("/");

  if (!isLocale(locale) || path.length === 0) {
    throw new Error(`Invalid localized content id: ${id}`);
  }

  return { locale, path };
}

const publishedBlogPosts: BlogPost[] = (await getCollection("blog"))
  .filter((post) => !post.data.draft)
  .map((post) => {
    const { locale, path } = parseLocaleId(post.id);
    return { ...post, locale, slug: path.join("/") };
  });

const publishedMathPosts: MathPost[] = (await getCollection("mathCollection"))
  .filter((post) => !post.data.draft)
  .map((post) => {
    const { locale, path } = parseLocaleId(post.id);
    const [category, ...slugParts] = path;

    if (!category || slugParts.length === 0) {
      throw new Error(`Invalid math content id: ${post.id}`);
    }

    return { ...post, locale, category, slug: slugParts.join("/") };
  });

function newestFirst<T extends { data: { pubDate: Date } }>(posts: T[]) {
  return posts.sort(
    (first, second) =>
      second.data.pubDate.getTime() - first.data.pubDate.getTime(),
  );
}

export function getAllBlogPosts() {
  return [...publishedBlogPosts];
}

export function getBlogPosts(locale: Locale) {
  return newestFirst(
    publishedBlogPosts.filter((post) => post.locale === locale),
  );
}

export function getPostsBySection(locale: Locale, section: BlogSection) {
  return getBlogPosts(locale).filter((post) => post.data.section === section);
}

export function getPostsBySeries(locale: Locale, series: BlogSeries) {
  return getBlogPosts(locale).filter((post) => post.data.series === series);
}

export function getPostsByYear(locale: Locale) {
  return Map.groupBy(getBlogPosts(locale), (post) =>
    post.data.pubDate.getFullYear(),
  );
}

export function getPostsByTag(locale: Locale) {
  const groups = new Map<BlogTag, BlogPost[]>();

  for (const post of getBlogPosts(locale)) {
    for (const tag of post.data.tags ?? []) {
      const taggedPosts = groups.get(tag) ?? [];
      taggedPosts.push(post);
      groups.set(tag, taggedPosts);
    }
  }

  return groups;
}

export function getTagSummaries(locale: Locale) {
  return [...getPostsByTag(locale)]
    .map(([tag, posts]) => ({ tag, count: posts.length }))
    .sort((first, second) => second.count - first.count);
}

export function getAllMathPosts() {
  return [...publishedMathPosts];
}

export function getMathPosts(locale: Locale) {
  return newestFirst(
    publishedMathPosts.filter((post) => post.locale === locale),
  );
}

export function getMathPostsByCategory(locale: Locale) {
  return Map.groupBy(getMathPosts(locale), (post) => post.category);
}
