import { useRef, useState } from 'react'

function Hero() {
  const filmRef = useRef(null)
  const [showreelPlaying, setShowreelPlaying] = useState(false)

  const playShowreel = () => {
    if (!filmRef.current) return
    filmRef.current.currentTime = 0
    filmRef.current.muted = false
    filmRef.current.play().catch(() => {
      filmRef.current.muted = true
      filmRef.current.play()
    })
    setShowreelPlaying(true)
  }

  return (
    <section className="hero" id="top">
      <video ref={filmRef} className="hero-film" autoPlay muted loop playsInline preload="metadata" poster="posters/showreel.svg">
        <source src="videos/showreel.mp4" type="video/mp4" />
      </video>
      <div className="hero-shade" />
      <div className="hero-copy">
        <p className="eyebrow">Interactive VFX Showroom · Indonesia</p>
        <h1>Wande<br />Tricada</h1>
        <div className="hero-lower">
          <h2>Interactive AR & VFX Creator</h2>
          <p>VFX-driven effects for social platforms, games, and interactive camera experiences.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#works">View VFX Works</a>
            <button className="button button-secondary" type="button" onClick={playShowreel}>
              {showreelPlaying ? 'Showreel Playing' : 'Watch Showreel'} <span>▶</span>
            </button>
          </div>
        </div>
      </div>
      <div className="hero-index"><span>Showreel</span><span>2026</span></div>
      <span className="scroll-mark">Scroll to explore ↓</span>
    </section>
  )
}

export default Hero
