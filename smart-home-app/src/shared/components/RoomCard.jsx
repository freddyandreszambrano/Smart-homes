// src/shared/components/RoomCard.jsx
import {Activity, Lightbulb, Thermometer} from 'lucide-react';

export const RoomCard = ({room, onSelect, isSelected}) => {
    const activeDevices = room.appliances.filter(a => a.isOn).length;
    const totalDevices = room.appliances.length + room.sensors.length;

    // Buscar sensor de temperatura
    const tempSensor = room.sensors.find(s => s.type === 'temperature');

    return (
        <button
            onClick={() => onSelect(room)}
            className={`w-full text-left p-6 rounded-lg border-2 transition-all ${
                isSelected
                    ? 'border-primary-500 bg-primary-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'
            }`}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
          Piso {room.floor}
        </span>
            </div>

            <div className="space-y-3">
                {/* Temperatura */}
                {tempSensor && (
                    <div className="flex items-center text-sm text-gray-600">
                        <Thermometer className="w-4 h-4 mr-2 text-blue-500"/>
                        <span>{tempSensor.value}°C</span>
                    </div>
                )}

                {/* Dispositivos activos */}
                <div className="flex items-center text-sm text-gray-600">
                    <Lightbulb className="w-4 h-4 mr-2 text-yellow-500"/>
                    <span>{activeDevices} de {room.appliances.length} activos</span>
                </div>

                {/* Total dispositivos */}
                <div className="flex items-center text-sm text-gray-600">
                    <Activity className="w-4 h-4 mr-2 text-green-500"/>
                    <span>{totalDevices} dispositivos IoT</span>
                </div>
            </div>

            {/* Indicador de actividad */}
            {activeDevices > 0 && (
                <div className="mt-4 flex items-center">
          <span className="flex h-2 w-2 relative">
            <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
                    <span className="ml-2 text-xs text-green-600 font-medium">Activa</span>
                </div>
            )}
        </button>
    );
};