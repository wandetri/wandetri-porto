const links = [
  ['Email', 'hello@wandetricada.com', 'mailto:hello@wandetricada.com'],
  ['TikTok', '@wandetricada', '#'],
  ['Instagram', '@wandetricada', '#'],
  ['Behance / LinkedIn', 'View profile', '#'],
]

function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="contact-glow" />
      <p className="eyebrow">Have an idea?</p>
      <h2>Let’s make it<br /><em>interactive.</em></h2>
      <p className="contact-intro">Available for creative collaborations, branded effects, and playful experiments.</p>
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
