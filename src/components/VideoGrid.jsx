import VideoCard from './VideoCard'

function VideoGrid({ effects }) {
  return (
    <div className="video-grid">
      {effects.map((effect, index) => (
        <VideoCard effect={effect} index={index} key={effect.id} />
      ))}
    </div>
  )
}

export default VideoGrid
