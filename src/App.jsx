import { useState } from 'react'
import About from './components/About'
import CapCutVfxLibrary from './components/CapCutVfxLibrary'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import ProjectModal from './components/ProjectModal'
import VfxModal from './components/VfxModal'
import VideoGrid from './components/VideoGrid'
import { effects } from './data/effects'

function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedVfx, setSelectedVfx] = useState(null)

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
        <CapCutVfxLibrary onSelect={setSelectedVfx} />
        <About />
        <Contact />
      </main>
      <Footer />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <VfxModal item={selectedVfx} onClose={() => setSelectedVfx(null)} />
    </div>
  )
}

export default App
