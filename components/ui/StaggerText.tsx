import React from 'react'
import { motion } from 'framer-motion'
import { useMotionPreset, usePrefersReducedMotion } from './motion'

type StaggerTextProps = {
  text: string
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function StaggerText({ text, className, as = 'span' }: StaggerTextProps) {
  const m = useMotionPreset()
  const reduce = usePrefersReducedMotion()
  const Tag = as as any

  if (reduce) return <Tag className={className}>{text}</Tag>

  return (
    <Tag className={className}>
      {Array.from(text).map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          initial={{ y: '100%', rotate: 10, opacity: 0 }}
          animate={{ y: '0%', rotate: 0, opacity: 1 }}
          transition={{
            ...m.transition,
            duration: 0.6,
            delay: index * 0.02,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Tag>
  )
}