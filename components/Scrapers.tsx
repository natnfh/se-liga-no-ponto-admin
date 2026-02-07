
import React, { useState } from 'react'
import { Play, RefreshCw, Terminal, CheckCircle2, XCircle, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader } from './ui/Card'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { motion } from 'framer-motion'
import { useMotionPreset } from './ui/motion'
import { Reveal, RevealStagger } from './ui/Reveal'
import { HorizontalSection } from './ui/HorizontalSection'
import { LiquidImage } from './ui/LiquidImage'
import { TiltCard } from './ui/TiltCard'
import { StaggerText } from './ui/StaggerText'

const Scrapers: React.FC = () => {
  const [isRunningAll, setIsRunningAll] = useState(false);
  
  const scraperList = [
    { id: 'tudoazul', name: 'TudoAzul Scraper', lastRun: '10 min ago', status: 'Success', items: 142 },
    { id: 'latam', name: 'LATAM Pass Scraper', lastRun: '1 hour ago', status: 'Success', items: 89 },
    { id: 'smiles', name: 'Smiles GOL Scraper', lastRun: '4 hours ago', status: 'Failed', items: 0 },
    { id: 'inter', name: 'Inter Loop Scraper', lastRun: 'Yesterday', status: 'Success', items: 12 },
    { id: 'livelo', name: 'Livelo Scraper', lastRun: 'Yesterday', status: 'Success', items: 56 },
  ];

  const m = useMotionPreset()

  return (
    <div className="space-y-6">
      <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-ink-50">
            <StaggerText text="Scrapers & Jobs" />
          </h2>
          <p className="text-ink-600">Automation pipelines • Python scrapers • schedulers</p>
        </div>
        <Button
          onClick={() => setIsRunningAll(true)}
          disabled={isRunningAll}
          variant="primary"
          size="sm"
          leftIcon={isRunningAll ? <RefreshCw className="animate-spin" size={16} /> : <Play size={16} />}
        >
          {isRunningAll ? 'Running All Seeders...' : 'Trigger All Seeders'}
        </Button>
      </Reveal>

      <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scraperList.map((scraper, i) => (
          <TiltCard key={scraper.id}>
            <Card>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...m.transition, delay: i * m.stagger }}
              >
                <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/6 rounded-xl border border-white/10 text-ink-200">
                  <Terminal size={20} />
                </div>
                <Badge tone={scraper.status === 'Success' ? 'success' : 'danger'}>
                  {scraper.status}
                </Badge>
              </div>

              <h3 className="font-semibold text-lg text-ink-50 mb-1">{scraper.name}</h3>
              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-2 text-xs text-ink-600">
                  <Clock size={14} />
                  <span>Last run: {scraper.lastRun}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-ink-600">
                  {scraper.status === 'Success' ? (
                    <CheckCircle2 className="text-lum-green" size={14} />
                  ) : (
                    <XCircle className="text-lum-rose" size={14} />
                  )}
                  <span>{scraper.items} items parsed to Postgres</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/6 flex gap-2">
                <Button className="flex-1" size="sm" variant="secondary">
                  Run now
                </Button>
                <Button size="sm" variant="ghost">
                  Logs
                </Button>
              </div>
                </CardContent>
              </motion.div>
            </Card>
          </TiltCard>
        ))}
      </RevealStagger>

      <HorizontalSection className="mt-10">
        <div className="h-full w-full flex items-center justify-center bg-transparent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
            {scraperList.slice(0, 2).map((scraper) => (
              <Card key={`track-${scraper.id}`} className="min-w-[280px]">
                <CardContent className="pt-6">
                  <h4 className="text-sm font-semibold text-ink-50">{scraper.name}</h4>
                  <p className="text-xs text-ink-600">Horizontal track preview</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="h-full w-full flex items-center justify-center bg-transparent">
          <div className="w-[480px]">
            <LiquidImage
              src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80"
              alt="Scraper panorama"
              className="h-[320px] w-full"
            />
          </div>
        </div>
      </HorizontalSection>

      <Reveal>
        <Card className="overflow-hidden">
          <CardHeader>
            <h3 className="text-sm font-semibold text-ink-50">Technical note</h3>
            <p className="text-xs text-ink-600">Monorepo • scheduler • secrets</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-ink-600 max-w-2xl">
              Scrapers are located in{' '}
              <code className="bg-white/5 px-1 py-0.5 rounded text-lum-cyan">services/scrapers</code>. They
              are invoked via an HTTP endpoint protected by{' '}
              <code className="bg-white/5 px-1 py-0.5 rounded text-lum-cyan">SCHEDULER_SECRET</code>.
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 p-3 rounded-xl border border-white/8">
                <p className="text-xs text-ink-600 mb-1 uppercase tracking-wider">Scraper Engine</p>
                <p className="font-mono text-sm">Python / FastAPI</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/8">
                <p className="text-xs text-ink-600 mb-1 uppercase tracking-wider">Scheduler</p>
                <p className="font-mono text-sm">GCP / Cron (VPS)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  )
}

export default Scrapers
