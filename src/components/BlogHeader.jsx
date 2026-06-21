function BlogHeader() {
  return (
    <header className="site-header blog-site-header" id="top">
      <a className="brand" href="/" aria-label="wandetri home">
        <span className="brand-mark">w</span>
        <span>wandetri</span>
      </a>
      <nav aria-label="Blog navigation">
        <a href="/">Portfolio</a>
        <a className="nav-blog" href="/blog/">Blog</a>
        <a className="nav-contact" href="mailto:hi@wandetri.com">Email</a>
      </nav>
    </header>
  )
}

export default BlogHeader
