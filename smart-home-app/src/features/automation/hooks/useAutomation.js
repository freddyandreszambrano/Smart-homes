import { useState, useCallback } from 'react';
import { AutomationRule } from '../../../core/domain/models/types';

/**
 * Hook personalizado para gestionar las reglas de automatización
 * Compatible con el modelo AutomationRule del types.js
 */
export const useAutomation = () => {
  const [rules, setRules] = useState([
    // Regla 1: Buenos días
    {
      ...new AutomationRule(
        'rule-buenos-dias',
        'Buenos días',
        { type: 'time', time: '07:00', days: ['mon', 'tue', 'wed', 'thu', 'fri'] },
        [
          { applianceId: 'appliance-1', action: 'turn_on' },
          { applianceId: 'appliance-2', action: 'set_value', value: 22 }
        ]
      ),
      description: 'Enciende luces y ajusta temperatura por la mañana',
      icon: '☀️'
    },
    // Regla 2: Modo ausente
    {
      ...new AutomationRule(
        'rule-modo-ausente',
        'Modo ausente',
        { type: 'location', location: 'away' },
        [
          { applianceId: 'appliance-1', action: 'turn_off' },
          { applianceId: 'appliance-3', action: 'turn_off' }
        ]
      ),
      description: 'Apaga dispositivos cuando sales de casa',
      icon: '🚪'
    },
    // Regla 3: Seguridad nocturna
    {
      ...new AutomationRule(
        'rule-seguridad-nocturna',
        'Seguridad nocturna',
        { type: 'time', time: '23:00', days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] },
        [
          { applianceId: 'appliance-1', action: 'turn_off' },
          { type: 'notification', message: 'Sistema de seguridad activado' }
        ]
      ),
      description: 'Activa cámaras y apaga luces por la noche',
      icon: '🌙',
      isActive: false
    },
    // Regla 4: Apagar luces sin movimiento
    {
      ...new AutomationRule(
        'rule-apagar-sin-movimiento',
        'Apagar luces sin movimiento',
        { sensorId: 'sensor-2', condition: 'no_motion', duration: 300 },
        [{ applianceId: 'appliance-1', action: 'turn_off' }]
      ),
      description: 'Apaga luces si no detecta movimiento por 5 minutos',
      icon: '💡'
    }
  ]);

  const [selectedRule, setSelectedRule] = useState(null);

  /**
   * Alternar estado de activación de una regla
   */
  const toggleRule = useCallback((ruleId) => {
    setRules(prevRules =>
      prevRules.map(rule =>
        rule.id === ruleId
          ? { ...rule, enabled: !rule.enabled }
          : rule
      )
    );
  }, []);

  /**
   * Crear nueva regla de automatización
   */
  const createRule = useCallback((newRule) => {
    const rule = {
      ...newRule,
      id: Date.now().toString(),
      createdAt: new Date(),
      lastTriggered: null,
      triggerCount: 0,
      enabled: true
    };
    setRules(prevRules => [...prevRules, rule]);
    return rule;
  }, []);

  /**
   * Actualizar regla existente
   */
  const updateRule = useCallback((ruleId, updates) => {
    setRules(prevRules =>
      prevRules.map(rule =>
        rule.id === ruleId
          ? { ...rule, ...updates }
          : rule
      )
    );
  }, []);

  /**
   * Eliminar regla
   */
  const deleteRule = useCallback((ruleId) => {
    setRules(prevRules => prevRules.filter(rule => rule.id !== ruleId));
    if (selectedRule?.id === ruleId) {
      setSelectedRule(null);
    }
  }, [selectedRule]);

  /**
   * Duplicar regla
   */
  const duplicateRule = useCallback((ruleId) => {
    const ruleToDuplicate = rules.find(rule => rule.id === ruleId);
    if (ruleToDuplicate) {
      const newRule = {
        ...ruleToDuplicate,
        id: Date.now().toString(),
        name: `${ruleToDuplicate.name} (copia)`,
        createdAt: new Date(),
        lastTriggered: null,
        triggerCount: 0
      };
      setRules(prevRules => [...prevRules, newRule]);
    }
  }, [rules]);

  /**
   * Obtener estadísticas de automatización
   */
  const getStats = useCallback(() => {
    const total = rules.length;
    const active = rules.filter(r => r.enabled).length;
    const inactive = total - active;
    const totalTriggers = rules.reduce((sum, r) => sum + r.triggerCount, 0);

    return {
      total,
      active,
      inactive,
      totalTriggers
    };
  }, [rules]);

  return {
    rules,
    selectedRule,
    setSelectedRule,
    toggleRule,
    createRule,
    updateRule,
    deleteRule,
    duplicateRule,
    getStats
  };
};