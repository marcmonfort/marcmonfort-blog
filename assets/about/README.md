# Profile photo sources

Full-size source photos. They live outside `public/` so they are **not** deployed.

`photo_small_square.jpg` is the current photo. The site uses resized copies in `public/about/`:

```bash
convert assets/about/photo_small_square.jpg -auto-orient -strip -resize 512x512 -quality 82 public/about/profile-photo-512.webp
convert assets/about/photo_small_square.jpg -auto-orient -strip -resize 600x600 -quality 85 public/about/og-default.jpg
```

`profile-photo.webp` and `original/` are older photos kept for reference.
