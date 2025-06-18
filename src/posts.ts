import { getCollection } from "astro:content";

const posts = (await getCollection("blog")).map((post) => {
  const [locale, ...id_components] = post.id.split("/");
  const id = id_components.join("/");
  return {
    ...post,
    locale: locale!,
    id,
  };
});

export default posts;
