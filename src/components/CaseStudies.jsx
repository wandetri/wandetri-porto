import { caseStudies } from '../data/effects'
import MediaVideo from './MediaVideo'

function CaseStudies() {
  return (
    <section className="section case-studies" id="case-studies">
      <div className="section-heading case-heading">
        <div>
          <p className="eyebrow">Behind the effect</p>
          <h2>Selected case studies.</h2>
        </div>
        <p>From the interaction hook to the final layer of polish.</p>
      </div>

      <div className="case-list">
        {caseStudies.map((study) => (
          <article className={`case-card accent-${study.accent}`} key={study.title}>
            <div className="case-media-wrap">
              <span className="case-number">{study.number}</span>
              <MediaVideo src={study.video} poster={study.poster} className="case-media" />
            </div>
            <div className="case-content">
              <p className="case-kicker">Case study {study.number}</p>
              <h3>{study.title}</h3>
              <dl>
                <div><dt>Interaction</dt><dd>{study.mechanic}</dd></div>
                <div><dt>VFX breakdown</dt><dd>{study.breakdown}</dd></div>
                <div><dt>Tools</dt><dd>{study.tools.join(' · ')}</dd></div>
                <div><dt>Result</dt><dd>{study.impact}</dd></div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CaseStudies
