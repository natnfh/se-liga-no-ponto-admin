
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Smartphone, 
  CreditCard, 
  Settings, 
  ShieldCheck, 
  Menu, 
  X,
  Bell,
  Search
} from 'lucide-react';
import { AppSection } from './types';
import Dashboard from './components/Dashboard';
import Scrapers from './components/Scrapers';
import MobileDeployment from './components/MobileDeployment';
import SubscriptionManager from './components/SubscriptionManager';
import SettingsView from './components/SettingsView';
import CodeAudit from './components/CodeAudit';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigation = [
    { id: AppSection.DASHBOARD, name: 'Dashboard', icon: LayoutDashboard },
    { id: AppSection.SCRAPERS, name: 'Scrapers & Jobs', icon: Database },
    { id: AppSection.MOBILE, name: 'Mobile (Capacitor)', icon: Smartphone },
    { id: AppSection.SUBSCRIPTIONS, name: 'Asaas Billing', icon: CreditCard },
    { id: AppSection.AUDIT, name: 'Security & Audit', icon: ShieldCheck },
    { id: AppSection.SETTINGS, name: 'Runtime Config', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case AppSection.DASHBOARD: return <Dashboard />;
      case AppSection.SCRAPERS: return <Scrapers />;
      case AppSection.MOBILE: return <MobileDeployment />;
      case AppSection.SUBSCRIPTIONS: return <SubscriptionManager />;
      case AppSection.AUDIT: return <CodeAudit />;
      case AppSection.SETTINGS: return <SettingsView />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Menu Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-slate-900 text-white z-50 transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl">
              SL
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Se Liga No Ponto</h1>
              <p className="text-xs text-slate-400">Admin Panel</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${activeSection === item.id 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                `}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <img src="https://picsum.photos/seed/admin/40/40" className="rounded-full" alt="Profile" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">Dev Master</p>
              <p className="text-xs text-slate-400 truncate">pnpm monorepo v1.0</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search metrics, logs..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-1"></div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">Live Env</p>
              <p className="text-xs text-green-500">Connected to Postgres</p>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
