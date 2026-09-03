import { getMessages } from "@/i18n/messages";
import {
  getLocale,
  getLocaleStaticPaths,
  getLocalizedPath,
} from "@/i18n/utils";
import { getBlogPosts } from "@/lib/content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

export async function getStaticPaths() {
  return getLocaleStaticPaths();
}

export async function GET(context: APIContext) {
  const locale = getLocale(context.params.locale);
  const t = getMessages(locale);
  const posts = getBlogPosts(locale);

  return rss({
    title: t.site.title,
    description: t.site.description,
    site: context.site!,
    items: posts.map((post) => ({
      ...post.data,
      link: getLocalizedPath(locale, `/posts/${post.slug}/`),
    })),
    customData: `<language>${locale === "zh" ? "zh-cn" : locale}</language>`,
  });
}
