import rss from "@astrojs/rss";
import type { APIContext } from "astro";

import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";
import posts from "../posts";

const pubPosts = posts.filter((post) => !post.data.draft);

export async function GET(context: APIContext) {
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: pubPosts.map((post) => ({
      ...post.data,
      link: `/posts/${post.id}/`,
    })),
  });
}
