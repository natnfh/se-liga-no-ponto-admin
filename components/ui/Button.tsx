import React from 'react'
import { motion } from 'framer-motion'
import { useMotionPreset } from './motion'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const base =
  'relative inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-semibold select-none ' +
  'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lum-cyan/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-950 ' +
  'disabled:opacity-40 disabled:pointer-events-none'

const sizes: Record<Size, string> = {
  sm: 'h-9 text-sm px-3',
  md: 'h-10 text-sm px-4',
  lg: 'h-12 text-base px-5',
}

const variants: Record<Variant, string> = {
  primary:
    'text-bg-950 bg-lum-cyan hover:bg-lum-cyan/90 shadow-glow ' +
    'before:absolute before:inset-0 before:rounded-xl before:bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.55),transparent_45%)] before:opacity-35 before:content-[""]',
  secondary:
    'text-ink-50 bg-white/8 hover:bg-white/12 border border-border-800 shadow-elev-1 backdrop-blur-glass',
  ghost: 'text-ink-200 hover:text-ink-50 hover:bg-white/7',
  danger:
    'text-bg-950 bg-lum-rose hover:bg-lum-rose/90 shadow-[0_0_0_1px_rgba(251,113,133,0.18),0_0_40px_rgba(251,113,133,0.10)]',
}

export function Button({
  variant = 'secondary',
  size = 'md',
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  const motionPreset = useMotionPreset()

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={motionPreset.spring}
      className={[
        'group',
        base,
        sizes[size],
        variants[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {/* shimmer */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
      >
        <span
          className="absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/16 to-transparent opacity-0 group-hover:opacity-100"
        />
      </span>

      {leftIcon}
      <span className="relative z-10">{children}</span>
      {rightIcon}
    </motion.button>
  )
}
