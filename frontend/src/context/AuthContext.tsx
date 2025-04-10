// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import api from '../axios';

interface User {
  id: number;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: { fullName: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setToken(token);
      setUser(JSON.parse(user));
    }

  }, []);

  const login = async (data: { email: string; password: string }) => {
    try {
        setLoading(true);
        const res = await api.post('/api/auth/login', data);
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setToken(res.data.access_token);
        setUser(res.data.user);
        navigate('/dashboard');
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  };

  const register = async (data: { fullName: string; email: string; password: string }) => {
    try {
        setLoading(true);
        await api.post('/api/auth/register', data);
        alert('Registration successful! Please login.');
        await login({ email: data.email, password: data.password }); // auto-login after register
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  };

  const logout = () => {
    try {
        setLoading(true);
        localStorage.clear();
        setUser(null);
        setToken(null);
        navigate('/login');
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
