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
  "Agent",
] as const;

export type BlogTag = (typeof ALLOWED_TAGS)[number];

export const BLOG_SECTIONS = ["tech", "quant", "personal"] as const;
export type BlogSection = (typeof BLOG_SECTIONS)[number];

export const BLOG_SERIES = ["quant-trading"] as const;
export type BlogSeries = (typeof BLOG_SERIES)[number];
