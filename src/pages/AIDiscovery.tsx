import { useState } from 'react';
import { 
  Brain, Play, CheckCircle2, Clock, AlertCircle, Plus, 
  Globe, Rss, MessageCircle, Code, Search, Sparkles,
  ChevronDown, ChevronUp, MapPin, Target, Loader2,
  TrendingUp, Shield, Star
} from 'lucide-react';
import { mockAIDiscoveryTasks, regions } from '../data/mockData';
import { AIDiscoveryTask, AIDiscoveryResult } from '../types';

export default function AIDiscovery() {
  const [tasks, setTasks] = useState(mockAIDiscoveryTasks);
  const [showNewTask, setShowNewTask] = useState(false);
  const [expandedTask, setExpandedTask] = useState<string | null>('ai1');
  const [selectedRegion, setSelectedRegion] = useState('Алтайский край');
  const [focusAreas, setFocusAreas] = useState<string[]>(['Сельское хозяйство', 'Государственные ресурсы']);
  const [newFocus, setNewFocus] = useState('');

  const startNewTask = () => {
    const newTask: AIDiscoveryTask = {
      id: `ai${Date.now()}`,
      status: 'running',
      region: selectedRegion,
      focus: focusAreas,
      progress: 0,
      foundSources: 0,
      startedAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
    setShowNewTask(false);
    // Simulate progress
    setTimeout(() => {
      setTasks(prev => prev.map(t => t.id === newTask.id ? { ...t, progress: 35, foundSources: 8 } : t));
    }, 2000);
    setTimeout(() => {
      setTasks(prev => prev.map(t => t.id === newTask.id ? { ...t, progress: 72, foundSources: 16 } : t));
    }, 4000);
    setTimeout(() => {
      setTasks(prev => prev.map(t => t.id === newTask.id ? { ...t, progress: 100, status: 'completed', foundSources: 22, completedAt: new Date().toISOString() } : t));
    }, 6000);
  };

  const addFocusArea = () => {
    if (newFocus && !focusAreas.includes(newFocus)) {
      setFocusAreas([...focusAreas, newFocus]);
      setNewFocus('');
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'telegram': return MessageCircle;
      case 'api': return Code;
      case 'rss': return Rss;
      default: return Globe;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed': return { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2, label: 'Завершено' };
      case 'running': return { color: 'bg-blue-100 text-blue-700', icon: Loader2, label: 'Выполняется' };
      case 'pending': return { color: 'bg-amber-100 text-amber-700', icon: Clock, label: 'Ожидание' };
      case 'failed': return { color: 'bg-red-100 text-red-700', icon: AlertCircle, label: 'Ошибка' };
      default: return { color: 'bg-slate-100 text-slate-600', icon: Clock, label: 'Неизвестно' };
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Brain className="w-7 h-7 text-purple-600" />
            AI-Discovery источников
          </h1>
          <p className="text-slate-500 text-sm mt-1">Автоматический поиск и анализ региональных ресурсов с помощью ИИ</p>
        </div>
        <button 
          onClick={() => setShowNewTask(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg shadow-purple-200"
        >
          <Sparkles className="w-4 h-4" />
          Новое исследование
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Как работает AI-Discovery?</h3>
            <p className="text-sm text-slate-600 mt-1">
              Система анализирует заданный регион и тематические направления, находит релевантные источники 
              (гос. порталы, СМИ, Telegram-каналы, статистические сайты), оценивает их по трасту и релевантности, 
              автоматически каталогизирует и предлагает к добавлению. Сначала приоритет — государственные открытые 
              источники, затем отраслевые, затем локальные.
            </p>
          </div>
        </div>
      </div>

      {/* New Task Form */}
      {showNewTask && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h3 className="font-semibold text-slate-800">Новое AI-исследование</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                <MapPin className="w-3 h-3 inline mr-1" /> Регион
              </label>
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {regions.filter(r => r !== 'Все').map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                <Target className="w-3 h-3 inline mr-1" /> Добавить фокус
              </label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={newFocus}
                  onChange={(e) => setNewFocus(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addFocusArea()}
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Например: Топливный сектор"
                />
                <button onClick={addFocusArea} className="px-3 py-2 bg-slate-100 rounded-lg hover:bg-slate-200">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Тематические направления</label>
            <div className="flex flex-wrap gap-2">
              {focusAreas.map(area => (
                <span key={area} className="flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm">
                  {area}
                  <button onClick={() => setFocusAreas(focusAreas.filter(a => a !== area))} className="hover:text-purple-900">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setShowNewTask(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">
              Отмена
            </button>
            <button 
              onClick={startNewTask}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700"
            >
              <Play className="w-4 h-4" /> Запустить анализ
            </button>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map(task => {
          const status = getStatusBadge(task.status);
          const StatusIcon = status.icon;
          const isExpanded = expandedTask === task.id;

          return (
            <div key={task.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div 
                className="p-5 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setExpandedTask(isExpanded ? null : task.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      task.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                      task.status === 'running' ? 'bg-blue-100 text-blue-600' :
                      task.status === 'failed' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      <StatusIcon className={`w-5 h-5 ${task.status === 'running' ? 'animate-spin' : ''}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-slate-800">{task.region}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-slate-400">
                          {new Date(task.startedAt).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">{task.foundSources} источников найдено</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {task.status === 'running' && (
                      <div className="w-32">
                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                          <span>Прогресс</span>
                          <span>{task.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                          <div className="bg-blue-600 h-1.5 rounded-full transition-all" style={{ width: `${task.progress}%` }}></div>
                        </div>
                      </div>
                    )}
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </div>
                {task.focus.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {task.focus.map(f => (
                      <span key={f} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{f}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Expanded Results */}
              {isExpanded && task.results && (
                <div className="border-t border-slate-100 p-5 bg-slate-50/50">
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">Результаты анализа ({task.results.length})</h4>
                  <div className="space-y-2">
                    {task.results.map((result, i) => {
                      const TypeIcon = getTypeIcon(result.type);
                      return (
                        <div key={i} className="flex items-center gap-4 p-3 bg-white rounded-lg border border-slate-200">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            result.added ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                          }`}>
                            <TypeIcon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-slate-800 truncate">{result.name}</p>
                              {result.added && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />}
                            </div>
                            <p className="text-xs text-slate-400 truncate">{result.url}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{result.description}</p>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <div className="text-center">
                              <div className="flex items-center gap-0.5">
                                <Star className="w-3 h-3 text-amber-500" />
                                <span className="text-xs font-medium">{result.relevance}</span>
                              </div>
                              <span className="text-[10px] text-slate-400">релевантность</span>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center gap-0.5">
                                <Shield className="w-3 h-3 text-blue-500" />
                                <span className="text-xs font-medium">{result.trustScore}</span>
                              </div>
                              <span className="text-[10px] text-slate-400">траст</span>
                            </div>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{result.category}</span>
                            {!result.added && (
                              <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700">
                                Добавить
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
