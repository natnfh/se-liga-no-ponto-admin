
import React, { useState } from 'react'
import { Save, AlertCircle, Globe, Server, Lock } from 'lucide-react'
import { Card, CardContent, CardHeader } from './ui/Card'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'

const SettingsView: React.FC = () => {
  const [config, setConfig] = useState({
    apiBaseUrl: 'https://api.seliganoponto.com',
    firebaseApiKey: 'AIzaSyC...',
    environment: 'production',
    allowPublicSignups: true,
    maintenanceMode: false
  });

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">System Configuration</h2>
          <p className="text-ink-600">Runtime config • environment variables • access controls</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Save size={16} />}>
          Push to Remote
        </Button>
      </div>

      <Card>
        <CardContent className="pt-5">
          <div className="flex items-start gap-3 text-sm text-ink-600">
            <AlertCircle className="text-lum-amber" />
            <p>
              Changes to <strong>apiBaseUrl</strong> will affect all connected Mobile Apps and PWAs
              immediately via the runtime-config endpoint. Use with caution.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-lum-cyan" />
              <h3 className="text-sm font-semibold">Core Endpoints</h3>
            </div>
            <Badge tone="info">Live</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-ink-600">API Base URL</label>
                <input
                  type="text"
                  value={config.apiBaseUrl}
                  onChange={(e) => setConfig({ ...config, apiBaseUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-lum-cyan/25 outline-none text-ink-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-ink-600">Environment</label>
                <select
                  value={config.environment}
                  onChange={(e) => setConfig({ ...config, environment: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-lum-cyan/25 outline-none text-ink-50"
                >
                  <option value="production">Production</option>
                  <option value="staging">Staging</option>
                  <option value="dev">Development</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-lum-indigo" />
              <h3 className="text-sm font-semibold">Security & Auth (Firebase)</h3>
            </div>
            <Badge tone="neutral">Protected</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Maintenance Mode</p>
                <p className="text-xs text-ink-600">Block all incoming requests with a 503 status.</p>
              </div>
              <input
                type="checkbox"
                checked={config.maintenanceMode}
                onChange={(e) => setConfig({ ...config, maintenanceMode: e.target.checked })}
                className="w-5 h-5 rounded text-lum-cyan bg-white/5 border-white/20"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Public Signups</p>
                <p className="text-xs text-ink-600">Allow new users to register via Firebase Auth.</p>
              </div>
              <input
                type="checkbox"
                checked={config.allowPublicSignups}
                onChange={(e) => setConfig({ ...config, allowPublicSignups: e.target.checked })}
                className="w-5 h-5 rounded text-lum-cyan bg-white/5 border-white/20"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <Server size={16} className="text-ink-600" />
            <h3 className="text-sm font-semibold">Infrastructure Info</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-ink-600 font-mono">
              <div>
                <p className="mb-1 text-ink-600 uppercase">OS</p>
                <p className="text-ink-50">Ubuntu 22.04 LTS</p>
              </div>
              <div>
                <p className="mb-1 text-ink-600 uppercase">Node</p>
                <p className="text-ink-50">v22.4.0 (LTS)</p>
              </div>
              <div>
                <p className="mb-1 text-ink-600 uppercase">DB</p>
                <p className="text-ink-50">Postgres 16</p>
              </div>
              <div>
                <p className="mb-1 text-ink-600 uppercase">Engine</p>
                <p className="text-ink-50">Coolify / Docker</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SettingsView
