---
title: Self-Hosted Astro Website
subtitle: A step-by-step log of how I designed, built and self-hosted my personal portfolio—covering everything.
description: A step-by-step log of how I designed, built and self-hosted my personal portfolio—covering everything from choosing Astro to the domain, dynamic DNS, Proxmox virtualisation, Nginx Proxy Manager and automated HTTPS.
published: 2025-08-06
tags: [Astro, Self-Hosting]
category: Projects
cover: /posts/web_portfolio/cover.webp
coverPosition: top
draft: false
---

# Self-Hosted Portfolio Website with Astro
I’ve wanted a single, well-organized place to showcase my projects for a long time. Instead of relying on a mishmash of GitHub READMEs and screenshots spread across folders, I decided to build a proper portfolio website—fast, minimal, and fully under my control.

The result is a modern, Astro-powered site that’s self-hosted on my own Proxmox server. It’s simple to maintain, inexpensive to run, and it gives me full ownership of the stack—from domain and DNS, to SSL, reverse proxy, and the final Nginx serving static pages.

In this post I’ll walk through the full journey: why I chose Astro, the template I started from, the tweaks I made, how I automated deployment, the home-lab hosting topology, and a few lessons learned along the way.

---

## Why Astro for a Personal Site 🚀
Picking a static-site framework for a personal site means balancing speed, flexibility, and maintenance. I chose Astro because:

- Zero-JS by default: Content-heavy pages ship almost no JavaScript unless I opt in.
- Islands architecture: Interactive widgets (like search) hydrate only where needed.
- First-class Markdown: MD/MDX + “content collections” make structured content a breeze.
- Tailwind integration: Utility-first styling with great DX.
- Batteries included: Image optimizations, RSS, and SEO patterns are easy to add.

In short, it keeps the site fast without sacrificing the ability to sprinkle interactivity.

## Starting Point: Yukina Template
I’m not a designer, so I began with the clean and minimal Yukina template:

- Template: https://github.com/WhitePaper233/yukina
- Why: Elegant defaults, thoughtful typography, and solid performance out of the box.
- Familiarity: Uses Tailwind, which I already like and know.

From there, I customized the template to fit my content model, branding, and deployment strategy.


## Key tweaks I made
Templates never fit 100% of your needs. These are the most meaningful changes I made:

1. New content and structure
   - Added project posts like dataClay, SmartCity, Comp Game Engine, TinyML Federated Learning, and Break-in Game—each with a detailed write-up and a proper cover image.
   - Organized images under `public/` with both originals and optimized WebP versions.

2. Richer frontmatter metadata
   - Introduced `subtitle` for better context in listings and headers.
   - Added `coverPosition` (top, center, bottom) to control how banner images crop.
   - Validated content with Astro Content Collections (schema keeps posts consistent).

3. Component and typography refinements
   - Tuned `PostCard` spacing, description clamping, and line height for better scanability across breakpoints.
   - Adjusted layout padding and minor rhythm so long-form posts read comfortably.

4. Branding and visuals
   - Added a personal logo and refreshed profile/banner images for a consistent look.
   - Standardized cover art and converted heavy images to WebP for faster loads.

5. Navigation and housekeeping
   - Simplified nav labels, fixed avatar paths, removed unused archive entries.
   - Improved date formatting to `YYYY-MM-DD` for clarity and sorting.

6. Responsive edge cases
   - Fixed wave shapes and footer tag overflow at small viewport widths.

7. Deployment and ops
   - Wrote a deploy script to build and publish the site to my Proxmox-hosted VM.

> See all changes here: https://github.com/marcmonfort/marcmonfort-blog/commits/main

## Editing Workflow in VS Code
The developer experience with Astro is excellent. I run `pnpm dev` and edit Markdown or components in VS Code; hot reload makes changes show up instantly. Pairing that with intelligent code suggestions speeds up iteration, especially when I’m tweaking Tailwind classes or refining component props.

## Content Pipeline and Assets
- Content lives in `src/contents/` with clear folders for posts and archives.
- Frontmatter drives listings, cover images, and SEO snippets.
- Images go under `public/` and are referenced by absolute paths. I keep an `original/` subfolder alongside WebP versions so I can re-export or re-optimize when needed.
- I favor `.webp` for large banners and `.png` for logos with transparency.

Tip: When in doubt, keep the originals, then automate conversions. Even a simple `cwebp` pass can shave megabytes off a page of visuals.


## Logo & Branding in GIMP 🎨
I wanted something simple and recognizable using my initials “MM.” Two practical considerations made the logo work across themes:

- A circular-crop variant that reads well on light backgrounds.
- A transparent version with a subtle white border to hold up on dark backgrounds.

<div style="display: flex; justify-content: center; gap: 10px; padding: 10px;">
  <img src="/posts/web_portfolio/MM_logo_circular_crop.png" alt="MM logo on light background" width="200" />
  <img src="/posts/web_portfolio/MM_logo_circular_crop.png" alt="MM logo preview on dark background" width="200" style="background-color: black;" />
  <img src="/posts/web_portfolio/MM_logo_fit_transparent.png" alt="MM logo with white border on dark" width="200" style="background-color: black;" />
</div>

---

