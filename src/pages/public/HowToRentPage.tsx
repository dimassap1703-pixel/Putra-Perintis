import { Link } from 'react-router-dom';
import { HowToRentSteps } from '@/components/equipment/HowToRentSteps';

export function HowToRentPage() {
  return (
    <div className="bg-off-white pb-20 pt-28">
      <div className="container">
        <span className="text-xs font-semibold uppercase tracking-widest text-pp-yellow">
          Panduan
        </span>
        <h1 className="mt-2 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
          Cara Penyewaan
        </h1>
        <p className="mt-3 max-w-xl text-sm text-steel-gray">
          Proses penyewaan alat berat di PUTRA PERINTIS dirancang sederhana agar Anda dapat
          segera memulai proyek.
        </p>

        <div className="mt-10">
          <HowToRentSteps />
        </div>

        <div className="mt-10">
          <Link
            to="/alat-berat"
            className="inline-flex items-center justify-center rounded-md bg-pp-yellow px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-deep-black"
          >
            Mulai Lihat Alat Berat
          </Link>
        </div>
      </div>
    </div>
  );
}
