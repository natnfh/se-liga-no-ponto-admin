import { useEffect, useMemo, useState } from 'react'

export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return
    const onChange = () => setReduce(!!mq.matches)
    onChange()
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  return reduce
}

export function useMotionPreset() {
  const reduce = usePrefersReducedMotion()
  return useMemo(() => {
    if (reduce) {
      return {
        transition: { duration: 0 },
        spring: { duration: 0 },
        stagger: 0,
      }
    }

    return {
      transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
      spring: { type: 'spring' as const, stiffness: 420, damping: 38, mass: 0.8 },
      stagger: 0.04,
    }
  }, [reduce])
}
