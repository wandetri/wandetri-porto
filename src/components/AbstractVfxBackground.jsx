import { useEffect, useRef } from 'react'

function AbstractVfxBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrame
    let width = 0
    let height = 0
    let points = []
    let pointer = { x: 0.68, y: 0.42, active: false }

    const resetPoints = () => {
      const count = Math.min(80, Math.max(42, Math.round((width * height) / 22000)))
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 1.2 + 0.5,
        phase: Math.random() * Math.PI * 2,
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
      resetPoints()
    }

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height)
      const focusX = pointer.x * width
      const focusY = pointer.y * height
      const energy = context.createRadialGradient(focusX, focusY, 0, focusX, focusY, width * 0.46)
      energy.addColorStop(0, 'rgba(229, 72, 50, 0.13)')
      energy.addColorStop(0.35, 'rgba(120, 88, 180, 0.07)')
      energy.addColorStop(1, 'rgba(7, 7, 7, 0)')
      context.fillStyle = energy
      context.fillRect(0, 0, width, height)

      points.forEach((point, index) => {
        if (!reducedMotion) {
          point.x += point.vx
          point.y += point.vy
          if (point.x < -20 || point.x > width + 20) point.vx *= -1
          if (point.y < -20 || point.y > height + 20) point.vy *= -1
        }

        const pulse = 0.7 + Math.sin(time * 0.001 + point.phase) * 0.3
        context.beginPath()
        context.arc(point.x, point.y, point.radius * pulse, 0, Math.PI * 2)
        context.fillStyle = 'rgba(232, 229, 222, 0.52)'
        context.fill()

        for (let next = index + 1; next < points.length; next += 1) {
          const other = points[next]
          const distance = Math.hypot(point.x - other.x, point.y - other.y)
          if (distance < 145) {
            context.beginPath()
            context.moveTo(point.x, point.y)
            context.lineTo(other.x, other.y)
            context.strokeStyle = `rgba(190, 185, 180, ${(1 - distance / 145) * 0.16})`
            context.lineWidth = 0.7
            context.stroke()
          }
        }

        const pointerDistance = Math.hypot(point.x - focusX, point.y - focusY)
        if (pointerDistance < 210) {
          context.beginPath()
          context.moveTo(point.x, point.y)
          context.lineTo(focusX, focusY)
          context.strokeStyle = `rgba(229, 72, 50, ${(1 - pointerDistance / 210) * 0.28})`
          context.lineWidth = 0.8
          context.stroke()
        }
      })

      context.beginPath()
      for (let x = -40; x <= width + 40; x += 14) {
        const y = height * 0.54 + Math.sin(x * 0.012 + time * 0.00045) * 34 + Math.sin(x * 0.004) * 58
        if (x === -40) context.moveTo(x, y)
        else context.lineTo(x, y)
      }
      context.strokeStyle = 'rgba(229, 72, 50, 0.2)'
      context.lineWidth = 1
      context.stroke()

      if (!reducedMotion) animationFrame = requestAnimationFrame(draw)
    }

    const handlePointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect()
      pointer = {
        x: (event.clientX - bounds.left) / bounds.width,
        y: (event.clientY - bounds.top) / bounds.height,
        active: true,
      }
    }

    const handlePointerLeave = () => {
      pointer = { x: 0.68, y: 0.42, active: false }
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerleave', handlePointerLeave)
    resize()
    draw()

    return () => {
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-vfx-canvas" aria-hidden="true" />
}

export default AbstractVfxBackground
