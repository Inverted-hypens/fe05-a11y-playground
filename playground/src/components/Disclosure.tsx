import { useId, useState, type ReactNode } from 'react'

type DisclosureProps = {
  title: string
  children: ReactNode
}

export function Disclosure({ title, children }: DisclosureProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const panelId = useId()

  return (
    <div>
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {title}
      </button>
      <div id={panelId} hidden={!isExpanded}>
        {children}
      </div>
    </div>
  )
}
