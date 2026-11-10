
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Logo } from '@/components/common/Logo';
import {
  buildWhatsAppUrl,
  generalWhatsAppMessage,
} from '@/config/company';

const MENU = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/alat-berat', label: 'Daftar Alat Berat' },
  { to: '/tentang-kami', label: 'Tentang Kami' },
  { to: '/cara-penyewaan', label: 'Cara Penyewaan' },
  { to: '/hubungi-kami', label: 'Hubungi Kami' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();

  const isHome = location.pathname === '/';

  // Deteksi posisi scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Tutup menu saat berpindah halaman
  useEffect(() => {
    setMobileOpen(false);

    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, [location.pathname]);

  // Navbar solid di seluruh halaman
  const headerStyle = `
    bg-[#171717]
    text-white
    border-b border-white/10
    shadow-md
  `;

  // Styling navigasi
  const navLinkStyle = ({ isActive }: { isActive: boolean }) => `
    relative whitespace-nowrap py-2
    text-sm font-medium
    transition-colors duration-300
    ${
      isActive
        ? 'text-[#F7B72C]'
        : 'text-white hover:text-[#F7B72C]'
    }
  `;

  const whatsappUrl = buildWhatsAppUrl(
    generalWhatsAppMessage()
  );

  return (
    <>
      {/* =====================================
          MAIN NAVBAR
      ====================================== */}

      <header
        className={`
          fixed inset-x-0 top-0 z-50
          w-full
          ${headerStyle}
          transition-all duration-300
        `}
      >
        <nav
          className="
            container mx-auto
            flex h-20 items-center justify-between
            gap-4 px-4 sm:px-6 lg:px-8
          "
        >

          {/* LOGO */}
          <NavLink
            to="/"
            onClick={() => setMobileOpen(false)}
            className="shrink-0"
            aria-label="Putra Perintis - Beranda"
          >
            <Logo />
          </NavLink>

          {/* DESKTOP NAVIGATION */}
          <ul className="hidden items-center gap-6 xl:gap-8 lg:flex">
            {MENU.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={navLinkStyle}
                >
                  {({ isActive }) => (
                    <>
                      {item.label}

                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="
                            absolute -bottom-1
                            left-0 right-0
                            h-0.5 rounded-full
                            bg-[#F7B72C]
                          "
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* WHATSAPP DESKTOP */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              hidden lg:inline-flex
              items-center justify-center gap-2
              rounded-md
              bg-[#F7B72C]
              px-5 py-3
              text-sm font-bold
              text-[#171717]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-[#FFD064]
              hover:shadow-lg
              shrink-0
            "
          >
            <MessageCircle size={17} />
            WhatsApp
          </a>

          {/* MOBILE HAMBURGER */}
          <button
            type="button"
            aria-label={
              mobileOpen ? 'Tutup menu' : 'Buka menu'
            }
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
            className="
              flex items-center justify-center
              rounded-md p-2
              text-white
              transition-colors duration-300
              hover:text-[#F7B72C]
              lg:hidden
            "
          >
            {mobileOpen ? (
              <X size={26} />
            ) : (
              <Menu size={26} />
            )}
          </button>
        </nav>

        {/* =====================================
            MOBILE MENU
        ====================================== */}

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: 'auto',
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
                ease: 'easeInOut',
              }}
              className="
                overflow-hidden
                border-t border-white/10
                bg-[#171717]
                lg:hidden
              "
            >
              <ul
                className="
                  container mx-auto
                  flex flex-col gap-1
                  px-4 py-4
                "
              >
                {MENU.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) => `
                        block rounded-md
                        px-4 py-3
                        text-base font-medium
                        transition-all duration-300
                        ${
                          isActive
                            ? 'bg-[#F7B72C]/10 text-[#F7B72C]'
                            : 'text-white hover:bg-white/5 hover:text-[#F7B72C]'
                        }
                      `}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}

                {/* WHATSAPP MOBILE */}
                <li className="pt-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex w-full
                      items-center justify-center gap-2
                      rounded-md
                      bg-[#F7B72C]
                      px-4 py-3
                      text-sm font-bold
                      text-[#171717]
                      transition-colors duration-300
                      hover:bg-[#FFD064]
                    "
                  >
                    <MessageCircle size={18} />
                    Hubungi via WhatsApp
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =====================================
          NAVBAR SPACING
          Beranda: Hero berada di belakang navbar.
          Halaman lain: Konten dimulai setelah navbar.
      ====================================== */}

      {!isHome && (
        <div
          className="h-20 w-full shrink-0"
          aria-hidden="true"
        />
      )}
    </>
  );
}
