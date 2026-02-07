
import React from 'react'
import { Smartphone, CheckCircle2, Circle, AlertTriangle, ExternalLink, Code } from 'lucide-react'
import { Card, CardContent, CardHeader } from './ui/Card'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { Reveal, RevealStagger } from './ui/Reveal'

const MobileDeployment: React.FC = () => {
  const steps = [
    { title: 'Update Bundle IDs', desc: 'Sync IDs in capacitor.config.ts and native projects.', status: 'completed' },
    { title: 'Prepare Release Assets', desc: 'Generate high-res icons and splash screens.', status: 'completed' },
    { title: 'Configure App Check', desc: 'Secure backend with Firebase App Check tokens.', status: 'pending' },
    { title: 'Signing: Android Keystore', desc: 'Generate release.keystore and set gradle properties.', status: 'pending' },
    { title: 'Signing: iOS Certificate', desc: 'Create distribution cert in Apple Dev Portal.', status: 'pending' },
    { title: 'First Store Upload', desc: 'Manually upload AAB/IPA to consoles for review.', status: 'blocked' },
  ];

  return (
    <div className="space-y-6">
      <Reveal>
        <Card>
          <CardContent className="pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Capacitor Deployment Guide</h2>
                <p className="text-ink-600 max-w-lg">
                  Move from <span className="font-mono bg-white/5 px-1 rounded text-lum-cyan">localhost</span> to
                  App Stores with a controlled release pipeline.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" size="sm">Open Xcode</Button>
                <Button variant="primary" size="sm">Android Studio</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Reveal className="flex items-center justify-between px-2">
            <h3 className="text-lg font-semibold">Launch Checklist</h3>
            <Badge tone="info">6 steps</Badge>
          </Reveal>
          <RevealStagger className="space-y-4">
            {steps.map((step, i) => (
              <Card key={i}>
                <CardContent className="pt-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {step.status === 'completed' ? (
                        <CheckCircle2 className="text-lum-green" />
                      ) : step.status === 'blocked' ? (
                        <AlertTriangle className="text-lum-amber" />
                      ) : (
                        <Circle className="text-ink-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-ink-50">{step.title}</h4>
                      <p className="text-sm text-ink-600">{step.desc}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </RevealStagger>
        </div>

        <RevealStagger className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Code size={16} className="text-lum-cyan" /> Build Commands
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-bg-950 rounded-lg font-mono text-xs text-lum-cyan leading-relaxed border border-white/8">
                  <p className="text-ink-600"># Prepare Web</p>
                  <p>pnpm -C apps/web build</p>
                  <p className="mt-2 text-ink-600"># Sync to Native</p>
                  <p>npx cap sync android</p>
                  <p className="mt-2 text-ink-600"># Open Native IDE</p>
                  <p>npx cap open android</p>
                </div>
                <p className="text-xs text-ink-600 italic">Run from project root.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-lum-amber font-semibold mb-2">
                <AlertTriangle size={18} />
                Important Warning
              </div>
              <p className="text-sm text-ink-600 leading-relaxed">
                Mobile does NOT use Service Workers. Ensure the{' '}
                <code className="bg-white/5 px-1 py-0.5 rounded">runtime-config.json</code> is accessible
                externally to change <code className="bg-white/5 px-1 py-0.5 rounded">apiBaseUrl</code>{' '}
                without store updates.
              </p>
            </CardContent>
          </Card>
        </RevealStagger>
      </div>
    </div>
  )
}

export default MobileDeployment
