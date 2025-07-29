#!/bin/bash
# This is script is used to deploy the website in my Proxmox server
set -e  # Exit immediately if a command fails

echo "🚀 Pulling latest changes from GitHub..."
git pull origin main

echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

echo "🛠 Building Astro site..."
pnpm build

echo "📂 Deploying to /var/www/marcmonfort.com/..."
sudo rm -rf /var/www/marcmonfort.com/*
sudo cp -r dist/* /var/www/marcmonfort.com/
sudo chown -R www-data:www-data /var/www/marcmonfort.com

echo "🔄 Restarting Nginx..."
sudo systemctl restart nginx

echo "✅ Deployment complete! Website is live at https://marcmonfort.com 🚀"
