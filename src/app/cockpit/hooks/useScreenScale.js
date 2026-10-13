import { useEffect, useState } from 'react'

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

const getScale = () => {
  if (typeof window === 'undefined') {
    return { scaleX: 1, scaleY: 1 }
  }

  return {
    scaleX: window.innerWidth / DESIGN_WIDTH,
    scaleY: window.innerHeight / DESIGN_HEIGHT,
  }
}

export function useScreenScale() {
  const [scale, setScale] = useState({ scaleX: 1, scaleY: 1 })

  useEffect(() => {
    const handleResize = () => setScale(getScale())
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return scale
}
