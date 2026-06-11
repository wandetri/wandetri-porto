function EffectBadge({ type, label, detail, expanded = false }) {
  if (!type) return null

  const isWinner = type === 'winner'

  return (
    <span className={`effect-badge effect-badge-${type}`} title={detail || label}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {isWinner ? (
          <path d="M7 3h10v3h3v2c0 3-1.8 5.2-4.7 5.8A5.2 5.2 0 0 1 13 16.7V19h4v2H7v-2h4v-2.3a5.2 5.2 0 0 1-2.3-2.9C5.8 13.2 4 11 4 8V6h3V3Zm0 5H6c0 1.6.7 2.8 2 3.4A7.8 7.8 0 0 1 7 8Zm10 0a7.8 7.8 0 0 1-1 3.4c1.3-.6 2-1.8 2-3.4h-1Z" />
        ) : (
          <path d="M9 4h6a2 2 0 0 1 2 2v2h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3V6a2 2 0 0 1 2-2Zm0 4h6V6H9v2Zm-5 4v6h16v-6l-7 3h-2l-7-3Z" />
        )}
      </svg>
      <span>{label}</span>
      {expanded && detail && <small>{detail}</small>}
      {!expanded && detail && <small className="badge-tooltip">{detail}</small>}
    </span>
  )
}

export default EffectBadge
