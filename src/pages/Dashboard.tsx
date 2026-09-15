import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Database, 
  FileText, 
  AlertTriangle,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { mockArticles, mockSources, mockAnalyticsData, mockCategoryData } from '../data/mockData';

export default function Dashboard() {
  const totalArticles = mockSources.reduce((acc, s) => acc + s.articlesCount, 0);
  const activeSources = mockSources.filter(s => s.isActive).length;
  const recentArticles = mockArticles.slice(0, 5);
  const errorSources = mockSources.filter(s => s.status === 'error').length;

  const stats = [
    { label: 'Всего статей', value: totalArticles.toLocaleString(), change: '+12%', trend: 'up', icon: FileText, color: 'blue' },
    { label: 'Активных источников', value: activeSources, change: '+1', trend: 'up', icon: Database, color: 'green' },
    { label: 'За последние 24ч', value: '167', change: '+23%', trend: 'up', icon: Activity, color: 'purple' },
    { label: 'Ошибки парсинга', value: errorSources, change: '-1', trend: 'down', icon: AlertTriangle, color: 'red' },
  ];

  const colorMap: Record<string, string> = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-emerald-500 to-emerald-600',
    purple: 'from-purple-500 to-purple-600',
    red: 'from-red-500 to-red-600',
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Дашборд</h1>
          <p className="text-slate-500 text-sm mt-1">Обзор региональных медиа-ресурсов</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock className="w-4 h-4" />
          Обновлено: {new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
              </div>
              <div className={`p-2.5 rounded-lg bg-gradient-to-br ${colorMap[stat.color]}`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              {stat.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
              <span className="text-sm text-slate-400 ml-1">за неделю</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Активность парсинга</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={mockAnalyticsData}>
              <defs>
                <linearGradient id="colorArticles" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={(v) => new Date(v).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                labelFormatter={(v) => new Date(v).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
              />
              <Area type="monotone" dataKey="articlesCount" stroke="#3b82f6" fillOpacity={1} fill="url(#colorArticles)" strokeWidth={2} name="Статьи" />
              <Line type="monotone" dataKey="mentions" stroke="#8b5cf6" strokeWidth={2} dot={false} name="Упоминания" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Pie Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">По категориям</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={mockCategoryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                paddingAngle={2}
              >
                {mockCategoryData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {mockCategoryData.slice(0, 6).map((cat, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></div>
                <span className="text-slate-600 truncate">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Articles */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Последние публикации</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              Все <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {recentArticles.map(article => (
              <div key={article.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  article.sentiment === 'positive' ? 'bg-emerald-500' :
                  article.sentiment === 'negative' ? 'bg-red-500' : 'bg-slate-400'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{article.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400">{article.sourceName}</span>
                    <span className="text-xs text-slate-300">•</span>
                    <span className="text-xs text-slate-400">{article.region}</span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0">
                  {new Date(article.publishedAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sources Status */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Статус источников</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              Все <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {mockSources.slice(0, 6).map(source => (
              <div key={source.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                  source.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                  source.status === 'error' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {source.type === 'rss' ? 'RSS' : source.type === 'telegram' ? 'TG' : source.type === 'api' ? 'API' : 'WEB'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{source.name}</p>
                  <p className="text-xs text-slate-400">{source.region}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-700">{source.articlesCount}</p>
                  <p className="text-xs text-slate-400">статей</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Bar Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-800 mb-4">Упоминания по дням</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={mockAnalyticsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={(v) => new Date(v).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              labelFormatter={(v) => new Date(v).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
            />
            <Bar dataKey="mentions" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Упоминания" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
