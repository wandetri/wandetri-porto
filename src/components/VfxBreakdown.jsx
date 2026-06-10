import { capabilities } from '../data/effects'
import MediaVideo from './MediaVideo'

function VfxBreakdown() {
  return (
    <section className="section capability-section" id="capabilities">
      <div className="section-heading">
        <div>
          <p className="eyebrow">VFX breakdown · Capabilities</p>
          <h2>Systems behind<br />the image.</h2>
        </div>
        <p>Visual craft combined with tracking, triggers, shaders, animation, and real-time interaction.</p>
      </div>
      <div className="capability-grid">
        {capabilities.map((capability, index) => (
          <article className="capability-card" key={capability.title}>
            <MediaVideo src={capability.video} poster={capability.poster} className="capability-film" />
            <span className="capability-index">{String(index + 1).padStart(2, '0')}</span>
            <div><h3>{capability.title}</h3><p>{capability.detail}</p></div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default VfxBreakdown
