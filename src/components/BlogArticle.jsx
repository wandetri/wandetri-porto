import BlogHeader from './BlogHeader'
import Footer from './Footer'
import Seo from './Seo'

const siteUrl = 'https://wandetri.com'

const formatDate = (date) => new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}).format(new Date(`${date}T00:00:00`))

function BlogArticle({ article }) {
  const articleUrl = `${siteUrl}/blog/${article.slug}/`
  const image = article.cover.startsWith('http') ? article.cover : `${siteUrl}${article.cover}`

  return (
    <div className="site-shell blog-shell">
      <Seo
        title={`${article.title} — wandetri`}
        description={article.description}
        image={image}
        url={articleUrl}
        type="article"
      />
      <BlogHeader />
      <main className="article-page">
        <article>
          <header className="article-header">
            <a className="article-back" href="/blog/">← All articles</a>
            <div className="article-meta">
              <span>{formatDate(article.date)}</span>
              <span>{article.readingTime}</span>
              <span>By {article.author}</span>
            </div>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <div className="blog-tags">{article.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </header>
          <figure className="article-cover">
            <img src={article.cover} alt={article.coverAlt} fetchPriority="high" />
          </figure>
          <div className="article-layout">
            <aside className="article-share" aria-label="Share article">
              <span>Share</span>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}>LinkedIn</a>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`}>X / Twitter</a>
              <a href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(articleUrl)}`}>Email</a>
            </aside>
            <div className="article-body" dangerouslySetInnerHTML={{ __html: article.html }} />
          </div>
          <footer className="article-footer">
            <p>More notes on interactive AR, VFX systems, and creative technology.</p>
            <a className="button button-secondary" href="/blog/">Browse all articles</a>
          </footer>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default BlogArticle
