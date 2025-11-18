import { Shield, ShieldCheck, ShieldAlert, Video, Wifi, Battery, AlertTriangle, DoorOpen } from 'lucide-react';
import { useSecurity } from '../hooks/useSecurity';
import { SecurityCamera } from '../components/SecurityCamera';
import { SecurityAlert } from '../components/SecurityAlert';

export const SecurityPage = () => {
  const {
    systemStatus,
    cameras,
    alerts,
    sensors,
    toggleArmed,
    setMode,
    toggleCameraRecording,
    resolveAlert,
    activeAlertsCount,
    criticalSensorsCount
  } = useSecurity();

  const modes = [
    { value: 'away', label: 'Away', icon: Shield, color: 'red' },
    { value: 'home', label: 'Home', icon: ShieldCheck, color: 'blue' },
    { value: 'night', label: 'Night', icon: ShieldAlert, color: 'purple' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Security Center</h1>
          <p className="text-gray-500">Monitor and control your home security</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">System Status</h3>
            <div className={`w-3 h-3 rounded-full ${systemStatus.armed ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`} />
          </div>

          <div className="text-center mb-4">
            {systemStatus.armed ? (
              <ShieldCheck className="w-16 h-16 text-red-500 mx-auto mb-2" />
            ) : (
              <Shield className="w-16 h-16 text-gray-400 mx-auto mb-2" />
            )}
            <p className="text-2xl font-bold text-gray-900">
              {systemStatus.armed ? 'ARMED' : 'DISARMED'}
            </p>
            <p className="text-sm text-gray-500 capitalize">Mode: {systemStatus.mode}</p>
          </div>

          <button
            onClick={toggleArmed}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              systemStatus.armed
                ? 'bg-gray-500 hover:bg-gray-600 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {systemStatus.armed ? 'Disarm System' : 'Arm System'}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Security Mode</h3>
          <div className="space-y-2">
            {modes.map(mode => {
              const Icon = mode.icon;
              const isActive = systemStatus.mode === mode.value;
              return (
                <button
                  key={mode.value}
                  onClick={() => setMode(mode.value)}
                  className={`w-full p-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${
                    isActive
                      ? `bg-${mode.color}-500 text-white`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {mode.label} Mode
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="font-medium text-gray-700">Active Alerts</span>
              </div>
              <span className="text-2xl font-bold text-red-500">{activeAlertsCount}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Video className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-gray-700">Active Cameras</span>
              </div>
              <span className="text-2xl font-bold text-blue-500">
                {cameras.filter(c => c.status === 'active').length}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Wifi className="w-5 h-5 text-yellow-500" />
                <span className="font-medium text-gray-700">Sensors Online</span>
              </div>
              <span className="text-2xl font-bold text-yellow-500">{sensors.length}</span>
            </div>
          </div>
        </div>
      </div>

      {activeAlertsCount > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Security Alerts</h2>
          <div className="space-y-3">
            {alerts.filter(a => !a.resolved).map(alert => (
              <SecurityAlert
                key={alert.id}
                alert={alert}
                onResolve={resolveAlert}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Security Cameras</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cameras.map(camera => (
            <SecurityCamera
              key={camera.id}
              camera={camera}
              onToggleRecording={toggleCameraRecording}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Sensor Status</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
            {sensors.map(sensor => (
              <div key={sensor.id} className="bg-white p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {sensor.type === 'door' && <DoorOpen className="w-5 h-5 text-blue-500" />}
                    {sensor.type === 'window' && <DoorOpen className="w-5 h-5 text-blue-500" />}
                    {sensor.type === 'motion' && <Wifi className="w-5 h-5 text-green-500" />}
                    {sensor.type === 'smoke' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                    <span className="font-medium text-gray-800">{sensor.name}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    sensor.status === 'closed' || sensor.status === 'normal' || sensor.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {sensor.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Battery className="w-4 h-4" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        sensor.battery > 50 ? 'bg-green-500' : sensor.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${sensor.battery}%` }}
                    />
                  </div>
                  <span>{sensor.battery}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};