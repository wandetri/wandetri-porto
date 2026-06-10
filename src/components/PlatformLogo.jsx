function PlatformLogo({ platform }) {
  if (platform === 'YouTube') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.9 4.7 12 4.7 12 4.7s-5.9 0-7.6.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.7.5 7.6.5 7.6.5s5.9 0 7.6-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.8ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z" />
      </svg>
    )
  }

  if (platform === 'CapCut') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m4 5 16 5.3v3.4L4 19v-3.2l11.2-3.8L4 8.2V5Zm0 0h16v3H4V5Zm0 11h16v3H4v-3Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15.7 3c.3 2.2 1.6 3.6 3.8 3.8v3.1a8.1 8.1 0 0 1-3.8-1.1v5.8a6 6 0 1 1-5.2-5.9v3.2a2.8 2.8 0 1 0 2 2.7V3h3.2Z" />
    </svg>
  )
}

export default PlatformLogo
