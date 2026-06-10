import { useState } from 'react'
import About from './components/About'
import CaseStudies from './components/CaseStudies'
import CategoryFilter from './components/CategoryFilter'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import VideoGrid from './components/VideoGrid'
import { categories, effects } from './data/effects'

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const visibleEffects = activeCategory === 'All'
    ? effects
    : effects.filter((effect) => effect.category === activeCategory)

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Wande Tricada home">
          <span className="brand-mark">WT</span>
          <span>Wande Tricada</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#effects">Work</a>
          <a href="#about">About</a>
          <a className="nav-contact" href="#contact">Let's talk</a>
        </nav>
      </header>

      <main>
        <Hero />
        <section className="section effects-section" id="effects">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected effects</p>
              <h2>Built to be played.</h2>
            </div>
            <p>Experiments in interaction, identity, play, and visual transformation.</p>
          </div>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
          <VideoGrid effects={visibleEffects} />
        </section>
        <CaseStudies />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
