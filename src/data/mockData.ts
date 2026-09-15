import { Source, Article, NamedEntity, User, Tariff, AIDiscoveryTask, AIDiscoveryResult, Report, Integration, Notification, RolePermissions } from '../types';

export const mockSources: Source[] = [
  { id: 's1', name: 'РегионМедиа', url: 'https://regionmedia.ru', type: 'rss', region: 'Новосибирская область', category: 'Новости', isActive: true, lastParsed: '2026-01-15T10:30:00Z', parseInterval: 30, articlesCount: 1247, status: 'active', jsRendering: false, priority: 'high', aiDiscovered: false, trustScore: 92 },
  { id: 's2', name: 'Вечерний Курск', url: 'https://vecherka-kursk.ru', type: 'website', region: 'Курская область', category: 'Общество', isActive: true, lastParsed: '2026-01-15T09:15:00Z', parseInterval: 60, articlesCount: 893, status: 'active', jsRendering: true, priority: 'medium', aiDiscovered: true, trustScore: 78 },
  { id: 's3', name: 'ТомскИнфо', url: 'https://tomskinfo.ru', type: 'rss', region: 'Томская область', category: 'Экономика', isActive: true, lastParsed: '2026-01-15T11:00:00Z', parseInterval: 15, articlesCount: 2156, status: 'active', jsRendering: false, priority: 'high', aiDiscovered: false, trustScore: 88 },
  { id: 's4', name: 'Красноярск Сегодня', url: 'https://kras-segodnya.ru', type: 'website', region: 'Красноярский край', category: 'Политика', isActive: false, lastParsed: '2026-01-14T18:00:00Z', parseInterval: 120, articlesCount: 567, status: 'error', jsRendering: true, priority: 'medium', aiDiscovered: false, trustScore: 65 },
  { id: 's5', name: 'Омск Пресс', url: 'https://t.me/omskpress', type: 'telegram', region: 'Омская область', category: 'Происшествия', isActive: true, lastParsed: '2026-01-15T11:30:00Z', parseInterval: 10, articlesCount: 3421, status: 'active', jsRendering: false, priority: 'high', aiDiscovered: true, trustScore: 95 },
  { id: 's6', name: 'Алтай Вести', url: 'https://altai-vesti.ru', type: 'api', region: 'Алтайский край', category: 'Культура', isActive: true, lastParsed: '2026-01-15T08:45:00Z', parseInterval: 45, articlesCount: 734, status: 'active', jsRendering: false, priority: 'medium', aiDiscovered: true, trustScore: 81 },
  { id: 's7', name: 'Иркутск Онлайн', url: 'https://irkutsk-online.ru', type: 'rss', region: 'Иркутская область', category: 'Спорт', isActive: true, lastParsed: '2026-01-15T10:00:00Z', parseInterval: 30, articlesCount: 1890, status: 'active', jsRendering: false, priority: 'medium', aiDiscovered: false, trustScore: 84 },
  { id: 's8', name: 'Забайкалье Инфо', url: 'https://zabinfo.ru', type: 'website', region: 'Забайкальский край', category: 'Образование', isActive: true, lastParsed: '2026-01-15T07:30:00Z', parseInterval: 60, articlesCount: 456, status: 'pending', jsRendering: true, priority: 'low', aiDiscovered: true, trustScore: 72 },
  { id: 's9', name: 'АгроАлтай', url: 'https://agro-altai.ru', type: 'website', region: 'Алтайский край', category: 'Сельское хозяйство', isActive: true, lastParsed: '2026-01-15T10:45:00Z', parseInterval: 30, articlesCount: 312, status: 'active', jsRendering: true, priority: 'high', aiDiscovered: true, trustScore: 89 },
  { id: 's10', name: 'Барнаул24', url: 'https://barnaul24.ru', type: 'website', region: 'Алтайский край', category: 'Городская среда', isActive: true, lastParsed: '2026-01-15T11:15:00Z', parseInterval: 20, articlesCount: 1567, status: 'active', jsRendering: true, priority: 'high', aiDiscovered: true, trustScore: 91 },
];

