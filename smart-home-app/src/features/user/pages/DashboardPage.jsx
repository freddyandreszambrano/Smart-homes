// src/features/user/pages/DashboardPage.jsx
import {useMemo} from 'react';
import {useSmartHome} from '../../../core/services/SmartHomeContext';
import {StatCard} from '../../../shared/components/StatCard';
import {EnergyChart} from '../../../shared/components/EnergyChart';
import {DeviceItem} from '../../../shared/components/DeviceItem';
import {RoomCard} from '../../../shared/components/RoomCard';
import {AlertTriangle, Home, Timer, TrendingUp, Zap} from 'lucide-react';

export const DashboardPage = () => {
    const {smartHome, selectedRoom, selectRoom, toggleAppliance, getStats} = useSmartHome();
    const stats = getStats();

    // Generar datos de energía de ejemplo (últimas 24 horas)
    const energyData = useMemo(() => {
        const data = [];
        const now = new Date();
        for (let i = 23; i >= 0; i--) {
            const hour = new Date(now - i * 60 * 60 * 1000);
            const timeStr = hour.getHours().toString().padStart(2, '0') + ':00';
            // Simular consumo variable durante el día
            const baseConsumption = 0.5;
            const variation = Math.sin(i / 4) * 0.3 + Math.random() * 0.2;
            data.push({
                time: timeStr,
                consumption: parseFloat((baseConsumption + variation).toFixed(2))
            });
        }
        return data;
    }, []);

    // Obtener todos los dispositivos activos
    const activeDevices = useMemo(() => {
        const devices = [];
        smartHome.rooms.forEach(room => {
            room.appliances.forEach(appliance => {
                if (appliance.isOn) {
                    devices.push(appliance);
                }
            });
        });
        return devices;
    }, [smartHome]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">
                    Bienvenido a tu sistema Smart Home
                </p>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Dispositivos"
                    value={stats.totalDevices}
                    icon={Home}
                    color="blue"
                    trend={{value: 12, isPositive: true}}
                />
                <StatCard
                    title="Consumo Actual"
                    value={stats.energyConsumption.toFixed(2)}
                    unit="kW"
                    icon={Zap}
                    color="yellow"
                    trend={{value: 8, isPositive: false}}
                />
                <StatCard
                    title="Alertas Activas"
                    value={stats.activeAlerts}
                    icon={AlertTriangle}
                    color={stats.activeAlerts > 0 ? 'red' : 'green'}
                />
                <StatCard
                    title="Reglas Activas"
                    value={stats.activeRules}
                    icon={Timer}
                    color="purple"
                />
            </div>

            {/* Gráfico de Energía */}
            <EnergyChart data={energyData}/>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Habitaciones */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Home className="w-5 h-5 mr-2"/>
                        Habitaciones
                    </h2>
                    <div className="space-y-3">
                        {smartHome.rooms.map(room => (
                            <RoomCard
                                key={room.id}
                                room={room}
                                onSelect={selectRoom}
                                isSelected={selectedRoom?.id === room.id}
                            />
                        ))}
                    </div>
                </div>

                {/* Dispositivos Activos */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2"/>
                        Dispositivos Activos
                    </h2>

                    {activeDevices.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <Zap className="w-12 h-12 mx-auto mb-3 opacity-50"/>
                            <p>No hay dispositivos activos</p>
                        </div>
                    ) : (
                        <div className="space-y-3 max-h-[400px] overflow-y-auto">
                            {activeDevices.map(device => (
                                <DeviceItem
                                    key={device.id}
                                    device={device}
                                    onToggle={toggleAppliance}
                                />
                            ))}
                        </div>
                    )}

                    {/* Resumen de consumo */}
                    {activeDevices.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Consumo total activo:</span>
                                <span className="font-semibold text-gray-900">
                  {activeDevices.reduce((sum, d) => sum + d.powerConsumption, 0)}W
                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Información del sistema */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg shadow-md p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Sistema de Smart Home</h3>
                        <p className="text-primary-100">
                            Basado en la arquitectura SHAS (Smart Home Automation System)
                        </p>
                        <p className="text-sm text-primary-200 mt-2">
                            {stats.connectedUsers} usuario(s) conectado(s) · {stats.totalRooms} habitaciones
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold">{stats.totalDevices}</div>
                        <div className="text-primary-100 text-sm">Dispositivos IoT</div>
                    </div>
                </div>
            </div>
        </div>
    );
};