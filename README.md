# Wande Tricada Portfolio

A cinematic, video-first VFX showroom for Interactive AR & VFX Creator Wande Tricada, built with Vite and React.

## Run locally

```bash
npm install
npm run dev
```

## Edit the portfolio

- Selected works, CapCut VFX library, and modal content: `src/data/effects.js`
- Bio and credentials: `src/components/About.jsx`
- Contact links: `src/components/Contact.jsx`
- Video files: `public/videos/`
- CapCut library GIFs: `public/posters/gif/`
- Poster images: `public/posters/`

## Publish blog articles

Articles are standard Markdown files in `content/blog/`. Add a new `.md` file with this frontmatter:

```md
---
title: "Article title"
slug: article-slug
date: 2026-06-21
updated: 2026-06-21
description: "A concise SEO and social-sharing description."
cover: /blog/images/article-thumbnail.png
coverAlt: "Accessible description of the thumbnail"
tags: [AR, VFX, Tutorial]
author: "Wande Tricada"
featured: false
---
```

Write the article below the frontmatter using H2/H3 headings, lists, links, images, quotes, inline code, and fenced code blocks. The frontmatter title becomes the page H1, so do not repeat it in the Markdown body. Put article images in `public/blog/images/`.

The build generates `/blog/`, one static `/blog/:slug/` page per article, article-specific Open Graph and Twitter cards, canonical URLs, JSON-LD, `sitemap.xml`, and `robots.txt`.

For best performance, use short H.264 MP4 loops and keep preview videos below 3-5 MB. The demo wall and capability films use poster images and `preload="none"` to avoid downloading every video on first load.

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

The Vite `base` is set to `./`, so the build works from a GitHub Pages repository subpath.

1. Create a GitHub repository and push this project.
2. Install dependencies with `npm install`.
3. Run `npm run deploy`.
4. In the repository, open **Settings → Pages** and confirm the `gh-pages` branch is selected.

Alternatively, deploy the `dist` folder with a GitHub Actions Pages workflow. The production site will work at either a project URL such as `https://username.github.io/repository/` or a custom domain.
