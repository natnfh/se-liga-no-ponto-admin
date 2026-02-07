import React, { useRef } from 'react'

type TiltCardProps = {
  children: React.ReactNode
  className?: string
  maxTilt?: number
}

export function TiltCard({ children, className, maxTilt = 12 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const node = cardRef.current
    const glare = glareRef.current
    if (!node || !glare) return

    const rect = node.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    node.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100
    glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.35), transparent 60%)`
    glare.style.opacity = '1'
  }

  const reset = () => {
    const node = cardRef.current
    const glare = glareRef.current
    if (!node || !glare) return
    node.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    glare.style.opacity = '0'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={[
        'relative transition-transform duration-200 ease-out will-change-transform',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200"
      />
      {children}
    </div>
  )
}