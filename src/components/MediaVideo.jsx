import { useState } from 'react'

function MediaVideo({ src, poster, className = '', eager = false }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`media-frame ${className} ${failed ? 'is-placeholder' : ''}`}>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload={eager ? 'metadata' : 'none'}
        poster={poster}
        onError={() => setFailed(true)}
        aria-label="Effect video preview"
      >
        <source src={src} type="video/mp4" />
      </video>
      <span className="media-shine" aria-hidden="true" />
      <span className="media-status"><i /> Live effect</span>
    </div>
  )
}

export default MediaVideo
