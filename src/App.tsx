import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { Layout } from './components/Layout';
import { AbsensiPage } from './pages/AbsensiPage';
import { KaryawanPage } from './pages/KaryawanPage';
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Toaster } from './components/Toaster';
import type { User } from './types';
import { RegisterPage } from './pages/RegisterPage';

const customSystem = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Plus Jakarta Sans', 'Inter', sans-serif` },
        body: { value: `'Plus Jakarta Sans', 'Inter', sans-serif` },
      },
      radii: {
        sm: { value: '0px' },
        md: { value: '2px' },
        lg: { value: '4px' },
        xl: { value: '4px' },
      },
    },
  },
});

function App() {
  const userStr = localStorage.getItem('user');
  const currentUser: User | null = userStr ? JSON.parse(userStr) : null;

  return (
    <ChakraProvider value={customSystem}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout user={currentUser!} />}>
              <Route path="/" element={<AbsensiPage />} />
              
              <Route element={<ProtectedRoute requireHrd={true} />}>
                <Route path="/karyawan" element={<KaryawanPage />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>

      <Toaster />
    </ChakraProvider>
  );
}

export default App;