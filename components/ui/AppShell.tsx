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
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { AppSection } from '../../types'
import { useMotionPreset } from './motion'
import { Button } from './Button'

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
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const scrollBarX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    mass: 0.6,
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navigation = useMemo(
    () => [
      { id: AppSection.DASHBOARD, name: 'Dashboard', icon: LayoutDashboard },
      { id: AppSection.SCRAPERS, name: 'Scrapers & Jobs', icon: Database },
      { id: AppSection.MOBILE, name: 'Mobile (Capacitor)', icon: Smartphone },
      { id: AppSection.SUBSCRIPTIONS, name: 'Asaas Billing', icon: CreditCard },
      { id: AppSection.AUDIT, name: 'Security & Audit', icon: ShieldCheck },
      { id: AppSection.SETTINGS, name: 'Runtime Config', icon: Settings },
    ],
    [],
  )

  return (
    <div className="min-h-screen">
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

      <div className="relative z-10 flex min-h-screen">
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
            className={
              'sticky top-0 z-30 border-b border-white/6 backdrop-blur-glass transition-[box-shadow,background-color] ' +
              (scrolled ? 'bg-panel-900/70 shadow-elev-2' : 'bg-panel-900/40')
            }
          >
            {!m.transition?.duration ? null : (
              <motion.div
                aria-hidden
                className="absolute left-0 top-0 h-[2px] w-full origin-left bg-gradient-to-r from-lum-cyan via-lum-indigo to-lum-violet opacity-90"
                style={{ scaleX: scrollBarX }}
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
