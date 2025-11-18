// src/features/home-environment/components/DeviceSettingsModal.jsx
import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { useSmartHome } from '../../../core/services/SmartHomeContext';

export const DeviceSettingsModal = ({ device, isOpen, onClose }) => {
  const { updateApplianceSettings } = useSmartHome();
  const [settings, setSettings] = useState({});

  useEffect(() => {
    if (device) {
      setSettings(device.settings || {});
    }
  }, [device]);

  if (!isOpen || !device) return null;

  const handleSave = () => {
    updateApplianceSettings(device.id, settings);
    onClose();
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Configuraciones según el tipo de dispositivo
  const renderSettings = () => {
    switch (device.type) {
      case 'thermostat':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperatura Objetivo (°C)
              </label>
              <input
                type="number"
                value={settings.targetTemp || 22}
                onChange={(e) => handleChange('targetTemp', parseInt(e.target.value))}
                className="input-field"
                min="16"
                max="30"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modo
              </label>
              <select
                value={settings.mode || 'auto'}
                onChange={(e) => handleChange('mode', e.target.value)}
                className="input-field"
              >
                <option value="auto">Automático</option>
                <option value="cool">Enfriar</option>
                <option value="heat">Calentar</option>
                <option value="fan">Ventilador</option>
              </select>
            </div>
          </>
        );

      case 'light':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brillo (%)
              </label>
              <input
                type="range"
                value={settings.brightness || 100}
                onChange={(e) => handleChange('brightness', parseInt(e.target.value))}
                className="w-full"
                min="0"
                max="100"
              />
              <span className="text-sm text-gray-500">{settings.brightness || 100}%</span>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <select
                value={settings.color || 'white'}
                onChange={(e) => handleChange('color', e.target.value)}
                className="input-field"
              >
                <option value="white">Blanco</option>
                <option value="warm">Cálido</option>
                <option value="cool">Frío</option>
                <option value="rgb">RGB</option>
              </select>
            </div>
          </>
        );

      case 'tv':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Volumen
              </label>
              <input
                type="range"
                value={settings.volume || 50}
                onChange={(e) => handleChange('volume', parseInt(e.target.value))}
                className="w-full"
                min="0"
                max="100"
              />
              <span className="text-sm text-gray-500">{settings.volume || 50}%</span>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Canal
              </label>
              <input
                type="number"
                value={settings.channel || 1}
                onChange={(e) => handleChange('channel', parseInt(e.target.value))}
                className="input-field"
                min="1"
              />
            </div>
          </>
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            <p>No hay configuraciones disponibles para este dispositivo</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Configurar {device.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Info del dispositivo */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Tipo:</span>
              <span className="text-sm font-medium text-gray-900 capitalize">
                {device.type.replace('_', ' ')}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Habitación:</span>
              <span className="text-sm font-medium text-gray-900">{device.room}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Protocolo:</span>
              <span className="text-sm font-medium text-gray-900">{device.protocol.toUpperCase()}</span>
            </div>
          </div>

          {/* Configuraciones específicas */}
          {renderSettings()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="btn-primary flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};