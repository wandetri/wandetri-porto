function CapCutVfxTile({ item, onSelect }) {
  return (
    <button
      type="button"
      className="capcut-vfx-tile"
      onClick={() => onSelect(item)}
      aria-label={`View ${item.title} VFX demo`}
    >
      <img className="capcut-vfx-film" src={item.image} alt="" loading="lazy" decoding="async" />
      <span className="capcut-vfx-overlay">
        <strong>{item.title}</strong>
      </span>
    </button>
  )
}

export default CapCutVfxTile