## Hosting Topology (Home-Lab on Proxmox)
I run everything at home on an old PC repurposed as a Proxmox VE host. The high-level flow looks like this:

Internet → Cloudflare DNS → Home router → Nginx Proxy Manager VM → Web VM (Nginx) → `/var/www/marcmonfort.com`

- Proxmox VE: Virtualization layer, easy snapshots and backups.
- Nginx Proxy Manager (NPM) VM: Terminates TLS with Let’s Encrypt and routes to services.
- Web VM: Serves the static files built by Astro via a tiny Nginx config.

This separation keeps the origin simple and lets NPM manage HTTPS, HTTP/2/3, and certificates.

## Domain and Dynamic DNS (Cloudflare)
I registered `marcmonfort.com` on Cloudflare (~10€/year). Since my home IP can change, I use a lightweight script to update the Cloudflare A record automatically.

Here’s a minimal example (replace placeholders and store the token securely):

```bash
#!/usr/bin/env bash
# Cloudflare DDNS updater (example)
set -euo pipefail
ZONE_ID="<your_zone_id>"
RECORD_ID="<your_record_id>"
API_TOKEN="${CLOUDFLARE_API_TOKEN}"
NAME="marcmonfort.com"
IP=$(curl -s https://ipv4.icanhazip.com)

curl -sX PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{\n  \"type\": \"A\",\n  \"name\": \"$NAME\",\n  \"content\": \"$IP\",\n  \"ttl\": 120,\n  \"proxied\": true\n}"
```

Run it via cron (e.g., every 5 minutes) so the record stays fresh after an IP change.


## Reverse Proxy with Nginx Proxy Manager
On the NPM UI I created a Proxy Host for `marcmonfort.com` pointing to the internal Web VM, enabled SSL with Let’s Encrypt, and forced HTTPS. Optional hardening that’s worth toggling:

- HTTP/2 and HTTP/3 (QUIC)
- HSTS (if you’re confident you won’t serve plain HTTP)
- Strict TLS ciphers

NPM makes certificate renewals and host routing painless, especially when you run multiple web apps or subdomains.

## Origin Nginx (Static Files Only)
Since TLS terminates at the proxy, the origin Nginx is intentionally boring—just serve files fast and cache assets. A representative server block:

```nginx
server {
  listen 80;
  server_name marcmonfort.com;

  root /var/www/marcmonfort.com;
  index index.html;

  # Basic security headers
  add_header X-Content-Type-Options nosniff;
  add_header X-Frame-Options SAMEORIGIN;
  add_header Referrer-Policy strict-origin-when-cross-origin;

  # Gzip (Brotli can be enabled at the proxy)
  gzip on;
  gzip_types text/plain text/css application/javascript application/json image/svg+xml;

  # Cache static assets aggressively
  location ~* \.(?:js|css|png|jpg|jpeg|gif|svg|webp|ico|ttf|otf|woff|woff2)$ {
    expires 30d;
    add_header Cache-Control "public, max-age=2592000, immutable";
  }

  location / {
    try_files $uri $uri/ =404;
  }
}
```

It’s minimal, reliable, and it does exactly what a static site needs.


## One-Command Deployment
My deploy script lives alongside the site and runs on the server:

```bash
#!/bin/bash
# Build and publish the site to /var/www/marcmonfort.com
set -e

echo "Pulling latest changes..." && git pull origin main
pnpm install --frozen-lockfile
pnpm build
sudo rm -rf /var/www/marcmonfort.com/*
sudo cp -r dist/* /var/www/marcmonfort.com/
sudo chown -R www-data:www-data /var/www/marcmonfort.com
sudo systemctl restart nginx
```

I can keep iterating locally, push to `main`, SSH into the VM, and run the script. It’s simple and robust. If I ever want CI/CD, switching to a GitHub Action that rsyncs the `dist/` folder to the VM would be straightforward.


## Performance and UX Notes
- Astro’s zero-JS pages keep Time to First Byte and total shipped bytes small.
- Interactive bits (search, mobile nav) hydrate on demand.
- WebP covers plus long-cache headers make image-heavy pages feel snappy.
- Content Collections + frontmatter provide consistent metadata for cards, feeds, and SEO.

If you measure with Lighthouse, the combination of static HTML, optimized images, and conservative hydration gets you very close to top-tier scores without heroics.


## Costs and Maintenance
- Domain: ~10€/year on Cloudflare.
- Hosting: Old PC + Proxmox at home; power cost depends on your hardware and uptime.
- SSL: Free via Let’s Encrypt (managed by NPM).
- Ops: Occasional `pnpm update` and system patching; content edits are just Markdown.


## Lessons Learned
- Start from a solid template, then standardize your content model early.
- Keep originals for images; automate optimization as a repeatable step.
- Separate TLS termination (proxy) from the origin—it simplifies config and troubleshooting.
- Prefer boring deployment: a small script beats a complex pipeline for a single static site.


## What’s Next
- GitHub Actions for push-to-deploy without SSHing into the server.
- Astro Image integration for automatic responsive images.
- A lightweight service worker for offline access to recent posts.
- A tags page with better filtering and a richer search index.

---

Thanks for reading! The source is here: https://github.com/marcmonfort/marcmonfort-blog — feel free to fork it or open an issue if you’re curious about any part of the setup.

