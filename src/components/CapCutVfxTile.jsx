import MediaVideo from './MediaVideo'

function CapCutVfxTile({ item, onSelect }) {
  return (
    <button
      type="button"
      className="capcut-vfx-tile"
      onClick={() => onSelect(item)}
      aria-label={`View ${item.title} VFX demo`}
    >
      <MediaVideo src={item.video} poster={item.poster} className="capcut-vfx-film" />
      <span className="capcut-vfx-overlay">
        <strong>{item.title}</strong>
        <span>{item.type}</span>
      </span>
    </button>
  )
}

export default CapCutVfxTile
