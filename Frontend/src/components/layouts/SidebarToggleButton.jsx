import { useState } from "react"

const SidebarToggle = ({ onClick }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [animating, setAnimating] = useState(false)

  const handleClick = () => {
    if (animating) return
    setAnimating(true)

    setTimeout(() => {
      setCollapsed(prev => !prev)
      setAnimating(false)
    }, 200)

    onClick?.()
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Toggle sidebar"
      className="relative overflow-hidden p-2 rounded-lg border border-zinc-700 bg-transparent hover:bg-zinc-800 active:scale-95 transition-colors"
    >
      <div
        style={{
          transition: animating
            ? "transform 0.2s ease, opacity 0.2s ease"
            : "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease",
          transform: animating ? "translateX(28px)" : "translateX(0)",
          opacity: animating ? 0 : 1,
        }}
      >
        {collapsed ? (
          // ícone com seta (recolhido)
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="3" width="16" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.3"/>
            <line x1="7" y1="3.5" x2="7" y2="16.5" stroke="currentColor" strokeWidth="1.3"/>
            <polyline points="10,7.5 13,10 10,12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          // ícone sem seta (expandido)
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="3" width="16" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.3"/>
            <line x1="7" y1="3.5" x2="7" y2="16.5" stroke="currentColor" strokeWidth="1.3"/>
          </svg>
        )}
      </div>
    </button>
  )
}

export default SidebarToggle