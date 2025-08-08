---
title: Self-Hosted Astro Website
subtitle: A step-by-step log of how I designed, built and self-hosted my personal portfolio—covering everything.
description: A step-by-step log of how I designed, built and self-hosted my personal portfolio—covering everything from choosing Astro and the Yukina template to domain, dynamic DNS, Proxmox virtualisation, Nginx Proxy Manager and automated HTTPS.
published: 2025-08-06
tags: [Portfolio, Astro, Self-Hosting, Proxmox, Cloudflare, Nginx]
category: Projects
cover: /posts/web_portfolio/cover.webp
coverPosition: top
draft: false
---

# Self-Hosted Portfolio Website with Astro
I wanted a **lightning-fast, fully reactive** site that I control end-to-end—from source code to bare-metal.  
The result is a modern Astro-powered portfolio, self-hosted and running on my own **Proxmox** server.

---

## Why I Chose Astro
- **Islands architecture** → only hydrate the interactive bits, keeping TTI super-low.  
- Markdown & MDX first-class support—perfect for blog-style content.  
- Built-in image optimisation and partial hydration.  
- Tiny runtime (essentially none) once rendered—great for low-powered self-hosted boxes.  

---

## Starting Point: Yukina Template
The site began as a fork of **[@WhitePaper233/yukina](https://github.com/WhitePaper233/yukina)**—a clean, minimal Astro blog template.

### Key tweaks
1. **Layout overhaul** – flipped the sidebar, added a hero section.  
2. **Dark-mode toggle** – uses Astro’s built-in script island.  
3. **i18n** – injected `@astrojs/i18n` for multilingual routes.

Directory snapshot:
```text
src/
├─ components/
│  ├─ Navbar.astro
│  └─ ThemeToggle.astro
├─ pages/
│  ├─ index.astro
│  └─ [...].md
└─ styles/
   └─ tailwind.css
````

## Editing Workflow (VS Code + Dev Containers)

* **Dev Containers**—`.devcontainer.json` lets me spin up a reproducible Node 20 + Astro toolchain with one click.
* **Prettier & ESLint** keep Markdown/TS files lint-clean.
* Live-reload via `pnpm dev` (Astro’s dev server).

## Logo & Branding in GIMP 🎨

I designed a simple **initial-based logotype**:

1. Drew the glyph on a 2048 × 2048 canvas.
2. Exported SVG + multiple PNG sizes (512/192/32 px) for favicon + PWA icons.
3. Generated a monochrome variant for dark mode.

## Domain & Dynamic DNS with Cloudflare

| Item          | Value                       |
| ------------- | --------------------------- |
| **Registrar** | Cloudflare                  |
| **Zone**      | `my-portfolio.com`          |
| **Record**    | `CNAME → home.mydomain.dev` |
| **TTL**       | Auto                        |

A small **DDNS script** runs hourly inside a Proxmox container:

```bash
#!/usr/bin/env bash
# cloudflare-ddns.sh
ZONE_ID="xxxx"
RECORD_ID="yyyy"
IP=$(curl -s https://ipv4.icanhazip.com)
curl -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{\"type\":\"A\",\"name\":\"home\",\"content\":\"$IP\",\"ttl\":120,\"proxied\":true}"
```

## Hosting Topology (Proxmox VE)

```mermaid
graph LR
  Internet → CF[Cloudflare CDN]
  CF → NPM[Nginx Proxy Manager (CT)]
  NPM → VM[Ubuntu VM (Portfolio)]
  VM → NGINX[Internal NGINX] → Astro
```

* **Proxmox 7.4** on a mini-PC.
* **CT 101** – Debian, runs Nginx Proxy Manager (NPM).
* **VM 201** – Ubuntu 22.04, serves the static Astro build via internal Nginx.

---

## Reverse Proxy Rules (NPM)

| Hostname               | Target               | SSL           |
| ---------------------- | -------------------- | ------------- |
| `my-portfolio.com`     | `http://vm-201:8080` | Let’s Encrypt |
| `www.my-portfolio.com` | `http://vm-201:8080` | Let’s Encrypt |

NPM handles ACME challenges automatically; I just tick *“Force SSL”*.

---

## Internal NGINX on the VM

`/etc/nginx/sites-enabled/portfolio`:

```nginx
server {
  listen 8080;
  server_name _;
  root /var/www/portfolio;
  include /etc/nginx/snippets/headers.conf;
  location / {
    try_files $uri $uri/ =404;
  }
}
```

After each deploy:

```bash
pnpm build            # astro build
rsync -av dist/ vm:/var/www/portfolio/
ssh vm 'sudo systemctl reload nginx'
```

## HTTPS & Security

1. **Edge certs**—issued by Cloudflare (RSA + ECC).
2. **Origin cert**—auto-generated in NPM, stored under `/data/ssl/`.
3. **HSTS** (max-age = 31536000; preload) enabled at Cloudflare.
4. **Automatic HTTPS Rewrites** on.

> Result: A-grade on SSL Labs and 0-RTT supported.

## Deployment Flow

```text
git push origin main
└─ GitHub Actions → scp build → reload nginx (20 s total)
```

CI stores a read-only Cloudflare API token to purge cache on successful deploy.

## Performance Snapshot

* **Lighthouse mobile**: 100 / 100 / 100 / 100
* **Page weight**: 54 KB (gzip)
* **First Contentful Paint**: 0.9 s on 3G Fast.

## Future Work

* Add Webmentions & ActivityPub endpoints.
* Switch DDNS script to Cloudflare Tunnels for NAT-less connectivity.
* Migrate VM to **Alpine-based container** to cut RAM in half.

---

*Thanks for reading!* Feel free to fork the [repo](https://github.com/your-handle/portfolio) and reach out with questions.

