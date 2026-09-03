import type { NavigationGroupKey, NavigationItemKey } from "@/config/site";
import type { Locale } from "@/i18n/config";

interface Messages {
  site: {
    title: string;
    description: string;
  };
  navigation: {
    groups: Record<NavigationGroupKey, string>;
    items: Record<NavigationItemKey, string>;
  };
  labels: {
    lastUpdated: string;
    viewPost: string;
    tag: string;
    licensePrefix: string;
  };
  pages: {
    archives: { title: string; description: string };
    tech: { title: string; description: string; introduction: string };
    quant: { title: string; description: string; introduction: string };
    tags: { title: string; description: string };
    math: { title: string; description: string; introduction: string };
    about: {
      title: string;
      description: string;
      introductionHeading: string;
      introduction: string;
      siteHeading: string;
      stackHeading: string;
      contactHeading: string;
      sourceCodeLead: string;
      deploymentLead: string;
    };
    portal: { title: string; description: string };
    dn42: {
      title: string;
      description: string;
      property: string;
      value: string;
      endpointPlaceholder: string;
    };
    notFound: { title: string; description: string };
    loveCoupon: {
      title: string;
      recipient: string;
      benefit: string;
      termsHeading: string;
      terms: string;
      expiryLabel: string;
      expiry: string;
    };
  };
}

export const messages = {
  zh: {
    site: { title: "探机之家", description: "探机的自我修养" },
    navigation: {
      groups: { primary: "核心内容", explore: "探索", about: "关于" },
      items: {
        home: "首页",
        quantTrading: "量化交易",
        tech: "技术专栏",
        tags: "标签墙",
        archives: "归档",
        friends: "朋友",
        aboutMe: "关于我",
      },
    },
    labels: {
      lastUpdated: "最后更新于",
      viewPost: "查看文章",
      tag: "标签",
      licensePrefix: "本作品采用",
    },
    pages: {
      archives: { title: "归档", description: "文章归档" },
      tech: {
        title: "技术专栏",
        description: "技术专栏文章",
        introduction: "分享技术见解与开发经验。",
      },
      quant: {
        title: "量化交易",
        description: "量化交易系列文章",
        introduction: "探索量化交易的世界，分享策略与心得。",
      },
      tags: { title: "标签", description: "文章标签" },
      math: {
        title: "数学",
        description: "数学相关内容",
        introduction: "这里是一些数学相关的内容。",
      },
      about: {
        title: "关于 CCLIN",
        description: "个人介绍",
        introductionHeading: "个人介绍",
        introduction: "我是 cclin，一名准备做量化开发的推荐算法工程师。",
        siteHeading: "关于本站",
        stackHeading: "技术栈",
        contactHeading: "联系我",
        sourceCodeLead: "本站源代码托管于",
        deploymentLead: "本站部署于",
      },
      portal: { title: "朋友", description: "友链传送门" },
      dn42: {
        title: "DN42",
        description: "DN42 网络信息",
        property: "属性",
        value: "值",
        endpointPlaceholder: "你的 AS 后四位",
      },
      notFound: {
        title: "404 - 页面找不到了！",
        description: "我们努力寻找，但没有结果。",
      },
      loveCoupon: {
        title: "心愿兑换券",
        recipient: "送给我美丽的老婆",
        benefit: "实现你的一个愿望",
        termsHeading: "使用条款：",
        terms: "完全没有",
        expiryLabel: "过期时间：",
        expiry: "永不♾️",
      },
    },
  },
  en: {
    site: { title: "CCLIN", description: "Notes, systems, and explorations" },
    navigation: {
      groups: { primary: "Featured", explore: "Explore", about: "About" },
      items: {
        home: "Home",
        quantTrading: "Quant Trading",
        tech: "Technology",
        tags: "Tags",
        archives: "Archives",
        friends: "Friends",
        aboutMe: "About Me",
      },
    },
    labels: {
      lastUpdated: "Last updated on",
      viewPost: "View",
      tag: "Tag",
      licensePrefix: "This work is licensed under",
    },
    pages: {
      archives: { title: "Archives", description: "Article archives" },
      tech: {
        title: "Technology",
        description: "Technical articles",
        introduction: "Notes and perspectives on software and engineering.",
      },
      quant: {
        title: "Quant Trading",
        description: "Quantitative trading series",
        introduction:
          "Strategies and notes from exploring quantitative trading.",
      },
      tags: { title: "Tags", description: "Article tags" },
      math: {
        title: "Mathematics",
        description: "Mathematics articles",
        introduction: "Notes and exercises related to mathematics.",
      },
      about: {
        title: "About CCLIN",
        description: "Personal introduction",
        introductionHeading: "Introduction",
        introduction:
          "I'm cclin, a recommendation systems engineer transitioning into quantitative development.",
        siteHeading: "About This Site",
        stackHeading: "Tech Stack",
        contactHeading: "Contact Me",
        sourceCodeLead: "The source code is hosted on",
        deploymentLead: "This site is deployed on",
      },
      portal: { title: "Friends", description: "Friend links" },
      dn42: {
        title: "DN42",
        description: "DN42 network information",
        property: "Property",
        value: "Value",
        endpointPlaceholder: "last four digits of your AS number",
      },
      notFound: {
        title: "404 - The page can't be found!",
        description: "We searched hard, but no luck.",
      },
      loveCoupon: {
        title: "Wish Coupon",
        recipient: "For my beautiful wife",
        benefit: "Redeem one wish",
        termsHeading: "Terms:",
        terms: "None at all",
        expiryLabel: "Expires:",
        expiry: "Never ♾️",
      },
    },
  },
} satisfies Record<Locale, Messages>;

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
