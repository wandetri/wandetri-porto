function CapCutVfxTile({ item }) {
  return (
    <div className="capcut-vfx-tile">
      <img className="capcut-vfx-film" src={item.image} alt="" loading="lazy" decoding="async" />
      <span className="capcut-vfx-overlay">
        <strong>{item.title}</strong>
      </span>
    </div>
  )
}

export default CapCutVfxTile
