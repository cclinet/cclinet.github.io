export const SITE_TITLE = "探机之家";
export const SITE_DESCRIPTION = "探机的自我修养";
export const locales = ["zh", "en"] as const;
export const defaultLocale = "zh";
// 定义导航结构，区分核心板块和元数据
export const SITE_NAVIGATION = [
  {
    group: "核心内容",
    items: [
      { name: "首页", href: "/" },
      { name: "量化交易", href: "/series/quant-trading" }, // 提升为一级入口
      { name: "技术专栏", href: "/posts/tech" },
    ],
  },
  {
    group: "探索",
    items: [
      { name: "标签墙", href: "/tags" },
      { name: "归档", href: "/archives" },
    ],
  },
  {
    group: "关于",
    items: [
      { name: "朋友", href: "/portal" },
      { name: "关于我", href: "/about" },
    ],
  },
];

export const ALLOWED_TAGS = [
  "Quant",
  "NLP",
  "LLM",
  "Machine Learning",
  "C++",
  "Python",
  "Linux",
  "Distributed Systems",
  "Recommendation System",
  "Nanobind",
  "Personal",
] as const;
