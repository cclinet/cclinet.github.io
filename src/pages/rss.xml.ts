import rss from "@astrojs/rss";
import type { APIContext } from "astro";

import posts from "../posts";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";

const pub_posts = posts.filter((post) => !post.data.draft);

export async function GET(context: APIContext) {
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: pub_posts.map((post) => ({
      ...post.data,
      link: `/posts/${post.id}/`,
    })),
  });
}