const sampleEntities: NamedEntity[] = [
  { text: 'Александр Цыбульский', type: 'person', confidence: 0.95, count: 3 },
  { text: 'Правительство РФ', type: 'organization', confidence: 0.92, count: 5 },
  { text: 'Барнаул', type: 'location', confidence: 0.98, count: 8 },
  { text: '2.3 млрд рублей', type: 'money', confidence: 0.88, count: 2 },
  { text: 'Министерство сельского хозяйства', type: 'organization', confidence: 0.91, count: 4 },
];

export const mockArticles: Article[] = [
  { id: 'a1', title: 'В Новосибирске запустили новый технопарк для IT-стартапов', summary: 'Губернатор объявил об открытии технопарка площадью 15 000 кв.м, который станет крупнейшим в Сибири.', content: '', sourceId: 's1', sourceName: 'РегионМедиа', url: '#', publishedAt: '2026-01-15T10:00:00Z', parsedAt: '2026-01-15T10:05:00Z', category: 'Экономика', region: 'Новосибирская область', tags: ['технологии', 'стартапы', 'инвестиции'], sentiment: 'positive', sentimentScore: 0.82, importance: 9, isBookmarked: true, entities: sampleEntities.slice(0, 3), language: 'ru', wordCount: 450, readTime: 2 },
  { id: 'a2', title: 'Реконструкция моста через Иртыш завершится к маю', summary: 'Работы идут с опережением графика. Движение планируется открыть на месяц раньше срока.', content: '', sourceId: 's5', sourceName: 'Омск Пресс', url: '#', publishedAt: '2026-01-15T09:30:00Z', parsedAt: '2026-01-15T09:35:00Z', category: 'Инфраструктура', region: 'Омская область', tags: ['транспорт', 'инфраструктура', 'строительство'], sentiment: 'positive', sentimentScore: 0.65, importance: 7, isBookmarked: false, entities: sampleEntities.slice(1, 4), language: 'ru', wordCount: 320, readTime: 2 },
  { id: 'a3', title: 'Курская область получит дополнительное финансирование на медицину', summary: 'Федеральный бюджет выделит 2.3 млрд рублей на модернизацию медицинских учреждений.', content: '', sourceId: 's2', sourceName: 'Вечерний Курск', url: '#', publishedAt: '2026-01-15T08:45:00Z', parsedAt: '2026-01-15T09:00:00Z', category: 'Здравоохранение', region: 'Курская область', tags: ['медицина', 'бюджет', 'финансирование'], sentiment: 'positive', sentimentScore: 0.74, importance: 8, isBookmarked: true, entities: sampleEntities.slice(0, 2), language: 'ru', wordCount: 280, readTime: 1 },
  { id: 'a4', title: 'Томские учёные разработали новый метод очистки воды', summary: 'Инновационная технология позволяет снизить содержание тяжёлых металлов на 98%.', content: '', sourceId: 's3', sourceName: 'ТомскИнфо', url: '#', publishedAt: '2026-01-15T07:20:00Z', parsedAt: '2026-01-15T07:25:00Z', category: 'Наука', region: 'Томская область', tags: ['наука', 'экология', 'инновации'], sentiment: 'positive', sentimentScore: 0.88, importance: 8, isBookmarked: false, entities: sampleEntities.slice(2, 4), language: 'ru', wordCount: 520, readTime: 3 },
  { id: 'a5', title: 'Жалобы на качество дорог в Красноярске выросли на 40%', summary: 'Жители города массово обращаются в администрацию с жалобами на состояние дорожного покрытия.', content: '', sourceId: 's4', sourceName: 'Красноярск Сегодня', url: '#', publishedAt: '2026-01-14T16:00:00Z', parsedAt: '2026-01-14T16:30:00Z', category: 'Общество', region: 'Красноярский край', tags: ['дороги', 'жалобы', 'городская среда'], sentiment: 'negative', sentimentScore: -0.62, importance: 6, isBookmarked: false, entities: sampleEntities.slice(0, 1), language: 'ru', wordCount: 380, readTime: 2 },
  { id: 'a6', title: 'Алтайский край стал лидером по развитию агротуризма', summary: 'Более 200 фермерских хозяйств приняли туристов в прошлом году.', content: '', sourceId: 's6', sourceName: 'Алтай Вести', url: '#', publishedAt: '2026-01-14T14:30:00Z', parsedAt: '2026-01-14T14:45:00Z', category: 'Туризм', region: 'Алтайский край', tags: ['туризм', 'сельское хозяйство', 'развитие'], sentiment: 'positive', sentimentScore: 0.71, importance: 7, isBookmarked: false, entities: sampleEntities.slice(2, 5), language: 'ru', wordCount: 410, readTime: 2 },
  { id: 'a7', title: 'Забайкальские школы получат новое оборудование для STEM-классов', summary: 'Программа модернизации охватит 150 школ в регионе.', content: '', sourceId: 's8', sourceName: 'Забайкалье Инфо', url: '#', publishedAt: '2026-01-14T12:00:00Z', parsedAt: '2026-01-14T12:15:00Z', category: 'Образование', region: 'Забайкальский край', tags: ['образование', 'технологии', 'школы'], sentiment: 'positive', sentimentScore: 0.58, importance: 6, isBookmarked: false, entities: sampleEntities.slice(0, 2), language: 'ru', wordCount: 290, readTime: 2 },
  { id: 'a8', title: 'Иркутская область нарастила экспорт древесины на 15%', summary: 'Основной рост обеспечили поставки в страны Азиатско-Тихоокеанского региона.', content: '', sourceId: 's7', sourceName: 'Иркутск Онлайн', url: '#', publishedAt: '2026-01-14T10:30:00Z', parsedAt: '2026-01-14T10:45:00Z', category: 'Экономика', region: 'Иркутская область', tags: ['экспорт', 'древесина', 'экономика'], sentiment: 'neutral', sentimentScore: 0.12, importance: 7, isBookmarked: true, entities: sampleEntities.slice(1, 3), language: 'ru', wordCount: 350, readTime: 2 },
  { id: 'a9', title: 'Алтайские аграрии собрали рекордный урожай зерновых', summary: 'Валовой сбор зерновых в Алтайском крае превысил 4 млн тонн, что на 12% выше показателя прошлого года.', content: '', sourceId: 's9', sourceName: 'АгроАлтай', url: '#', publishedAt: '2026-01-14T09:00:00Z', parsedAt: '2026-01-14T09:10:00Z', category: 'Сельское хозяйство', region: 'Алтайский край', tags: ['агро', 'зерновые', 'урожай'], sentiment: 'positive', sentimentScore: 0.91, importance: 9, isBookmarked: true, entities: sampleEntities.slice(2, 5), language: 'ru', wordCount: 680, readTime: 4 },
  { id: 'a10', title: 'В Барнауле открылся новый логистический центр', summary: 'Инвестиции в проект составили 1.8 млрд рублей. Создано 450 рабочих мест.', content: '', sourceId: 's10', sourceName: 'Барнаул24', url: '#', publishedAt: '2026-01-13T15:00:00Z', parsedAt: '2026-01-13T15:05:00Z', category: 'Экономика', region: 'Алтайский край', tags: ['логистика', 'инвестиции', 'Барнаул'], sentiment: 'positive', sentimentScore: 0.76, importance: 8, isBookmarked: false, entities: sampleEntities.slice(0, 4), language: 'ru', wordCount: 420, readTime: 2 },
  { id: 'a11', title: 'В Томске зафиксирован рекордный уровень безработицы за 5 лет', summary: 'Уровень безработицы достиг 6.2%, что связано с оптимизацией в IT-секторе.', content: '', sourceId: 's3', sourceName: 'ТомскИнфо', url: '#', publishedAt: '2026-01-13T15:00:00Z', parsedAt: '2026-01-13T15:05:00Z', category: 'Экономика', region: 'Томская область', tags: ['безработица', 'рынок труда', 'IT'], sentiment: 'negative', sentimentScore: -0.78, importance: 9, isBookmarked: false, entities: sampleEntities.slice(0, 2), language: 'ru', wordCount: 510, readTime: 3 },
  { id: 'a12', title: 'Экологическая ситуация на Байкале требует внимания', summary: 'Учёные фиксируют изменения в экосистеме озера, связанные с климатическими факторами.', content: '', sourceId: 's7', sourceName: 'Иркутск Онлайн', url: '#', publishedAt: '2026-01-13T09:30:00Z', parsedAt: '2026-01-13T09:45:00Z', category: 'Экология', region: 'Иркутская область', tags: ['экология', 'Байкал', 'климат'], sentiment: 'negative', sentimentScore: -0.55, importance: 9, isBookmarked: true, entities: sampleEntities.slice(2, 4), language: 'ru', wordCount: 620, readTime: 3 },
];

