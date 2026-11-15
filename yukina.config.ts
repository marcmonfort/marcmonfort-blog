import I18nKeys from "./src/locales/keys";
import type { Configuration } from "./src/types/config";

const YukinaConfig: Configuration = {
  title: "Marc Monfort",
  subTitle: "Doctoral Researcher",
  brandTitle: "Marc Monfort",

  description:
    "Marc Monfort – Doctoral Researcher at Aalto University working on AI, multi-agent reinforcement learning and high-performance computing (HPC). Projects, research and publications.",

  site: "https://marcmonfort.com",

  locale: "en", // set for website language and date format

  navigators: [
    {
      nameKey: I18nKeys.nav_bar_home,
      href: "/",
    },
    {
      nameKey: I18nKeys.nav_bar_publications,
      href: "/publications",
    },
    {
      nameKey: I18nKeys.nav_bar_github,
      href: "https://github.com/marcmonfort",
    },
  ],

  username: "Marc Monfort",
  sign: "Doctoral Researcher",
  avatarUrl: "/about/profile-photo-512.webp",
  ogImage: "/about/og-default.jpg",
  socialLinks: [
    {
      icon: "line-md:github-loop",
      link: "https://github.com/marcmonfort",
    },
    {
      icon: "line-md:linkedin",
      link: "https://www.linkedin.com/in/marc-monfort",
    },
    {
      icon: "line-md:youtube",
      link: "https://www.youtube.com/@marcmonfort",
    },
  ],
  banners: [
    "/banners/MareNostrum4.webp",
    "/banners/fpv-drone.webp",
    "/banners/coding.webp",
    "/banners/china-wall.webp",
  ],

  license: {
    name: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },

  // WIP functions
  bannerStyle: "LOOP", // 'loop' | 'static' | 'hidden'
};

export default YukinaConfig;
