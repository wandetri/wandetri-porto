import { useEffect, useRef } from 'react'
import VideoCard from './VideoCard'

function VideoGrid({ effects, onSelect }) {
  const gridRef = useRef(null)

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 760px)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const grid = gridRef.current
    let observer
    let scrollTimer
    let snapTimer
    let isActive = false
    let isSnapping = false

    const snapToNearestCard = () => {
      if (!isActive || isSnapping || !mobileQuery.matches || !grid) return

      const cards = [...grid.querySelectorAll('.video-card')]
      const nearest = cards.reduce((closest, card) => (
        Math.abs(card.getBoundingClientRect().top) < Math.abs(closest.getBoundingClientRect().top)
          ? card
          : closest
      ), cards[0])

      if (!nearest || Math.abs(nearest.getBoundingClientRect().top) > window.innerHeight * 0.68) return

      isSnapping = true
      nearest.scrollIntoView({
        behavior: reducedMotionQuery.matches ? 'auto' : 'smooth',
        block: 'start',
      })
      clearTimeout(snapTimer)
      snapTimer = window.setTimeout(() => { isSnapping = false }, 520)
    }

    const handleScroll = () => {
      if (!isActive || isSnapping) return
      clearTimeout(scrollTimer)
      scrollTimer = window.setTimeout(snapToNearestCard, 110)
    }

    const stopObserving = () => {
      observer?.disconnect()
      isActive = false
      clearTimeout(scrollTimer)
      clearTimeout(snapTimer)
      window.removeEventListener('scroll', handleScroll)
      document.documentElement.classList.remove('reel-snap-active')
    }

    const startObserving = () => {
      stopObserving()
      if (!mobileQuery.matches || !grid) return

      observer = new IntersectionObserver(([entry]) => {
        isActive = entry.isIntersecting
        document.documentElement.classList.toggle('reel-snap-active', isActive)
        if (isActive) window.addEventListener('scroll', handleScroll, { passive: true })
        else window.removeEventListener('scroll', handleScroll)
      }, { rootMargin: '-12% 0px -12% 0px', threshold: 0 })
      observer.observe(grid)
    }

    startObserving()
    mobileQuery.addEventListener('change', startObserving)

    return () => {
      stopObserving()
      mobileQuery.removeEventListener('change', startObserving)
    }
  }, [])

  return (
    <div className="video-grid" ref={gridRef}>
      {effects.map((effect, index) => (
        <VideoCard effect={effect} index={index} onSelect={onSelect} key={effect.id} />
      ))}
    </div>
  )
}

export default VideoGrid
