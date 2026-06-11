import { useEffect, useRef } from 'react'
import VideoCard from './VideoCard'

function VideoGrid({ effects, onSelect }) {
  const gridRef = useRef(null)

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 760px)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const grid = gridRef.current
    let observer
    let isActive = false
    let isPaging = false
    let startY = 0
    let startIndex = 0
    let gestureHandled = false
    let wheelDelta = 0
    let releaseTimer

    const cards = () => [...grid.querySelectorAll('.video-card')]

    const nearestCardIndex = () => {
      const items = cards()
      return items.reduce((closestIndex, card, index) => (
        Math.abs(card.getBoundingClientRect().top) < Math.abs(items[closestIndex].getBoundingClientRect().top)
          ? index
          : closestIndex
      ), 0)
    }

    const pageTo = (index) => {
      const items = cards()
      const target = items[index]
      if (!target || isPaging) return

      isPaging = true
      gestureHandled = true
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY,
        behavior: reducedMotionQuery.matches ? 'auto' : 'smooth',
      })
      clearTimeout(releaseTimer)
      releaseTimer = window.setTimeout(() => {
        isPaging = false
        gestureHandled = false
      }, reducedMotionQuery.matches ? 80 : 650)
    }

    const handleTouchStart = (event) => {
      if (!isActive || isPaging || event.touches.length !== 1) return
      startY = event.touches[0].clientY
      startIndex = nearestCardIndex()
      gestureHandled = false
    }

    const handleTouchMove = (event) => {
      if (!isActive || isPaging || gestureHandled || event.touches.length !== 1) return

      const deltaY = startY - event.touches[0].clientY
      const direction = deltaY > 0 ? 1 : -1
      const targetIndex = startIndex + direction
      const canPage = targetIndex >= 0 && targetIndex < cards().length

      if (Math.abs(deltaY) < 8 || !canPage) return
      event.preventDefault()

      if (Math.abs(deltaY) >= 42) pageTo(targetIndex)
    }

    const handleWheel = (event) => {
      if (!isActive || isPaging || gestureHandled) return

      const direction = event.deltaY > 0 ? 1 : -1
      const currentIndex = nearestCardIndex()
      const targetIndex = currentIndex + direction
      const canPage = targetIndex >= 0 && targetIndex < cards().length

      if (!canPage) {
        wheelDelta = 0
        return
      }

      event.preventDefault()
      wheelDelta += event.deltaY
      if (Math.abs(wheelDelta) >= 28) {
        wheelDelta = 0
        pageTo(targetIndex)
      }
    }

    const stopObserving = () => {
      observer?.disconnect()
      isActive = false
      clearTimeout(releaseTimer)
      grid.removeEventListener('touchstart', handleTouchStart)
      grid.removeEventListener('touchmove', handleTouchMove)
      grid.removeEventListener('wheel', handleWheel)
      document.documentElement.classList.remove('reel-swipe-active')
    }

    const startObserving = () => {
      stopObserving()
      if (!mobileQuery.matches || !grid) return

      observer = new IntersectionObserver(([entry]) => {
        isActive = entry.isIntersecting
        document.documentElement.classList.toggle('reel-swipe-active', isActive)
      }, { rootMargin: '-10% 0px -10% 0px', threshold: 0 })

      observer.observe(grid)
      grid.addEventListener('touchstart', handleTouchStart, { passive: true })
      grid.addEventListener('touchmove', handleTouchMove, { passive: false })
      grid.addEventListener('wheel', handleWheel, { passive: false })
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