export const mockUsers: User[] = [
  { id: 'u1', name: 'Дмитрий Волков', email: 'volkov@mediaradar.ru', role: 'superadmin', avatar: 'ДВ', lastLogin: '2026-01-15T11:30:00Z', isActive: true },
  { id: 'u2', name: 'Анна Петрова', email: 'petrova@mediaradar.ru', role: 'admin', avatar: 'АП', lastLogin: '2026-01-15T10:00:00Z', isActive: true },
  { id: 'u3', name: 'Игорь Сидоров', email: 'sidorov@client.ru', role: 'analyst', avatar: 'ИС', lastLogin: '2026-01-15T09:15:00Z', isActive: true },
  { id: 'u4', name: 'Мария Козлова', email: 'kozlova@client.ru', role: 'editor', avatar: 'МК', lastLogin: '2026-01-14T18:00:00Z', isActive: true },
  { id: 'u5', name: 'Сергей Иванов', email: 'ivanov@gov.ru', role: 'client', avatar: 'СИ', lastLogin: '2026-01-15T08:30:00Z', isActive: true },
  { id: 'u6', name: 'Елена Новикова', email: 'novikova@media.ru', role: 'viewer', avatar: 'ЕН', lastLogin: '2026-01-13T14:00:00Z', isActive: false },
];

