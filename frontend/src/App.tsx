import { useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Route, Routes, useNavigate } from 'react-router';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import DashboardPage from './pages/dashboard';

function App() {
  const { user } = useAuth();

  return (
   
      <div  >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={user ? <DashboardPage /> : <LoginPage />} />
          {/* <Route path="/dashboard" element={ <DashboardPage /> } /> */}
        </Routes>
      </div>
  
  );
}

export default App
