import { useState, useCallback } from 'react';
import api from '../services/api';

export const useAbsensi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAbsensi = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/attendance');
      setData(response.data);
    } catch (error) {
      console.error('Gagal fetch absensi:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, fetchAbsensi };
};