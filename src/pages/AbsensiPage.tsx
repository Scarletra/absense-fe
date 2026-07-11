import { Box, Button, Flex, Heading, Badge } from '@chakra-ui/react';
import { DynamicTable } from '../components/DynamicTable';
import type { Column } from '../types';

interface Absensi {
  id: number;
  tanggal: string;
  waktu: string;
  status: string;
}

export const AbsensiPage = () => {
  const columns: Column<Absensi>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Tanggal', accessor: 'tanggal' },
    { header: 'Waktu', accessor: 'waktu' },
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

  const data: Absensi[] = [
    { id: 1, tanggal: '2026-07-11', waktu: '08:00', status: 'Hadir' },
    { id: 2, tanggal: '2026-07-10', waktu: '08:15', status: 'Terlambat' },
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