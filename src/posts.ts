import { getCollection } from "astro:content";

const posts = (await getCollection("blog"))
  .map((post) => {
    const [locale, ...idComponents] = post.id.split("/");
    const id = idComponents.join("/");
    return {
      ...post,
      locale: locale!,
      id,
    };
  })
  .filter((post) => {
    return !post.data.isChinaIllegal;
  });

const mathCollection = (await getCollection("mathCollection")).map((post) => {
  const [locale, category, ...idComponents] = post.id.split("/");
  const id = idComponents.join("/");
  return {
    ...post,
    locale: locale!,
    category: category!,
    id,
  };
});

export default posts;
export { mathCollection };
