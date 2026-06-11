const links = [
  ['Email', 'hello@wandetri.com', 'mailto:hello@wandetri.com'],
  ['TikTok', '@wandetri', '#'],
  ['Instagram', '@wandetri', '#'],
  ['Behance / LinkedIn', '@wandetri', '#'],
]

function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="contact-glow" />
      <p className="eyebrow">Have an idea?</p>
      <h2>Build the next<br /><em>camera experience.</em></h2>
      <p className="contact-intro">Available for VFX commissions, branded camera effects, interactive campaigns, and creative technology collaborations.</p>
      <div className="contact-links">
        {links.map(([label, value, href]) => (
          <a href={href} key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <i>↗</i>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Contact
