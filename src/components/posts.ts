import { getCollection } from "astro:content";

const posts = (await getCollection("blog")).map((post) => {
  const [locale, ...title_components] = post.id.split("/");
  const id_components =
    title_components.at(-1) == title_components.at(-2)
      ? title_components.slice(0, -1)
      : title_components;
  const id = id_components.join("/");
  return {
    ...post,
    locale: locale!,
    id,
  };
});

export default posts;
