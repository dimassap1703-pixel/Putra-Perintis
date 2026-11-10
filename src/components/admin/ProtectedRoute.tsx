import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Melindungi seluruh route /admin/*. Proteksi dilakukan di frontend sekaligus
 * di-backup oleh Row Level Security di database (lihat supabase/migrations),
 * sehingga tidak hanya mengandalkan proteksi route saja.
 */
export function ProtectedRoute() {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-deep-black">
        <Loader2 className="animate-spin text-pp-yellow" size={32} />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}
