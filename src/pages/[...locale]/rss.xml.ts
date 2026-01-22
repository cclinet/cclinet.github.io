import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/consts";
import { getLocalePath } from "@/i18n/utils";

export async function getStaticPaths() {
    return [
        { params: { locale: undefined } }, // Default locale (root)
        { params: { locale: "en" } },
    ];
}

export async function GET(context: APIContext) {
    const { locale } = context.params;

    // Logic to determine the target locale for filtering
    // If locale is undefined, it means we are at /rss.xml, which should generally be the default locale (zh)
    // But wait, the previous implementation mixed them?
    // Let's stick to the plan: 
    // /rss.xml -> zh
    // /en/rss.xml -> en

    const targetLocale = locale || "zh";

    const posts = (await getCollection("blog"))
        .map((post) => {
            const [postLocale, ...idComponents] = post.id.split("/");
            return {
                ...post,
                locale: postLocale,
                slug: idComponents.join("/"), // or create the path manually
            };
        })
        .filter((post) => !post.data.draft && post.locale === targetLocale);

    const site = context.site!;
    // const siteUrl = site.toString();

    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: site,
        items: posts.map((post) => {
            // Calculate link:
            // If targetLocale is 'zh' (default), link should be /posts/slug/
            // If targetLocale is 'en', link should be /en/posts/slug/

            const localePath = getLocalePath(targetLocale);
            const link = localePath
                ? `/${localePath}/posts/${post.slug}/`
                : `/posts/${post.slug}/`;

            return {
                ...post.data,
                link,
                pubDate: post.data.pubDate,
            };
        }),
        customData: `<language>${targetLocale === "zh" ? "zh-cn" : targetLocale}</language>`,
    });
}
