import { useState, useEffect } from 'react';
import { Box, Button, Flex, Heading, Text, Input, useDisclosure, NativeSelect, VStack, Badge } from '@chakra-ui/react';
import { DynamicTable } from '../components/DynamicTable';
import { BaseModal } from '../components/BaseModal';
import { useKaryawan } from '../hooks/useKaryawan';
import { useAbsensiKaryawan } from '../hooks/useAbsensiKaryawan';
import type { Column, User } from '../types';

interface AttendanceRow {
  id: number;
  timestamp: string;
  status: string;
  photoPath: string;
}

export const KaryawanPage = () => {
  const { data, fetchKaryawan, addKaryawan, editKaryawan, deleteKaryawan, actionLoading } = useKaryawan();
  const { data: attendanceData, loading: attendanceLoading, fetchByUser } = useAbsensiKaryawan();

  const { open: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { open: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { open: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { open: isAttendanceOpen, onOpen: onAttendanceOpen, onClose: onAttendanceClose } = useDisclosure();

  const initialFormState = { id: 0, nip: '', name: '', password: '', isHrd: 'false' };
  const [formData, setFormData] = useState(initialFormState);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [attendanceTarget, setAttendanceTarget] = useState<User | null>(null);

  useEffect(() => {
    fetchKaryawan();
  }, [fetchKaryawan]);

  const handleOpenAdd = () => {
    setFormData(initialFormState);
    onAddOpen();
  };

  const handleOpenEdit = (user: User) => {
    setFormData({
      id: user.id,
      nip: (user as any).nip || '',
      name: user.name,
      password: '',
      isHrd: user.isHrd ? 'true' : 'false'
    });
    onEditOpen();
  };

  const handleOpenDelete = (user: User) => {
    setDeleteTarget(user);
    onDeleteOpen();
  };

  const handleOpenAttendance = (user: User) => {
    setAttendanceTarget(user);
    fetchByUser(user.id);
    onAttendanceOpen();
  };

  const submitAdd = async () => {
    const payload = {
      nip: formData.nip,
      name: formData.name,
      password: formData.password,
      isHrd: formData.isHrd === 'true'
    };
    await addKaryawan(payload, onAddClose);
  };

  const submitEdit = async () => {
    const payload: any = {
      nip: formData.nip,
      name: formData.name,
      isHrd: formData.isHrd === 'true'
    };

    if (formData.password.trim() !== '') {
      payload.password = formData.password;
    }

    await editKaryawan(formData.id, payload, onEditClose);
  };

  const submitDelete = async () => {
    if (!deleteTarget) return;
    await deleteKaryawan(deleteTarget.id, () => {
      setDeleteTarget(null);
      onDeleteClose();
    });
  };

  const columns: Column<User>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'NIP', render: (row: any) => row.nip },
    { header: 'Nama', accessor: 'name' },
    {
      header: 'Role',
      render: (row) => (
        <Box fontWeight="bold" color={row.isHrd ? 'purple.600' : 'gray.600'}>
          {row.isHrd ? 'HRD' : 'Karyawan'}
        </Box>
      ),
    },
    {
      header: 'Aksi',
      render: (row) => (
        <Flex gap={2}>
          <Button size="sm" colorScheme="purple" borderRadius="md" onClick={() => handleOpenAttendance(row)}>
            Lihat Absensi
          </Button>
          <Button size="sm" colorScheme="yellow" borderRadius="md" onClick={() => handleOpenEdit(row)}>
            Edit
          </Button>
          <Button size="sm" colorScheme="red" borderRadius="md" onClick={() => handleOpenDelete(row)}>
            Hapus
          </Button>
        </Flex>
      ),
    },
  ];

  const attendanceColumns: Column<AttendanceRow>[] = [
    {
      header: 'Tanggal',
      render: (row) => new Date(row.timestamp).toLocaleDateString('id-ID')
    },
    {
      header: 'Waktu',
      render: (row) => new Date(row.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    },
    {
      header: 'Status',
      render: (row) => (
        <Badge colorPalette={row.status === 'Hadir' ? 'green' : 'red'} px={2} py={1} borderRadius="md">
          {row.status}
        </Badge>
      ),
    },
  ];

  const formContent = (
    <VStack gap={4} align="stretch">
      <Box>
        <Text mb={2} fontSize="sm" fontWeight="bold">NIP</Text>
        <Input
          placeholder="Masukkan NIP"
          value={formData.nip}
          onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
        />
      </Box>
      <Box>
        <Text mb={2} fontSize="sm" fontWeight="bold">Nama Lengkap</Text>
        <Input
          placeholder="Masukkan Nama"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </Box>
      <Box>
        <Text mb={2} fontSize="sm" fontWeight="bold">Password</Text>
        <Input
          type="password"
          placeholder={isEditOpen ? "Kosongkan jika tidak ingin ganti" : "Masukkan Password"}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </Box>
      <Box>
        <Text mb={2} fontSize="sm" fontWeight="bold">Role Akses</Text>
        <NativeSelect.Root>
          <NativeSelect.Field
            value={formData.isHrd}
            onChange={(e) => setFormData({ ...formData, isHrd: e.target.value })}
          >
            <option value="false">Karyawan</option>
            <option value="true">HRD</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Box>
    </VStack>
  );

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" fontFamily="sans-serif" fontWeight="800">Daftar Karyawan</Heading>
        <Button colorScheme="blue" borderRadius="md" onClick={handleOpenAdd}>
          Tambah Karyawan
        </Button>
      </Flex>

      <DynamicTable columns={columns} data={data} />

      <BaseModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        title="Tambah Karyawan Baru"
        footer={
          <>
            <Button variant="outline" mr={3} onClick={onAddClose} borderRadius="md">Batal</Button>
            <Button colorScheme="blue" borderRadius="md" onClick={submitAdd} loading={actionLoading}>Simpan</Button>
          </>
        }
      >
        {formContent}
      </BaseModal>

      <BaseModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        title="Edit Data Karyawan"
        footer={
          <>
            <Button variant="outline" mr={3} onClick={onEditClose} borderRadius="md">Batal</Button>
            <Button colorScheme="blue" borderRadius="md" onClick={submitEdit} loading={actionLoading}>Update</Button>
          </>
        }
      >
        {formContent}
      </BaseModal>

      <BaseModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        title="Hapus Karyawan"
        footer={
          <>
            <Button variant="outline" mr={3} onClick={onDeleteClose} borderRadius="md">Batal</Button>
            <Button colorScheme="red" borderRadius="md" onClick={submitDelete} loading={actionLoading}>Hapus</Button>
          </>
        }
      >
        <Text>
          Apakah Anda yakin ingin menghapus karyawan{' '}
          <Text as="span" fontWeight="bold">{deleteTarget?.name}</Text>?
          Tindakan ini tidak dapat dibatalkan.
        </Text>
      </BaseModal>

      <BaseModal
        isOpen={isAttendanceOpen}
        onClose={onAttendanceClose}
        title={`Riwayat Absensi — ${attendanceTarget?.name ?? ''}`}
      >
        {attendanceLoading ? (
          <Text color="gray.500">Memuat data...</Text>
        ) : attendanceData.length === 0 ? (
          <Text color="gray.500">Belum ada data absensi.</Text>
        ) : (
          <DynamicTable columns={attendanceColumns} data={attendanceData} />
        )}
      </BaseModal>
    </Box>
  );
};