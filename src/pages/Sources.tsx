import { useState } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  RefreshCw, 
  Globe, 
  Rss, 
  MessageCircle, 
  Code,
  CheckCircle2,
  XCircle,
  Clock,
  MoreVertical,
  Play,
  Pause
} from 'lucide-react';
import { mockSources } from '../data/mockData';
import { Source } from '../types';

export default function Sources() {
  const [sources, setSources] = useState<Source[]>(mockSources);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSource, setEditingSource] = useState<Source | null>(null);

  const toggleSource = (id: string) => {
    setSources(sources.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  const getSourceIcon = (type: string) => {
    switch(type) {
      case 'rss': return Rss;
      case 'telegram': return MessageCircle;
      case 'api': return Code;
      default: return Globe;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active': return { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2, label: 'Активен' };
      case 'error': return { color: 'bg-red-100 text-red-700', icon: XCircle, label: 'Ошибка' };
      case 'pending': return { color: 'bg-amber-100 text-amber-700', icon: Clock, label: 'Ожидание' };
      default: return { color: 'bg-slate-100 text-slate-600', icon: Clock, label: 'Неизвестно' };
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Источники данных</h1>
          <p className="text-slate-500 text-sm mt-1">Управление парсингом региональных ресурсов</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Добавить источник
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Всего источников</p>
          <p className="text-2xl font-bold text-slate-800">{sources.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Активных</p>
          <p className="text-2xl font-bold text-emerald-600">{sources.filter(s => s.isActive).length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">С ошибками</p>
          <p className="text-2xl font-bold text-red-600">{sources.filter(s => s.status === 'error').length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Всего статей</p>
          <p className="text-2xl font-bold text-blue-600">{sources.reduce((a, s) => a + s.articlesCount, 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Sources Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Источник</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Тип</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Регион</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Статус</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Траст</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">JS</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Статей</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sources.map(source => {
                const SourceIcon = getSourceIcon(source.type);
                const status = getStatusBadge(source.status);
                const StatusIcon = status.icon;
                
                return (
                  <tr key={source.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                          source.isActive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
                        }`}>
                          <SourceIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 text-sm">{source.name}</p>
                          <p className="text-xs text-slate-400 truncate max-w-[200px]">{source.url}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
                        {source.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-600">{source.region}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-10 bg-slate-200 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${
                            source.trustScore >= 85 ? 'bg-emerald-500' :
                            source.trustScore >= 70 ? 'bg-blue-500' : 'bg-amber-500'
                          }`} style={{ width: `${source.trustScore}%` }}></div>
                        </div>
                        <span className="text-xs font-medium text-slate-600">{source.trustScore}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {source.jsRendering ? (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">JS ✓</span>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-slate-800">{source.articlesCount.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => toggleSource(source.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            source.isActive ? 'hover:bg-amber-100 text-amber-600' : 'hover:bg-emerald-100 text-emerald-600'
                          }`}
                          title={source.isActive ? 'Приостановить' : 'Запустить'}
                        >
                          {source.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button className="p-1.5 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors" title="Парсить сейчас">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setEditingSource(source)}
                          className="p-1.5 hover:bg-slate-100 text-slate-400 rounded-lg transition-colors"
                          title="Редактировать"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-red-100 text-red-500 rounded-lg transition-colors" title="Удалить">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Source Modal */}
      {showAddModal && (
        <SourceModal 
          onClose={() => setShowAddModal(false)}
          onSave={() => setShowAddModal(false)}
        />
      )}

      {/* Edit Source Modal */}
      {editingSource && (
        <SourceModal 
          source={editingSource}
          onClose={() => setEditingSource(null)}
          onSave={() => setEditingSource(null)}
        />
      )}
    </div>
  );
}

function SourceModal({ source, onClose, onSave }: { source?: Source; onClose: () => void; onSave: () => void }) {
  const [name, setName] = useState(source?.name || '');
  const [url, setUrl] = useState(source?.url || '');
  const [type, setType] = useState(source?.type || 'rss');
  const [region, setRegion] = useState(source?.region || '');
  const [interval, setInterval] = useState(source?.parseInterval || 30);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">
            {source ? 'Редактировать источник' : 'Добавить источник'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {source ? 'Измените параметры парсинга' : 'Настройте новый источник данных'}
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Название</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Например: РегионМедиа"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">URL</label>
            <input 
              type="url" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Тип</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="rss">RSS</option>
                <option value="website">Website</option>
                <option value="telegram">Telegram</option>
                <option value="api">API</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Интервал (мин)</label>
              <input 
                type="number" 
                value={interval}
                onChange={(e) => setInterval(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Регион</label>
            <input 
              type="text" 
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Например: Новосибирская область"
            />
          </div>
        </div>
        <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            Отмена
          </button>
          <button onClick={onSave} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            {source ? 'Сохранить' : 'Добавить'}
          </button>
        </div>
      </div>
    </div>
  );
}
