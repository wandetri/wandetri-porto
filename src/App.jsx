import { useState } from 'react'
import About from './components/About'
import CapCutVfxLibrary from './components/CapCutVfxLibrary'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import ProjectModal from './components/ProjectModal'
import VfxBreakdown from './components/VfxBreakdown'
import VfxModal from './components/VfxModal'
import VideoGrid from './components/VideoGrid'
import { effects } from './data/effects'

function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedVfx, setSelectedVfx] = useState(null)

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Wande Tricada home">
          <span className="brand-mark">WT</span>
          <span>Wande Tricada</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#works">Works</a>
          <a href="#capabilities">VFX Lab</a>
          <a href="#about">About</a>
          <a className="nav-contact" href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <Hero />
        <section className="section works-section" id="works">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Interactive VFX Showroom · Selected 01–08</p>
              <h2>VFX demo wall.</h2>
            </div>
            <p>Curated camera effects, transformations, playable systems, and motion work. Select a film to view its process.</p>
          </div>
          <VideoGrid effects={effects} onSelect={setSelectedProject} />
        </section>
        <CapCutVfxLibrary onSelect={setSelectedVfx} />
        <VfxBreakdown />
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
