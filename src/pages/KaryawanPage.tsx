import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { DynamicTable } from '../components/DynamicTable';
import { useKaryawan } from '../hooks/useKaryawan';
import type { Column, User } from '../types';

export const KaryawanPage = () => {
  const { data, fetchKaryawan } = useKaryawan();

  useEffect(() => {
    fetchKaryawan();
  }, [fetchKaryawan]);

  const columns: Column<User>[] = [
    { header: 'ID', accessor: 'id' },
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
      render: () => (
        <Flex gap={2}>
          <Button size="sm" colorScheme="yellow" borderRadius="md">Edit</Button>
          <Button size="sm" colorScheme="red" borderRadius="md">Hapus</Button>
        </Flex>
      ),
    },
  ];

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" fontFamily="sans-serif" fontWeight="800" color="gray.600">Daftar Karyawan</Heading>
        <Button colorScheme="blue" borderRadius="md">Tambah Karyawan</Button>
      </Flex>
      <DynamicTable columns={columns} data={data} />
    </Box>
  );
};