import { getCollection } from "astro:content";

function get_real_id(id: string): string {
  const title_components = id.split("/");
  if (title_components.at(-1) == title_components.at(-2)) {
    return title_components.slice(0, -1).join("/");
  }
  return id;
}

const posts = (await getCollection("blog")).map((post) => ({
  ...post,
  id: get_real_id(post.id),
}));

export default posts;
