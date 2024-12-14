import rss from "@astrojs/rss";

import posts from "../components/posts";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";

export async function GET(context) {
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/${post.id}/`,
    })),
  });
}
