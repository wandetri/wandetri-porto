import AbstractVfxBackground from './AbstractVfxBackground'

function Hero() {
  return (
    <section className="hero" id="top">
      <AbstractVfxBackground />
      <div className="hero-shade" />
      <div className="hero-copy">
        <p className="eyebrow">Interactive AR & VFX Creator · Indonesia</p>
        <h1>Wande<br />Tricada</h1>
        <div className="hero-lower">
          <h2>Interactive AR & VFX Creator</h2>
          <p>Creating AR effects, VFX systems, and playful interactive visuals for social platforms.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#works">Interactive Effects</a>
            <a className="button button-secondary" href="#capcut-library">CapCut VFX Library</a>
          </div>
        </div>
      </div>
      <div className="hero-index"><span>Real-time</span><span>VFX Systems</span></div>
      <span className="scroll-mark">Scroll to explore ↓</span>
    </section>
  )
}

export default Hero
