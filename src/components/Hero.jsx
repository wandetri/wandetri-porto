import MediaVideo from './MediaVideo'

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> Interactive AR & VFX Creator</p>
        <h1>Effects people don’t just watch <span>— they play with.</span></h1>
        <p className="hero-intro">I create playful, shareable experiences where visual effects meet real-time interaction.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#effects">View effects <span>↘</span></a>
          <a className="button button-secondary" href="#contact">Contact</a>
        </div>
        <div className="hero-meta">
          <span>Based in Indonesia</span>
          <span>TikTok · YouTube · CapCut</span>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="showreel-label">Showreel <span>00:45</span></div>
        <MediaVideo
          src="videos/showreel.mp4"
          poster="posters/showreel.svg"
          className="showreel"
          eager
        />
        <div className="floating-note note-one">Real-time<br />interaction</div>
        <div className="floating-note note-two">Play · React<br />Share</div>
      </div>
    </section>
  )
}

export default Hero
