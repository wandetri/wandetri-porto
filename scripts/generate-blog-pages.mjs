import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { loadArticles } from './blog-content.mjs'

const root = process.cwd()
const dist = join(root, 'dist')
const siteUrl = 'https://wandetri.com'
const articles = await loadArticles(root)
const template = await readFile(join(dist, 'index.html'), 'utf8')

const escapeAttribute = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')

function buildPage({ title, description, url, image, imageAlt, type = 'website', published, updated, author, assetPrefix, jsonLd, staticContent = '' }) {
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttribute(title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escapeAttribute(description)}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeAttribute(title)}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeAttribute(description)}" />`)
    .replace(/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${type}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`)
    .replace(/(["'])\.\/assets\//g, `$1${assetPrefix}assets/`)

  const social = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="wandetri" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:secure_url" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeAttribute(imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttribute(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttribute(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    published ? `<meta property="article:published_time" content="${published}" />` : '',
    updated ? `<meta property="article:modified_time" content="${updated}" />` : '',
    author ? `<meta name="author" content="${escapeAttribute(author)}" />` : '',
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replaceAll('<', '\\u003c')}</script>`,
  ].filter(Boolean).join('\n    ')

  return html
    .replace('</head>', `    ${social}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${staticContent}</div>`)
}

const blogImage = `${siteUrl}/blog/images/flowing-ar-energy-network.png`
const blogUrl = `${siteUrl}/blog/`
const blogDirectory = join(dist, 'blog')
await mkdir(blogDirectory, { recursive: true })

await writeFile(join(blogDirectory, 'index.html'), buildPage({
  title: 'Blog — wandetri',
  description: 'Notes, breakdowns, and experiments across apps, interaction design, visual systems, and creative technology by wandetri.',
  url: blogUrl,
  image: blogImage,
  imageAlt: 'wandetri field notes on design and creative technology',
  assetPrefix: '../',
  staticContent: `<main><article><h1>wandetri Blog</h1><p>Notes, breakdowns, and experiments across apps, interaction design, visual systems, and creative technology.</p>${articles.map((article) => `<h2><a href="/blog/${article.slug}/">${escapeAttribute(article.title)}</a></h2><p>${escapeAttribute(article.description)}</p>`).join('')}</article></main>`,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'wandetri Blog',
    url: blogUrl,
    author: { '@type': 'Person', name: 'Wande Tricada', url: siteUrl },
  },
}))

for (const article of articles) {
  const articleUrl = `${siteUrl}/blog/${article.slug}/`
  const articleDirectory = join(blogDirectory, article.slug)
  const image = article.cover.startsWith('http') ? article.cover : `${siteUrl}${article.cover}`
  await mkdir(articleDirectory, { recursive: true })
  await writeFile(join(articleDirectory, 'index.html'), buildPage({
    title: `${article.title} — wandetri`,
    description: article.description,
    url: articleUrl,
    image,
    imageAlt: article.coverAlt,
    type: 'article',
    published: article.date,
    updated: article.updated,
    author: article.author,
    assetPrefix: '../../',
    staticContent: `<main><article><h1>${escapeAttribute(article.title)}</h1><p>${escapeAttribute(article.description)}</p>${article.html}</article></main>`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.description,
      image: [image],
      datePublished: article.date,
      dateModified: article.updated,
      mainEntityOfPage: articleUrl,
      author: { '@type': 'Person', name: article.author, url: siteUrl },
      publisher: { '@type': 'Person', name: 'wandetri', url: siteUrl },
    },
  }))
}

const urls = [
  `<url><loc>${siteUrl}/</loc></url>`,
  `<url><loc>${blogUrl}</loc></url>`,
  ...articles.map((article) => `<url><loc>${siteUrl}/blog/${article.slug}/</loc><lastmod>${article.updated}</lastmod></url>`),
]
await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`)
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`)
await writeFile(join(dist, '404.html'), template.replace(/(["'])\.\/assets\//g, '$1/assets/'))
console.log(`Generated static SEO pages for ${articles.length} article${articles.length === 1 ? '' : 's'}.`)
