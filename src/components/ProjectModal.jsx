import { useEffect, useRef } from 'react'
import EffectBadge from './EffectBadge'
import MediaVideo from './MediaVideo'

function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!project) return undefined
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
  }, [project, onClose])

  if (!project) return null

  return (
    <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-title">
      <button ref={closeRef} className="modal-close" type="button" onClick={onClose}>Close ×</button>
      <div className="modal-layout">
        <div className="modal-film">
          <MediaVideo src={project.video} poster={project.poster} className="modal-video" eager />
        </div>
        <div className="modal-copy">
          <p className="eyebrow">{project.platform} · Community Interactive Work</p>
          <h2 id="project-title">{project.title}</h2>
          <p className="modal-intro">{project.description}</p>
          <div className="modal-tag-list" aria-label="Project tags">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          {project.badgeType && (
            <div className="modal-recognition">
              <EffectBadge
                type={project.badgeType}
                label={project.badgeLabel}
                detail={project.badgeDetail}
                expanded
              />
            </div>
          )}
          {project.note && <p className="modal-note"><span>Note</span>{project.note}</p>}
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
