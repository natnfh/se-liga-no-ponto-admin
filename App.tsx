
import React, { useState } from 'react'
import { AppSection } from './types'
import Dashboard from './components/Dashboard'
import Scrapers from './components/Scrapers'
import MobileDeployment from './components/MobileDeployment'
import SubscriptionManager from './components/SubscriptionManager'
import SettingsView from './components/SettingsView'
import CodeAudit from './components/CodeAudit'
import { AppShell } from './components/ui/AppShell'
import { AnimatePresence, motion } from 'framer-motion'
import { useMotionPreset } from './components/ui/motion'

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.DASHBOARD);
  const m = useMotionPreset()

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
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
          transition={m.transition}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </AppShell>
  )
};

export default App;