export const rolePermissions: RolePermissions[] = [
  { role: 'superadmin', label: 'Супер-администратор', description: 'Полный доступ ко всем функциям системы', permissions: ['all'], color: 'red' },
  { role: 'admin', label: 'Администратор', description: 'Управление источниками, пользователями, настройками', permissions: ['sources:manage', 'users:manage', 'settings:manage', 'reports:all', 'feed:all', 'analytics:all'], color: 'orange' },
  { role: 'analyst', label: 'Аналитик', description: 'Доступ к аналитике, отчётам и ленте', permissions: ['feed:all', 'analytics:all', 'reports:create', 'reports:view'], color: 'blue' },
  { role: 'editor', label: 'Редактор', description: 'Управление контентом, модерация публикаций', permissions: ['feed:manage', 'reports:create', 'reports:view', 'analytics:view'], color: 'green' },
  { role: 'viewer', label: 'Наблюдатель', description: 'Только просмотр ленты и отчётов', permissions: ['feed:view', 'reports:view', 'analytics:view'], color: 'gray' },
  { role: 'client', label: 'Клиент', description: 'Доступ к своему региону и отчётам', permissions: ['feed:view:own_region', 'reports:view:own', 'analytics:view:own_region'], color: 'purple' },
];

export const mockTariffs: Tariff[] = [
  {
    id: 't1', name: 'Старт', price: 4900, period: 'month',
    features: ['До 10 источников', 'До 5 000 статей/мес', '1 пользователь', 'Базовая аналитика', 'Email-уведомления', 'Экспорт в PDF'],
    limits: { sources: 10, articles: 5000, users: 1, reports: 10, storage: '1 GB', apiCalls: 1000 },
    yookassaId: 'plan_start',
  },
  {
    id: 't2', name: 'Профи', price: 14900, period: 'month', isPopular: true,
    features: ['До 50 источников', 'До 50 000 статей/мес', '5 пользователей', 'Полная аналитика + NER', 'Telegram-бот', 'Все форматы отчётов', 'AI-поиск источников', 'Приоритетная поддержка'],
    limits: { sources: 50, articles: 50000, users: 5, reports: 100, storage: '10 GB', apiCalls: 10000 },
    yookassaId: 'plan_pro',
  },
  {
    id: 't3', name: 'Корпоративный', price: 49900, period: 'month',
    features: ['Безлимит источников', 'Безлимит статей', 'Безлимит пользователей', 'Полная аналитика + NER + AI', 'Выделенный сервер', 'API доступ', 'White-label', 'SLA 99.9%', 'Персональный менеджер'],
    limits: { sources: -1, articles: -1, users: -1, reports: -1, storage: '100 GB', apiCalls: -1 },
    yookassaId: 'plan_enterprise',
  },
];

