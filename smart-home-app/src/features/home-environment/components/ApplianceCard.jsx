// src/features/home-environment/components/ApplianceCard.jsx
import {
    Camera,
    Lightbulb,
    Lock,
    Refrigerator,
    Settings,
    Thermometer,
    Tv,
    WashingMachine,
    Wind,
    Zap
} from 'lucide-react';
import {useSmartHome} from '../../../core/services/SmartHomeContext';

const getApplianceIcon = (type) => {
  const icons = {
    light: Lightbulb,
    thermostat: Thermometer,
    ac: Wind,
    tv: Tv,
    refrigerator: Refrigerator,
    washing_machine: WashingMachine,
    security_camera: Camera,
    door_lock: Lock,
  };
  return icons[type] || Zap;
};

const getApplianceColor = (type) => {
  const colors = {
    light: 'yellow',
    thermostat: 'orange',
    ac: 'blue',
    tv: 'purple',
    refrigerator: 'cyan',
    washing_machine: 'teal',
    security_camera: 'red',
    door_lock: 'gray',
  };
  return colors[type] || 'gray';
};

export const ApplianceCard = ({ appliance, onSettings }) => {
  const { toggleAppliance } = useSmartHome();
  const Icon = getApplianceIcon(appliance.type);
  const color = getApplianceColor(appliance.type);

  const colorClasses = {
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    cyan: 'bg-cyan-50 text-cyan-600 border-cyan-200',
    teal: 'bg-teal-50 text-teal-600 border-teal-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    gray: 'bg-gray-50 text-gray-600 border-gray-200',
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    toggleAppliance(appliance.id);
  };

  const handleSettingsClick = (e) => {
    e.stopPropagation();
    if (onSettings) onSettings(appliance);
  };

  return (
    <div
      className={`relative bg-white rounded-lg border-2 p-5 transition-all hover:shadow-lg ${
        appliance.isOn ? colorClasses[color] : 'border-gray-200'
      }`}
    >
      {/* Header con toggle */}
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${appliance.isOn ? colorClasses[color] : 'bg-gray-100 text-gray-400'}`}>
          <Icon className="w-6 h-6" />
        </div>

        <div className="flex items-center space-x-2">
          {/* Botón de configuración */}
          <button
            onClick={handleSettingsClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Configuración"
          >
            <Settings className="w-4 h-4 text-gray-500" />
          </button>

          {/* Toggle switch */}
          <button
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              appliance.isOn ? 'bg-primary-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                appliance.isOn ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Nombre y tipo */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{appliance.name}</h3>
        <p className="text-sm text-gray-500 capitalize">{appliance.type.replace('_', ' ')}</p>
      </div>

      {/* Estado */}
      <div className="mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
          appliance.isOn
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-600'
        }`}>
          {appliance.isOn ? 'Encendido' : 'Apagado'}
        </span>
      </div>

      {/* Configuraciones específicas */}
      {appliance.isOn && Object.keys(appliance.settings).length > 0 && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          {Object.entries(appliance.settings).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm mb-1 last:mb-0">
              <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
              <span className="text-gray-900 font-medium">{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer info */}
      <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-200">
        <span className="flex items-center text-gray-500">
          <Zap className="w-4 h-4 mr-1 text-yellow-500" />
          <span className={appliance.isOn ? 'font-medium text-gray-900' : 'text-gray-400'}>
            {appliance.powerConsumption}W
          </span>
        </span>
        <span className="text-gray-500">
          {appliance.protocol.toUpperCase()}
        </span>
      </div>

      {/* Indicador de encendido */}
      {appliance.isOn && (
        <div className="absolute top-3 right-3">
          <span className="flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </div>
      )}
    </div>
  );
};