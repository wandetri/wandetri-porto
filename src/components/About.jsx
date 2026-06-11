const credentials = [
  ['01', 'TikTok Effect House Ambassador'],
  ['02', 'CapCut VFX Creator'],
  ['03', 'YouTube Effect Maker Creator'],
  ['04', 'Winner of the TikTok Effect House × Genshin Impact Challenge'],
]

function About() {
  return (
    <section className="section about" id="about">
      <div className="about-title">
        <p className="eyebrow">About</p>
        <h2>Playful ideas.<br /><em>Crafted in real time.</em></h2>
      </div>
      <div className="about-copy">
        <p className="about-lead">Wande Tricada is an Interactive AR & VFX Creator creating playful, visual, and shareable AR effects for TikTok Effect House, YouTube Effect Maker, and CapCut.</p>
        <p>His work combines interaction design, game mechanics, real-time effects, motion graphics, and social experiences to create engaging and memorable AR interactions.</p>
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
