import { useState } from 'react';
import { Check, Zap, Crown, Building2, CreditCard, Shield, ArrowRight, Star } from 'lucide-react';
import { mockTariffs } from '../data/mockData';

export default function Tariffs() {
  const [period, setPeriod] = useState<'month' | 'year'>('month');
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null);

  const icons = [Zap, Crown, Building2];

  return (
    <div className="p-6 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800">Тарифные планы</h1>
        <p className="text-slate-500 mt-2">Выберите подходящий план для вашего региона и задач</p>
        
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className={`text-sm font-medium ${period === 'month' ? 'text-slate-800' : 'text-slate-400'}`}>Помесячно</span>
          <button
            onClick={() => setPeriod(period === 'month' ? 'year' : 'month')}
            className="relative w-12 h-6 bg-blue-600 rounded-full transition-colors"
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${period === 'year' ? 'translate-x-7' : 'translate-x-1'}`}></div>
          </button>
          <span className={`text-sm font-medium ${period === 'year' ? 'text-slate-800' : 'text-slate-400'}`}>
            Годовой <span className="text-emerald-600 font-bold">-20%</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {mockTariffs.map((tariff, i) => {
          const Icon = icons[i];
          const price = period === 'year' ? Math.round(tariff.price * 0.8) : tariff.price;
          
          return (
            <div 
              key={tariff.id}
              className={`relative bg-white rounded-2xl border-2 p-6 transition-all hover:shadow-xl ${
                tariff.isPopular ? 'border-blue-500 shadow-lg shadow-blue-100' : 'border-slate-200 hover:border-blue-200'
              }`}
            >
              {tariff.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" /> Популярный
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 ${
                  i === 0 ? 'bg-blue-100 text-blue-600' :
                  i === 1 ? 'bg-purple-100 text-purple-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{tariff.name}</h3>
                <div className="mt-3">
                  <span className="text-4xl font-bold text-slate-800">{price.toLocaleString()}</span>
                  <span className="text-slate-500 ml-1">₽/{period === 'month' ? 'мес' : 'год'}</span>
                </div>
                {period === 'year' && (
                  <p className="text-xs text-emerald-600 mt-1">Экономия {(tariff.price * 12 - price * 12).toLocaleString()} ₽/год</p>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {tariff.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedTariff(tariff.id)}
                className={`w-full py-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                  tariff.isPopular
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {selectedTariff === tariff.id ? 'Выбрано' : 'Выбрать план'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Payment & Security */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <CreditCard className="w-5 h-5 text-blue-500" />
              <span>Оплата через <strong className="text-slate-700">ЮKassa</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Shield className="w-5 h-5 text-emerald-500" />
              <span>Безопасное шифрование SSL</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Check className="w-5 h-5 text-purple-500" />
              <span>Соответствие 152-ФЗ</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              Принимаем банковские карты (Visa, MasterCard, МИР), СБП, электронные кошельки. 
              Для юридических лиц — оплата по счёту с НДС.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedTariff && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Оформление подписки</h3>
            <p className="text-sm text-slate-500 mb-4">
              Вы выбрали тариф «{mockTariffs.find(t => t.id === selectedTariff)?.name}»
            </p>
            <div className="space-y-3 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Организация (опционально)</label>
                <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="ООО «Название»" />
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Тариф</span>
                <span className="font-medium">{mockTariffs.find(t => t.id === selectedTariff)?.name}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-slate-500">Период</span>
                <span className="font-medium">{period === 'month' ? 'Ежемесячно' : 'Ежегодно'}</span>
              </div>
              <div className="flex justify-between text-sm mt-2 pt-2 border-t border-slate-200">
                <span className="font-medium">Итого</span>
                <span className="font-bold text-lg">{(period === 'year' ? Math.round((mockTariffs.find(t => t.id === selectedTariff)?.price || 0) * 0.8) : (mockTariffs.find(t => t.id === selectedTariff)?.price || 0)).toLocaleString()} ₽</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setSelectedTariff(null)} className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
                Отмена
              </button>
              <button className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
                <CreditCard className="w-4 h-4" />
                Оплатить через ЮKassa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
