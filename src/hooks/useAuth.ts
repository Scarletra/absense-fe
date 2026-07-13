import { useState } from 'react';
import { toaster } from '../components/Toaster';
import api from '../services/api';

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (nip: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { nip, password });

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      toaster.create({
        title: 'Login Berhasil',
        type: 'success',
        duration: 3000,
      });

      window.location.href = '/';
    } catch (error) {
      toaster.create({
        title: 'Login Gagal',
        description: 'NIP atau password salah.',
        type: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return { login, logout, loading };
};