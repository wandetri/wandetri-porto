import MediaVideo from './MediaVideo'
import PlatformLogo from './PlatformLogo'

function VideoCard({ effect, index }) {
  return (
    <article className={`video-card accent-${effect.accent}`} style={{ '--delay': `${index * 45}ms` }}>
      <MediaVideo src={effect.video} poster={effect.poster} className="video-card-media" />
      <span className="platform-label">
        <PlatformLogo platform={effect.platform} />
        <span>{effect.platform}</span>
      </span>
      <div className="video-card-content">
        <div className="card-title-row">
          <h3>{effect.title}</h3>
          <span className="card-arrow">↗</span>
        </div>
        <p>{effect.description}</p>
        <div className="tag-list">
          {effect.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
      <span className="video-card-border" aria-hidden="true" />
    </article>
  )
}

export default VideoCard
