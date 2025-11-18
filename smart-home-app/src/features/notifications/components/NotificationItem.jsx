import { Shield, Zap, Smartphone, Play, X, Clock } from 'lucide-react';

export const NotificationItem = ({ notification, onMarkRead, onDelete }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'security': return Shield;
      case 'energy': return Zap;
      case 'device': return Smartphone;
      case 'automation': return Play;
      default: return Clock;
    }
  };

  const getColor = () => {
    switch (notification.priority) {
      case 'high': return 'text-red-500 bg-red-50';
      case 'medium': return 'text-yellow-500 bg-yellow-50';
      case 'low': return 'text-blue-500 bg-blue-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const Icon = getIcon();
  const colorClass = getColor();

  return (
    <div
      className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
        !notification.read ? 'bg-blue-50/30' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{notification.title}</h3>
            <button
              onClick={() => onDelete(notification.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-2">{notification.message}</p>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{formatTime(notification.timestamp)}</span>
            <span className="px-2 py-1 bg-gray-100 rounded-full capitalize">
              {notification.type}
            </span>
            {!notification.read && (
              <button
                onClick={() => onMarkRead(notification.id)}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Mark as read
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};