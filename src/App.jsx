import { useState } from 'react'
import About from './components/About'
import BlogArticle from './components/BlogArticle'
import BlogIndex from './components/BlogIndex'
import CapCutVfxLibrary from './components/CapCutVfxLibrary'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import NotFound from './components/NotFound'
import ProjectModal from './components/ProjectModal'
import VideoGrid from './components/VideoGrid'
import { effects } from './data/effects'
import { blogArticles } from './generated/blogArticles'

function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="wandetri home">
          <span className="brand-mark">w</span>
          <span>wandetri</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#works">Works</a>
          <a href="#capcut-library">CapCut VFX</a>
          <a href="#about">About</a>
          <a className="nav-blog" href="/blog/">Blog</a>
          <a className="nav-contact" href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <Hero />
        <section className="section works-section" id="works">
          <div className="section-heading">
            <div>
              <p className="eyebrow">TikTok Effects · Community Interactive Works · 8 Selected Effects</p>
              <h2>Interactive Effects Showcase</h2>
            </div>
            <p>8 community-facing interactive effects designed for TikTok, blending gameplay, storytelling, visual effects, and social sharing experiences.</p>
          </div>
          <VideoGrid effects={effects} onSelect={setSelectedProject} />
        </section>
        <CapCutVfxLibrary />
        <About />
        <Contact />
      </main>
      <Footer />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
}

function App() {
  const parts = window.location.pathname.split('/').filter(Boolean)
  const blogPosition = parts.indexOf('blog')

  if (blogPosition !== -1) {
    const slug = parts[blogPosition + 1]
    if (!slug) return <BlogIndex articles={blogArticles} />
    const article = blogArticles.find((item) => item.slug === slug)
    return article ? <BlogArticle article={article} /> : <NotFound />
  }

  return <Portfolio />
}

export default App
