import { useState } from 'react';

// Logo PUTRA PERINTIS dengan fallback otomatis.
// Cara ganti ke logo resmi: letakkan file di public/images/company/logo.svg
// (atau .png), lalu set LOGO_IMAGE_PATH di bawah ini sesuai nama filenya.
// Kalau file belum ada / gagal dimuat, otomatis tampil badge teks "PP"
// sehingga tidak pernah muncul ikon gambar pecah.

const LOGO_IMAGE_PATH = 'logoP2R.jpeg';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export function Logo({ variant = 'light', className = '' }: LogoProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const textColor = variant === 'light' ? 'text-off-white' : 'text-charcoal';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {!imageFailed ? (
        <img
          src={LOGO_IMAGE_PATH}
          alt="Logo PUTRA PERINTIS"
          onError={() => setImageFailed(true)}
          className="h-9 w-9 shrink-0 rounded-md object-contain"
        />
      ) : (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-pp-yellow font-heading text-sm font-bold text-deep-black">
          PP
        </span>
      )}
      <span className={`font-heading text-base font-bold leading-tight tracking-tight ${textColor}`}>
        PUTRA PERINTIS
        <span className="block font-body text-[10px] font-medium tracking-[0.2em] text-pp-yellow">
          HEAVY EQUIPMENT RENTAL
        </span>
      </span>
    </div>
  );
}