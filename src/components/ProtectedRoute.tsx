
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Duke ngarkuar...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/hyr" replace />;
  }

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/shfleto" replace />;
  }

  if (!user.isSubscribed && !adminOnly) {
    return <Navigate to="/abonohu" replace />;
  }

  return <>{children}</>;
}
