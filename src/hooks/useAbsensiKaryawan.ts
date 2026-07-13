import { useState } from 'react';
import api from '../services/api';

interface AttendanceRecord {
  id: number;
  timestamp: string;
  status: string;
  photoPath: string;
}

export const useAbsensiKaryawan = () => {
  const [data, setData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchByUser = async (userId: number) => {
    setLoading(true);
    try {
      const response = await api.get('/attendance', { params: { userId } });
      setData(response.data);
    } catch (error) {
      console.error('Gagal fetch absensi karyawan:', error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, fetchByUser };
};