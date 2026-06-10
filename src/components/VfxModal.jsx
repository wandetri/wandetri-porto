import { useEffect, useRef } from 'react'
import MediaVideo from './MediaVideo'

function VfxModal({ item, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!item) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div className="vfx-modal" role="dialog" aria-modal="true" aria-labelledby="vfx-modal-title">
      <button ref={closeRef} className="modal-close" type="button" onClick={onClose}>Close ×</button>
      <div className="vfx-modal-inner">
        <MediaVideo src={item.video} poster={item.poster} className="vfx-modal-film" eager />
        <div className="vfx-modal-caption">
          <p>{item.type} · CapCut VFX Library</p>
          <h2 id="vfx-modal-title">{item.title}</h2>
          {item.description && <span>{item.description}</span>}
        </div>
      </div>
    </div>
  )
}

export default VfxModal
