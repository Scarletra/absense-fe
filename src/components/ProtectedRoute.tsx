import { Navigate, Outlet } from 'react-router-dom';
import type { User } from '../types';

interface ProtectedRouteProps {
  requireHrd?: boolean;
}

export const ProtectedRoute = ({ requireHrd = false }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');

  if (!token || !userStr) {
    return <Navigate to="/login" replace />;
  }

  const user: User = JSON.parse(userStr);

  if (requireHrd && !user.isHrd) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};