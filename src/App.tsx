import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';

import { PublicLayout } from '@/components/layout/PublicLayout';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';

import { HomePage } from '@/pages/public/HomePage';
import { CatalogPage } from '@/pages/public/CatalogPage';
import { EquipmentDetailPage } from '@/pages/public/EquipmentDetailPage';
import { AboutPage } from '@/pages/public/AboutPage';
import { HowToRentPage } from '@/pages/public/HowToRentPage';
import { ContactPage } from '@/pages/public/ContactPage';
import { NotFoundPage } from '@/pages/public/NotFoundPage';

import { LoginPage } from '@/pages/admin/LoginPage';
import { DashboardPage } from '@/pages/admin/DashboardPage';
import { ManageEquipmentPage } from '@/pages/admin/ManageEquipmentPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Website publik */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/alat-berat" element={<CatalogPage />} />
              <Route path="/alat-berat/:id" element={<EquipmentDetailPage />} />
              <Route path="/tentang-kami" element={<AboutPage />} />
              <Route path="/cara-penyewaan" element={<HowToRentPage />} />
              <Route path="/hubungi-kami" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Login admin (tanpa layout sidebar) */}
            <Route path="/admin/login" element={<LoginPage />} />

            {/* Dashboard admin (terproteksi) */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<DashboardPage />} />
                <Route path="/admin/equipment" element={<ManageEquipmentPage />} />
              </Route>
            </Route>
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
