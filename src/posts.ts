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
const mathCollection = (await getCollection("mathCollection")).map((post) => {
  const [locale, category, ...id_components] = post.id.split("/");
  const id = id_components.join("/");
  return {
    ...post,
    locale: locale!,
    category: category!,
    id,
  };
});

export default posts;
export { mathCollection };
