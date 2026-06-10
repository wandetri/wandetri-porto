import VideoCard from './VideoCard'

function VideoGrid({ effects, onSelect }) {
  return (
    <div className="video-grid">
      {effects.map((effect, index) => (
        <VideoCard effect={effect} index={index} onSelect={onSelect} key={effect.id} />
      ))}
    </div>
  )
}

export default VideoGrid
