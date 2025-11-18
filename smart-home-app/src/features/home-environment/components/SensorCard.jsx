// src/features/home-environment/components/SensorCard.jsx
import {Activity, DoorOpen, Droplets, Eye, Flame, Lightbulb, Thermometer} from 'lucide-react';

const getSensorIcon = (type) => {
  const icons = {
    temperature: Thermometer,
    humidity: Droplets,
    motion: Activity,
    light: Lightbulb,
    smoke: Flame,
    door: DoorOpen,
    window: DoorOpen,
    camera: Eye,
  };
  return icons[type] || Activity;
};

const getSensorColor = (type) => {
  const colors = {
    temperature: 'blue',
    humidity: 'cyan',
    motion: 'green',
    light: 'yellow',
    smoke: 'red',
    door: 'purple',
    window: 'purple',
    camera: 'indigo',
  };
  return colors[type] || 'gray';
};

export const SensorCard = ({ sensor, onClick }) => {
  const Icon = getSensorIcon(sensor.type);
  const color = getSensorColor(sensor.type);

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    cyan: 'bg-cyan-50 text-cyan-600 border-cyan-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    gray: 'bg-gray-50 text-gray-600 border-gray-200',
  };

  const formatLastUpdate = (date) => {
    const now = new Date();
    const diff = Math.floor((now - new Date(date)) / 1000); // segundos

    if (diff < 60) return 'Hace unos segundos';
    if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} h`;
    return `Hace ${Math.floor(diff / 86400)} días`;
  };

  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-lg border-2 p-5 cursor-pointer transition-all hover:shadow-lg ${
        sensor.isActive ? colorClasses[color] : 'border-gray-200 opacity-60'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${sensor.isActive ? colorClasses[color] : 'bg-gray-100 text-gray-400'}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            sensor.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
          }`}>
            {sensor.isActive ? 'Activo' : 'Inactivo'}
          </span>
        </div>
      </div>

      {/* Nombre y tipo */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{sensor.name}</h3>
        <p className="text-sm text-gray-500 capitalize">{sensor.type}</p>
      </div>

      {/* Valor actual */}
      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">{sensor.value}</span>
          {sensor.unit && (
            <span className="ml-2 text-lg text-gray-500">{sensor.unit}</span>
          )}
        </div>
      </div>

      {/* Footer info */}
      <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-200">
        <span className="flex items-center">
          <Activity className="w-4 h-4 mr-1" />
          {sensor.protocol.toUpperCase()}
        </span>
        <span className="text-xs">{formatLastUpdate(sensor.lastUpdate)}</span>
      </div>

      {/* Indicador de estado */}
      {sensor.isActive && (
        <div className="absolute top-3 right-3">
          <span className="flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-${color}-400`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 bg-${color}-500`}></span>
          </span>
        </div>
      )}
    </div>
  );
};