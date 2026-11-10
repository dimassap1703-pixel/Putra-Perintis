import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 pt-16 text-center">
      <h1 className="font-heading text-6xl font-bold text-pp-yellow">404</h1>
      <p className="text-lg font-semibold text-charcoal">Halaman tidak ditemukan</p>
      <p className="max-w-sm text-sm text-steel-gray">
        Halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-md bg-pp-yellow px-5 py-2.5 text-sm font-semibold text-deep-black"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
