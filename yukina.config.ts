import I18nKeys from "./src/locales/keys";
import type { Configuration } from "./src/types/config";

const YukinaConfig: Configuration = {
  title: "Marc Monfort",
  subTitle: "Research Engineer",
  brandTitle: "Marc Monfort",

  description: "Demo Site",

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
      nameKey: I18nKeys.nav_bar_about,
      href: "/about",
    },
    {
      nameKey: I18nKeys.nav_bar_github,
      href: "https://github.com/marcmonfort",
    },
  ],

  username: "Marc Monfort",
  sign: "Research Engineer",
  avatarUrl: "/profile-photo-4.jpg",
  socialLinks: [
    {
      icon: "line-md:github-loop",
      link: "https://github.com/marcmonfort",
    },
    {
      icon: "mingcute:bilibili-line",
      link: "https://space.bilibili.com/22433608",
    },
    {
      icon: "mingcute:netease-music-line",
      link: "https://music.163.com/#/user/home?id=125291648",
    },
  ],
  maxSidebarCategoryChip: 6, // It is recommended to set it to a common multiple of 2 and 3
  maxSidebarTagChip: 12,
  maxFooterCategoryChip: 6,
  maxFooterTagChip: 24,

  banners: [
    "/banners/marenostrum.jpg",
    // "/banners/fpv-drone.jpg",
    "/banners/jet-fighter.jpg",
    "/banners/MQ-9_Reaper_UAV.jpg",
    "/banners/coding.jpg",
    "/banners/neurons.webp",
    "/banners/china-wall.jpg",
    // "https://s2.loli.net/2025/01/25/PBvHFjr5yDu6t4a.webp",
    // "https://s2.loli.net/2025/01/25/6bKcwHZigzlM4mJ.webp",
    // "https://s2.loli.net/2025/01/25/H9WgEK6qNTcpFiS.webp",
    // "https://s2.loli.net/2025/01/25/njNVtuUMzxs81RI.webp",
    // "https://s2.loli.net/2025/01/25/tozsJ8QHAjFN3Mm.webp",
    // "https://s2.loli.net/2025/01/25/Pm89OveZq7NWUxF.webp",
    // "https://s2.loli.net/2025/01/25/UCYKvc1ZhgPHB9m.webp",
    // "https://s2.loli.net/2025/01/25/JjpLOW8VSmufzlA.webp",
  ],

  slugMode: "HASH", // 'RAW' | 'HASH'

  license: {
    name: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },

  // WIP functions
  bannerStyle: "LOOP", // 'loop' | 'static' | 'hidden'
};

export default YukinaConfig;
