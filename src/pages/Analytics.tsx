import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart as PieIcon, 
  Download, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Legend, PieChart, Pie, Cell
} from 'recharts';
import { mockAnalyticsData, mockSentimentData, mockCategoryData, mockSources, mockArticles } from '../data/mockData';

export default function Analytics() {
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter'>('week');

  // Radar data for sources comparison
  const radarData = mockSources.slice(0, 6).map(s => ({
    source: s.name,
    articles: Math.round(s.articlesCount / 100),
    frequency: s.parseInterval <= 30 ? 9 : s.parseInterval <= 60 ? 7 : 5,
    reliability: s.status === 'active' ? 9 : s.status === 'pending' ? 6 : 3,
  }));

  // Sentiment over time
  const sentimentTimeline = [
    { date: 'Пн', positive: 32, negative: 12, neutral: 18 },
    { date: 'Вт', positive: 28, negative: 15, neutral: 22 },
    { date: 'Ср', positive: 35, negative: 8, neutral: 20 },
    { date: 'Чт', positive: 42, negative: 18, neutral: 15 },
    { date: 'Пт', positive: 38, negative: 22, neutral: 25 },
    { date: 'Сб', positive: 25, negative: 10, neutral: 12 },
    { date: 'Вс', positive: 20, negative: 8, neutral: 10 },
  ];

  // Top topics
  const topTopics = [
    { topic: 'Экономика и бизнес', count: 234, change: 12 },
    { topic: 'Инфраструктура', count: 189, change: -5 },
    { topic: 'Здравоохранение', count: 156, change: 23 },
    { topic: 'Образование', count: 134, change: 8 },
    { topic: 'Экология', count: 112, change: -3 },
    { topic: 'Технологии', count: 98, change: 45 },
  ];

  // Region activity
  const regionActivity = [
    { region: 'НСО', articles: 167, mentions: 340 },
    { region: 'Омск', articles: 145, mentions: 280 },
    { region: 'Томск', articles: 132, mentions: 250 },
    { region: 'Красноярск', articles: 118, mentions: 220 },
    { region: 'Иркутск', articles: 98, mentions: 190 },
    { region: 'Курск', articles: 87, mentions: 160 },
    { region: 'Алтай', articles: 76, mentions: 140 },
    { region: 'Забайкалье', articles: 54, mentions: 95 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Аналитика</h1>
          <p className="text-slate-500 text-sm mt-1">Глубокий анализ медиа-контента и трендов</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 rounded-lg p-0.5">
            {(['week', 'month', 'quarter'] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  period === p ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {p === 'week' ? 'Неделя' : p === 'month' ? 'Месяц' : 'Квартал'}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            Экспорт
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
          <p className="text-blue-100 text-sm">Публикаций за период</p>
          <p className="text-3xl font-bold mt-1">421</p>
          <div className="flex items-center gap-1 mt-2 text-blue-100 text-sm">
            <ArrowUpRight className="w-4 h-4" /> +18% к пред. периоду
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white">
          <p className="text-emerald-100 text-sm">Уникальных тем</p>
          <p className="text-3xl font-bold mt-1">89</p>
          <div className="flex items-center gap-1 mt-2 text-emerald-100 text-sm">
            <ArrowUpRight className="w-4 h-4" /> +7 новых
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
          <p className="text-purple-100 text-sm">Общий охват</p>
          <p className="text-3xl font-bold mt-1">1.2M</p>
          <div className="flex items-center gap-1 mt-2 text-purple-100 text-sm">
            <ArrowUpRight className="w-4 h-4" /> +25%
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-5 text-white">
          <p className="text-amber-100 text-sm">Негативных публикаций</p>
          <p className="text-3xl font-bold mt-1">12%</p>
          <div className="flex items-center gap-1 mt-2 text-amber-100 text-sm">
            <ArrowDownRight className="w-4 h-4" /> -3% к пред. периоду
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Timeline */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-1">Динамика тональности</h3>
          <p className="text-xs text-slate-400 mb-4">Распределение позитивных/негативных/нейтральных публикаций</p>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={sentimentTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Area type="monotone" dataKey="positive" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Позитив" />
              <Area type="monotone" dataKey="neutral" stackId="1" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.6} name="Нейтрально" />
              <Area type="monotone" dataKey="negative" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Негатив" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Region Activity */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-1">Активность по регионам</h3>
          <p className="text-xs text-slate-400 mb-4">Количество публикаций и упоминаний</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={regionActivity} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="region" type="category" tick={{ fontSize: 11 }} width={70} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Bar dataKey="articles" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Публикации" />
              <Bar dataKey="mentions" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="Упоминания" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sentiment by Region */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-1">Тональность по регионам</h3>
          <p className="text-xs text-slate-400 mb-4">Соотношение позитивных, негативных и нейтральных публикаций</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockSentimentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Bar dataKey="positive" fill="#10b981" name="Позитив" radius={[2, 2, 0, 0]} />
              <Bar dataKey="neutral" fill="#94a3b8" name="Нейтрально" radius={[2, 2, 0, 0]} />
              <Bar dataKey="negative" fill="#ef4444" name="Негатив" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-1">Распределение по категориям</h3>
          <p className="text-xs text-slate-400 mb-4">Доля публикаций в каждой тематической категории</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={220}>
              <PieChart>
                <Pie
                  data={mockCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
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
            <div className="flex-1 space-y-2">
              {mockCategoryData.map((cat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                    <span className="text-sm text-slate-600">{cat.name}</span>
                  </div>
                  <span className="text-sm font-medium text-slate-800">{cat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Topics & Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Топ темы и тренды</h3>
          <div className="space-y-3">
            {topTopics.map((topic, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-sm font-bold text-slate-500">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-700">{topic.topic}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-500">{topic.count} упоминаний</span>
                  <span className={`text-xs font-medium flex items-center gap-0.5 ${
                    topic.change > 0 ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {topic.change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(topic.change)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Сводка</h3>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-600 font-medium">Пиковая активность</p>
              <p className="text-lg font-bold text-blue-800">14 января, 14:00</p>
              <p className="text-xs text-blue-500">83 публикации за день</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <p className="text-xs text-emerald-600 font-medium">Самый активный источник</p>
              <p className="text-lg font-bold text-emerald-800">Омск Пресс</p>
              <p className="text-xs text-emerald-500">3 421 публикаций</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-xs text-purple-600 font-medium">Трендовая тема</p>
              <p className="text-lg font-bold text-purple-800">Технологии</p>
              <p className="text-xs text-purple-500">+45% за неделю</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <p className="text-xs text-amber-600 font-medium">Требует внимания</p>
              <p className="text-lg font-bold text-amber-800">Экология Байкала</p>
              <p className="text-xs text-amber-500">Рост негативных публикаций</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
