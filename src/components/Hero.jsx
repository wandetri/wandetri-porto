import { useRef } from 'react'
import MediaVideo from './MediaVideo'
import PlexusBackground from './PlexusBackground'

function Hero() {
  const tiltRef = useRef(null)

  const handlePointerMove = (event) => {
    if (event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    const rotateY = (x - 0.5) * 18
    const rotateX = (0.5 - y) * 14

    tiltRef.current?.style.setProperty('--rotate-x', `${rotateX}deg`)
    tiltRef.current?.style.setProperty('--rotate-y', `${rotateY}deg`)
    tiltRef.current?.style.setProperty('--glow-x', `${x * 100}%`)
    tiltRef.current?.style.setProperty('--glow-y', `${y * 100}%`)
  }

  const resetTilt = () => {
    tiltRef.current?.style.setProperty('--rotate-x', '0deg')
    tiltRef.current?.style.setProperty('--rotate-y', '0deg')
    tiltRef.current?.style.setProperty('--glow-x', '50%')
    tiltRef.current?.style.setProperty('--glow-y', '35%')
  }

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
        <PlexusBackground />
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="showreel-label">Showreel <span>00:45</span></div>
        <div
          ref={tiltRef}
          className="showreel-tilt"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
        >
          <div className="showreel-float">
            <MediaVideo
              src="videos/showreel.mp4"
              poster="posters/showreel.svg"
              className="showreel"
              eager
            />
            <span className="showreel-glow" aria-hidden="true" />
          </div>
        </div>
        <div className="floating-note note-one">Real-time<br />interaction</div>
        <div className="floating-note note-two">Play · React<br />Share</div>
      </div>
    </section>
  )
}

export default Hero
