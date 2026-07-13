import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { Box, Button, Flex, Heading, Badge, Text, Input, useDisclosure, Image } from '@chakra-ui/react';
import { DynamicTable } from '../components/DynamicTable';
import { BaseModal } from '../components/BaseModal';
import { useAbsensi } from '../hooks/useAbsensi';
import type { Column, User } from '../types';

interface AbsensiData {
  id: number;
  timestamp: string;
  status: string;
  photoPath: string;
}

export const AbsensiPage = () => {
  const { data, fetchAbsensi, submitAbsen, submitLoading } = useAbsensi();

  const { open: isSubmitOpen, onOpen: onSubmitOpen, onClose: onSubmitClose } = useDisclosure();
  const { open: isPhotoOpen, onOpen: onPhotoOpen, onClose: onPhotoClose } = useDisclosure();

  const [photo, setPhoto] = useState<File | null>(null);
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string>('');
  const [photoError, setPhotoError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const userStr = localStorage.getItem('user');
  const currentUser: User | null = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    if (currentUser) fetchAbsensi(currentUser.id);
  }, [fetchAbsensi, currentUser?.id]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!photo || !currentUser) return;
    await submitAbsen(currentUser.id, photo, () => {
      setPhoto(null);
      onSubmitClose();
    });
  };

  const handleViewPhoto = (path: string) => {
    const normalizedPath = path.replace(/\\/g, '/');
    setSelectedPhotoUrl(`http://localhost:3000/${normalizedPath}`);
    setPhotoError(false);
    onPhotoOpen();
  };

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
        <Badge colorPalette={row.status === 'Hadir' ? 'green' : 'red'} px={2} py={1} borderRadius="md">
          {row.status}
        </Badge>
      ),
    },
    {
      header: 'Aksi',
      render: (row) => (
        <Button
          size="sm"
          colorScheme="blue"
          variant="outline"
          borderRadius="md"
          onClick={() => handleViewPhoto(row.photoPath)}
        >
          Lihat Foto
        </Button>
      ),
    },
  ];

  const submitFooter = (
    <>
      <Button variant="outline" mr={3} onClick={onSubmitClose} borderRadius="md">
        Batal
      </Button>
      <Button
        colorScheme="blue"
        borderRadius="md"
        onClick={handleSubmit}
        loading={submitLoading}
        disabled={!photo}
      >
        Kirim
      </Button>
    </>
  );

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" fontFamily="sans-serif" fontWeight="800" color="gray.600">Daftar Absen</Heading>
        <Button colorScheme="blue" borderRadius="md" onClick={onSubmitOpen}>
          Buat Absen
        </Button>
      </Flex>

      <DynamicTable columns={columns} data={data} />

      <BaseModal
        isOpen={isSubmitOpen}
        onClose={onSubmitClose}
        title="Submit Absen WFH"
        footer={submitFooter}
      >
        <Text mb={4}>Silakan upload foto bukti Anda sedang bekerja.</Text>
        <Input
          type="file"
          accept="image/*"
          capture="environment"
          ref={fileInputRef}
          onChange={handleFileChange}
          p={1}
        />
      </BaseModal>

      <BaseModal
        isOpen={isPhotoOpen}
        onClose={onPhotoClose}
        title="Bukti WFH"
      >
        <Flex justify="center" align="center" w="full" p={2}>
          {photoError ? (
            <Text color="gray.500">Foto Tidak Ditemukan</Text>
          ) : (
            <Image
              src={selectedPhotoUrl}
              alt="Bukti Absen WFH"
              borderRadius="md"
              objectFit="contain"
              maxH="60vh"
              onError={() => setPhotoError(true)}
            />
          )}
        </Flex>
      </BaseModal>
    </Box>
  );
};