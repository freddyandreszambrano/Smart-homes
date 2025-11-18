// src/features/home-environment/pages/DevicesPage.jsx
import {useState} from 'react';
import {useDevices} from '../hooks/useDevices';
import {SensorCard} from '../components/SensorCard';
import {ApplianceCard} from '../components/ApplianceCard';
import {DeviceSettingsModal} from '../components/DeviceSettingsModal';
import {Activity, Filter, Search, Zap} from 'lucide-react';

export const DevicesPage = () => {
  const {
    rooms,
    selectedRoom,
    selectRoom,
    devices,
    stats,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    filterStatus,
    setFilterStatus,
  } = useDevices();

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeviceSettings = (device) => {
    setSelectedDevice(device);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDevice(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Dispositivos</h1>
        <p className="text-gray-600 mt-1">
          Controla todos tus dispositivos IoT desde un solo lugar
        </p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sensores</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalSensors}</p>
            </div>
            <Activity className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sensores Activos</p>
              <p className="text-2xl font-bold text-green-600">{stats.activeSensors}</p>
            </div>
            <Activity className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Electrodomésticos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalAppliances}</p>
            </div>
            <Zap className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Dispositivos Encendidos</p>
              <p className="text-2xl font-bold text-green-600">{stats.activeAppliances}</p>
            </div>
            <Zap className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Tabs de habitaciones */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex overflow-x-auto border-b border-gray-200">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => selectRoom(room)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                selectedRoom?.id === room.id
                  ? 'border-b-2 border-primary-600 text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {room.name}
              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-200">
                {room.sensors.length + room.appliances.length}
              </span>
            </button>
          ))}
        </div>

        {/* Filtros y búsqueda */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar dispositivos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Filtro por tipo */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Todos</option>
                <option value="sensors">Sensores</option>
                <option value="appliances">Electrodomésticos</option>
              </select>
            </div>

            {/* Filtro por estado */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos/Encendidos</option>
              <option value="inactive">Inactivos/Apagados</option>
            </select>
          </div>
        </div>

        {/* Lista de dispositivos */}
        <div className="p-6">
          {devices.length === 0 ? (
            <div className="text-center py-12">
              <Activity className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No se encontraron dispositivos</p>
              <p className="text-gray-400 text-sm mt-2">
                Intenta ajustar los filtros de búsqueda
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {devices.map((device) => (
                device.deviceType === 'sensor' ? (
                  <SensorCard
                    key={device.id}
                    sensor={device}
                    onClick={() => {}}
                  />
                ) : (
                  <ApplianceCard
                    key={device.id}
                    appliance={device}
                    onSettings={handleDeviceSettings}
                  />
                )
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de configuración */}
      <DeviceSettingsModal
        device={selectedDevice}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};