import type I18nKeys from "../locales/keys";

interface Configuration {
  title: string;
  subTitle: string;
  brandTitle: string;

  description: string;

  site: string;

  locale: "en";

  navigators: { nameKey: I18nKeys; href: string }[];


  username: string;
  sign: string;
  avatarUrl: string;
  /** Default link-preview image, used when a page has no cover. */
  ogImage: string;

  socialLinks: { icon: string; link: string }[];


  banners: string[];


  license: {
    name: string;
    url: string;
  };

  bannerStyle: "LOOP";
}

export type { Configuration };
