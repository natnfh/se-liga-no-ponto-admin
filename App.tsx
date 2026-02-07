
import React, { useState } from 'react'
import { AppSection } from './types'
import Dashboard from './components/Dashboard'
import Scrapers from './components/Scrapers'
import MobileDeployment from './components/MobileDeployment'
import SubscriptionManager from './components/SubscriptionManager'
import SettingsView from './components/SettingsView'
import CodeAudit from './components/CodeAudit'
import { AppShell } from './components/ui/AppShell'

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.DASHBOARD);

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
    <AppShell active={activeSection} onNavigate={setActiveSection}>
      {renderContent()}
    </AppShell>
  )
};

export default App;
