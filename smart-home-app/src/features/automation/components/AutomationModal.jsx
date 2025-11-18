import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

const DAYS_OF_WEEK = [
  { id: 'mon', label: 'Lun' },
  { id: 'tue', label: 'Mar' },
  { id: 'wed', label: 'Mié' },
  { id: 'thu', label: 'Jue' },
  { id: 'fri', label: 'Vie' },
  { id: 'sát', label: 'Sáb' },
  { id: 'sun', label: 'Dom' }
];

/**
 * Modal para crear/editar reglas - Compatible con AutomationRule de types.js
 */
const AutomationModal = ({ isOpen, onClose, onSave, rule = null, appliances = [], sensors = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '⚡',
    trigger: { type: 'time', time: '08:00', days: ['mon', 'tue', 'wed', 'thu', 'fri'] },
    actions: []
  });

  useEffect(() => {
    if (rule) {
      setFormData({
        name: rule.name,
        description: rule.description || '',
        icon: rule.icon || '⚡',
        trigger: rule.trigger,
        actions: rule.actions
      });
    } else {
      setFormData({
        name: '',
        description: '',
        icon: '⚡',
        trigger: { type: 'time', time: '08:00', days: ['mon', 'tue', 'wed', 'thu', 'fri'] },
        actions: []
      });
    }
  }, [rule, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.trigger || Object.keys(formData.trigger).length === 0) {
      alert('Configura el disparador');
      return;
    }
    if (formData.actions.length === 0) {
      alert('Agrega al menos una acción');
      return;
    }
    onSave(formData);
    onClose();
  };

  const addAction = () => {
    const newAction = {
      applianceId: appliances[0]?.id || '',
      action: 'turn_on'
    };
    setFormData(prev => ({
      ...prev,
      actions: [...prev.actions, newAction]
    }));
  };

  const updateAction = (index, updates) => {
    setFormData(prev => ({
      ...prev,
      actions: prev.actions.map((a, i) => (i === index ? { ...a, ...updates } : a))
    }));
  };

  const removeAction = (index) => {
    setFormData(prev => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index)
    }));
  };

  const updateTrigger = (updates) => {
    setFormData(prev => ({
      ...prev,
      trigger: { ...prev.trigger, ...updates }
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {rule ? 'Editar Regla' : 'Nueva Regla de Automatización'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la regla
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: Buenos días"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe qué hace esta regla"
                  rows="2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icono (emoji)
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-20 px-4 py-2 border border-gray-300 rounded-lg text-center text-2xl"
                  maxLength="2"
                />
              </div>
            </div>

            {/* Trigger Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Disparador (Cuando)</h3>
              <div className="border border-gray-300 rounded-lg p-4 bg-yellow-50">
                <div className="space-y-3">
                  <select
                    value={formData.trigger.type || 'time'}
                    onChange={(e) => {
                      const type = e.target.value;
                      if (type === 'time') {
                        updateTrigger({ type, time: '08:00', days: ['mon', 'tue', 'wed', 'thu', 'fri'] });
                      } else if (type === 'sensor') {
                        updateTrigger({ type, sensorId: sensors[0]?.id || '', condition: 'no_motion', duration: 300 });
                      } else if (type === 'location') {
                        updateTrigger({ type, location: 'away' });
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="time">⏰ Hora programada</option>
                    <option value="sensor">📊 Sensor / Condición</option>
                    <option value="location">📍 Ubicación</option>
                  </select>

                  {formData.trigger.type === 'time' && (
                    <div className="space-y-3">
                      <input
                        type="time"
                        value={formData.trigger.time || '08:00'}
                        onChange={(e) => updateTrigger({ time: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <div className="flex gap-1 flex-wrap">
                        {DAYS_OF_WEEK.map(day => (
                          <button
                            key={day.id}
                            type="button"
                            onClick={() => {
                              const days = formData.trigger.days || [];
                              const newDays = days.includes(day.id)
                                ? days.filter(d => d !== day.id)
                                : [...days, day.id];
                              updateTrigger({ days: newDays });
                            }}
                            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                              formData.trigger.days?.includes(day.id)
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border border-gray-300 text-gray-700'
                            }`}
                          >
                            {day.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {formData.trigger.type === 'sensor' && (
                    <div className="space-y-3">
                      <select
                        value={formData.trigger.sensorId || ''}
                        onChange={(e) => updateTrigger({ sensorId: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="">Seleccionar sensor</option>
                        {sensors.map(sensor => (
                          <option key={sensor.id} value={sensor.id}>
                            {sensor.name} ({sensor.type})
                          </option>
                        ))}
                      </select>
                      <select
                        value={formData.trigger.condition || 'no_motion'}
                        onChange={(e) => updateTrigger({ condition: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="no_motion">Sin movimiento</option>
                        <option value="motion_detected">Movimiento detectado</option>
                        <option value="temperature_high">Temperatura alta</option>
                        <option value="temperature_low">Temperatura baja</option>
                      </select>
                      <input
                        type="number"
                        value={formData.trigger.duration || 300}
                        onChange={(e) => updateTrigger({ duration: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Duración (segundos)"
                      />
                    </div>
                  )}

                  {formData.trigger.type === 'location' && (
                    <select
                      value={formData.trigger.location || 'away'}
                      onChange={(e) => updateTrigger({ location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="away">Cuando salgas de casa</option>
                      <option value="home">Cuando llegues a casa</option>
                    </select>
                  )}
                </div>
              </div>
            </div>

            {/* Actions Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Acciones (Entonces)</h3>
                <button
                  type="button"
                  onClick={addAction}
                  className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Agregar
                </button>
              </div>

              <div className="space-y-3">
                {formData.actions.map((action, index) => (
                  <div key={index} className="border border-gray-300 rounded-lg p-4 bg-green-50">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 space-y-3">
                        <select
                          value={action.action}
                          onChange={(e) => updateAction(index, { action: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        >
                          <option value="turn_on">✅ Encender dispositivo</option>
                          <option value="turn_off">❌ Apagar dispositivo</option>
                          <option value="set_value">🎚️ Establecer valor</option>
                        </select>

                        <select
                          value={action.applianceId || ''}
                          onChange={(e) => updateAction(index, { applianceId: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="">Seleccionar dispositivo</option>
                          {appliances.map(appliance => (
                            <option key={appliance.id} value={appliance.id}>
                              {appliance.name} ({appliance.room})
                            </option>
                          ))}
                        </select>

                        {action.action === 'set_value' && (
                          <input
                            type="number"
                            value={action.value || 0}
                            onChange={(e) => updateAction(index, { value: parseFloat(e.target.value) })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="Valor"
                          />
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeAction(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {formData.actions.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No hay acciones. Agrega una para comenzar.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {rule ? 'Actualizar' : 'Crear'} Regla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AutomationModal;