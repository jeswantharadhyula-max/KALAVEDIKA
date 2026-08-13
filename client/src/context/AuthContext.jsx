import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('kv_token');
    const user  = localStorage.getItem('kv_user');
    if (token && user) setAdmin(JSON.parse(user));
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const data = await api.login({ username, password });
    localStorage.setItem('kv_token', data.token);
    localStorage.setItem('kv_user', JSON.stringify({ username: data.username, role: data.role }));
    setAdmin({ username: data.username, role: data.role });
  };

  const logout = () => {
    localStorage.removeItem('kv_token');
    localStorage.removeItem('kv_user');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
