import { useState } from 'react';
import { 
  Clock, 
  Bell, 
  Palette, 
  Shield, 
  Database, 
  Globe,
  Save,
  RefreshCw,
  Trash2,
  Plus,
  ToggleLeft,
  ToggleRight,
  Zap,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general');
  const [saved, setSaved] = useState(false);

  const sections = [
    { id: 'general', label: 'Общие', icon: Globe },
    { id: 'parsing', label: 'Парсинг', icon: RefreshCw },
    { id: 'notifications', label: 'Уведомления', icon: Bell },
    { id: 'schedule', label: 'Расписание', icon: Clock },
    { id: 'storage', label: 'Хранилище', icon: Database },
    { id: 'security', label: 'Безопасность', icon: Shield },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Настройки</h1>
          <p className="text-slate-500 text-sm mt-1">Конфигурация системы и параметров парсинга</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Сохранено!' : 'Сохранить'}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-56 flex-shrink-0">
          <nav className="space-y-1">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <section.icon className="w-4 h-4" />
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeSection === 'general' && <GeneralSettings />}
          {activeSection === 'parsing' && <ParsingSettings />}
          {activeSection === 'notifications' && <NotificationSettings />}
          {activeSection === 'schedule' && <ScheduleSettings />}
          {activeSection === 'storage' && <StorageSettings />}
          {activeSection === 'security' && <SecuritySettings />}
        </div>
      </div>
    </div>
  );
}

function GeneralSettings() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
      <h3 className="text-lg font-semibold text-slate-800">Общие настройки</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Название проекта</label>
          <input 
            type="text" 
            defaultValue="МедиаРадар"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Язык интерфейса</label>
          <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Русский</option>
            <option>English</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Часовой пояс</label>
          <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>UTC+7 (Красноярск)</option>
            <option>UTC+6 (Омск)</option>
            <option>UTC+5 (Екатеринбург)</option>
            <option>UTC+3 (Москва)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Регион по умолчанию</label>
          <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Все регионы</option>
            <option>Новосибирская область</option>
            <option>Красноярский край</option>
            <option>Томская область</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function ParsingSettings() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
      <h3 className="text-lg font-semibold text-slate-800">Настройки парсинга</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-slate-700">Автопарсинг</p>
            <p className="text-xs text-slate-500">Автоматический сбор данных по расписанию</p>
          </div>
          <ToggleRight className="w-8 h-8 text-blue-600" />
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-slate-700">Дедупликация</p>
            <p className="text-xs text-slate-500">Удалять дубликаты статей из разных источников</p>
          </div>
          <ToggleRight className="w-8 h-8 text-blue-600" />
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-slate-700">Автоматическая категоризация</p>
            <p className="text-xs text-slate-500">Определять категорию публикации на основе контента</p>
          </div>
          <ToggleRight className="w-8 h-8 text-blue-600" />
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-slate-700">Анализ тональности</p>
            <p className="text-xs text-slate-500">Определять эмоциональную окраску публикации</p>
          </div>
          <ToggleRight className="w-8 h-8 text-blue-600" />
        </div>
        
        <div className="pt-4 border-t border-slate-200">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">User-Agent</label>
            <input 
              type="text" 
              defaultValue="MediaRadar/1.0 (Regional Analytics Bot)"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Задержка между запросами (мс)</label>
          <input 
            type="number" 
            defaultValue="1000"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-slate-400 mt-1">Минимальный интервал между запросами к одному источнику</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Таймаут соединения (сек)</label>
          <input 
            type="number" 
            defaultValue="30"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Максимум重试 (повторных попыток)</label>
          <input 
            type="number" 
            defaultValue="3"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
      <h3 className="text-lg font-semibold text-slate-800">Уведомления</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-slate-700">Ошибки парсинга</p>
            <p className="text-xs text-slate-500">Уведомлять при сбоях в работе парсеров</p>
          </div>
          <ToggleRight className="w-8 h-8 text-blue-600" />
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-slate-700">Новые публикации</p>
            <p className="text-xs text-slate-500">Уведомлять о новых статьях из отслеживаемых источников</p>
          </div>
          <ToggleLeft className="w-8 h-8 text-slate-400" />
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-slate-700">Ежедневный дайджест</p>
            <p className="text-xs text-slate-500">Сводка по ключевым событиям за день</p>
          </div>
          <ToggleRight className="w-8 h-8 text-blue-600" />
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-slate-700">Резкий рост упоминаний</p>
            <p className="text-xs text-slate-500">Алерт при аномальном росте публикаций по теме</p>
          </div>
          <ToggleRight className="w-8 h-8 text-blue-600" />
        </div>
        
        <div className="pt-4 border-t border-slate-200">
          <label className="block text-sm font-medium text-slate-700 mb-1">Email для уведомлений</label>
          <input 
            type="email" 
            defaultValue="admin@mediaradar.ru"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Telegram Bot Token</label>
          <input 
            type="text" 
            placeholder="Вставьте токен бота"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
        </div>
      </div>
    </div>
  );
}

