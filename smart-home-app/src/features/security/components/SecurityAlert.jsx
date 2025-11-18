import { AlertTriangle, Activity, Shield, Check, Clock } from 'lucide-react';

export const SecurityAlert = ({ alert, onResolve }) => {
  const getIcon = () => {
    switch (alert.type) {
      case 'motion': return Activity;
      case 'door': return Shield;
      case 'tampering': return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  const getSeverityColor = () => {
    switch (alert.severity) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getSeverityBadge = () => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-blue-500'
    };
    return colors[alert.severity] || 'bg-gray-500';
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return timestamp.toLocaleDateString();
  };

  const Icon = getIcon();

  return (
    <div className={`border-l-4 rounded-lg p-4 ${getSeverityColor()} ${
      alert.resolved ? 'opacity-60' : ''
    }`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${getSeverityBadge()} bg-opacity-20`}>
          <Icon className={`w-5 h-5 ${getSeverityBadge().replace('bg-', 'text-')}`} />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-gray-900">{alert.message}</h4>
              {alert.camera && (
                <p className="text-sm text-gray-600">Camera: {alert.camera}</p>
              )}
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getSeverityBadge()}`}>
              {alert.severity}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              {formatTime(alert.timestamp)}
            </div>

            {!alert.resolved ? (
              <button
                onClick={() => onResolve(alert.id)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <Check className="w-4 h-4" />
                Resolve
              </button>
            ) : (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium flex items-center gap-1">
                <Check className="w-4 h-4" />
                Resolved
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};