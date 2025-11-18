import { useState } from 'react';

export const useSecurity = () => {
  const [systemStatus, setSystemStatus] = useState({
    armed: false,
    mode: 'home',
    lastArmed: null,
    alarmTriggered: false
  });

  const [cameras, setCameras] = useState([
    {
      id: 1,
      name: 'Front Door',
      location: 'Entrance',
      status: 'active',
      recording: true,
      lastMotion: new Date(Date.now() - 5 * 60000),
      thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
    },
    {
      id: 2,
      name: 'Backyard',
      location: 'Garden',
      status: 'active',
      recording: true,
      lastMotion: new Date(Date.now() - 45 * 60000),
      thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400'
    },
    {
      id: 3,
      name: 'Garage',
      location: 'Garage',
      status: 'inactive',
      recording: false,
      lastMotion: new Date(Date.now() - 2 * 3600000),
      thumbnail: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=400'
    },
    {
      id: 4,
      name: 'Living Room',
      location: 'Interior',
      status: 'active',
      recording: false,
      lastMotion: new Date(Date.now() - 15 * 60000),
      thumbnail: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400'
    }
  ]);

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'motion',
      severity: 'high',
      message: 'Motion detected at front door',
      timestamp: new Date(Date.now() - 5 * 60000),
      camera: 'Front Door',
      resolved: false
    },
    {
      id: 2,
      type: 'door',
      severity: 'medium',
      message: 'Back door opened while armed',
      timestamp: new Date(Date.now() - 2 * 3600000),
      camera: null,
      resolved: true
    },
    {
      id: 3,
      type: 'tampering',
      severity: 'high',
      message: 'Camera connection lost - Garage',
      timestamp: new Date(Date.now() - 4 * 3600000),
      camera: 'Garage',
      resolved: false
    }
  ]);

  const [sensors, setSensors] = useState([
    { id: 1, name: 'Front Door', type: 'door', status: 'closed', battery: 95 },
    { id: 2, name: 'Back Door', type: 'door', status: 'closed', battery: 87 },
    { id: 3, name: 'Living Room Window', type: 'window', status: 'closed', battery: 92 },
    { id: 4, name: 'Bedroom Window', type: 'window', status: 'open', battery: 78 },
    { id: 5, name: 'Motion Sensor - Hall', type: 'motion', status: 'active', battery: 65 },
    { id: 6, name: 'Smoke Detector', type: 'smoke', status: 'normal', battery: 100 }
  ]);

  const toggleArmed = () => {
    setSystemStatus(prev => ({
      ...prev,
      armed: !prev.armed,
      lastArmed: !prev.armed ? new Date() : prev.lastArmed
    }));
  };

  const setMode = (mode) => {
    setSystemStatus(prev => ({ ...prev, mode }));
  };

  const toggleCameraRecording = (id) => {
    setCameras(prev =>
      prev.map(cam =>
        cam.id === id ? { ...cam, recording: !cam.recording } : cam
      )
    );
  };

  const resolveAlert = (id) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, resolved: true } : alert
      )
    );
  };

  const getActiveAlerts = () => alerts.filter(a => !a.resolved);

  const getCriticalSensors = () => sensors.filter(s =>
    s.status === 'open' || s.battery < 20
  );

  return {
    systemStatus,
    cameras,
    alerts,
    sensors,
    toggleArmed,
    setMode,
    toggleCameraRecording,
    resolveAlert,
    activeAlertsCount: getActiveAlerts().length,
    criticalSensorsCount: getCriticalSensors().length
  };
};