import { useState, useCallback } from 'react';
import { toaster } from '../components/Toaster';
import api from '../services/api';
import type { User } from '../types';

export const useKaryawan = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  const fetchKaryawan = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/users');
      setData(response.data);
    } catch (error) {
      toaster.create({ title: 'Gagal mengambil data karyawan', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  const addKaryawan = async (payload: any, onSuccess: () => void) => {
    setActionLoading(true);
    try {
      await api.post('/users', payload);
      toaster.create({ title: 'Karyawan berhasil ditambahkan', type: 'success' });
      onSuccess();
      fetchKaryawan();
    } catch (error) {
      toaster.create({ title: 'Gagal menambah karyawan', type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  const editKaryawan = async (id: number, payload: any, onSuccess: () => void) => {
    setActionLoading(true);
    try {
      await api.put(`/users/${id}`, payload);
      toaster.create({ title: 'Data karyawan berhasil diupdate', type: 'success' });
      onSuccess();
      fetchKaryawan();
    } catch (error) {
      toaster.create({ title: 'Gagal update karyawan', type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  const deleteKaryawan = async (id: number, onSuccess?: () => void) => {
    setActionLoading(true);
    try {
      await api.delete(`/users/${id}`);
      toaster.create({ title: 'Karyawan berhasil dihapus', type: 'success' });
      onSuccess?.();
      fetchKaryawan();
    } catch (error) {
      toaster.create({ title: 'Gagal menghapus karyawan', type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  return {
    data,
    loading,
    actionLoading,
    fetchKaryawan,
    addKaryawan,
    editKaryawan,
    deleteKaryawan
  };
};