export const mockAIDiscoveryTasks: AIDiscoveryTask[] = [
  {
    id: 'ai1', status: 'completed', region: 'Алтайский край', focus: ['Сельское хозяйство', 'Пищевая промышленность', 'Государственные ресурсы'],
    progress: 100, foundSources: 24, startedAt: '2026-01-14T10:00:00Z', completedAt: '2026-01-14T10:45:00Z',
    results: [
      { url: 'https://altai-republic.ru', name: 'Официальный портал Алтайского края', type: 'website', relevance: 98, category: 'Государственные', trustScore: 99, description: 'Официальный сайт правительства Алтайского края', added: true },
      { url: 'https://agro-altai.ru', name: 'АгроАлтай', type: 'website', relevance: 95, category: 'Сельское хозяйство', trustScore: 89, description: 'Аграрный портал региона', added: true },
      { url: 'https://barnaul24.ru', name: 'Барнаул24', type: 'website', relevance: 92, category: 'Городская среда', trustScore: 91, description: 'Городской новостной портал', added: true },
      { url: 'https://t.me/altai_agro', name: 'Агро Алтая (Telegram)', type: 'telegram', relevance: 88, category: 'Сельское хозяйство', trustScore: 85, description: 'Telegram-канал об агросекторе', added: false },
      { url: 'https://altai-stat.ru', name: 'Алтайстат', type: 'api', relevance: 94, category: 'Статистика', trustScore: 97, description: 'Территориальный орган статистики', added: false },
      { url: 'https://biysk-news.ru', name: 'Бийск Новости', type: 'website', relevance: 76, category: 'Городская среда', trustScore: 72, description: 'Городской портал Бийска', added: false },
    ],
  },
  {
    id: 'ai2', status: 'running', region: 'Новосибирская область', focus: ['IT-индустрия', 'Наука', 'Образование'],
    progress: 67, foundSources: 18, startedAt: '2026-01-15T11:00:00Z',
  },
  {
    id: 'ai3', status: 'pending', region: 'Красноярский край', focus: ['Топливный сектор', 'Промышленность', 'Экология'],
    progress: 0, foundSources: 0, startedAt: '2026-01-15T12:00:00Z',
  },
];

export const mockReports: Report[] = [
  { id: 'r1', title: 'Еженедельный обзор Алтайского края', type: 'weekly', format: 'pdf', createdAt: '2026-01-15T08:00:00Z', createdBy: 'Анна Петрова', status: 'ready', region: 'Алтайский край', downloadUrl: '#' },
  { id: 'r2', title: 'Анализ агросектора — Январь 2026', type: 'monthly', format: 'excel', createdAt: '2026-01-14T16:00:00Z', createdBy: 'Игорь Сидоров', status: 'ready', region: 'Алтайский край', downloadUrl: '#' },
  { id: 'r3', title: 'Мониторинг гос. ресурсов СФО', type: 'custom', format: 'dashboard', createdAt: '2026-01-15T10:00:00Z', createdBy: 'Дмитрий Волков', status: 'generating', region: 'Сибирский ФО' },
  { id: 'r4', title: 'Дайджест за 15 января', type: 'daily', format: 'html', createdAt: '2026-01-15T07:00:00Z', createdBy: 'Система', status: 'ready', region: 'Все регионы', downloadUrl: '#' },
  { id: 'r5', title: 'Топик-отчёт: Топливный сектор', type: 'topic', format: 'pdf', createdAt: '2026-01-13T14:00:00Z', createdBy: 'Мария Козлова', status: 'ready', region: 'Красноярский край', downloadUrl: '#' },
];

