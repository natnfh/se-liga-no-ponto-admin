import React from 'react'
import { motion } from 'framer-motion'
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
  amount = 0.28,
  delay = 0,
  once = true,
}: RevealProps) {
  const m = useMotionPreset()
  const reduce = usePrefersReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ ...m.transition, delay }}
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

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: m.stagger,
          },
        },
      }}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 14, filter: 'blur(10px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: m.transition },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
