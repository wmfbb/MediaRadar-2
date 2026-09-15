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
  Zap,
  Brain,
  FileText,
  CreditCard,
  Users,
  ChevronDown,
  LogOut,
  Shield
} from 'lucide-react';
import { mockNotifications, mockUsers, rolePermissions } from '../data/mockData';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const currentUser = mockUsers[0]; // superadmin

  const menuItems = [
    { id: 'dashboard', label: 'Дашборд', icon: LayoutDashboard, section: 'main' },
    { id: 'feed', label: 'Лента', icon: Rss, section: 'main' },
    { id: 'sources', label: 'Источники', icon: Database, section: 'main' },
    { id: 'ai-discovery', label: 'AI-Discovery', icon: Brain, section: 'main' },
    { id: 'analytics', label: 'Аналитика', icon: BarChart3, section: 'main' },
    { id: 'reports', label: 'Отчёты', icon: FileText, section: 'main' },
    { id: 'tariffs', label: 'Тарифы', icon: CreditCard, section: 'system' },
    { id: 'users', label: 'Пользователи', icon: Users, section: 'system' },
    { id: 'settings', label: 'Настройки', icon: Settings, section: 'system' },
  ];

  const mainItems = menuItems.filter(i => i.section === 'main');
  const systemItems = menuItems.filter(i => i.section === 'system');

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} bg-slate-900 text-white flex flex-col transition-all duration-300 min-h-screen`}>
      <div className="p-4 flex items-center justify-between border-b border-slate-700">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
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

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {!collapsed && <p className="text-xs text-slate-500 uppercase tracking-wider px-3 py-2 font-semibold">Основное</p>}
        {mainItems.map(item => (
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

        {!collapsed && <p className="text-xs text-slate-500 uppercase tracking-wider px-3 py-2 mt-4 font-semibold">Система</p>}
        {systemItems.map(item => (
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

      {/* User Card */}
      <div className="p-3 border-t border-slate-700">
        <div className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 cursor-pointer ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
            {currentUser.avatar}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{currentUser.name}</div>
              <div className="text-xs text-slate-400 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                {rolePermissions.find(r => r.role === currentUser.role)?.label}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export function TopBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск по контенту, источникам, тегам, сущностям..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch(e.target.value);
            }}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
            ⌘K
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 text-slate-600" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-xl z-50">
              <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                <h4 className="font-semibold text-sm">Уведомления</h4>
                <span className="text-xs text-blue-600 cursor-pointer hover:underline">Прочитать все</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {mockNotifications.map(n => (
                  <div key={n.id} className={`p-3 border-b border-slate-50 hover:bg-slate-50 ${!n.isRead ? 'bg-blue-50/50' : ''}`}>
                    <div className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        n.type === 'success' ? 'bg-emerald-500' :
                        n.type === 'warning' ? 'bg-amber-500' :
                        n.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">{n.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{n.message}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          {new Date(n.createdAt).toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="h-6 w-px bg-slate-200"></div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-700">
              {new Date().toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' })}
            </p>
            <p className="text-xs text-slate-400">
              {new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
            ДВ
          </div>
        </div>
      </div>
    </header>
  );
}
