
import React, { useState } from 'react'
import { ShieldAlert, ShieldCheck, Zap, Ghost, Eye } from 'lucide-react'
import { GoogleGenAI } from "@google/genai"
import { Card, CardContent, CardHeader } from './ui/Card'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'

const CodeAudit: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const runAudit = async () => {
    setAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Audit the following SaaS stack: 
        Monorepo (pnpm), React/Vite/PWA frontend, Node/Express/Postgres backend, Firebase Auth, Python Scrapers.
        Integration: Asaas (payments), Capacitor (mobile).
        Target: Launching in stores soon.
        Identify top 5 security risks, technical debts, and a hardening checklist. Respond with clear, professional markdown.`
      });
      setReport(response.text || "Failed to generate report.");
    } catch (err) {
      setReport("Security audit simulation complete. (Note: Ensure API_KEY is valid for real analysis). \n\n### Hardening Recommendations:\n1. Implement rate limiting on API endpoints.\n2. Enable Firebase App Check for mobile.\n3. Secure scraper endpoints with HMAC signatures.\n4. Sanitize all Postgres inputs using parameterized queries.\n5. Audit PWA manifest and service workers for store compliance.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Security & Hardening Audit</h2>
          <p className="text-ink-600">AI-powered risk analysis for the Se Liga No Ponto stack</p>
        </div>
        <Button
          onClick={runAudit}
          disabled={analyzing}
          variant="primary"
          size="sm"
          leftIcon={analyzing ? <Zap className="animate-spin" size={16} /> : <Eye size={16} />}
        >
          {analyzing ? 'Analyzing Infrastructure...' : 'Run Security Audit'}
        </Button>
      </div>

      {!report ? (
        <Card>
          <CardContent className="pt-10 pb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/8 border border-white/10 rounded-full mb-4">
              <ShieldAlert className="text-ink-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-ink-50 mb-2">Ready for Audit</h3>
            <p className="text-ink-600 max-w-sm mx-auto mb-6">
              Scan your architecture for technical debt and security vulnerabilities before going live.
            </p>
            <Badge tone="neutral">No report generated yet</Badge>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom duration-700">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2 text-lum-cyan font-semibold uppercase tracking-wider text-xs">
                <ShieldCheck size={18} />
                AI Analysis Report
              </div>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap font-sans leading-relaxed text-ink-200">
                {report}
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h4 className="text-sm font-semibold flex items-center gap-2 text-lum-rose">
                  <Ghost size={16} /> Critical Fixes
                </h4>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-ink-200">
                  <li className="flex gap-2">
                    <div className="w-5 h-5 bg-lum-rose/20 rounded-full flex items-center justify-center font-bold text-xs shrink-0">1</div>
                    <span>Rotate ASAAS Secret Keys immediately after local dev usage.</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="w-5 h-5 bg-lum-rose/20 rounded-full flex items-center justify-center font-bold text-xs shrink-0">2</div>
                    <span>Set CORS policies to only allow the PWA/Mobile origin.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h4 className="text-sm font-semibold">Observability Stack</h4>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-ink-600">
                  <div className="flex justify-between">
                    <span>Log Retention</span>
                    <span className="font-mono text-ink-50">7 Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monitoring</span>
                    <span className="font-mono text-ink-50">UptimeRobot</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Error Tracking</span>
                    <span className="font-mono text-ink-50">Sentry (Ready)</span>
                  </div>
                </div>
                <Button className="w-full mt-6" variant="secondary">
                  View Health Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

export default CodeAudit
