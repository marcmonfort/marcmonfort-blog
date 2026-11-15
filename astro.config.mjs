import { defineConfig } from "astro/config";

import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import swup from "@swup/astro";

import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkMath from "remark-math";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";

import YukinaConfig from "./yukina.config";
import legacyRedirects from "./legacy-redirects.mjs";

import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: YukinaConfig.site,
  // Keep old links working:
  // - the About page was folded into the home page intro
  // - all projects now fit on the home page, so page 2 no longer exists
  redirects: {
    "/about": "/",
    "/2": "/",
    // Old hashed post, tag and category URLs -> readable ones
    ...legacyRedirects,
  },
  integrations: [
    tailwind(),
    svelte(),
    icon(),
    swup({
      theme: false,
      containers: ["#banner-container", "main", "footer"],
      smoothScrolling: true,
      progress: true,
      cache: true,
      preload: true,
      updateHead: true,
      updateBodyClass: false,
      globalInstance: true,
    }),
    sitemap(),
    pagefind(),
  ],
  markdown: {
    shikiConfig: {
      theme: "github-dark-default",
    },
    remarkPlugins: [remarkReadingTime, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      rehypeKatex,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
        },
      ],
    ],
  },
});
