import { useState } from 'react';
import { 
  Filter, 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink, 
  ChevronDown,
  X,
  Tag,
  MapPin,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Minus,
  SlidersHorizontal,
  Grid3X3,
  List,
  User,
  Building2,
  Sparkles
} from 'lucide-react';
import { mockArticles, categories, regions, mockSources } from '../data/mockData';
import { Article } from '../types';

export default function Feed() {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedSentiment, setSelectedSentiment] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<'date' | 'importance'>('date');

  const filteredArticles = articles.filter(article => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(article.category)) return false;
    if (selectedRegions.length > 0 && !selectedRegions.includes(article.region)) return false;
    if (selectedSentiment.length > 0 && !selectedSentiment.includes(article.sentiment)) return false;
    if (selectedSources.length > 0 && !selectedSources.includes(article.sourceId)) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'importance') return b.importance - a.importance;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const toggleBookmark = (id: string) => {
    setArticles(articles.map(a => a.id === id ? { ...a, isBookmarked: !a.isBookmarked } : a));
  };

  const toggleFilter = (arr: string[], setArr: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    if (arr.includes(value)) {
      setArr(arr.filter(v => v !== value));
    } else {
      setArr([...arr, value]);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedRegions([]);
    setSelectedSentiment([]);
    setSelectedSources([]);
  };

  const activeFiltersCount = selectedCategories.length + selectedRegions.length + selectedSentiment.length + selectedSources.length;

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Лента публикаций</h1>
          <p className="text-slate-500 text-sm mt-1">
            {filteredArticles.length} из {articles.length} публикаций
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:bg-slate-100'}`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:bg-slate-100'}`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                showFilters ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Фильтры
              {activeFiltersCount > 0 && (
                <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'importance')}
              className="px-3 py-2 bg-slate-100 rounded-lg text-sm text-slate-600 border-0 focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">По дате</option>
              <option value="importance">По важности</option>
            </select>
          </div>
          {activeFiltersCount > 0 && (
            <button onClick={clearFilters} className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1">
              <X className="w-3 h-3" /> Сбросить
            </button>
          )}
        </div>

        {showFilters && (
          <div className="space-y-4 pt-3 border-t border-slate-100">
            {/* Categories */}
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2 block">Категории</label>
              <div className="flex flex-wrap gap-2">
                {categories.filter(c => c !== 'Все').map(cat => (
                  <button
                    key={cat}
                    onClick={() => toggleFilter(selectedCategories, setSelectedCategories, cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedCategories.includes(cat)
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Regions */}
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2 block">Регионы</label>
              <div className="flex flex-wrap gap-2">
                {regions.filter(r => r !== 'Все').map(region => (
                  <button
                    key={region}
                    onClick={() => toggleFilter(selectedRegions, setSelectedRegions, region)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedRegions.includes(region)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            {/* Sentiment */}
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2 block">Тональность</label>
              <div className="flex gap-2">
                {[
                  { value: 'positive', label: 'Позитивная', icon: ThumbsUp, color: 'emerald' },
                  { value: 'negative', label: 'Негативная', icon: ThumbsDown, color: 'red' },
                  { value: 'neutral', label: 'Нейтральная', icon: Minus, color: 'slate' },
                ].map(s => (
                  <button
                    key={s.value}
                    onClick={() => toggleFilter(selectedSentiment, setSelectedSentiment, s.value)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedSentiment.includes(s.value)
                        ? `bg-${s.color}-600 text-white`
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <s.icon className="w-3 h-3" />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sources */}
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2 block">Источники</label>
              <div className="flex flex-wrap gap-2">
                {mockSources.map(source => (
                  <button
                    key={source.id}
                    onClick={() => toggleFilter(selectedSources, setSelectedSources, source.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedSources.includes(source.id)
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {source.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Articles */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
        {filteredArticles.map(article => (
          <ArticleCard 
            key={article.id} 
            article={article} 
            viewMode={viewMode}
            onToggleBookmark={toggleBookmark}
          />
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">Нет публикаций по выбранным фильтрам</p>
          <button onClick={clearFilters} className="text-blue-600 text-sm mt-2 hover:underline">
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
}

function ArticleCard({ article, viewMode, onToggleBookmark }: { article: Article; viewMode: 'list' | 'grid'; onToggleBookmark: (id: string) => void }) {
  const sentimentConfig = {
    positive: { color: 'bg-emerald-100 text-emerald-700', icon: ThumbsUp },
    negative: { color: 'bg-red-100 text-red-700', icon: ThumbsDown },
    neutral: { color: 'bg-slate-100 text-slate-600', icon: Minus },
  };

  const sentiment = sentimentConfig[article.sentiment];

  if (viewMode === 'grid') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all hover:border-blue-200 group">
        <div className="flex items-start justify-between mb-3">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${sentiment.color}`}>
            <sentiment.icon className="w-3 h-3" />
            {article.sentiment === 'positive' ? 'Позитив' : article.sentiment === 'negative' ? 'Негатив' : 'Нейтр.'}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">
              {article.importance}/10
            </span>
            <button onClick={() => onToggleBookmark(article.id)} className="p-1 hover:bg-slate-100 rounded">
              {article.isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-blue-600" />
              ) : (
                <Bookmark className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>
        </div>
        <h3 className="font-semibold text-slate-800 text-sm leading-snug mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-xs text-slate-500 mb-3 line-clamp-2">{article.summary}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {article.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
          <span className="font-medium text-slate-600">{article.sourceName}</span>
          <span>{new Date(article.publishedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all hover:border-blue-200 group">
      <div className="flex gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${sentiment.color}`}>
              <sentiment.icon className="w-3 h-3" />
              {article.sentiment === 'positive' ? 'Позитивная' : article.sentiment === 'negative' ? 'Негативная' : 'Нейтральная'}
            </span>
            <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">
              Важность: {article.importance}/10
            </span>
            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{article.category}</span>
          </div>
          <h3 className="font-semibold text-slate-800 leading-snug mb-1 group-hover:text-blue-700 transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-slate-500 mb-3">{article.summary}</p>
          <div className="flex items-center flex-wrap gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {article.region}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {new Date(article.publishedAt).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="flex items-center gap-1 font-medium text-slate-600">
              <Tag className="w-3 h-3" /> {article.sourceName}
            </span>
            <span className="text-xs text-slate-400">{article.readTime} мин чтения</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {article.tags.map(tag => (
              <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
            {article.entities.length > 0 && (
              <span className="flex items-center gap-0.5 text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3" /> {article.entities.length} NER
              </span>
            )}
          </div>
          {article.entities.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {article.entities.slice(0, 3).map((entity, i) => (
                <span key={i} className={`text-xs px-1.5 py-0.5 rounded border ${
                  entity.type === 'person' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                  entity.type === 'organization' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                  entity.type === 'location' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                  entity.type === 'money' ? 'bg-green-50 border-green-200 text-green-700' :
                  'bg-slate-50 border-slate-200 text-slate-600'
                }`}>
                  {entity.text}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <button onClick={() => onToggleBookmark(article.id)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            {article.isBookmarked ? (
              <BookmarkCheck className="w-5 h-5 text-blue-600" />
            ) : (
              <Bookmark className="w-5 h-5 text-slate-400" />
            )}
          </button>
          <a href={article.url} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ExternalLink className="w-5 h-5 text-slate-400" />
          </a>
        </div>
      </div>
    </div>
  );
}
