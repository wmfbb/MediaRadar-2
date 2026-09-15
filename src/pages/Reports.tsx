import { useState } from 'react';
import { 
  FileText, Download, FileSpreadsheet, LayoutDashboard, Globe,
  Plus, Clock, CheckCircle2, Loader2, AlertCircle, Filter,
  Calendar, BarChart3, Eye, Trash2, Share2
} from 'lucide-react';
import { mockReports } from '../data/mockData';
import { Report } from '../types';

export default function Reports() {
  const [reports] = useState(mockReports);
  const [showCreate, setShowCreate] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterFormat, setFilterFormat] = useState<string>('all');

  const filteredReports = reports.filter(r => {
    if (filterType !== 'all' && r.type !== filterType) return false;
    if (filterFormat !== 'all' && r.format !== filterFormat) return false;
    return true;
  });

  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'daily': return { label: 'Ежедневный', color: 'bg-blue-100 text-blue-700' };
      case 'weekly': return { label: 'Еженедельный', color: 'bg-purple-100 text-purple-700' };
      case 'monthly': return { label: 'Ежемесячный', color: 'bg-emerald-100 text-emerald-700' };
      case 'custom': return { label: 'Произвольный', color: 'bg-amber-100 text-amber-700' };
      case 'topic': return { label: 'Тематический', color: 'bg-pink-100 text-pink-700' };
      default: return { label: type, color: 'bg-slate-100 text-slate-600' };
    }
  };

  const getFormatIcon = (format: string) => {
    switch(format) {
      case 'pdf': return FileText;
      case 'excel': return FileSpreadsheet;
      case 'dashboard': return LayoutDashboard;
      case 'html': return Globe;
      default: return FileText;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'ready': return { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2, label: 'Готов' };
      case 'generating': return { color: 'bg-blue-100 text-blue-700', icon: Loader2, label: 'Генерация' };
      case 'draft': return { color: 'bg-slate-100 text-slate-600', icon: Clock, label: 'Черновик' };
      case 'failed': return { color: 'bg-red-100 text-red-700', icon: AlertCircle, label: 'Ошибка' };
      default: return { color: 'bg-slate-100 text-slate-600', icon: Clock, label: status };
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Отчёты</h1>
          <p className="text-slate-500 text-sm mt-1">Генерация и управление аналитическими отчётами</p>
        </div>
        <button 
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Создать отчёт
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-500">Фильтры:</span>
          </div>
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Все типы</option>
            <option value="daily">Ежедневные</option>
            <option value="weekly">Еженедельные</option>
            <option value="monthly">Ежемесячные</option>
            <option value="custom">Произвольные</option>
            <option value="topic">Тематические</option>
          </select>
          <select 
            value={filterFormat}
            onChange={(e) => setFilterFormat(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Все форматы</option>
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
            <option value="dashboard">Дашборд</option>
            <option value="html">HTML</option>
          </select>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {filteredReports.map(report => {
          const typeBadge = getTypeBadge(report.type);
          const FormatIcon = getFormatIcon(report.format);
          const status = getStatusBadge(report.status);
          const StatusIcon = status.icon;

          return (
            <div key={report.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all hover:border-blue-200">
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${
                  report.format === 'pdf' ? 'bg-red-100 text-red-600' :
                  report.format === 'excel' ? 'bg-emerald-100 text-emerald-600' :
                  report.format === 'dashboard' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  <FormatIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-slate-800">{report.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeBadge.color}`}>
                      {typeBadge.label}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                      <StatusIcon className={`w-3 h-3 ${report.status === 'generating' ? 'animate-spin' : ''}`} />
                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(report.createdAt).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span>•</span>
                    <span>{report.createdBy}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <BarChart3 className="w-3 h-3" />
                      {report.region}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {report.status === 'ready' && (
                    <>
                      <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors" title="Просмотр">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors" title="Скачать">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-purple-50 text-purple-600 rounded-lg transition-colors" title="Поделиться">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors" title="Удалить">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Report Modal */}
      {showCreate && <CreateReportModal onClose={() => setShowCreate(false)} />}
    </div>
  );
}

function CreateReportModal({ onClose }: { onClose: () => void }) {
  const [reportType, setReportType] = useState('weekly');
  const [format, setFormat] = useState('pdf');
  const [title, setTitle] = useState('');
  const [region, setRegion] = useState('Алтайский край');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">Создать отчёт</h2>
          <p className="text-sm text-slate-500 mt-1">Настройте параметры генерации отчёта</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Название</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Например: Еженедельный обзор Алтайского края"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Тип отчёта</label>
              <select 
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Ежедневный</option>
                <option value="weekly">Еженедельный</option>
                <option value="monthly">Ежемесячный</option>
                <option value="custom">Произвольный</option>
                <option value="topic">Тематический</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Формат</label>
              <select 
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel (XLSX)</option>
                <option value="dashboard">Онлайн-дашборд</option>
                <option value="html">HTML</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Регион</label>
            <select 
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Все регионы</option>
              <option>Алтайский край</option>
              <option>Новосибирская область</option>
              <option>Красноярский край</option>
              <option>Томская область</option>
              <option>Омская область</option>
              <option>Иркутская область</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Включить разделы</label>
            <div className="grid grid-cols-2 gap-2">
              {['Общая сводка', 'Тональность', 'Топ источников', 'Тренды', 'NER-анализ', 'Региональное сравнение', 'Рекомендации', 'Графики'].map(section => (
                <label key={section} className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded border-slate-300" />
                  {section}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">
            Отмена
          </button>
          <button onClick={onClose} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Сгенерировать
          </button>
        </div>
      </div>
    </div>
  );
}
