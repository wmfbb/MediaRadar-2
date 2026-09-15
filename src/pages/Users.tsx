import { useState } from 'react';
import { 
  Plus, Edit2, Trash2, Shield, MoreVertical, 
  CheckCircle2, XCircle, Clock, UserPlus, Search
} from 'lucide-react';
import { mockUsers, rolePermissions } from '../data/mockData';
import { User, UserRole } from '../types';

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [showAddUser, setShowAddUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadge = (role: UserRole) => {
    const perm = rolePermissions.find(r => r.role === role);
    if (!perm) return null;
    const colorMap: Record<string, string> = {
      red: 'bg-red-100 text-red-700',
      orange: 'bg-orange-100 text-orange-700',
      blue: 'bg-blue-100 text-blue-700',
      green: 'bg-emerald-100 text-emerald-700',
      gray: 'bg-slate-100 text-slate-600',
      purple: 'bg-purple-100 text-purple-700',
    };
    return { label: perm.label, color: colorMap[perm.color] || 'bg-slate-100 text-slate-600' };
  };

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Пользователи</h1>
          <p className="text-slate-500 text-sm mt-1">Управление доступом и ролями</p>
        </div>
        <button 
          onClick={() => setShowAddUser(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          Добавить пользователя
        </button>
      </div>

      {/* Roles Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {rolePermissions.map(role => (
          <div key={role.role} className="bg-white rounded-xl border border-slate-200 p-3 text-center">
            <div className={`w-8 h-8 mx-auto rounded-lg flex items-center justify-center mb-2 ${
              role.color === 'red' ? 'bg-red-100 text-red-600' :
              role.color === 'orange' ? 'bg-orange-100 text-orange-600' :
              role.color === 'blue' ? 'bg-blue-100 text-blue-600' :
              role.color === 'green' ? 'bg-emerald-100 text-emerald-600' :
              role.color === 'purple' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-600'
            }`}>
              <Shield className="w-4 h-4" />
            </div>
            <p className="text-xs font-medium text-slate-700">{role.label}</p>
            <p className="text-lg font-bold text-slate-800 mt-0.5">
              {users.filter(u => u.role === role.role).length}
            </p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Поиск пользователей..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Пользователь</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Роль</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Статус</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Последний вход</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Права</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUsers.map(user => {
              const roleBadge = getRoleBadge(user.role);
              return (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 text-sm">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {roleBadge && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleBadge.color}`}>
                        {roleBadge.label}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      user.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {user.isActive ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {user.isActive ? 'Активен' : 'Заблокирован'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-slate-500">
                      {new Date(user.lastLogin).toLocaleString('ru-RU', { 
                        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
                      })}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-slate-400">
                      {rolePermissions.find(r => r.role === user.role)?.permissions.length || 0} прав
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => toggleUserStatus(user.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          user.isActive ? 'hover:bg-amber-100 text-amber-600' : 'hover:bg-emerald-100 text-emerald-600'
                        }`}
                      >
                        {user.isActive ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                      </button>
                      <button className="p-1.5 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-red-100 text-red-500 rounded-lg transition-colors">
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

      {/* Roles Detail */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-800 mb-4">Матрица ролей и прав</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 text-slate-500 font-medium">Право</th>
                {rolePermissions.map(r => (
                  <th key={r.role} className="text-center py-2 px-2 text-xs text-slate-500 font-medium">{r.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {['feed:view', 'feed:manage', 'sources:manage', 'analytics:view', 'analytics:all', 'reports:create', 'reports:view', 'users:manage', 'settings:manage'].map(perm => (
                <tr key={perm} className="border-b border-slate-50">
                  <td className="py-2 pr-4 text-slate-600 font-mono text-xs">{perm}</td>
                  {rolePermissions.map(r => (
                    <td key={r.role} className="text-center py-2 px-2">
                      {r.permissions.includes('all') || r.permissions.includes(perm) ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />
                      ) : (
                        <XCircle className="w-4 h-4 text-slate-200 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
