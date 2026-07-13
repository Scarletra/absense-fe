import { useState } from 'react';
import type { FormEvent } from 'react';
import { Box, Button, Field, Input, Heading, VStack, Center } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';

export const LoginPage = () => {
  const [nip, setNip] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login, loading } = useAuth();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    await login(nip, password);
  };

  return (
    <Center minH="100vh" bg="blue.500" px={4}>
      <Box bg="white" p={8} maxWidth="400px" w="full" borderRadius="xl" boxShadow="lg">
        <VStack gap={6} as="form" onSubmit={handleLogin}>
          <Heading size="lg" fontFamily="sans-serif" fontWeight="900" letterSpacing="tight" color="blue.600">
            Proyekin
          </Heading>

          <Field.Root required>
            <Field.Label>NIP</Field.Label>
            <Input
              type="text"
              placeholder="Masukkan NIP"
              value={nip}
              onChange={(e) => setNip(e.target.value)}
              _focus={{ borderColor: 'blue.400' }}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              _focus={{ borderColor: 'blue.400' }}
            />
          </Field.Root>

          <Button
            type="submit"
            colorScheme="blue"
            w="full"
            loading={loading}
            borderRadius="md"
          >
            Masuk
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};