import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import RegisterMentor from './pages/RegisterMentor';
import RegisterTeam from './pages/RegisterTeam';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function AppContent() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<string>('landing');

  if (user && currentView !== 'dashboard') {
    setCurrentView('dashboard');
  }

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <Landing onNavigate={setCurrentView} />;
      case 'login':
        return <Login onNavigate={setCurrentView} />;
      case 'register-mentor':
        return <RegisterMentor onNavigate={setCurrentView} />;
      case 'register-team':
        return <RegisterTeam onNavigate={setCurrentView} />;
      case 'dashboard':
        return (
          <ProtectedRoute fallback={<Landing onNavigate={setCurrentView} />}>
            <Dashboard />
          </ProtectedRoute>
        );
      default:
        return <Landing onNavigate={setCurrentView} />;
    }
  };

  return renderView();
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
