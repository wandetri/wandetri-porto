import BlogHeader from './BlogHeader'

function NotFound() {
  return (
    <div className="blog-shell not-found">
      <BlogHeader />
      <main>
        <p className="eyebrow">404</p>
        <h1>Page not found.</h1>
        <a className="button button-primary" href="/">Back to portfolio</a>
      </main>
    </div>
  )
}

export default NotFound
