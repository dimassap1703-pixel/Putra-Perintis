import { Link } from 'react-router-dom';
import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { COMPANY, buildWhatsAppUrl, generalWhatsAppMessage } from '@/config/company';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep-black text-off-white/80">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-off-white/65">
            {COMPANY.name} menyediakan informasi dan layanan penyewaan alat berat untuk
            mendukung kebutuhan proyek konstruksi dan infrastruktur Anda.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold text-off-white">Navigasi</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-pp-yellow">Beranda</Link></li>
            <li><Link to="/alat-berat" className="hover:text-pp-yellow">Daftar Alat Berat</Link></li>
            <li><Link to="/tentang-kami" className="hover:text-pp-yellow">Tentang Kami</Link></li>
            <li><Link to="/cara-penyewaan" className="hover:text-pp-yellow">Cara Penyewaan</Link></li>
            <li><Link to="/hubungi-kami" className="hover:text-pp-yellow">Hubungi Kami</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold text-off-white">Kontak</h3>
          <ul className="mt-4 space-y-3 text-sm text-off-white/70">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-pp-yellow" />
              <span>{COMPANY.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-pp-yellow" />
              <span>{COMPANY.email}</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={16} className="shrink-0 text-pp-yellow" />
              <span>{COMPANY.operationalHours}</span>
            </li>
            <li>
              <a
                href={buildWhatsAppUrl(generalWhatsAppMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 rounded-md bg-pp-yellow px-3 py-2 text-xs font-semibold text-deep-black"
              >
                <MessageCircle size={14} />
                Hubungi via WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-5 text-xs text-off-white/50 sm:flex-row">
          <p>© {year} {COMPANY.name}. Hak Cipta Dilindungi.</p>
          <p>{COMPANY.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
