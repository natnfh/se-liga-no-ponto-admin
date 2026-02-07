
import React from 'react'
import { CreditCard, ExternalLink, RefreshCw, Check, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { Card, CardContent, CardHeader } from './ui/Card'
import { useMotionPreset } from './ui/motion'
import { Reveal, RevealStagger } from './ui/Reveal'

const SubscriptionManager: React.FC = () => {
  const m = useMotionPreset()

  return (
    <div className="space-y-6">
      <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Billing</h2>
          <p className="text-ink-600">Asaas integration • webhooks • reconciliation</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="success">
            <Check size={14} /> API Active
          </Badge>
          <Badge tone="info">
            <RefreshCw size={14} /> 5 Pending hooks
          </Badge>
          <Button variant="primary" size="sm" leftIcon={<RefreshCw size={16} />}>Sync</Button>
        </div>
      </Reveal>

      <Reveal>
        <Card>
          <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-ink-50">Recent transactions</h3>
              <p className="text-xs text-ink-600">Last 24h • normalized statuses</p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              rightIcon={<ExternalLink size={16} />}
            >
              Open Asaas Dashboard
            </Button>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="divide-y divide-white/6">
              {[
                { user: 'João Silva', plan: 'Anual Premium', amount: 'R$ 199,00', status: 'Paid', date: '10 min ago' },
                { user: 'Maria Souza', plan: 'Mensal', amount: 'R$ 29,90', status: 'Pending', date: '1 hour ago' },
                { user: 'Pedro Alvares', plan: 'Anual Premium', amount: 'R$ 199,00', status: 'Refunded', date: 'Yesterday' },
                { user: 'Ana Paula', plan: 'Mensal', amount: 'R$ 29,90', status: 'Paid', date: 'Feb 15, 2024' },
              ].map((tx, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...m.transition, delay: i * m.stagger }}
                  className="px-6 py-4 flex items-center justify-between hover:bg-white/4"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white/7 border border-white/10 flex items-center justify-center text-ink-600">
                      <CreditCard size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-ink-50">{tx.user}</p>
                      <p className="text-xs text-ink-600">{tx.plan} • {tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{tx.amount}</p>
                    <Badge
                      tone={tx.status === 'Paid' ? 'success' : tx.status === 'Pending' ? 'warn' : 'neutral'}
                      className="mt-1"
                    >
                      {tx.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Reveal>

      <RevealStagger className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold">Webhook health</h4>
                <p className="text-xs text-ink-600">Last 30m • idempotency enabled</p>
              </div>
              <Badge tone="info">Live</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              {[
                { t: 'PAYMENT_RECEIVED', s: '200 OK', tone: 'success' as const },
                { t: 'PAYMENT_OVERDUE', s: '200 OK', tone: 'success' as const },
                { t: 'SUBSCRIPTION_DELETED', s: '500 ERR', tone: 'danger' as const },
              ].map((row) => (
                <div key={row.t} className="flex items-center justify-between">
                  <span className="font-mono text-xs text-ink-600">{row.t}</span>
                  <Badge tone={row.tone} className="font-mono">
                    {row.s}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-2">
              <Button className="flex-1" variant="secondary">
                Retest hooks
              </Button>
              <Button className="flex-1" variant="primary">
                Reprocess failed
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <h4 className="text-sm font-semibold text-lum-indigo">Integration tasks</h4>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-ink-200">
                <Check size={16} className="text-lum-green" /> API client initialized
              </li>
              <li className="flex items-center gap-2 text-ink-200">
                <Check size={16} className="text-lum-green" /> Customer bridge
              </li>
              <li className="flex items-center gap-2 text-ink-600">
                <Clock size={16} /> Link billing status to paywall
              </li>
              <li className="flex items-center gap-2 text-ink-600">
                <Clock size={16} /> Automate premium role updates
              </li>
            </ul>
          </CardContent>
        </Card>
      </RevealStagger>
    </div>
  );
};

export default SubscriptionManager
