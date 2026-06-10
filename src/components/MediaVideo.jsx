import { useEffect, useRef, useState } from 'react'

function MediaVideo({ src, poster, className = '', eager = false }) {
  const [failed, setFailed] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(eager)
  const frameRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    if (eager || shouldLoad) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px 0px' },
    )

    observer.observe(frameRef.current)
    return () => observer.disconnect()
  }, [eager, shouldLoad])

  useEffect(() => {
    if (!shouldLoad || !videoRef.current) return
    videoRef.current.load()
    videoRef.current.play().catch(() => {})
  }, [shouldLoad])

  return (
    <div ref={frameRef} className={`media-frame ${className} ${failed ? 'is-placeholder' : ''}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload={eager ? 'metadata' : 'none'}
        poster={poster}
        onError={() => setFailed(true)}
        aria-label="Effect video preview"
      >
        {shouldLoad && <source src={src} type="video/mp4" />}
      </video>
      <span className="media-shine" aria-hidden="true" />
      <span className="media-status"><i /> Live effect</span>
    </div>
  )
}

export default MediaVideo
