
import React from 'react'
import {
  Users,
  TrendingUp,
  Activity,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  ShieldCheck,
  Zap,
  ArrowRight,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'
import { Card, CardContent, CardHeader } from './ui/Card'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { motion } from 'framer-motion'
import { useMotionPreset } from './ui/motion'

const data = [
  { name: 'Mon', active: 400, errors: 24, revenue: 2400 },
  { name: 'Tue', active: 300, errors: 13, revenue: 2210 },
  { name: 'Wed', active: 200, errors: 98, revenue: 2290 },
  { name: 'Thu', active: 278, errors: 39, revenue: 2000 },
  { name: 'Fri', active: 189, errors: 48, revenue: 2181 },
  { name: 'Sat', active: 239, errors: 38, revenue: 2500 },
  { name: 'Sun', active: 349, errors: 43, revenue: 2100 },
];

const StatCard: React.FC<{
  title: string
  value: string
  change: string
  isPositive: boolean
  icon: React.ElementType
}> = ({ title, value, change, isPositive, icon: Icon }) => (
  <Card className="group">
    <CardContent className="pt-6">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 rounded-xl bg-white/6 border border-white/10 text-lum-cyan shadow-glow">
          <Icon size={20} />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-semibold ${
            isPositive ? 'text-lum-green' : 'text-lum-rose'
          }`}
        >
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </div>
      </div>
      <p className="text-xs text-ink-600">{title}</p>
      <p className="text-2xl font-semibold text-ink-50 mt-1">{value}</p>
      <div className="mt-4 h-1.5 w-full rounded-full bg-white/6 overflow-hidden">
        <div className="h-full w-2/3 bg-gradient-to-r from-lum-cyan/40 to-lum-indigo/40" />
      </div>
    </CardContent>
  </Card>
)

const Dashboard: React.FC = () => {
  const m = useMotionPreset()

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={m.transition}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <Card className="lg:col-span-2">
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs text-ink-600">Revenue (MRR)</p>
                <p className="text-3xl font-semibold text-ink-50 mt-1">R$ 482.910</p>
                <p className="text-xs text-ink-600 mt-2">+18.2% vs last 30 days</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone="info">Asaas Connected</Badge>
                <Button variant="primary" size="sm" rightIcon={<ArrowRight size={16} />}
                >
                  View billing
                </Button>
              </div>
            </div>

            <div className="mt-6 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(10,15,26,0.95)',
                      color: '#fff',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#22D3EE"
                    strokeWidth={3}
                    dot={{ r: 3, fill: '#22D3EE', strokeWidth: 2, stroke: '#0a0f1a' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-ink-600">Platform SLA</p>
                <p className="text-2xl font-semibold text-ink-50 mt-1">99.97%</p>
                <p className="text-xs text-ink-600 mt-2">Last 7 days uptime</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/6 border border-white/10 text-lum-green">
                <ShieldCheck size={18} />
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-ink-600">API latency</span>
                <span className="font-semibold">210ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-600">Error rate</span>
                <span className="font-semibold text-lum-rose">0.12%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-600">Deploy window</span>
                <span className="font-semibold">22:00–02:00</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value="2,842" change="12.5%" isPositive={true} icon={Users} />
        <StatCard title="Active Subs" value="1,120" change="8.2%" isPositive={true} icon={TrendingUp} />
        <StatCard title="API Health" value="99.9%" change="0.1%" isPositive={true} icon={Activity} />
        <StatCard title="Total Errors" value="154" change="23%" isPositive={false} icon={AlertCircle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-ink-50">User activity</h3>
              <p className="text-xs text-ink-600">Last 7 days • engagement & sessions</p>
            </div>
            <Badge tone="neutral">Realtime</Badge>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(10,15,26,0.95)',
                      color: '#fff',
                    }}
                  />
                  <Bar dataKey="active" fill="#6366F1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-ink-600">Asaas pipeline</p>
                  <p className="text-xl font-semibold text-ink-50 mt-1">R$ 92.4k</p>
                  <p className="text-xs text-ink-600 mt-2">Pending confirmations</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/6 border border-white/10 text-lum-indigo">
                  <CreditCard size={18} />
                </div>
              </div>
              <div className="mt-4 space-y-2 text-xs text-ink-600">
                <div className="flex items-center justify-between">
                  <span>Pending invoices</span>
                  <span className="text-ink-50 font-semibold">38</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Overdue</span>
                  <span className="text-lum-rose font-semibold">4</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-ink-600">Ops queue</p>
                  <p className="text-xl font-semibold text-ink-50 mt-1">7 jobs</p>
                  <p className="text-xs text-ink-600 mt-2">Scrapers + syncs</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/6 border border-white/10 text-lum-amber">
                  <Zap size={18} />
                </div>
              </div>
              <div className="mt-4 space-y-2 text-xs text-ink-600">
                <div className="flex items-center justify-between">
                  <span>Queued</span>
                  <span className="text-ink-50 font-semibold">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Running</span>
                  <span className="text-lum-green font-semibold">2</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-ink-50">Recent pipeline activity</h3>
            <p className="text-xs text-ink-600">Scrapers, webhooks, infra jobs</p>
          </div>
          <Button variant="secondary" size="sm">
            View all logs
          </Button>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/4 text-ink-600 text-xs uppercase">
                <tr>
                  <th className="px-6 py-4 font-semibold">Service</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Duration</th>
                  <th className="px-6 py-4 font-semibold">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {[
                  { s: 'TudoAzul Scraper', t: 'Cron Job', st: 'Success', d: '24s', tm: '2 mins ago' },
                  { s: 'LATAM Pipeline', t: 'Manual Trigger', st: 'Success', d: '1.2m', tm: '15 mins ago' },
                  { s: 'Smiles Engine', t: 'Cron Job', st: 'Error', d: '0s', tm: '1 hour ago' },
                  { s: 'Asaas Webhook', t: 'Incoming', st: 'Success', d: '120ms', tm: '3 hours ago' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/4 transition-colors">
                    <td className="px-6 py-4 font-medium text-ink-50">{row.s}</td>
                    <td className="px-6 py-4 text-ink-600">{row.t}</td>
                    <td className="px-6 py-4">
                      <Badge tone={row.st === 'Success' ? 'success' : 'danger'}>
                        {row.st}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-ink-600">{row.d}</td>
                    <td className="px-6 py-4 text-ink-600">{row.tm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
