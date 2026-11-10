import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Truck, LogOut, X } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { useAuth } from '@/contexts/AuthContext';

const MENU = [
  { to: '/admin/dashboard', label: 'Dasbor', icon: LayoutDashboard },
  { to: '/admin/equipment', label: 'Kelola Alat Berat', icon: Truck },
];

export function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="flex h-full flex-col bg-deep-black">
      <div className="flex items-center justify-between px-5 py-5">
        <Logo />
        {onClose && (
          <button onClick={onClose} className="text-off-white lg:hidden" aria-label="Tutup menu">
            <X size={22} />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {MENU.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-pp-yellow text-deep-black'
                  : 'text-off-white/75 hover:bg-white/5 hover:text-off-white'
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-off-white/75 hover:bg-white/5 hover:text-danger-red"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </div>
  );
}
