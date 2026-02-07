
import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Zap, Ghost, Eye } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Security & Hardening Audit</h2>
          <p className="text-slate-500">AI-powered risk analysis for the "Se Liga No Ponto" stack</p>
        </div>
        <button 
          onClick={runAudit}
          disabled={analyzing}
          className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50"
        >
          {analyzing ? <Zap className="animate-spin" size={18} /> : <Eye size={18} />}
          {analyzing ? 'Analyzing Infrastructure...' : 'Run Security Audit'}
        </button>
      </div>

      {!report ? (
        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
            <ShieldAlert className="text-slate-400" size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Ready for Audit</h3>
          <p className="text-slate-500 max-w-sm mx-auto mb-6">
            Click the button to scan your architecture for technical debt and security vulnerabilities before going live.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom duration-700">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-8 prose prose-slate prose-indigo max-w-none">
            <div className="flex items-center gap-2 text-indigo-600 mb-6 font-bold uppercase tracking-wider text-sm">
              <ShieldCheck size={20} />
              AI Analysis Report
            </div>
            <div className="whitespace-pre-wrap font-sans leading-relaxed text-slate-700">
              {report}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-100 p-6 rounded-xl">
              <h4 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                <Ghost size={18} />
                Critical Fixes
              </h4>
              <ul className="space-y-3 text-sm text-red-700">
                <li className="flex gap-2">
                  <div className="w-5 h-5 bg-red-200 rounded-full flex items-center justify-center font-bold text-xs shrink-0">1</div>
                  <span>Rotate ASAAS Secret Keys immediately after local dev usage.</span>
                </li>
                <li className="flex gap-2">
                  <div className="w-5 h-5 bg-red-200 rounded-full flex items-center justify-center font-bold text-xs shrink-0">2</div>
                  <span>Set CORS policies to only allow the PWA/Mobile origin.</span>
                </li>
              </ul>
            </div>

            <div className="bg-indigo-900 p-6 rounded-xl text-white">
              <h4 className="font-bold mb-4">Observability Stack</h4>
              <div className="space-y-4 text-sm opacity-80">
                <div className="flex justify-between">
                  <span>Log Retention</span>
                  <span className="font-mono">7 Days</span>
                </div>
                <div className="flex justify-between">
                  <span>Monitoring</span>
                  <span className="font-mono">UptimeRobot</span>
                </div>
                <div className="flex justify-between">
                  <span>Error Tracking</span>
                  <span className="font-mono">Sentry (Ready)</span>
                </div>
              </div>
              <button className="w-full mt-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors font-bold">
                View Health Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeAudit;
