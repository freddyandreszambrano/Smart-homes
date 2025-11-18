// src/core/services/SmartHomeContext.jsx
import {createContext, useContext, useEffect, useState} from 'react';
import {createMockSmartHome} from '../domain/models/types';

export const SmartHomeContext = createContext(null);

export const useSmartHome = () => {
    const context = useContext(SmartHomeContext);
    if (!context) {
        throw new Error('useSmartHome debe ser usado dentro de SmartHomeProvider');
    }
    return context;
};

export const SmartHomeProvider = ({children}) => {
    const [smartHome, setSmartHome] = useState(() => createMockSmartHome());
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [notifications, setNotifications] = useState([]);

    // Inicializar la primera habitación como seleccionada
    useEffect(() => {
        if (smartHome.rooms.length > 0 && !selectedRoom) {
            setSelectedRoom(smartHome.rooms[0]);
        }
    }, [smartHome, selectedRoom]);

    // Funciones para manejar dispositivos
    const toggleAppliance = (applianceId) => {
        setSmartHome(prevHome => {
            const newHome = {...prevHome};
            newHome.rooms = newHome.rooms.map(room => ({
                ...room,
                appliances: room.appliances.map(appliance => {
                    if (appliance.id === applianceId) {
                        appliance.toggle();
                        addNotification({
                            type: 'success',
                            message: `${appliance.name} ${appliance.isOn ? 'encendido' : 'apagado'}`,
                            timestamp: new Date()
                        });
                    }
                    return appliance;
                })
            }));
            return newHome;
        });
    };

    const updateApplianceSettings = (applianceId, settings) => {
        setSmartHome(prevHome => {
            const newHome = {...prevHome};
            newHome.rooms = newHome.rooms.map(room => ({
                ...room,
                appliances: room.appliances.map(appliance => {
                    if (appliance.id === applianceId) {
                        appliance.updateSettings(settings);
                    }
                    return appliance;
                })
            }));
            return newHome;
        });
    };

    const updateSensorValue = (sensorId, value) => {
        setSmartHome(prevHome => {
            const newHome = {...prevHome};
            newHome.rooms = newHome.rooms.map(room => ({
                ...room,
                sensors: room.sensors.map(sensor => {
                    if (sensor.id === sensorId) {
                        sensor.updateValue(value);
                    }
                    return sensor;
                })
            }));
            return newHome;
        });
    };

    // Funciones para notificaciones
    const addNotification = (notification) => {
        const newNotification = {
            id: Date.now(),
            ...notification
        };
        setNotifications(prev => [newNotification, ...prev].slice(0, 10));
    };

    const clearNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const clearAllNotifications = () => {
        setNotifications([]);
    };

    // Funciones para habitaciones
    const selectRoom = (room) => {
        setSelectedRoom(room);
    };

    // Funciones para reglas de automatización
    const addAutomationRule = (rule) => {
        setSmartHome(prevHome => ({
            ...prevHome,
            automationRules: [...prevHome.automationRules, rule]
        }));
        addNotification({
            type: 'info',
            message: `Regla "${rule.name}" creada exitosamente`,
            timestamp: new Date()
        });
    };

    const toggleAutomationRule = (ruleId) => {
        setSmartHome(prevHome => ({
            ...prevHome,
            automationRules: prevHome.automationRules.map(rule => {
                if (rule.id === ruleId) {
                    rule.isActive = !rule.isActive;
                }
                return rule;
            })
        }));
    };

    const deleteAutomationRule = (ruleId) => {
        setSmartHome(prevHome => ({
            ...prevHome,
            automationRules: prevHome.automationRules.filter(rule => rule.id !== ruleId)
        }));
        addNotification({
            type: 'warning',
            message: 'Regla de automatización eliminada',
            timestamp: new Date()
        });
    };

    // Funciones para seguridad
    const toggleSecuritySystem = () => {
        setSmartHome(prevHome => ({
            ...prevHome,
            isArmed: !prevHome.isArmed
        }));
        addNotification({
            type: smartHome.isArmed ? 'success' : 'warning',
            message: `Sistema de seguridad ${smartHome.isArmed ? 'desarmado' : 'armado'}`,
            timestamp: new Date()
        });
    };

    const addSecurityEvent = (event) => {
        setSmartHome(prevHome => ({
            ...prevHome,
            securityEvents: [event, ...prevHome.securityEvents]
        }));
        addNotification({
            type: 'danger',
            message: `Alerta de seguridad: ${event.message}`,
            timestamp: new Date()
        });
    };

    const resolveSecurityEvent = (eventId) => {
        setSmartHome(prevHome => ({
            ...prevHome,
            securityEvents: prevHome.securityEvents.map(event => {
                if (event.id === eventId) {
                    event.resolve();
                }
                return event;
            })
        }));
    };

    // Obtener estadísticas
    const getStats = () => {
        return {
            totalDevices: smartHome.getTotalDevices(),
            energyConsumption: smartHome.getTotalEnergyConsumption(),
            activeAlerts: smartHome.getActiveAlerts().length,
            activeRules: smartHome.automationRules.filter(r => r.isActive).length,
            totalRooms: smartHome.rooms.length,
            connectedUsers: smartHome.users.filter(u =>
                u.devices.some(d => d.isConnected)
            ).length
        };
    };

    const value = {
        smartHome,
        selectedRoom,
        notifications,
        // Funciones de dispositivos
        toggleAppliance,
        updateApplianceSettings,
        updateSensorValue,
        // Funciones de habitaciones
        selectRoom,
        // Funciones de notificaciones
        addNotification,
        clearNotification,
        clearAllNotifications,
        // Funciones de automatización
        addAutomationRule,
        toggleAutomationRule,
        deleteAutomationRule,
        // Funciones de seguridad
        toggleSecuritySystem,
        addSecurityEvent,
        resolveSecurityEvent,
        // Estadísticas
        getStats
    };

    return (
        <SmartHomeContext.Provider value={value}>
            {children}
        </SmartHomeContext.Provider>
    );
};