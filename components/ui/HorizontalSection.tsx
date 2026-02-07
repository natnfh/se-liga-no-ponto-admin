import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

type HorizontalSectionProps = {
  children: React.ReactNode
  className?: string
}

export function HorizontalSection({ children, className }: HorizontalSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-100%'])

  return (
    <section ref={ref} className={['relative h-[300vh]', className].filter(Boolean).join(' ')}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="flex h-full w-[200%]" style={{ x }}>
          {children}
        </motion.div>
      </div>
    </section>
  )
}