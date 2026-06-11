import { useEffect, useRef } from 'react'

const TAU = Math.PI * 2

function AbstractVfxBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reducedMotion = motionQuery.matches
    let animationFrame
    let width = 0
    let height = 0
    let points = []
    let pulses = []
    let lastPulseAt = 0
    let pulseInterval = 1800
    let visible = true
    const pointer = { x: 0.72, y: 0.36, targetX: 0.72, targetY: 0.36 }

    const resetPoints = () => {
      const mobile = width < 680
      const count = Math.min(mobile ? 42 : 72, Math.max(mobile ? 30 : 46, Math.round((width * height) / 25000)))

      points = Array.from({ length: count }, (_, index) => {
        const depth = 0.35 + Math.random() * 0.65
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (0.055 + depth * 0.07),
          vy: (Math.random() - 0.5) * (0.045 + depth * 0.06),
          depth,
          radius: 0.45 + depth * 1.15,
          phase: Math.random() * TAU,
          hub: index % 13 === 0,
        }
      })
      pulses = []
    }

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const maxRatio = bounds.width < 680 ? 1.35 : 1.75
      const ratio = Math.min(window.devicePixelRatio || 1, maxRatio)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      resetPoints()
    }

    const drawAtmosphere = (time) => {
      context.fillStyle = '#07090e'
      context.fillRect(0, 0, width, height)

      const drift = reducedMotion ? 0 : Math.sin(time * 0.00008) * width * 0.035
      const cyan = context.createRadialGradient(width * 0.76 + drift, height * 0.32, 0, width * 0.76 + drift, height * 0.32, width * 0.55)
      cyan.addColorStop(0, 'rgba(45, 151, 181, 0.13)')
      cyan.addColorStop(0.38, 'rgba(41, 83, 130, 0.07)')
      cyan.addColorStop(1, 'rgba(7, 9, 14, 0)')
      context.fillStyle = cyan
      context.fillRect(0, 0, width, height)

      const violet = context.createRadialGradient(width * 0.52 - drift, height * 0.72, 0, width * 0.52 - drift, height * 0.72, width * 0.48)
      violet.addColorStop(0, 'rgba(105, 76, 168, 0.085)')
      violet.addColorStop(1, 'rgba(7, 9, 14, 0)')
      context.fillStyle = violet
      context.fillRect(0, 0, width, height)

      const warmth = context.createRadialGradient(width * 0.88, height * 0.7, 0, width * 0.88, height * 0.7, width * 0.3)
      warmth.addColorStop(0, 'rgba(198, 104, 72, 0.025)')
      warmth.addColorStop(1, 'rgba(7, 9, 14, 0)')
      context.fillStyle = warmth
      context.fillRect(0, 0, width, height)
    }

    const updatePoints = (time) => {
      pointer.x += (pointer.targetX - pointer.x) * 0.025
      pointer.y += (pointer.targetY - pointer.y) * 0.025

      points.forEach((point) => {
        if (!reducedMotion) {
          point.x += point.vx
          point.y += point.vy
          point.x += Math.sin(time * 0.00016 + point.phase) * 0.018 * point.depth
          point.y += Math.cos(time * 0.00013 + point.phase) * 0.014 * point.depth

          if (point.x < -35) point.x = width + 35
          if (point.x > width + 35) point.x = -35
          if (point.y < -35) point.y = height + 35
          if (point.y > height + 35) point.y = -35
        }

        point.renderX = point.x + (pointer.x - 0.5) * 20 * (1 - point.depth)
        point.renderY = point.y + (pointer.y - 0.5) * 14 * (1 - point.depth)
      })
    }

    const buildConnections = (time) => {
      const connections = []
      const range = width < 680 ? 128 : 158
      const breathe = 0.86 + Math.sin(time * 0.00055) * 0.14

      points.forEach((point, index) => {
        for (let next = index + 1; next < points.length; next += 1) {
          const other = points[next]
          const distance = Math.hypot(point.renderX - other.renderX, point.renderY - other.renderY)
          if (distance >= range) continue

          const depth = (point.depth + other.depth) * 0.5
          const alpha = (1 - distance / range) * (0.075 + depth * 0.15) * breathe
          const violetMix = (point.phase + other.phase) % TAU > Math.PI
          context.beginPath()
          context.moveTo(point.renderX, point.renderY)
          context.lineTo(other.renderX, other.renderY)
          context.strokeStyle = violetMix
            ? `rgba(137, 126, 205, ${alpha})`
            : `rgba(100, 185, 211, ${alpha})`
          context.lineWidth = 0.5 + depth * 0.45
          context.stroke()

          connections.push({ from: index, to: next, strength: alpha, violetMix })
        }
      })

      return connections
    }

    const drawNodes = (time) => {
      points.forEach((point) => {
        const pulse = reducedMotion ? 0.82 : 0.78 + Math.sin(time * 0.0009 + point.phase) * 0.22
        const radius = point.radius * pulse

        if (point.hub) {
          context.beginPath()
          context.arc(point.renderX, point.renderY, 7 + point.depth * 5, 0, TAU)
          context.fillStyle = `rgba(80, 180, 211, ${0.025 + point.depth * 0.025})`
          context.fill()
          context.beginPath()
          context.arc(point.renderX, point.renderY, 3.2, 0, TAU)
          context.strokeStyle = `rgba(126, 194, 215, ${0.16 + point.depth * 0.12})`
          context.lineWidth = 0.55
          context.stroke()
        }

        context.beginPath()
        context.arc(point.renderX, point.renderY, radius, 0, TAU)
        context.fillStyle = `rgba(187, 220, 229, ${0.38 + point.depth * 0.4})`
        context.fill()
      })
    }

    const drawEnergyPulses = (time, connections) => {
      if (!reducedMotion && connections.length && time - lastPulseAt > pulseInterval) {
        const candidates = connections.filter((connection) => connection.strength > 0.055)
        const selected = candidates[Math.floor(Math.random() * candidates.length)]
        if (selected) {
          pulses.push({ ...selected, startedAt: time, duration: 1700 + Math.random() * 900 })
          pulses = pulses.slice(-4)
          lastPulseAt = time
          pulseInterval = 1400 + Math.random() * 1700
        }
      }

      pulses = pulses.filter((pulse) => {
        const progress = (time - pulse.startedAt) / pulse.duration
        if (progress > 1) return false

        const from = points[pulse.from]
        const to = points[pulse.to]
        if (!from || !to) return false

        const eased = progress * progress * (3 - 2 * progress)
        const tail = Math.max(0, eased - 0.2)
        const startX = from.renderX + (to.renderX - from.renderX) * tail
        const startY = from.renderY + (to.renderY - from.renderY) * tail
        const endX = from.renderX + (to.renderX - from.renderX) * eased
        const endY = from.renderY + (to.renderY - from.renderY) * eased
        const fade = Math.sin(progress * Math.PI)
        const color = pulse.violetMix ? '158, 143, 231' : '104, 210, 230'

        context.save()
        context.shadowColor = `rgba(${color}, ${0.52 * fade})`
        context.shadowBlur = 14
        context.beginPath()
        context.moveTo(startX, startY)
        context.lineTo(endX, endY)
        context.strokeStyle = `rgba(${color}, ${0.62 * fade})`
        context.lineWidth = 1.3
        context.stroke()
        context.beginPath()
        context.arc(endX, endY, 1.25, 0, TAU)
        context.fillStyle = `rgba(218, 244, 248, ${0.72 * fade})`
        context.fill()
        context.restore()
        return true
      })
    }

    const draw = (time = 0) => {
      drawAtmosphere(time)
      updatePoints(time)
      const connections = buildConnections(time)
      drawEnergyPulses(time, connections)
      drawNodes(time)
      if (!reducedMotion && visible) animationFrame = requestAnimationFrame(draw)
    }

    const handlePointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect()
      pointer.targetX = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width))
      pointer.targetY = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height))
    }

    const handlePointerLeave = () => {
      pointer.targetX = 0.72
      pointer.targetY = 0.36
    }

    const handleMotionChange = (event) => {
      reducedMotion = event.matches
      cancelAnimationFrame(animationFrame)
      draw()
    }

    const observer = new ResizeObserver(() => {
      resize()
      cancelAnimationFrame(animationFrame)
      draw()
    })
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(animationFrame)
      if (visible) draw()
    }, { threshold: 0.01 })

    observer.observe(canvas)
    visibilityObserver.observe(canvas)
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerleave', handlePointerLeave)
    motionQuery.addEventListener('change', handleMotionChange)
    resize()
    draw()

    return () => {
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
      visibilityObserver.disconnect()
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerleave', handlePointerLeave)
      motionQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-vfx-canvas" aria-hidden="true" />
}

export default AbstractVfxBackground
