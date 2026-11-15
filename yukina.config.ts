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
    // NOTE: Archive don't seem to relevant.
    // {
    //   nameKey: I18nKeys.nav_bar_archive,
    //   href: "/archive",
    // },
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
  maxSidebarCategoryChip: 6, // It is recommended to set it to a common multiple of 2 and 3
  maxSidebarTagChip: 12,
  maxFooterCategoryChip: 6,
  maxFooterTagChip: 24,

  banners: [
    "/banners/MareNostrum4.webp",
    "/banners/fpv-drone.webp",
    // "/banners/jet-fighter.webp",
    // "/banners/MQ-9_Reaper_UAV.webp",
    "/banners/coding.webp",
    // "/banners/neurons.webp",
    "/banners/china-wall.webp",
  ],

  slugMode: "RAW", // 'RAW' (readable URLs) | 'HASH'

  license: {
    name: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },

  // WIP functions
  bannerStyle: "LOOP", // 'loop' | 'static' | 'hidden'
};

export default YukinaConfig;
