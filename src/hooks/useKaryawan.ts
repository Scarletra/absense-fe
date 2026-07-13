import { useState, useCallback } from 'react';
import api from '../services/api';
import type { User } from '../types';

export const useKaryawan = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchKaryawan = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/users');
      setData(response.data);
    } catch (error) {
      console.error('Gagal fetch karyawan:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, fetchKaryawan };
};