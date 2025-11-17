// src/App.jsx
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {SmartHomeProvider} from './core/services/SmartHomeContext';
import {Layout} from './shared/components/Layout';

// Importar páginas
import {DashboardPage} from './features/user/pages/DashboardPage';

const DevicesPage = () => (
    <div className="card">
        <h2 className="text-2xl font-bold mb-4">Dispositivos</h2>
        <p className="text-gray-600">Gestión de dispositivos IoT</p>
    </div>
);

const AutomationPage = () => (
    <div className="card">
        <h2 className="text-2xl font-bold mb-4">Automatización</h2>
        <p className="text-gray-600">Reglas y escenas automáticas</p>
    </div>
);

const SecurityPage = () => (
    <div className="card">
        <h2 className="text-2xl font-bold mb-4">Seguridad</h2>
        <p className="text-gray-600">Monitoreo y alertas de seguridad</p>
    </div>
);

const NotificationsPage = () => (
    <div className="card">
        <h2 className="text-2xl font-bold mb-4">Notificaciones</h2>
        <p className="text-gray-600">Centro de notificaciones</p>
    </div>
);

function App() {
    return (
        <BrowserRouter>
            <SmartHomeProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<DashboardPage/>}/>
                        <Route path="/devices" element={<DevicesPage/>}/>
                        <Route path="/automation" element={<AutomationPage/>}/>
                        <Route path="/security" element={<SecurityPage/>}/>
                        <Route path="/notifications" element={<NotificationsPage/>}/>
                    </Routes>
                </Layout>
            </SmartHomeProvider>
        </BrowserRouter>
    );
}

export default App;