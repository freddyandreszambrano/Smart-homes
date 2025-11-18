import { Video, VideoOff, Circle, Eye } from 'lucide-react';

export const SecurityCamera = ({ camera, onToggleRecording }) => {
  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);

    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(diff / 3600000);
    return `${hours}h ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={camera.thumbnail}
          alt={camera.name}
          className="w-full h-48 object-cover"
        />

        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
            camera.status === 'active' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-500 text-white'
          }`}>
            <Circle className="w-2 h-2 fill-current" />
            {camera.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>

        {camera.recording && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-medium flex items-center gap-1 animate-pulse">
              <Circle className="w-2 h-2 fill-current" />
              REC
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white font-semibold text-lg">{camera.name}</h3>
          <p className="text-white/80 text-sm">{camera.location}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-500">
            Last motion: {formatTime(camera.lastMotion)}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onToggleRecording(camera.id)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              camera.recording
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {camera.recording ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            {camera.recording ? 'Stop' : 'Record'}
          </button>

          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
            <Eye className="w-4 h-4" />
            View Live
          </button>
        </div>
      </div>
    </div>
  );
};