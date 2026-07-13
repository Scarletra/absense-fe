import { Box, Button, Flex, Heading, Badge } from '@chakra-ui/react';
import { useEffect } from 'react';
import { DynamicTable } from '../components/DynamicTable';
import { useAbsensi } from '../hooks/useAbsensi';
import type { Column } from '../types';

interface AbsensiData {
  id: number;
  timestamp: string;
  status: string;
  photoPath: string;
}

export const AbsensiPage = () => {
  const { data, fetchAbsensi } = useAbsensi();

  useEffect(() => {
    fetchAbsensi();
  }, [fetchAbsensi]);

  const columns: Column<AbsensiData>[] = [
    { header: 'ID', accessor: 'id' },
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
        <Badge colorScheme={row.status === 'Hadir' ? 'green' : 'red'} px={2} py={1} borderRadius="md">
          {row.status}
        </Badge>
      ),
    },
    {
      header: 'Aksi',
      render: () => (
        <Button size="sm" colorScheme="blue" variant="outline" borderRadius="md">
          Lihat Foto
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" fontFamily="sans-serif" fontWeight="800">Daftar Absen</Heading>
        <Button colorScheme="blue" borderRadius="md">Buat Absen</Button>
      </Flex>
      <DynamicTable columns={columns} data={data} />
    </Box>
  );
};