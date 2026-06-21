import { readFile, readdir } from 'node:fs/promises'
import { basename, join } from 'node:path'

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;')

const slugify = (value) => value
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '')

function parseValue(value) {
  const trimmed = value.trim()
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed.slice(1, -1).split(',').map((item) => item.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean)
  }
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false
  return trimmed.replace(/^['"]|['"]$/g, '')
}

export function parseFrontmatter(source) {
  if (!source.startsWith('---\n')) return { attributes: {}, body: source }
  const end = source.indexOf('\n---\n', 4)
  if (end === -1) throw new Error('Frontmatter is missing its closing ---')

  const attributes = {}
  source.slice(4, end).split('\n').forEach((line) => {
    if (!line.trim() || line.trim().startsWith('#')) return
    const separator = line.indexOf(':')
    if (separator === -1) return
    attributes[line.slice(0, separator).trim()] = parseValue(line.slice(separator + 1))
  })

  return { attributes, body: source.slice(end + 5).trim() }
}

function renderInline(value) {
  let output = escapeHtml(value)
  output = output.replace(/!\[([^\]]*)\]\(([^\s)]+)(?:\s+&quot;([^&]*)&quot;)?\)/g, '<img src="$2" alt="$1" title="$3" loading="lazy" decoding="async">')
  output = output.replace(/\[([^\]]+)\]\(([^\s)]+)\)/g, '<a href="$2">$1</a>')
  output = output.replace(/`([^`]+)`/g, '<code>$1</code>')
  output = output.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  output = output.replace(/_([^_]+)_/g, '<em>$1</em>')
  return output
}

export function renderMarkdown(markdown) {
  const lines = markdown.replaceAll('\r\n', '\n').split('\n')
  const output = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]
    if (!line.trim()) {
      index += 1
      continue
    }

    if (line.startsWith('```')) {
      const language = line.slice(3).trim().replace(/[^a-z0-9#+.-]/gi, '') || 'text'
      const code = []
      index += 1
      while (index < lines.length && !lines[index].startsWith('```')) {
        code.push(lines[index])
        index += 1
      }
      output.push(`<div class="code-block"><span>${escapeHtml(language)}</span><pre><code class="language-${escapeHtml(language)}">${escapeHtml(code.join('\n'))}</code></pre></div>`)
      index += 1
      continue
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/)
    if (heading) {
      const level = heading[1].length
      const text = heading[2].trim()
      const id = slugify(text)
      output.push(`<h${level} id="${id}">${renderInline(text)}<a class="heading-anchor" href="#${id}" aria-label="Link to ${escapeHtml(text)}">#</a></h${level}>`)
      index += 1
      continue
    }

    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      output.push('<hr>')
      index += 1
      continue
    }

    if (line.startsWith('> ')) {
      const quote = []
      while (index < lines.length && lines[index].startsWith('> ')) {
        quote.push(lines[index].slice(2))
        index += 1
      }
      output.push(`<blockquote>${quote.map(renderInline).join('<br>')}</blockquote>`)
      continue
    }

    if (/^[-*]\s+/.test(line)) {
      const items = []
      while (index < lines.length && /^[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^[-*]\s+/, ''))
        index += 1
      }
      output.push(`<ul>${items.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ul>`)
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      const items = []
      while (index < lines.length && /^\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\d+\.\s+/, ''))
        index += 1
      }
      output.push(`<ol>${items.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ol>`)
      continue
    }

    const paragraph = [line.trim()]
    index += 1
    while (index < lines.length && lines[index].trim() && !/^(#{1,4})\s+|^```|^> |^[-*]\s+|^\d+\.\s+|^(-{3,}|\*{3,})$/.test(lines[index])) {
      paragraph.push(lines[index].trim())
      index += 1
    }

    const content = renderInline(paragraph.join(' '))
    output.push(content.startsWith('<img ') ? `<figure>${content}</figure>` : `<p>${content}</p>`)
  }

  return output.join('\n')
}

export async function loadArticles(root = process.cwd()) {
  const directory = join(root, 'content', 'blog')
  const files = (await readdir(directory)).filter((file) => file.endsWith('.md')).sort()
  const articles = await Promise.all(files.map(async (file) => {
    const source = await readFile(join(directory, file), 'utf8')
    const { attributes, body } = parseFrontmatter(source)
    const slug = attributes.slug || basename(file, '.md')
    const required = ['title', 'date', 'description', 'cover']
    required.forEach((key) => {
      if (!attributes[key]) throw new Error(`${file}: missing required frontmatter field "${key}"`)
    })
    if (/^#\s+/m.test(body)) throw new Error(`${file}: use the frontmatter title as the page H1; start article sections at ##`)

    const words = body.replace(/```[\s\S]*?```/g, '').trim().split(/\s+/).filter(Boolean).length
    return {
      slug,
      title: attributes.title,
      date: attributes.date,
      updated: attributes.updated || attributes.date,
      description: attributes.description,
      cover: attributes.cover,
      coverAlt: attributes.coverAlt || attributes.title,
      tags: Array.isArray(attributes.tags) ? attributes.tags : [],
      author: attributes.author || 'Wande Tricada',
      featured: attributes.featured === true,
      readingTime: `${Math.max(1, Math.ceil(words / 220))} min read`,
      html: renderMarkdown(body),
    }
  }))

  return articles.sort((a, b) => new Date(b.date) - new Date(a.date))
}
