# Media sources

Full-quality originals of images and animations used on the site. They live outside `public/`, so they are **not** deployed. Each file sits at the same path as the web version it produces in `public/`, e.g. `assets/posts/comp-game/cover.gif` → `public/posts/comp-game/cover.webp`.

Older or unused media was removed in the Nov 2026 clean-up; it is still in the git history.

## Commands

The commands use `-threads 1` because this machine runs close to its thread limit; drop it elsewhere.

**Profile photo** (`about/photo_small_square.jpg`):

```bash
convert assets/about/photo_small_square.jpg -auto-orient -strip -resize 512x512 -quality 82 public/about/profile-photo-512.webp
convert assets/about/photo_small_square.jpg -auto-orient -strip -resize 600x600 -quality 85 public/about/og-default.jpg
```

**Animated cover** (GIF → animated WebP, max 720 px wide):

```bash
ffmpeg -threads 1 -i assets/posts/comp-game/cover.gif \
  -vf "select='gte(n\,2)',setpts=N/FRAME_RATE/TB,scale='min(720,iw)':-2:flags=lanczos" \
  -c:v libwebp_anim -lossless 0 -quality 72 -compression_level 6 -loop 0 public/posts/comp-game/cover.webp
```

`select='gte(n\,2)'` drops the first two frames, which are blank in the game recordings (link previews show the first frame). The Break-In cover also uses `fps=15` and `-quality 65` to stay near 1 MB.

**GIF inside a post** (GIF → looping MP4, used with `<video autoplay loop muted playsinline>`):

```bash
ffmpeg -threads 1 -i assets/posts/smart-city-multiagent/demo.gif \
  -c:v libx264 -pix_fmt yuv420p -crf 23 -preset slow -movflags +faststart \
  -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -an public/posts/smart-city-multiagent/demo.mp4
```

## Covers made from YouTube videos

These have no file here; the source is the video on YouTube (download with a recent `yt-dlp`).

| Cover | Video | Clip | Notes |
|---|---|---|---|
| `public/posts/shanghai-fuxing-island/cover.webp` | [H3TmqEMVi98](https://www.youtube.com/watch?v=H3TmqEMVi98) | 1:07.5–1:16 | `crop=1280:674:0:23` |
| `public/posts/web-portfolio/cover.webp` | [UI2TUB_mIKA](https://www.youtube.com/watch?v=UI2TUB_mIKA) | 0:20–0:29 | `crop=684:360:298:102` on the 720p video, to hide the browser bar and webcam |

Both: `fps=10`, `scale=720:-2`, `libwebp_anim -quality 55`.
