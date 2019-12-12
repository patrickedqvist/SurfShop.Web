import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

// Use a ternary operator to make sure that the document object is defined
const portalRoot =
  typeof document !== `undefined` ? document.getElementById('portal') : null

interface Props {
  children: React.ReactNode | React.ReactNode[]
}

export const Portal: React.FC<Props> = ({ children }) => {
  const mountNode = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const addMountNode = () => {
      mountNode.current =
        typeof document !== 'undefined' ? document.createElement('div') : null

      if (portalRoot && mountNode.current) {
        portalRoot.appendChild(mountNode.current)
      }
    }

    addMountNode()

    return () => {
      if (portalRoot && mountNode.current) {
        portalRoot.removeChild(mountNode.current)
      }
    }
  }, [])

  if (mountNode.current) {
    return createPortal(children, mountNode.current)
  }

  return null
}
