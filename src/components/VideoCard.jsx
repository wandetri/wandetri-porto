import EffectBadge from './EffectBadge'
import MediaVideo from './MediaVideo'

function VideoCard({ effect, index, onSelect }) {
  return (
    <button
      type="button"
      className={`video-card ${effect.badgeType ? 'has-badge' : ''}`}
      onClick={() => onSelect(effect)}
      style={{ '--delay': `${index * 45}ms` }}
      aria-label={`View ${effect.title} project breakdown`}
    >
      <MediaVideo src={effect.video} poster={effect.poster} className="video-card-media" />
      <span className="work-number">{String(index + 1).padStart(2, '0')}</span>
      <EffectBadge
        type={effect.badgeType}
        label={effect.badgeLabel}
        detail={effect.badgeDetail}
      />
      <span className="video-card-content">
        <span className="work-meta">{effect.platform}</span>
        <strong>{effect.title}</strong>
        <span className="work-description">{effect.description}</span>
        <span className="work-tags">
          {effect.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </span>
      </span>
      <span className="view-project">View breakdown ↗</span>
    </button>
  )
}

export default VideoCard
