# Wande Tricada Portfolio

A cinematic, video-first VFX showroom for Interactive AR & VFX Creator Wande Tricada, built with Vite and React.

## Run locally

```bash
npm install
npm run dev
```

## Edit the portfolio

- Selected works, CapCut VFX library, modal breakdowns, and capabilities: `src/data/effects.js`
- Bio and credentials: `src/components/About.jsx`
- Contact links: `src/components/Contact.jsx`
- Video files: `public/videos/`
- CapCut library GIFs: `public/posters/gif/`
- Poster images: `public/posters/`

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
