import React from 'react';
import { Power, Edit, Copy, Trash2, Clock, Zap } from 'lucide-react';

/**
 * Componente para mostrar una tarjeta de regla de automatización
 */
const AutomationRuleCard = ({
  rule,
  onToggle,
  onEdit,
  onDuplicate,
  onDelete
}) => {
  const formatDate = (date) => {
    if (!date) return 'Nunca';
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTriggerSummary = () => {
    const trigger = rule.trigger;

    // Trigger de tipo tiempo
    if (trigger.type === 'time') {
      return `⏰ A las ${trigger.time}`;
    }

    // Trigger de sensor
    if (trigger.sensorId) {
      if (trigger.condition === 'no_motion') {
        return `🚶 Sin movimiento por ${trigger.duration}s`;
      }
      return `📊 Sensor: ${trigger.condition}`;
    }

    // Trigger de ubicación
    if (trigger.type === 'location') {
      return `📍 Cuando ${trigger.location === 'away' ? 'salgas' : 'llegues'}`;
    }

    return 'Disparador personalizado';
  };

  const getActionSummary = () => {
    const count = rule.actions.length;
    return count === 1 ? '1 acción' : `${count} acciones`;
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 border-2 transition-all ${
      rule.enabled ? 'border-blue-200' : 'border-gray-200'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="text-3xl">{rule.icon || '⚡'}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{rule.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{rule.description}</p>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={() => onToggle(rule.id)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            rule.enabled ? 'bg-blue-600' : 'bg-gray-300'
          }`}
          aria-label={rule.enabled ? 'Desactivar regla' : 'Activar regla'}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              rule.enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Trigger and Actions Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span>{getTriggerSummary()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Power className="w-4 h-4 text-green-500" />
          <span>{getActionSummary()}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>Última vez: {formatDate(rule.lastTriggered)}</span>
        </div>
        <div>
          <span>Ejecutada {rule.triggerCount} veces</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t">
        <button
          onClick={() => onEdit(rule)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
          Editar
        </button>
        <button
          onClick={() => onDuplicate(rule.id)}
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Copy className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(rule.id)}
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AutomationRuleCard;