import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { Layout } from './components/Layout';
import { AbsensiPage } from './pages/AbsensiPage';
import { KaryawanPage } from './pages/KaryawanPage';
import { Toaster } from './components/Toaster';
import type { User } from './types';

const currentUser: User = {
  id: 1,
  name: 'Budi Santoso',
  isHrd: true,
};

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout user={currentUser} />}>
            <Route path="/" element={<AbsensiPage />} />
            {currentUser.isHrd && <Route path="/karyawan" element={<KaryawanPage />} />}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster />
    </ChakraProvider>
  );
}

export default App;