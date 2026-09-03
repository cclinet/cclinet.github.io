export const NAVIGATION_GROUPS = [
  {
    label: "primary",
    items: [
      { label: "home", href: "/" },
      { label: "quantTrading", href: "/series/quant-trading" },
      { label: "tech", href: "/posts/tech" },
    ],
  },
  {
    label: "explore",
    items: [
      { label: "tags", href: "/tags" },
      { label: "archives", href: "/archives" },
    ],
  },
  {
    label: "about",
    items: [
      { label: "friends", href: "/portal" },
      { label: "aboutMe", href: "/about" },
    ],
  },
] as const;

export type NavigationGroupKey = (typeof NAVIGATION_GROUPS)[number]["label"];
export type NavigationItemKey =
  (typeof NAVIGATION_GROUPS)[number]["items"][number]["label"];

export const SOCIAL_LINKS = [
  { id: "rss", href: "/rss.xml", external: false },
  { id: "github", href: "https://github.com/cclinet", external: true },
  {
    id: "zhihu",
    href: "https://www.zhihu.com/people/probius33",
    external: true,
  },
  {
    id: "travellings",
    href: "https://www.travellings.cn/go.html",
    external: true,
  },
] as const;
