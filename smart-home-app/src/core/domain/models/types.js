// Guardar como: src/core/domain/models/types.js

/**
 * Tipos de dispositivos IoT según el artículo
 * Basado en la arquitectura SHAS (Smart Home Automation System)
 */

// ============= MÓDULO DE USUARIO =============
export const UserDeviceType = {
    MOBILE: 'mobile',
    TABLET: 'tablet',
    DESKTOP: 'desktop',
    WEARABLE: 'wearable'
};

export class UserDevice {
    constructor(id, name, type, isConnected = false) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.isConnected = isConnected;
        this.lastConnection = new Date();
    }
}

export class User {
    constructor(id, name, email, role = 'resident') {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role; // 'admin', 'resident', 'guest'
        this.devices = [];
        this.preferences = {};
    }
}

// ============= MÓDULO DE ENTORNO DEL HOGAR =============
export const SensorType = {
    TEMPERATURE: 'temperature',
    HUMIDITY: 'humidity',
    MOTION: 'motion',
    LIGHT: 'light',
    SMOKE: 'smoke',
    DOOR: 'door',
    WINDOW: 'window',
    CAMERA: 'camera'
};

export const ApplianceType = {
    LIGHT: 'light',
    THERMOSTAT: 'thermostat',
    AC: 'ac',
    TV: 'tv',
    REFRIGERATOR: 'refrigerator',
    WASHING_MACHINE: 'washing_machine',
    SECURITY_CAMERA: 'security_camera',
    DOOR_LOCK: 'door_lock'
};

export const ConnectionProtocol = {
    WIFI: 'wifi',
    BLUETOOTH: 'bluetooth',
    ZIGBEE: 'zigbee',
    ZWAVE: 'z-wave'
};

export class Sensor {
    constructor(id, name, type, room, protocol) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.room = room;
        this.protocol = protocol;
        this.isActive = true;
        this.value = 0;
        this.unit = this.getDefaultUnit();
        this.lastUpdate = new Date();
    }

    getDefaultUnit() {
        const units = {
            [SensorType.TEMPERATURE]: '°C',
            [SensorType.HUMIDITY]: '%',
            [SensorType.LIGHT]: 'lux',
            [SensorType.MOTION]: 'boolean',
            [SensorType.SMOKE]: 'ppm'
        };
        return units[this.type] || '';
    }

    updateValue(newValue) {
        this.value = newValue;
        this.lastUpdate = new Date();
    }
}

export class Appliance {
    constructor(id, name, type, room, protocol, powerConsumption = 0) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.room = room;
        this.protocol = protocol;
        this.isOn = false;
        this.powerConsumption = powerConsumption; // watts
        this.settings = {};
        this.schedule = null;
    }

    toggle() {
        this.isOn = !this.isOn;
    }

    updateSettings(newSettings) {
        this.settings = {...this.settings, ...newSettings};
    }
}

export class Room {
    constructor(id, name, floor = 1) {
        this.id = id;
        this.name = name;
        this.floor = floor;
        this.sensors = [];
        this.appliances = [];
    }

    addSensor(sensor) {
        this.sensors.push(sensor);
    }

    addAppliance(appliance) {
        this.appliances.push(appliance);
    }
}

// ============= MÓDULO DE SERVICIOS =============
export const ServiceType = {
    MONITORING: 'monitoring',
    AUTOMATION: 'automation',
    SECURITY: 'security',
    ENERGY: 'energy',
    HEALTHCARE: 'healthcare',
    ENTERTAINMENT: 'entertainment'
};

export class AutomationRule {
    constructor(id, name, trigger, actions) {
        this.id = id;
        this.name = name;
        this.trigger = trigger; // { sensorId, condition, value }
        this.actions = actions; // [{ applianceId, action, value }]
        this.isActive = true;
        this.executionCount = 0;
        this.lastExecution = null;
    }

    execute() {
        if (!this.isActive) return false;
        this.executionCount++;
        this.lastExecution = new Date();
        return true;
    }
}

export class SecurityEvent {
    constructor(id, type, severity, message, sensorId = null) {
        this.id = id;
        this.type = type; // 'intrusion', 'fire', 'flood', 'medical'
        this.severity = severity; // 'low', 'medium', 'high', 'critical'
        this.message = message;
        this.sensorId = sensorId;
        this.timestamp = new Date();
        this.resolved = false;
    }

