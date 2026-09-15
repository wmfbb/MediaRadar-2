import { useState } from 'react';
import { 
  LayoutDashboard, 
  Rss, 
  Database, 
  BarChart3, 
  Settings, 
  Bell, 
  Search,
  Menu,
  X,
  Zap
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Дашборд', icon: LayoutDashboard },
    { id: 'feed', label: 'Лента', icon: Rss },
    { id: 'sources', label: 'Источники', icon: Database },
    { id: 'analytics', label: 'Аналитика', icon: BarChart3 },
    { id: 'settings', label: 'Настройки', icon: Settings },
  ];

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} bg-slate-900 text-white flex flex-col transition-all duration-300 min-h-screen`}>
      <div className="p-4 flex items-center justify-between border-b border-slate-700">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-lg">МедиаРадар</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-700">
        <div className={`flex items-center gap-3 px-3 py-2 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold">
            АД
          </div>
          {!collapsed && (
            <div className="text-sm">
              <div className="font-medium">Админ</div>
              <div className="text-slate-400 text-xs">Оператор</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export function TopBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('');

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск по контенту, источникам, тегам..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="h-6 w-px bg-slate-200"></div>
        <span className="text-sm text-slate-500">
          {new Date().toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' })}
        </span>
      </div>
    </header>
  );
}
