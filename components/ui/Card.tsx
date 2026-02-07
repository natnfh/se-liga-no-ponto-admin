import React from 'react'

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={[
        'relative rounded-2xl border border-border-800 bg-panel-900 shadow-elev-1 backdrop-blur-glass',
        'before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(800px_280px_at_10%_0%,rgba(34,211,238,0.12),transparent_55%)] before:opacity-100 before:content-[""]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  )
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={['relative z-10 px-6 pt-6 pb-4 border-b border-white/6', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  )
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={['relative z-10 px-6 pb-6', className].filter(Boolean).join(' ')}
      {...props}
    />
  )
}
