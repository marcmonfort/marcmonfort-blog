# marcmonfort.com

Source of my personal portfolio at [marcmonfort.com](https://marcmonfort.com): a short introduction, my research and side projects, and publications.

Built with [Astro](https://astro.build/), based on the [Yukina](https://github.com/WhitePaper233/yukina) template with many changes, and self-hosted on my Proxmox server (see the [write-up](https://marcmonfort.com/posts/web-portfolio)).

## 🛠️ Development

Requires Node.js 22+ and pnpm (`corepack enable pnpm`).

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # static site in dist/, including the search index
pnpm preview   # serve dist/
```

`deploy.sh` runs on the server: it pulls `main`, builds, and copies `dist/` to Nginx.

## 🗂️ Structure

```
src/
  components/Intro.astro       home page introduction (edit the text here)
  contents/posts/projects/     posts, one Markdown file each
  data/publications.ts         publications page
  pages/                       routes (home, posts, publications, tags, categories, 404, RSS)
  utils/slug.ts                post, tag and category URLs
public/
  posts/<slug>/                media for each post (cover.webp, videos, figures)
  about/, banners/, logos/     profile photo, home banners, logo
  cv.pdf                       CV linked from the home page
assets/                        full-quality media sources, not deployed (see assets/README.md)
yukina.config.ts               site settings: title, nav, social links, banners, license
legacy-redirects.mjs           old hashed URLs → readable URLs
```

## 📝 Writing posts

Create `src/contents/posts/projects/YYYY-MM-DD-my-post.md`. The URL is the file name without the date: `/posts/my-post`. Put its media in `public/posts/my-post/`.

```yaml
title: "Post Title"
subtitle: "Short line under the title" # optional, defaults to description
description: "One or two sentences, used for cards, search results and link previews"
published: 2026-11-15
tags: [Reinforcement Learning, HPC]
category: Research # or Projects
author: Marc Monfort
sourceLink: "https://github.com/marcmonfort/my-repo" # optional
licenseName: "Apache License 2.0" # optional, defaults to CC BY-NC-SA 4.0
cover: /posts/my-post/cover.webp
coverPosition: center # optional: top | center | bottom
draft: false # true = only visible with pnpm dev
```

Start the body with `# Title`, since post pages have no banner.

- **Renaming** a published post's file changes its URL: add a redirect from the old URL in `astro.config.mjs`.
- **Covers**: 1.9:1 aspect ratio, e.g. 1200×630 for still images. Animated covers are animated WebP, at most 720 px wide and about 1 MB.
- **Animations inside posts**: use a looping MP4 instead of a GIF (much smaller):
  `<video src="/posts/my-post/demo.mp4" autoplay loop muted playsinline aria-label="…" style="max-width:100%;height:auto;"></video>`
- Keep full-quality originals in `assets/` at the matching path; `assets/README.md` has the conversion commands.

## 📄 Other content

- **Intro** on the home page: `src/components/Intro.astro`. The email address is stored encoded so scrapers can't read it; the file has the command to regenerate it.
- **Publications**: `src/data/publications.ts`.
- **CV**: replace `public/cv.pdf` with the latest web version of the CV (without phone number), keeping the file name so links keep working.
