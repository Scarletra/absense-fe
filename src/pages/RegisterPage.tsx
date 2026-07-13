import { useState } from 'react';
import type { FormEvent } from 'react';
import { Box, Button, Input, Heading, VStack, Center, Text } from '@chakra-ui/react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const RegisterPage = () => {
  const [nip, setNip] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const success = await register(nip, name, password);
    if (success) {
      navigate('/login');
    }
  };

  return (
    <Center minH="100vh" bg="blue.500" px={4}>
      <Box bg="white" p={8} maxWidth="400px" w="full" boxShadow="lg">
        <VStack gap={6} as="form" onSubmit={handleRegister}>
          <Heading size="lg" fontFamily="sans-serif" fontWeight="900" letterSpacing="tight" color="blue.600">
            Daftar Absense
          </Heading>

          <Box w="full">
            <Text mb={2} fontSize="sm" fontWeight="bold">NIP</Text>
            <Input
              type="text"
              placeholder="Masukkan NIP"
              value={nip}
              onChange={(e) => setNip(e.target.value)}
              required
            />
          </Box>
          <Box w="full">
            <Text mb={2} fontSize="sm" fontWeight="bold">Nama Lengkap</Text>
            <Input
              type="text"
              placeholder="Masukkan Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Box>
          <Box w="full">
            <Text mb={2} fontSize="sm" fontWeight="bold">Password</Text>
            <Input
              type="password"
              placeholder="Buat Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          <Button
            type="submit"
            colorScheme="blue"
            w="full"
            loading={loading}
          >
            Daftar Sekarang
          </Button>
          <Text fontSize="sm" mt={4}>
            Sudah punya akun?{' '}
            <RouterLink to="/login" style={{ color: '#3182ce', fontWeight: 'bold' }}>
              Masuk di sini
            </RouterLink>
          </Text>
        </VStack>
      </Box>
    </Center>
  );
};