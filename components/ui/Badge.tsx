import React from 'react'

type Tone = 'success' | 'info' | 'warn' | 'danger' | 'neutral'

export function Badge({
  tone = 'neutral',
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  const tones: Record<Tone, string> = {
    success: 'bg-lum-green/12 text-lum-green border-lum-green/20',
    info: 'bg-lum-cyan/12 text-lum-cyan border-lum-cyan/20',
    warn: 'bg-lum-amber/12 text-lum-amber border-lum-amber/22',
    danger: 'bg-lum-rose/12 text-lum-rose border-lum-rose/22',
    neutral: 'bg-white/7 text-ink-200 border-white/10',
  }

  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold',
        tones[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  )
}
