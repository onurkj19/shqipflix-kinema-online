
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, profile, isAdmin, loading } = useAuth();

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

  if (adminOnly && !isAdmin) {
    return <Navigate to="/shfleto" replace />;
  }

  // For now, allow all authenticated users access
  // Later you can check subscription status: profile?.subscription_status === 'premium'

  return <>{children}</>;
}
