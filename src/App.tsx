import { useState } from 'react';
import Sidebar, { TopBar } from './components/Layout';
import Dashboard from './pages/Dashboard';
import Feed from './pages/Feed';
import Sources from './pages/Sources';
import Analytics from './pages/Analytics';
import SettingsPage from './pages/Settings';
import Tariffs from './pages/Tariffs';
import AIDiscovery from './pages/AIDiscovery';
import Reports from './pages/Reports';
import UsersPage from './pages/Users';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'feed': return <Feed />;
      case 'sources': return <Sources />;
      case 'ai-discovery': return <AIDiscovery />;
      case 'analytics': return <Analytics />;
      case 'reports': return <Reports />;
      case 'tariffs': return <Tariffs />;
      case 'users': return <UsersPage />;
      case 'settings': return <SettingsPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <TopBar onSearch={setSearchQuery} />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
