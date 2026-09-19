import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'

type TabItem = {
  label: string
  children: ReactNode
}

type TabsProps = {
  ariaLabel: string
  tabs: TabItem[]
}

export function Tabs({ ariaLabel, tabs }: TabsProps) {
  const baseId = useId()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const tabIds = tabs.map((_, index) => `${baseId}-tab-${index}`)
  const panelIds = tabs.map((_, index) => `${baseId}-panel-${index}`)

  const selectTab = (index: number) => {
    setSelectedIndex(index)
    tabRefs.current[index]?.focus()
  }

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number | null = null

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % tabs.length
        break
      case 'ArrowLeft':
        nextIndex = (index - 1 + tabs.length) % tabs.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = tabs.length - 1
        break
      default:
        return
    }

    event.preventDefault()
    selectTab(nextIndex)
  }

  return (
    <div>
      <div role="tablist" aria-label={ariaLabel}>
        {tabs.map((tab, index) => (
          <button
            key={tabIds[index]}
            ref={(element) => {
              tabRefs.current[index] = element
            }}
            id={tabIds[index]}
            type="button"
            role="tab"
            aria-selected={selectedIndex === index}
            aria-controls={panelIds[index]}
            tabIndex={selectedIndex === index ? 0 : -1}
            onClick={() => setSelectedIndex(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={panelIds[index]}
          id={panelIds[index]}
          role="tabpanel"
          aria-labelledby={tabIds[index]}
          tabIndex={0}
          hidden={selectedIndex !== index}
        >
          {tab.children}
        </div>
      ))}
    </div>
  )
}
