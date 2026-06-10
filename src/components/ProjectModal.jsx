import { useEffect, useRef } from 'react'
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
          <p className="eyebrow">{project.vfxType} · {project.platform}</p>
          <h2 id="project-title">{project.title}</h2>
          <p className="modal-intro">{project.description}</p>
          <div className="system-flow">
            <div><span>01 · Input</span><p>{project.input}</p></div>
            <div><span>02 · VFX System</span><p>{project.system}</p></div>
            <div><span>03 · Output</span><p>{project.output}</p></div>
          </div>
          <dl className="modal-facts">
            <div><dt>Interaction mechanic</dt><dd>{project.interaction}</dd></div>
            <div><dt>Tools used</dt><dd>{project.tools.join(' · ')}</dd></div>
            <div><dt>Final result</dt><dd>{project.result}</dd></div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
