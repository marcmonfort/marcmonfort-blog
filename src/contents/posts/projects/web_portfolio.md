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
For long time I've been wanting to have centralized place to showcase my projects, and what a better choice than a personal portfolio website. This posts details the entire journey of the decisions I made and the steps I took to build and self-host my own website.

The result is a modern, Astro-powered portfolio that’s **self-hosted** on my own **Proxmox** server. This setup gives me the freedom to experiment, optimize, and learn while ensuring that every aspect of the site


## Web Development with Astro 🚀

### Why I Chose Astro

There are many static site generators out there, but I chose **Astro** for several reasons:

### Starting Point: Yukina Template

I'm not a designer, so I knew that to have a good-looking site, the best option was to start from a pre-existing template. Luckily, Astro has a great website with a [collection of templates](https://astro.build/themes) to choose from.

For this one, I picked **[Yukina](https://github.com/WhitePaper233/yukina)** because of its clean, minimal design and good performance out of the box. It also uses **Tailwind CSS**, which I’m familiar with.

Here is the updated **"Key tweaks"** section based on your GitHub commits:


### Key tweaks

As always, when using a template it hardly fits 100% your needs, so I had to make some adjustments:

1. **New content and structure**: I added new project posts including *dataClay*, *SmartCity*, *Comp Game Engine*, *TinyML Federated Learning*, and *Break-in Game*—each with detailed markdown descriptions and cover images.
2. **Improved metadata system**: I introduced metadata options such as `subtitle` for posts and `coverPosition` (top, center, bottom) to allow more flexibility in layout and presentation.
3. **PostCard and typography refinements**: I adjusted spacing, description clamping, and line height in components like PostCard to enhance responsiveness and visual balance.
4. **Logo and profile updates**: Rebranded the site with a personal logo and updated profile and banner images for a more consistent and professional look.
5. **Navigation and configuration tweaks**: Updated navigation labels, fixed avatar paths, removed unused archive entries, and improved formatDate to return `YYYY-MM-DD`.
6. **Responsive design fixes**: Fixed layout issues such as waves misaligning on small screens and footer tag overflow.
7. **Deployment support**: Added a deployment script to automate the process of pushing the site to my Proxmox-based hosting setup.

> 🔗 *You can view the complete list of changes on [my GitHub repository](https://github.com/marcmonfort/marcmonfort-blog/commits/main).*


### Editing Workflow (VS Code)

<!-- comment bout the Vscode integration the `pnpm dev` dynamic loading where you see the changes reacting instantly. Also the new `agent` feature using LLM to make much faster the develompent-->

Something that I really liked about Astro is its **developer experience**. Using **VS Code** with the Astro extension, I could run `pnpm dev` and see my changes reflected instantly in the browser. The integration is seamless, and the new **Copilot Agent** feature that leverages LLMs made development even faster by providing intelligent code suggestions.

### Logo & Branding in GIMP 🎨

I wanted a simple yet distinctive logo for my portfolio. Using **GIMP**, I designed a minimalistic logo that reflects my personal brand using my initials "MM". However, the design had to consider visibility in both light and dark modes. For that, I found two solutions, the first one was to use a circular crop of my "MM" logo, and the second one was to add a white border around the logo to make it stand out against dark backgrounds.

<div style="display: flex; justify-content: center; gap: 10px; padding: 10px;">
  <img src="/posts/web_portfolio/MM_logo_circular_crop.png" alt="Logo Light" width="200" />
  <img src="/posts/web_portfolio/MM_logo_circular_crop.png" alt="Logo Dark Circle" width="200" style="background-color: black;" />
  <img src="/posts/web_portfolio/MM_logo_fit_transparent.png" alt="Logo Dark Border" width="200" style="background-color: black;" />
</div>


## Deployment

### Domain & Dynamic DNS with Cloudflare

Since I wanted a professional-looking portfolio, I decided to purchase a custom domain name. I bought my domain name **"marcmonfort.com"** with Cloudflare. I considered **"marcmonfort.me"**, but **".com"** is more professional. The cost was around **10 euros per year**.

### Hosting Topology (Proxmox VE)

I wanted to have full control over my website, so I decided to self-host it using an old computer that I refurbished as a home server by installing Proxmox on it. Proxmox VE is a powerful open-source virtualization platform that allows me to run multiple virtual machines (VMs) on a single physical server. This setup gives me the flexibility to manage my portfolio website and other services independently.

### Nginx Proxy Manager (NPM)

I set up a VM in my Proxmox server for the **Nginx Proxy Manager (NPM)**, which allows me to manage multiple subdomains and redirect them to different VMs or containers running various services. NPM provides an easy-to-use web interface for managing Nginx configurations, SSL certificates, and access controls.

### Internal NGINX on the VM

For the VM hosting the website, I deployed an internal Nginx server to handle incoming requests. Since HTTPS is already managed by the Nginx Proxy Manager, this internal Nginx configuration is straightforward and focuses on serving the static files generated by Astro.


---

*Thanks for reading!* Feel free to fork the [repo](https://github.com/marcmonfort/marcmonfort-blog) and reach out with questions.

