import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SmartHomeProvider } from './core/services/SmartHomeContext';
import { Layout } from './shared/components/Layout';

import { DashboardPage } from './features/user/pages/DashboardPage';
import { DevicesPage } from './features/home-environment/pages/DevicesPage';
import AutomationPage from "./features/automation/pages/AutomationPage.jsx";
import { SecurityPage } from './features/security/pages/SecurityPage';
import { NotificationsPage } from './features/notifications/pages/NotificationsPage';

function App() {
  return (
    <BrowserRouter>
      <SmartHomeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/devices" element={<DevicesPage />} />
            <Route path="/automation" element={<AutomationPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
          </Routes>
        </Layout>
      </SmartHomeProvider>
    </BrowserRouter>
  );
}

export default App;