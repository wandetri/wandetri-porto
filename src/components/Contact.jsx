const links = [
  ['Email', 'hi@wandetri.com', 'mailto:hi@wandetri.com'],
  ['TikTok', '@wandetri', 'https://www.tiktok.com/@wandetri'],
]

function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="contact-links">
        {links.map(([label, value, href]) => (
          <a href={href} key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Contact
