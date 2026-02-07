
import React from 'react';
import { Smartphone, CheckCircle2, Circle, AlertTriangle, ExternalLink, Code } from 'lucide-react';

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
      <div className="bg-indigo-600 rounded-2xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Capacitor Deployment Guide</h2>
          <p className="text-indigo-100 max-w-lg">Follow this checklist to move from <span className="font-mono bg-indigo-500 px-1 rounded">localhost</span> to App Stores.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-bold hover:bg-indigo-50 transition-colors">
            Open Xcode
          </button>
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg font-bold hover:bg-indigo-400 transition-colors">
            Android Studio
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold px-2">Launch Checklist</h3>
          {steps.map((step, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 flex items-start gap-4 shadow-sm hover:border-indigo-300 transition-colors group">
              <div className="mt-1">
                {step.status === 'completed' ? (
                  <CheckCircle2 className="text-green-500" />
                ) : step.status === 'blocked' ? (
                  <AlertTriangle className="text-amber-500" />
                ) : (
                  <Circle className="text-slate-300 group-hover:text-indigo-400" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800">{step.title}</h4>
                <p className="text-sm text-slate-500">{step.desc}</p>
              </div>
              <button className="text-slate-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Code size={18} className="text-indigo-600" />
              Build Commands
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-indigo-300 leading-relaxed">
                <p className="text-slate-500"># Prepare Web</p>
                <p>pnpm -C apps/web build</p>
                <p className="mt-2 text-slate-500"># Sync to Native</p>
                <p>npx cap sync android</p>
                <p className="mt-2 text-slate-500"># Open Native IDE</p>
                <p>npx cap open android</p>
              </div>
              <p className="text-xs text-slate-400 italic">Run from project root.</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl">
            <div className="flex items-center gap-2 text-amber-800 font-bold mb-2">
              <AlertTriangle size={20} />
              Important Warning
            </div>
            <p className="text-sm text-amber-700 leading-relaxed">
              Mobile does NOT use Service Workers. Ensure the <code>runtime-config.json</code> is accessible externally to change 
              <code>apiBaseUrl</code> without store updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDeployment;
