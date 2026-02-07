import React, { useEffect, useMemo, useState } from 'react'
import {
  LayoutDashboard,
  Database,
  Smartphone,
  CreditCard,
  Settings,
  ShieldCheck,
  Menu,
  Bell,
  Search,
  Sparkles,
} from 'lucide-react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useMotionTemplate,
} from 'framer-motion'
import { AppSection } from '../../types'
import { useMotionPreset, usePrefersReducedMotion } from './motion'
import { Button } from './Button'
import { MagicCursor } from './MagicCursor'

export function AppShell({
  active,
  onNavigate,
  children,
}: {
  active: AppSection
  onNavigate: (s: AppSection) => void
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const m = useMotionPreset()
  const reduce = usePrefersReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress, scrollY } = useScroll()

  // Apple-like continuous header material changes
  const headerAlpha = useTransform(scrollYProgress, [0, 0.06], [0.35, 0.88])
  const borderAlpha = useTransform(scrollYProgress, [0, 0.06], [0.06, 0.14])

  // Scroll velocity feedback disabled (can make text look soft/blurred on some displays)

  // Optional debug via ?debugMotion=1 (hidden by default)
  const [debugMotion, setDebugMotion] = useState(false)
  const debugEvents = useMotionValue(0)
  useEffect(() => {
    setDebugMotion(new URLSearchParams(window.location.search).get('debugMotion') === '1')
  }, [])
  useMotionValueEvent(scrollY, 'change', () => {
    debugEvents.set(debugEvents.get() + 1)
  })

  // Motion templates ensure styles update reactively (no .get() snapshots)
  const headerBg = useMotionTemplate`rgba(7, 11, 18, ${headerAlpha})`
  const headerBorder = useMotionTemplate`rgba(255, 255, 255, ${borderAlpha})`
  const scrollBarX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    mass: 0.6,
  })

  useEffect(() => {
    const onScroll = () => {
      // robust: works even if browser reports 0 for window.scrollY in some embed contexts
      const y = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
      setScrolled(y > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('scroll', onScroll, { passive: true, capture: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('scroll', onScroll, { capture: true } as any)
    }
  }, [])

  const navigation = useMemo(
    () => [
      { id: AppSection.DASHBOARD, name: 'Dashboard', icon: LayoutDashboard },
      { id: AppSection.SCRAPERS, name: 'Scrapers & Jobs', icon: Database },
      { id: AppSection.MOBILE, name: 'Mobile (Capacitor)', icon: Smartphone },
      { id: AppSection.SUBSCRIPTIONS, name: 'Cobrança Asaas', icon: CreditCard },
      { id: AppSection.AUDIT, name: 'Segurança & Auditoria', icon: ShieldCheck },
      { id: AppSection.SETTINGS, name: 'Config. de Runtime', icon: Settings },
    ],
    [],
  )

  // Background tint that evolves smoothly with scroll (prevents perceived "jumps")
  const tintAlpha = useTransform(scrollYProgress, [0, 0.45, 1], [0.0, 0.35, 0.6])
  const tintSize = useTransform(scrollYProgress, [0, 1], [520, 940])
  const tintX = useTransform(scrollYProgress, [0, 1], [70, 35])
  const tintY = useTransform(scrollYProgress, [0, 1], [30, 70])
  // More vibrant purple (slightly deeper than tailwind violet)
  const tintBg = useMotionTemplate`radial-gradient(${tintSize}px ${tintSize}px at ${tintX}% ${tintY}%, rgba(168, 85, 247, ${tintAlpha}), transparent 60%)`

  // Cursor spotlight (white halo) - fixed layer so it doesn't disappear on scroll
  const cursorX = useMotionValue(0.5)
  const cursorY = useMotionValue(0.5)
  const cursorXSmooth = useSpring(cursorX, { stiffness: 140, damping: 24, mass: 0.8 })
  const cursorYSmooth = useSpring(cursorY, { stiffness: 140, damping: 24, mass: 0.8 })

  useEffect(() => {
    if (reduce) return
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth || 1
      const h = window.innerHeight || 1
      cursorX.set(e.clientX / w)
      cursorY.set(e.clientY / h)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove as any)
  }, [cursorX, cursorY, reduce])

  const spotAlpha = useTransform(scrollYProgress, [0, 1], [0.32, 0.22])
  const spotSize = useTransform(scrollYProgress, [0, 1], [170, 240])
  const spotX = useTransform(cursorXSmooth, (v) => `${v * 100}%`)
  const spotY = useTransform(cursorYSmooth, (v) => `${v * 100}%`)
  const spotBg = useMotionTemplate`radial-gradient(${spotSize}px ${spotSize}px at ${spotX} ${spotY}, rgba(255,255,255, ${spotAlpha}), transparent 65%)`

  return (
    <div className="min-h-screen custom-cursor-active">
      <div className="tp-bg" aria-hidden>
        <motion.div className="tp-bg__tint" style={{ opacity: 1, backgroundImage: tintBg as any }} />
        <div className="tp-bg__vignette" />
      </div>

      {reduce ? null : (
        <motion.div
          className="tp-spot"
          aria-hidden
          style={{
            backgroundImage: spotBg as any,
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}

      <MagicCursor />
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="tp-app flex min-h-screen">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ x: sidebarOpen ? 0 : -280 }}
          transition={m.spring}
          className={
            "fixed inset-y-0 left-0 z-50 w-[280px] md:static md:translate-x-0 md:!transform-none " +
            "bg-panel-900 border-r border-white/6 backdrop-blur-glass shadow-elev-2"
          }
        >
          <div className="h-full flex flex-col">
            <div className="px-6 py-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-lum-cyan/40 via-lum-indigo/40 to-lum-violet/30 shadow-glow" />
                  <div className="absolute inset-0 rounded-2xl border border-white/12" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold tracking-tight text-ink-50">
                    Se Liga No Ponto
                  </div>
                  <div className="text-xs text-ink-600 truncate">
                    Admin • Unified Ops
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/8 bg-white/4 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-ink-200">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-ink-600">Platform Health</p>
                    <p className="text-sm font-semibold text-ink-50">All systems nominal</p>
                  </div>
                </div>
              </div>
            </div>

            <nav className="px-3 space-y-1">
              {navigation.map((item) => {
                const isActive = active === item.id
                const Icon = item.icon

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id)
                      setSidebarOpen(false)
                    }}
                    className={[
                      'w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors',
                      isActive
                        ? 'bg-white/10 text-ink-50 border border-white/10 shadow-glow'
                        : 'text-ink-400 hover:text-ink-50 hover:bg-white/6',
                    ].join(' ')}
                  >
                    <span className={isActive ? 'text-lum-cyan' : 'text-ink-600'}>
                      <Icon size={18} />
                    </span>
                    <span className="text-sm font-medium">{item.name}</span>
                  </button>
                )
              })}
            </nav>

            <div className="mt-auto p-6 border-t border-white/6">
              <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/10 border border-white/10" />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate">Owner</div>
                    <div className="text-xs text-ink-600 truncate">Solo admin</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-ink-600">
                  <span>Role</span>
                  <span className="text-ink-200 font-semibold">Super Admin</span>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Topbar */}
          <header
            className="sticky top-0 z-30 border-b border-white/6 backdrop-blur-glass"
            style={{
              backgroundColor: headerBg as any,
              borderBottomColor: headerBorder as any,
              boxShadow: scrolled ? '0 18px 70px rgba(0,0,0,0.55)' : 'none',
              transition: 'box-shadow 220ms ease',
              WebkitBackdropFilter: 'blur(18px) saturate(160%)',
              backdropFilter: 'blur(18px) saturate(160%)',
              // keep text crisp: avoid CSS filter on containers
            }}
          >
            {!debugMotion ? null : (
              <div className="absolute right-3 top-3 z-[60] rounded-full bg-red-500/90 px-3 py-1 text-[11px] font-semibold text-white shadow-elev-2 select-none">
                debugMotion=1
              </div>
            )}
            {!m.transition?.duration ? null : (
              <motion.div
                aria-hidden
                className="absolute left-0 top-0 h-[4px] w-full origin-left bg-gradient-to-r from-lum-cyan via-lum-indigo to-lum-violet"
                style={{
                  scaleX: scrollBarX,
                  filter: 'blur(0.6px)',
                  opacity: 0.9,
                }}
              />
            )}
            <div className="h-16 px-4 md:px-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl bg-white/6 border border-white/10"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open navigation"
                >
                  <Menu size={20} />
                </button>

                <div className="relative hidden sm:block min-w-0 w-[420px] max-w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-600" size={16} />
                  <input
                    placeholder="Search metrics, logs, users…"
                    className="w-full h-10 rounded-2xl bg-white/6 border border-white/10 pl-9 pr-3 text-sm text-ink-50 placeholder:text-ink-600 focus:outline-none focus:ring-2 focus:ring-lum-cyan/25"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Bell size={16} />}
                >
                  Alerts
                </Button>
                <div className="hidden md:block h-8 w-px bg-white/10 mx-2" />
                <div className="hidden md:block text-right">
                  <div className="text-xs text-ink-600">Environment</div>
                  <div className="text-sm font-semibold text-ink-50">Live</div>
                </div>
              </div>
            </div>
          </header>

          <main className="relative z-10 px-4 py-6 md:px-8 md:py-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
