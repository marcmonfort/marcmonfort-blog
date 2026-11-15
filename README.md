# Marc Monfort's Blog

Welcome to my personal blog! This is a space where I share my thoughts, projects, and experiences. The blog is built using [Astro](https://astro.build/), showcasing my journey in web development and self-hosting.

This repository is based on the [Yukina](https://github.com/WhitePaper233/yukina) template, with some fixes and customizations to better suit my needs.

## 🛠️ Build Guide

### 1. Install Node.js version 22 or above

Go to the [Node.js official website](https://nodejs.org/) to download and install the latest version of Node.js.

### 2. Enable Corepack

```bash
corepack enable
```

### 3. Install pnpm

```bash
corepack enable pnpm
```

### 4. Install Dependencies

```bash
pnpm install
```

### 5. Build Search Index

```bash
pnpm build
```

### 6. Start Development Server

```bash
pnpm dev
```

### 7. Build Project

```bash
pnpm build
```

### 8. Preview Project

```bash
pnpm preview
```
## 📐 Cover Image Guidelines

For the cover image, please use an aspect ratio of 1.9:1 to ensure it fits well within the layout and avoids cropping. Here are some guidelines:

- Minimum size: 808×424 px (for Retina screens) (half if necessary)
- Recommended size: 1200×630 px (for sharp display + social sharing)
- Aspect ratio: 1.9:1 (match layout, avoid cropping)

## 📝 Writing Posts

A post's URL comes from its file name, without the date prefix: `src/contents/posts/projects/2020-04-25-connect_four_ai_haskell.md` is served at `/posts/connect-four-ai-haskell`. Renaming a published post's file changes its URL, so add a redirect from the old URL in `astro.config.mjs`.

Set `draft: true` to keep a post out of the production build; drafts still show with `pnpm dev`.

Each post should include the following metadata in the frontmatter:

```yaml
title: "Post Title"
subtitle: "A brief description of the post" # Optional, if None description will be used
description: "A longer description of the post"
published: 2025-08-06
tags: [tag1, tag2]
category: "Category Name"
licenseName: "License Name" # Optional, e.g., "Unlicensed"
author: "Author Name"
sourceLink: "https://example.com"
cover: /path/to/cover/image.webp
coverPosition: top # Optional, default is center
draft: false
```


## 📄 Updating the CV

The CV button on the home page opens `public/cv.pdf` (served at `/cv.pdf`). To update it, overwrite that file with the latest **web version** of the CV (without the phone number), keeping the same file name so existing links keep working.
