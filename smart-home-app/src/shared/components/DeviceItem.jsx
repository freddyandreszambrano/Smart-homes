// src/shared/components/DeviceItem.jsx
import {Power, Zap} from 'lucide-react';

export const DeviceItem = ({device, onToggle}) => {
    const getDeviceIcon = (type) => {
        // Retornamos el ícono de Power por defecto
        return Power;
    };

    const Icon = getDeviceIcon(device.type);

    return (
        <div
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
                <div
                    className={`p-2 rounded-lg ${device.isOn ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                    <Icon className="w-5 h-5"/>
                </div>
                <div>
                    <p className="font-medium text-gray-900">{device.name}</p>
                    <p className="text-sm text-gray-500">{device.room}</p>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                {device.isOn && (
                    <div className="flex items-center text-sm text-gray-600">
                        <Zap className="w-4 h-4 mr-1 text-yellow-500"/>
                        <span>{device.powerConsumption}W</span>
                    </div>
                )}
                <button
                    onClick={() => onToggle(device.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        device.isOn ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                >
          <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  device.isOn ? 'translate-x-6' : 'translate-x-1'
              }`}
          />
                </button>
            </div>
        </div>
    );
};