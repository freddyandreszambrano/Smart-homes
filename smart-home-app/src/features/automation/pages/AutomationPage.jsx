import React, { useState, useContext } from 'react';
import { Plus, Zap, TrendingUp, Power, AlertCircle } from 'lucide-react';
import { SmartHomeContext } from '../../../core/services/SmartHomeContext';
import { useAutomation } from '../hooks/useAutomation';
import AutomationRuleCard from '../components/AutomationRuleCard';
import AutomationModal from '../components/AutomationModal';
import {StatCard} from '../../../shared/components/StatCard';

/**
 * Página principal de Automatización
 * Permite gestionar todas las reglas de automatización del hogar inteligente
 */
const AutomationPage = () => {
  const { devices } = useContext(SmartHomeContext);
  const {
    rules,
    selectedRule,
    setSelectedRule,
    toggleRule,
    createRule,
    updateRule,
    deleteRule,
    duplicateRule,
    getStats
  } = useAutomation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // all, active, inactive

  const stats = getStats();

  // Obtener appliances y sensors desde el mock data
  // En una app real, estos vendrían del contexto o API
  const appliances = [
    { id: 'appliance-1', name: 'Luz Principal', room: 'Sala de Estar' },
    { id: 'appliance-2', name: 'Termostato', room: 'Sala de Estar' },
    { id: 'appliance-3', name: 'Smart TV', room: 'Sala de Estar' }
  ];

  const sensors = [
    { id: 'sensor-1', name: 'Sensor Temp Sala', type: 'temperature' },
    { id: 'sensor-2', name: 'Sensor Movimiento', type: 'motion' },
    { id: 'sensor-3', name: 'Sensor Temp Dormitorio', type: 'temperature' }
  ];

  const handleCreateNew = () => {
    setSelectedRule(null);
    setIsModalOpen(true);
  };

  const handleEdit = (rule) => {
    setSelectedRule(rule);
    setIsModalOpen(true);
  };

  const handleSave = (formData) => {
    if (selectedRule) {
      updateRule(selectedRule.id, formData);
    } else {
      createRule(formData);
    }
  };

  const handleDelete = (ruleId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta regla?')) {
      deleteRule(ruleId);
    }
  };

  const filteredRules = rules.filter(rule => {
    if (filter === 'active') return rule.enabled;
    if (filter === 'inactive') return !rule.enabled;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Automatización</h1>
              <p className="text-blue-100">
                Configura reglas inteligentes para automatizar tu hogar
              </p>
            </div>
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl hover:bg-blue-50 transition-colors shadow-lg font-semibold"
            >
              <Plus className="w-5 h-5" />
              Nueva Regla
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-8 -mt-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Total de Reglas"
            value={stats.total}
            icon={Zap}
            color="purple"
          />
          <StatCard
            title="Reglas Activas"
            value={stats.active}
            icon={Power}
            color="green"
          />
          <StatCard
            title="Reglas Inactivas"
            value={stats.inactive}
            icon={AlertCircle}
            color="gray"
          />
          <StatCard
            title="Total Ejecuciones"
            value={stats.totalTriggers}
            icon={TrendingUp}
            color="blue"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-8 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Filtrar:</span>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todas ({stats.total})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'active'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Activas ({stats.active})
            </button>
            <button
              onClick={() => setFilter('inactive')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'inactive'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Inactivas ({stats.inactive})
            </button>
          </div>
        </div>
      </div>

      {/* Rules List */}
      <div className="max-w-7xl mx-auto px-8 pb-8">
        {filteredRules.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filter === 'all'
                ? 'No hay reglas de automatización'
                : `No hay reglas ${filter === 'active' ? 'activas' : 'inactivas'}`
              }
            </h3>
            <p className="text-gray-500 mb-6">
              Crea tu primera regla para automatizar tu hogar inteligente
            </p>
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold"
            >
              <Plus className="w-5 h-5" />
              Crear Primera Regla
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRules.map(rule => (
              <AutomationRuleCard
                key={rule.id}
                rule={rule}
                onToggle={toggleRule}
                onEdit={handleEdit}
                onDuplicate={duplicateRule}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="max-w-7xl mx-auto px-8 pb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 rounded-lg p-3">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Consejos para crear automatizaciones efectivas
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Usa nombres descriptivos para identificar fácilmente tus reglas</li>
                <li>• Combina múltiples acciones para crear rutinas complejas</li>
                <li>• Prueba tus reglas en diferentes horarios y situaciones</li>
                <li>• Revisa regularmente las estadísticas de ejecución</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AutomationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRule(null);
        }}
        onSave={handleSave}
        rule={selectedRule}
        devices={devices}
      />
    </div>
  );
};

export default AutomationPage;