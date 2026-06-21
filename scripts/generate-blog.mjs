import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { loadArticles } from './blog-content.mjs'

const root = process.cwd()
const articles = await loadArticles(root)
const outputDirectory = join(root, 'src', 'generated')
await mkdir(outputDirectory, { recursive: true })
await writeFile(
  join(outputDirectory, 'blogArticles.js'),
  `// Generated from content/blog. Do not edit directly.\nexport const blogArticles = ${JSON.stringify(articles, null, 2)}\n`,
)
console.log(`Generated ${articles.length} blog article${articles.length === 1 ? '' : 's'}.`)
