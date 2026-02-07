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
      transition: { duration: 0.45, ease: [0.19, 1, 0.22, 1] as const },
      spring: { type: 'spring' as const, stiffness: 320, damping: 42, mass: 0.95 },
      stagger: 0.06,
    }
  }, [reduce])
}
