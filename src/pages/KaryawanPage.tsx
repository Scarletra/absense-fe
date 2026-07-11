import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { DynamicTable } from '../components/DynamicTable';
import type { Column, User } from '../types';

export const KaryawanPage = () => {
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

  const data: User[] = [
    { id: 1, name: 'Budi Santoso', isHrd: true },
    { id: 2, name: 'Siti Aminah', isHrd: false },
  ];

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" fontFamily="sans-serif" fontWeight="800">Daftar Karyawan</Heading>
        <Button colorScheme="blue" borderRadius="md">Tambah Karyawan</Button>
      </Flex>
      <DynamicTable columns={columns} data={data} />
    </Box>
  );
};