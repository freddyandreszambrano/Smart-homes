// src/features/home-environment/hooks/useDevices.js
import {useMemo, useState} from 'react';
import {useSmartHome} from '../../../core/services/SmartHomeContext';

export const useDevices = () => {
  const { smartHome, selectedRoom, selectRoom } = useSmartHome();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'sensors', 'appliances'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'inactive'

  // Obtener dispositivos de la habitación seleccionada
  const currentRoomDevices = useMemo(() => {
    if (!selectedRoom) return { sensors: [], appliances: [] };
    return {
      sensors: selectedRoom.sensors || [],
      appliances: selectedRoom.appliances || []
    };
  }, [selectedRoom]);

  // Filtrar dispositivos
  const filteredDevices = useMemo(() => {
    let devices = [];

    // Agregar sensores
    if (filterType === 'all' || filterType === 'sensors') {
      devices = [...devices, ...currentRoomDevices.sensors.map(s => ({ ...s, deviceType: 'sensor' }))];
    }

    // Agregar electrodomésticos
    if (filterType === 'all' || filterType === 'appliances') {
      devices = [...devices, ...currentRoomDevices.appliances.map(a => ({ ...a, deviceType: 'appliance' }))];
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      devices = devices.filter(device =>
        device.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por estado
    if (filterStatus === 'active') {
      devices = devices.filter(device => {
        if (device.deviceType === 'sensor') return device.isActive;
        if (device.deviceType === 'appliance') return device.isOn;
        return false;
      });
    } else if (filterStatus === 'inactive') {
      devices = devices.filter(device => {
        if (device.deviceType === 'sensor') return !device.isActive;
        if (device.deviceType === 'appliance') return !device.isOn;
        return false;
      });
    }

    return devices;
  }, [currentRoomDevices, searchTerm, filterType, filterStatus]);

  // Estadísticas
  const stats = useMemo(() => ({
    totalSensors: currentRoomDevices.sensors.length,
    totalAppliances: currentRoomDevices.appliances.length,
    activeSensors: currentRoomDevices.sensors.filter(s => s.isActive).length,
    activeAppliances: currentRoomDevices.appliances.filter(a => a.isOn).length,
  }), [currentRoomDevices]);

  return {
    rooms: smartHome.rooms,
    selectedRoom,
    selectRoom,
    devices: filteredDevices,
    stats,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    filterStatus,
    setFilterStatus,
  };
};