function ScheduleSettings() {
  const schedules = [
    { id: 1, name: 'Утренний обход', cron: '0 7 * * *', sources: 8, active: true },
    { id: 2, name: 'Высокочастотный', cron: '*/15 * * * *', sources: 3, active: true },
    { id: 3, name: 'Вечерний дайджест', cron: '0 18 * * *', sources: 8, active: true },
    { id: 4, name: 'Ночной (RSS)', cron: '0 2 * * *', sources: 5, active: false },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Расписание парсинга</h3>
        <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Новое задание
        </button>
      </div>

      <div className="space-y-3">
        {schedules.map(schedule => (
          <div key={schedule.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-200 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                schedule.active ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
              }`}>
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-slate-800">{schedule.name}</p>
                <p className="text-xs text-slate-400 font-mono">{schedule.cron}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">{schedule.sources} источников</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                schedule.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {schedule.active ? 'Активно' : 'Выкл'}
              </span>
              <button className="p-1.5 hover:bg-slate-100 rounded-lg">
                <RefreshCw className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">Формат Cron</p>
            <p className="text-xs text-amber-600 mt-1">
              Используйте стандартный cron-формат: минута час день месяц день_недели. 
              Пример: <code className="bg-amber-100 px-1 rounded">*/30 * * * *</code> — каждые 30 минут
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StorageSettings() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
      <h3 className="text-lg font-semibold text-slate-800">Хранилище данных</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-500">Использовано</p>
          <p className="text-2xl font-bold text-slate-800">2.4 GB</p>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '48%' }}></div>
          </div>
          <p className="text-xs text-slate-400 mt-1">из 5 GB</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-500">Записей в БД</p>
          <p className="text-2xl font-bold text-slate-800">11,464</p>
          <p className="text-xs text-slate-400 mt-2">Последняя оптимизация: 2 дня назад</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Хранение статей (дней)</label>
          <input 
            type="number" 
            defaultValue="365"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-slate-400 mt-1">Старше указанного срока будут архивированы</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Тип хранилища</label>
          <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>PostgreSQL</option>
            <option>MongoDB</option>
            <option>SQLite (локально)</option>
          </select>
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-slate-700">Автоархивация</p>
            <p className="text-xs text-slate-500">Автоматически архивировать старые записи</p>
          </div>
          <ToggleRight className="w-8 h-8 text-blue-600" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors">
          <Trash2 className="w-4 h-4" />
          Очистить кеш
        </button>
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
      <h3 className="text-lg font-semibold text-slate-800">Безопасность</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">API ключ</label>
          <div className="flex gap-2">
            <input 
              type="password" 
              defaultValue="sk-xxxxxxxxxxxxxxxxxxxx"
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
            <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
              Копировать
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-slate-700">Двухфакторная аутентификация</p>
            <p className="text-xs text-slate-500">Дополнительная защита аккаунта</p>
          </div>
          <ToggleLeft className="w-8 h-8 text-slate-400" />
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-slate-700">Логирование действий</p>
            <p className="text-xs text-slate-500">Записывать все действия пользователей</p>
          </div>
          <ToggleRight className="w-8 h-8 text-blue-600" />
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-slate-700">Rate Limiting</p>
            <p className="text-xs text-slate-500">Ограничение частоты запросов к API</p>
          </div>
          <ToggleRight className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Максимум запросов в минуту</label>
          <input 
            type="number" 
            defaultValue="100"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
