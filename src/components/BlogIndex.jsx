import BlogHeader from './BlogHeader'
import Footer from './Footer'
import Seo from './Seo'

const siteUrl = 'https://wandetri.com'
const socialImage = `${siteUrl}/blog/images/flowing-ar-energy-network.png`

const formatDate = (date) => new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}).format(new Date(`${date}T00:00:00`))

function BlogIndex({ articles }) {
  return (
    <div className="site-shell blog-shell">
      <Seo
        title="Blog — wandetri"
        description="Notes, breakdowns, and experiments across apps, interaction design, visual systems, and creative technology by wandetri."
        image={socialImage}
        url={`${siteUrl}/blog/`}
      />
      <BlogHeader />
      <main className="blog-index">
        <section className="blog-index-hero">
          <p className="eyebrow">Field Notes · Design / Technology / Process</p>
          <h1>Ideas behind<br /><em>the work.</em></h1>
          <p>Breakdowns, experiments, and practical notes from building apps, interactive experiences, visual systems, and creative technology.</p>
        </section>
        <section className="blog-list" aria-label="Articles">
          {articles.map((article, index) => (
            <article className="blog-card" key={article.slug}>
              <a className="blog-card-image" href={`/blog/${article.slug}/`} aria-label={`Read ${article.title}`}>
                <img src={article.cover} alt={article.coverAlt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
              </a>
              <div className="blog-card-copy">
                <div className="blog-card-meta">
                  <span>{formatDate(article.date)}</span>
                  <span>{article.readingTime}</span>
                </div>
                <h2><a href={`/blog/${article.slug}/`}>{article.title}</a></h2>
                <p>{article.description}</p>
                <div className="blog-tags">{article.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <a className="blog-read-link" href={`/blog/${article.slug}/`}>Read article ↗</a>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default BlogIndex
