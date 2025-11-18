import { Bell, Filter, Trash2, CheckCheck } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationItem } from '../components/NotificationItem';

export const NotificationsPage = () => {
  const {
    notifications,
    filter,
    sortBy,
    unreadCount,
    setFilter,
    setSortBy,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll
  } = useNotifications();

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'unread', label: 'Unread' },
    { value: 'security', label: 'Security' },
    { value: 'energy', label: 'Energy' },
    { value: 'device', label: 'Devices' },
    { value: 'automation', label: 'Automation' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-500">
                {unreadCount > 0 ? `${unreadCount} unread messages` : 'All caught up!'}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <CheckCheck className="w-4 h-4" />
              Mark all read
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear all
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-400" />

            <div className="flex gap-2 flex-wrap flex-1">
              {filterOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === option.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="recent">Most Recent</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-12 text-center">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No notifications</h3>
            <p className="text-gray-500">You're all caught up!</p>
          </div>
        ) : (
          <div>
            {notifications.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkRead={markAsRead}
                onDelete={deleteNotification}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};