export const mockIntegrations: Integration[] = [
  { id: 'i1', name: 'ЮKassa', type: 'payment', status: 'connected', config: { shopId: '123456', secretKey: '***' }, lastSync: '2026-01-15T11:00:00Z' },
  { id: 'i2', name: 'Telegram Bot', type: 'messaging', status: 'connected', config: { botToken: '***', chatId: '-1001234567' }, lastSync: '2026-01-15T11:30:00Z' },
  { id: 'i3', name: 'Playwright (JS рендер)', type: 'ai', status: 'connected', config: { workers: 4, timeout: 30000 }, lastSync: '2026-01-15T11:25:00Z' },
  { id: 'i4', name: 'NLP Engine (NAT)', type: 'ai', status: 'connected', config: { model: 'ru-bert-base', nerEnabled: true, sentimentEnabled: true }, lastSync: '2026-01-15T11:30:00Z' },
  { id: 'i5', name: 'Elasticsearch', type: 'storage', status: 'connected', config: { host: 'localhost:9200', index: 'media_articles' }, lastSync: '2026-01-15T11:30:00Z' },
  { id: 'i6', name: 'PostgreSQL', type: 'storage', status: 'connected', config: { host: 'localhost:5432', db: 'mediaradar' }, lastSync: '2026-01-15T11:30:00Z' },
  { id: 'i7', name: 'Redis', type: 'storage', status: 'connected', config: { host: 'localhost:6379' }, lastSync: '2026-01-15T11:30:00Z' },
];

export const mockNotifications: Notification[] = [
  { id: 'n1', type: 'success', title: 'Парсинг завершён', message: 'АгроАлтай: 12 новых статей', createdAt: '2026-01-15T11:30:00Z', isRead: false, channel: 'in-app' },
  { id: 'n2', type: 'warning', title: 'Ошибка парсинга', message: 'Красноярск Сегодня: timeout', createdAt: '2026-01-15T10:45:00Z', isRead: false, channel: 'telegram' },
  { id: 'n3', type: 'info', title: 'AI Discovery завершён', message: 'Алтайский край: найдено 24 источника', createdAt: '2026-01-14T10:45:00Z', isRead: true, channel: 'in-app' },
  { id: 'n4', type: 'error', title: 'Превышен лимит API', message: 'ЮKassa: 950/1000 запросов', createdAt: '2026-01-14T09:00:00Z', isRead: true, channel: 'email' },
];

export const mockAnalyticsData = [
  { date: '2026-01-09', articlesCount: 45, sourcesActive: 7, mentions: 123 },
  { date: '2026-01-10', articlesCount: 62, sourcesActive: 8, mentions: 187 },
  { date: '2026-01-11', articlesCount: 38, sourcesActive: 7, mentions: 95 },
  { date: '2026-01-12', articlesCount: 71, sourcesActive: 8, mentions: 210 },
  { date: '2026-01-13', articlesCount: 55, sourcesActive: 8, mentions: 165 },
  { date: '2026-01-14', articlesCount: 83, sourcesActive: 8, mentions: 245 },
  { date: '2026-01-15', articlesCount: 67, sourcesActive: 7, mentions: 198 },
];

export const mockSentimentData = [
  { name: 'Новосибирская обл.', positive: 45, negative: 12, neutral: 23 },
  { name: 'Курская обл.', positive: 32, negative: 8, neutral: 15 },
  { name: 'Томская обл.', positive: 28, negative: 18, neutral: 19 },
  { name: 'Красноярский край', positive: 20, negative: 25, neutral: 17 },
  { name: 'Омская обл.', positive: 38, negative: 10, neutral: 20 },
  { name: 'Алтайский край', positive: 42, negative: 7, neutral: 12 },
  { name: 'Иркутская обл.', positive: 30, negative: 15, neutral: 22 },
  { name: 'Забайкальский край', positive: 18, negative: 11, neutral: 14 },
];

export const mockCategoryData = [
  { name: 'Экономика', value: 342, color: '#3b82f6' },
  { name: 'Общество', value: 289, color: '#10b981' },
  { name: 'Политика', value: 198, color: '#f59e0b' },
  { name: 'Наука', value: 156, color: '#8b5cf6' },
  { name: 'Культура', value: 134, color: '#ec4899' },
  { name: 'Спорт', value: 112, color: '#06b6d4' },
  { name: 'Экология', value: 89, color: '#84cc16' },
  { name: 'Образование', value: 78, color: '#f97316' },
];

export const categories = ['Все', 'Новости', 'Экономика', 'Общество', 'Политика', 'Наука', 'Культура', 'Спорт', 'Экология', 'Образование', 'Инфраструктура', 'Здравоохранение', 'Туризм', 'Происшествия', 'Сельское хозяйство', 'Городская среда'];
export const regions = ['Все', 'Новосибирская область', 'Курская область', 'Томская область', 'Красноярский край', 'Омская область', 'Алтайский край', 'Иркутская область', 'Забайкальский край', 'Сибирский ФО'];
