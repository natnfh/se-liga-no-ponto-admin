
import React from 'react';
import { CreditCard, ExternalLink, RefreshCw, Check, Clock } from 'lucide-react';

const SubscriptionManager: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Billing Management</h2>
          <p className="text-slate-500">Asaas API Integration status</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold flex items-center gap-1">
            <Check size={14} /> API Active
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold flex items-center gap-1">
            <RefreshCw size={14} /> 5 Pending Hooks
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold">Recent Asaas Transactions</h3>
          <button className="text-indigo-600 text-sm flex items-center gap-1 hover:underline">
            Go to Asaas Dashboard <ExternalLink size={14} />
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { user: 'João Silva', plan: 'Anual Premium', amount: 'R$ 199,00', status: 'Paid', date: '10 min ago' },
            { user: 'Maria Souza', plan: 'Mensal', amount: 'R$ 29,90', status: 'Pending', date: '1 hour ago' },
            { user: 'Pedro Alvares', plan: 'Anual Premium', amount: 'R$ 199,00', status: 'Refunded', date: 'Yesterday' },
            { user: 'Ana Paula', plan: 'Mensal', amount: 'R$ 29,90', status: 'Paid', date: 'Feb 15, 2024' },
          ].map((tx, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                  <CreditCard size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-800">{tx.user}</p>
                  <p className="text-xs text-slate-500">{tx.plan} • {tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">{tx.amount}</p>
                <span className={`text-xs font-semibold ${
                  tx.status === 'Paid' ? 'text-green-600' : tx.status === 'Pending' ? 'text-amber-600' : 'text-slate-400'
                }`}>
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-slate-200 rounded-xl">
          <h4 className="font-bold mb-4">Webhook Health</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">PAYMENT_RECEIVED</span>
              <span className="text-green-500 font-mono">200 OK</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">PAYMENT_OVERDUE</span>
              <span className="text-green-500 font-mono">200 OK</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">SUBSCRIPTION_DELETED</span>
              <span className="text-red-500 font-mono">500 ERR</span>
            </div>
          </div>
          <button className="w-full mt-6 py-2 text-sm text-indigo-600 bg-indigo-50 rounded-lg font-bold">
            Retest All Hooks
          </button>
        </div>

        <div className="p-6 bg-slate-900 rounded-xl text-white">
          <h4 className="font-bold mb-4 text-indigo-400">Integration Tasks</h4>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-2">
              <Check size={16} className="text-green-500" /> API Client initialized
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-green-500" /> Customer creation bridge
            </li>
            <li className="flex items-center gap-2 text-slate-500">
              <Clock size={16} /> Link billing status to UI Paywall
            </li>
            <li className="flex items-center gap-2 text-slate-500">
              <Clock size={16} /> Automation for "Premium" role updates
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManager;
