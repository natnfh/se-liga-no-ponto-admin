
import React, { useState } from 'react';
import { Play, RefreshCw, Terminal, CheckCircle2, XCircle, Clock } from 'lucide-react';

const Scrapers: React.FC = () => {
  const [isRunningAll, setIsRunningAll] = useState(false);
  
  const scraperList = [
    { id: 'tudoazul', name: 'TudoAzul Scraper', lastRun: '10 min ago', status: 'Success', items: 142 },
    { id: 'latam', name: 'LATAM Pass Scraper', lastRun: '1 hour ago', status: 'Success', items: 89 },
    { id: 'smiles', name: 'Smiles GOL Scraper', lastRun: '4 hours ago', status: 'Failed', items: 0 },
    { id: 'inter', name: 'Inter Loop Scraper', lastRun: 'Yesterday', status: 'Success', items: 12 },
    { id: 'livelo', name: 'Livelo Scraper', lastRun: 'Yesterday', status: 'Success', items: 56 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Scrapers & Scrapers</h2>
          <p className="text-slate-500">Manage Python scripts and background jobs</p>
        </div>
        <button 
          onClick={() => setIsRunningAll(true)}
          disabled={isRunningAll}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {isRunningAll ? <RefreshCw className="animate-spin" size={18} /> : <Play size={18} />}
          {isRunningAll ? 'Running All Seeders...' : 'Trigger All Seeders'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scraperList.map((scraper) => (
          <div key={scraper.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-lg text-slate-600">
                <Terminal size={24} />
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                scraper.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {scraper.status}
              </span>
            </div>
            
            <h3 className="font-bold text-lg mb-1">{scraper.name}</h3>
            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock size={16} />
                <span>Last run: {scraper.lastRun}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                {scraper.status === 'Success' ? <CheckCircle2 className="text-green-500" size={16} /> : <XCircle className="text-red-500" size={16} />}
                <span>{scraper.items} items parsed to Postgres</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 flex gap-2">
              <button className="flex-1 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                Run Now
              </button>
              <button className="px-3 py-2 text-slate-500 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                Logs
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-xl p-6 text-white overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-lg font-bold mb-2">Technical Note: Monorepo Architecture</h3>
          <p className="text-slate-400 text-sm max-w-2xl mb-4">
            Scrapers are located in <code className="bg-slate-800 px-1 py-0.5 rounded text-indigo-400">services/scrapers</code>. 
            They are invoked via an HTTP endpoint on the API protected by <code className="bg-slate-800 px-1 py-0.5 rounded text-indigo-400">SCHEDULER_SECRET</code>.
          </p>
          <div className="flex gap-4">
            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Scraper Engine</p>
              <p className="font-mono text-sm">Python / FastAPI</p>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Scheduler</p>
              <p className="font-mono text-sm">GCP / Cron (VPS)</p>
            </div>
          </div>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <Terminal size={200} />
        </div>
      </div>
    </div>
  );
};

export default Scrapers;
