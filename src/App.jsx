import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import AddApplication from './pages/AddApplication';
import Analytics from './pages/Analytics';
import { ApplicationProvider } from './context/ApplicationContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ApplicationProvider>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/applications/new" element={<AddApplication />} />
            <Route path="/applications/:id" element={<AddApplication />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </ApplicationProvider>
  );
}

export default App;
