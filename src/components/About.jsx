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
        <h2>Ideas with<br /><em>an invitation.</em></h2>
      </div>
      <div className="about-copy">
        <p className="about-lead">Wande Tricada is an Indonesian Interactive AR & VFX Creator creating playful, shareable, and visually engaging effects for platforms like TikTok Effect House, YouTube Effect Maker, and CapCut.</p>
        <p>His work blends visual storytelling with intuitive mechanics, transforming passive viewers into active participants. Every effect begins with a simple question: what would make someone want to try this?</p>
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
