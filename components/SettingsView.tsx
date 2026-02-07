
import React, { useState } from 'react';
import { Save, AlertCircle, Globe, Server, Lock } from 'lucide-react';

const SettingsView: React.FC = () => {
  const [config, setConfig] = useState({
    apiBaseUrl: 'https://api.seliganoponto.com',
    firebaseApiKey: 'AIzaSyC...',
    environment: 'production',
    allowPublicSignups: true,
    maintenanceMode: false
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold">System Configuration</h2>
          <p className="text-slate-500">Management for runtime-config.json and ENV vars</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-bold transition-all shadow-md active:scale-95">
          <Save size={18} /> Push to Remote
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3 text-amber-800 text-sm">
        <AlertCircle className="shrink-0" />
        <p>Changes to <strong>apiBaseUrl</strong> will affect all connected Mobile Apps and PWAs immediately via the runtime-config endpoint. Use with caution.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-bold border-b pb-4 flex items-center gap-2">
            <Globe size={18} className="text-indigo-600" />
            Core Endpoints
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">API Base URL</label>
              <input 
                type="text" 
                value={config.apiBaseUrl}
                onChange={(e) => setConfig({...config, apiBaseUrl: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Environment</label>
              <select 
                value={config.environment}
                onChange={(e) => setConfig({...config, environment: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="production">Production</option>
                <option value="staging">Staging</option>
                <option value="dev">Development</option>
              </select>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-bold border-b pb-4 flex items-center gap-2">
            <Lock size={18} className="text-indigo-600" />
            Security & Auth (Firebase)
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Maintenance Mode</p>
                <p className="text-sm text-slate-500">Block all incoming requests with a 503 status.</p>
              </div>
              <input 
                type="checkbox" 
                checked={config.maintenanceMode}
                onChange={(e) => setConfig({...config, maintenanceMode: e.target.checked})}
                className="w-6 h-6 rounded text-indigo-600" 
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Public Signups</p>
                <p className="text-sm text-slate-500">Allow new users to register via Firebase Auth.</p>
              </div>
              <input 
                type="checkbox" 
                checked={config.allowPublicSignups}
                onChange={(e) => setConfig({...config, allowPublicSignups: e.target.checked})}
                className="w-6 h-6 rounded text-indigo-600" 
              />
            </div>
          </div>
        </section>

        <section className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300">
          <div className="flex items-center gap-2 text-slate-400 mb-4">
            <Server size={18} />
            <p className="text-sm font-medium uppercase tracking-widest">Infrastructure Info</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-500 font-mono">
            <div>
              <p className="mb-1 text-slate-400 uppercase">OS</p>
              <p className="text-slate-800">Ubuntu 22.04 LTS</p>
            </div>
            <div>
              <p className="mb-1 text-slate-400 uppercase">Node</p>
              <p className="text-slate-800">v22.4.0 (LTS)</p>
            </div>
            <div>
              <p className="mb-1 text-slate-400 uppercase">DB</p>
              <p className="text-slate-800">Postgres 16</p>
            </div>
            <div>
              <p className="mb-1 text-slate-400 uppercase">Engine</p>
              <p className="text-slate-800">Coolify / Docker</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsView;
