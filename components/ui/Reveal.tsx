import React, { useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { useMotionPreset, usePrefersReducedMotion } from './motion'

type RevealProps = {
  children: React.ReactNode
  className?: string
  /** How much of the element needs to be visible before it animates (0..1) */
  amount?: number
  /** Extra delay (seconds) */
  delay?: number
  /** Animate only once when it first enters viewport */
  once?: boolean
}

/**
 * Apple-like “content reveal” on scroll.
 * Uses whileInView + subtle blur/slide. Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  amount = 0.18,
  delay = 0,
  once = false,
}: RevealProps) {
  const m = useMotionPreset()
  const reduce = usePrefersReducedMotion()
  const controls = useAnimationControls()
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 60, scale: 0.985 }}
      animate={controls}
      viewport={{ once: false, amount: Math.max(0.45, amount) }}
      onViewportEnter={() => {
        controls.start({ opacity: 1, y: 0, scale: 1, transition: { ...m.transition, duration: 2.3, delay } })
      }}
      onViewportLeave={() => {
        // Make scroll-up visible: reset when leaving viewport so it can replay.
        if (mounted.current) controls.set({ opacity: 0, y: 60, scale: 0.985 })
      }}
    >
      {children}
    </motion.div>
  )
}

type RevealStaggerProps = {
  children: React.ReactNode
  className?: string
  amount?: number
  once?: boolean
}

/**
 * Staggers animation for direct children (wrap each child with a motion.div).
 */
export function RevealStagger({ children, className, amount = 0.18, once = true }: RevealStaggerProps) {
  const m = useMotionPreset()
  const reduce = usePrefersReducedMotion()
  const controls = useAnimationControls()
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={controls}
      viewport={{ once: false, amount: Math.max(0.45, amount) }}
      onViewportEnter={() => controls.start('show')}
      onViewportLeave={() => {
        if (mounted.current) controls.set('hidden')
      }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.22,
          },
        },
      }}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 60, scale: 0.985 },
            show: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { ...m.transition, duration: 2.3 },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
