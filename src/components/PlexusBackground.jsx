import { useEffect, useRef } from 'react'

function PlexusBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frameId
    let width = 0
    let height = 0
    let particles = []
    let pointer = { x: -1000, y: -1000 }

    const createParticles = () => {
      const count = Math.min(58, Math.max(28, Math.round((width * height) / 13000)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        size: Math.random() * 1.3 + 0.6,
      }))
    }

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      createParticles()
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)

      particles.forEach((particle, index) => {
        if (!reducedMotion) {
          particle.x += particle.vx
          particle.y += particle.vy
          if (particle.x < 0 || particle.x > width) particle.vx *= -1
          if (particle.y < 0 || particle.y > height) particle.vy *= -1
        }

        const pointerDistance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y)
        const isNearPointer = pointerDistance < 150

        context.beginPath()
        context.arc(particle.x, particle.y, isNearPointer ? particle.size * 1.7 : particle.size, 0, Math.PI * 2)
        context.fillStyle = isNearPointer ? 'rgba(200, 255, 77, 0.85)' : 'rgba(185, 167, 255, 0.48)'
        context.fill()

        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next]
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          if (distance < 112) {
            const alpha = (1 - distance / 112) * 0.22
            context.beginPath()
            context.moveTo(particle.x, particle.y)
            context.lineTo(other.x, other.y)
            context.strokeStyle = `rgba(185, 167, 255, ${alpha})`
            context.lineWidth = 0.7
            context.stroke()
          }
        }

        if (isNearPointer) {
          context.beginPath()
          context.moveTo(particle.x, particle.y)
          context.lineTo(pointer.x, pointer.y)
          context.strokeStyle = `rgba(200, 255, 77, ${(1 - pointerDistance / 150) * 0.3})`
          context.lineWidth = 0.8
          context.stroke()
        }
      })

      if (!reducedMotion) frameId = requestAnimationFrame(draw)
    }

    const handlePointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect()
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
    }

    const handlePointerLeave = () => {
      pointer = { x: -1000, y: -1000 }
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerleave', handlePointerLeave)
    resize()
    draw()

    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="plexus-canvas" aria-hidden="true" />
}

export default PlexusBackground
