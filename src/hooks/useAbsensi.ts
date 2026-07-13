import { useState, useCallback } from 'react';
import { toaster } from '../components/Toaster';
import api from '../services/api';

export const useAbsensi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

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

  const submitAbsen = async (userId: number, photo: File, onSuccess: () => void) => {
    setSubmitLoading(true);
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('userId', userId.toString());

    try {
      await api.post('/attendance', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toaster.create({
        title: 'Absen Berhasil',
        type: 'success',
        duration: 3000,
      });
      onSuccess();
      fetchAbsensi();
    } catch (error) {
      toaster.create({
        title: 'Gagal Absen',
        description: 'Pastikan file foto valid dan server menyala.',
        type: 'error',
        duration: 3000,
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  return { data, loading, submitLoading, fetchAbsensi, submitAbsen };
};