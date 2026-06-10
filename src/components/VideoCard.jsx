import MediaVideo from './MediaVideo'

function VideoCard({ effect, index }) {
  return (
    <article className={`video-card accent-${effect.accent}`} style={{ '--delay': `${index * 45}ms` }}>
      <div className="video-card-media">
        <MediaVideo src={effect.video} poster={effect.poster} />
        <span className="platform-label">{effect.platform}</span>
      </div>
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
    </article>
  )
}

export default VideoCard
