import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

type CursorLabel = string | null

export function useMagnetic(ref: React.RefObject<HTMLElement>, radius = 50) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const handleMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = event.clientX - centerX
      const dy = event.clientY - centerY
      const distance = Math.hypot(dx, dy)

      if (distance < radius) {
        const pull = (radius - distance) / radius
        x.set(dx * 0.25 * pull)
        y.set(dy * 0.25 * pull)
        setIsActive(true)
      } else {
        x.set(0)
        y.set(0)
        setIsActive(false)
      }
    }

    const handleLeave = () => {
      x.set(0)
      y.set(0)
      setIsActive(false)
    }

    window.addEventListener('mousemove', handleMove)
    node.addEventListener('mouseleave', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      node.removeEventListener('mouseleave', handleLeave)
    }
  }, [ref, radius, x, y])

  return { x, y, isActive }
}

export function MagicCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState<CursorLabel>(null)
  const [visible, setVisible] = useState(true)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const smoothX = useSpring(x, { stiffness: 400, damping: 42, mass: 0.6 })
  const smoothY = useSpring(y, { stiffness: 400, damping: 42, mass: 0.6 })
  const labelActive = useMotionValue(0)
  useEffect(() => {
    labelActive.set(label ? 1 : 0)
  }, [label, labelActive])
  const scale = useTransform(labelActive, [0, 1], [1, 1.8])

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
    }

    const handleLeave = () => setVisible(false)
    const handleEnter = () => setVisible(true)

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
    }
  }, [x, y])

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-cursor]'))
    if (!nodes.length) return

    const handleEnter = (event: Event) => {
      const target = event.currentTarget as HTMLElement
      setLabel(target.dataset.cursor ?? null)
    }

    const handleLeave = () => setLabel(null)

    nodes.forEach((node) => {
      node.addEventListener('mouseenter', handleEnter)
      node.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      nodes.forEach((node) => {
        node.removeEventListener('mouseenter', handleEnter)
        node.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [])

  const labelContent = useMemo(() => label ?? '', [label])

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[10000] hidden md:flex items-center justify-center"
      style={{ x: smoothX, y: smoothY, opacity: visible ? 1 : 0, scale }}
    >
      <div className="h-4 w-4 rounded-full border border-white/70 bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.18)]" />
      {label ? (
        <div className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-[10px] font-semibold tracking-[0.25em] text-white backdrop-blur">
          {labelContent}
        </div>
      ) : null}
    </motion.div>
  )
}