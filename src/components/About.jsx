const credentials = [
  ['01', 'TikTok Effect House Ambassador'],
  ['02', 'CapCut VFX Creator'],
  ['03', 'YouTube Effect Maker Creator'],
  ['04', 'Genshin Impact Effect Challenge Winner'],
]

function About() {
  return (
    <section className="section about" id="about">
      <div className="about-title">
        <p className="eyebrow">About</p>
        <h2>Visual craft.<br /><em>Real-time response.</em></h2>
      </div>
      <div className="about-copy">
        <p className="about-lead">Wande Tricada is an Interactive AR & VFX Creator specializing in social camera effects, playable filters, and short-form visual experiences.</p>
        <p>Based in Indonesia, his practice combines VFX, motion design, tracking systems, and intuitive interaction. The result is work that reads instantly on camera while rewarding participation, expression, and replay.</p>
        <div className="credential-list">
          {credentials.map(([number, label]) => (
            <div className="credential" key={label}>
              <span>{number}</span>
              <strong>{label}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
