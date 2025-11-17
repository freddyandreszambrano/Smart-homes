// src/shared/components/Layout.jsx
import { Home, Zap, Settings, Shield, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSmartHome } from '../../core/services/SmartHomeContext';

const navigation = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Dispositivos', path: '/devices', icon: Zap },
  { name: 'Automatización', path: '/automation', icon: Settings },
  { name: 'Seguridad', path: '/security', icon: Shield },
];

export const Layout = ({ children }) => {
  const location = useLocation();
  const { notifications, smartHome } = useSmartHome();
  const unreadCount = notifications.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Home className="w-8 h-8 text-primary-600" />
              <h1 className="ml-3 text-xl font-bold text-gray-900">
                {smartHome.name}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/notifications" className="relative">
                <Bell className="w-6 h-6 text-gray-600 hover:text-primary-600 transition-colors" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Link>
              <div className="text-sm text-gray-600">
                {smartHome.location}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm p-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};