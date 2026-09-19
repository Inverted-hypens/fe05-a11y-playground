import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter((element) => !element.hasAttribute('disabled'))
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)
  const wasOpen = useRef(false)

  useLayoutEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement | null

      const dialog = dialogRef.current
      if (dialog) {
        const focusableElements = getFocusableElements(dialog)
        if (focusableElements.length > 0) {
          focusableElements[0].focus()
        } else {
          dialog.focus()
        }
      }

      wasOpen.current = true
      return
    }

    if (wasOpen.current) {
      previousActiveElement.current?.focus()
      wasOpen.current = false
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      return
    }

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') {
      return
    }
  
    const dialog = dialogRef.current
    if (!dialog) {
      return
    }
  
    const focusableElements = getFocusableElements(dialog)
    if (focusableElements.length === 0) {
      event.preventDefault()
      return
    }
  
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    const activeElement = document.activeElement
  
    if (event.shiftKey) {
      if (activeElement === firstElement || activeElement === dialog) {
        event.preventDefault()
        lastElement.focus()
      }
      return
    }
  
    if (activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  if (!open) {
    return null
  }

  return (
    <div onClick={handleBackdropClick}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={handleDialogKeyDown}
      >
        <h2 id={titleId}>{title}</h2>
        {children}
      </div>
    </div>
  )
}