    resolve() {
        this.resolved = true;
        this.resolvedAt = new Date();
    }
}

export class EnergyData {
    constructor(timestamp, consumption, cost = 0) {
        this.timestamp = timestamp;
        this.consumption = consumption; // kWh
        this.cost = cost;
    }
}

export class CloudService {
    constructor(id, name, type, provider) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.provider = provider; // 'AWS', 'Azure', 'Google Cloud'
        this.isActive = true;
        this.dataStored = 0; // GB
        this.apiCalls = 0;
    }
}

// ============= SISTEMA COMPLETO =============
export class SmartHomeSystem {
    constructor(homeId, name, location) {
        this.homeId = homeId;
        this.name = name;
        this.location = location;
        this.users = [];
        this.rooms = [];
        this.automationRules = [];
        this.securityEvents = [];
        this.cloudServices = [];
        this.energyHistory = [];
        this.isArmed = false;
        this.createdAt = new Date();
    }

    getTotalDevices() {
        let total = 0;
        this.rooms.forEach(room => {
            total += room.sensors.length + room.appliances.length;
        });
        return total;
    }

    getTotalEnergyConsumption() {
        let total = 0;
        this.rooms.forEach(room => {
            room.appliances.forEach(appliance => {
                if (appliance.isOn) {
                    total += appliance.powerConsumption;
                }
            });
        });
        return total / 1000; // Convert to kW
    }

    getActiveAlerts() {
        return this.securityEvents.filter(event => !event.resolved);
    }
}

// ============= DATOS INICIALES DE EJEMPLO =============
export const createMockSmartHome = () => {
    const home = new SmartHomeSystem(
        'home-001',
        'Mi Casa Inteligente',
        'Milagro, Guayas, Ecuador'
    );

    // Crear usuarios
    const user1 = new User('user-1', 'Juan Pérez', 'juan@example.com', 'admin');
    const device1 = new UserDevice('device-1', 'iPhone 14', UserDeviceType.MOBILE, true);
    user1.devices.push(device1);
    home.users.push(user1);

    // Crear habitaciones
    const livingRoom = new Room('room-1', 'Sala de Estar', 1);
    const bedroom = new Room('room-2', 'Dormitorio Principal', 2);
    const kitchen = new Room('room-3', 'Cocina', 1);

    // Agregar sensores
    const tempSensor1 = new Sensor('sensor-1', 'Sensor Temp Sala', SensorType.TEMPERATURE, livingRoom.name, ConnectionProtocol.WIFI);
    tempSensor1.updateValue(22);
    livingRoom.addSensor(tempSensor1);

    const motionSensor1 = new Sensor('sensor-2', 'Sensor Movimiento', SensorType.MOTION, livingRoom.name, ConnectionProtocol.ZIGBEE);
    livingRoom.addSensor(motionSensor1);

    const tempSensor2 = new Sensor('sensor-3', 'Sensor Temp Dormitorio', SensorType.TEMPERATURE, bedroom.name, ConnectionProtocol.WIFI);
    tempSensor2.updateValue(20);
    bedroom.addSensor(tempSensor2);

    // Agregar electrodomésticos
    const light1 = new Appliance('appliance-1', 'Luz Principal', ApplianceType.LIGHT, livingRoom.name, ConnectionProtocol.WIFI, 60);
    livingRoom.addAppliance(light1);

    const thermostat1 = new Appliance('appliance-2', 'Termostato', ApplianceType.THERMOSTAT, livingRoom.name, ConnectionProtocol.WIFI, 1500);
    thermostat1.updateSettings({targetTemp: 22, mode: 'auto'});
    livingRoom.addAppliance(thermostat1);

    const tv = new Appliance('appliance-3', 'Smart TV', ApplianceType.TV, livingRoom.name, ConnectionProtocol.WIFI, 150);
    livingRoom.addAppliance(tv);

    home.rooms.push(livingRoom, bedroom, kitchen);

    // Crear regla de automatización
    const rule1 = new AutomationRule(
        'rule-1',
        'Apagar luces al salir',
        {sensorId: 'sensor-2', condition: 'no_motion', duration: 300},
        [{applianceId: 'appliance-1', action: 'turn_off'}]
    );
    home.automationRules.push(rule1);

    // Agregar servicio en la nube
    const cloudService = new CloudService('cloud-1', 'Data Storage', ServiceType.MONITORING, 'AWS');
    home.cloudServices.push(cloudService);

    return home;
};