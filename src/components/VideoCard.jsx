import MediaVideo from './MediaVideo'

function VideoCard({ effect, index, onSelect }) {
  return (
    <button
      type="button"
      className="video-card"
      onClick={() => onSelect(effect)}
      style={{ '--delay': `${index * 45}ms` }}
      aria-label={`View ${effect.title} project breakdown`}
    >
      <MediaVideo src={effect.video} poster={effect.poster} className="video-card-media" />
      <span className="work-number">{String(index + 1).padStart(2, '0')}</span>
      <span className="video-card-content">
        <span className="work-meta">{effect.vfxType} · {effect.platform}</span>
        <strong>{effect.title}</strong>
        <span className="work-mechanic">{effect.interaction}</span>
      </span>
      <span className="view-project">View breakdown ↗</span>
    </button>
  )
}

export default VideoCard
