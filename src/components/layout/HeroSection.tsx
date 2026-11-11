import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { EquipmentImage } from '@/components/common/EquipmentImage';
import { COMPANY, buildWhatsAppUrl, generalWhatsAppMessage } from '@/config/company';

// Foto latar hero. Secara default pakai foto stok (ilustrasi) dari Unsplash
// agar langsung tampil tanpa perlu upload file. Untuk pakai foto armada asli
// perusahaan: taruh file di public/images/hero/hero-alat-berat.jpg lalu ganti
// nilai di bawah ini menjadi '/images/hero/hero-alat-berat.jpg'.
const HERO_IMAGE_PATH = 'bg p2r.jpeg';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-deep-black pt-16">
      <div className="absolute inset-0">
        <EquipmentImage
          src={HERO_IMAGE_PATH}
          alt="Alat berat PUTRA PERINTIS"
          eager
          className="h-full w-full opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/70 to-deep-black/30" />
      </div>

      {/* Elemen geometris industrial */}
      <div className="pointer-events-none absolute right-0 top-24 hidden h-64 w-64 rotate-12 border-[3px] border-pp-yellow/20 lg:block" />

      <div className="container relative flex min-h-[90vh] flex-col justify-center py-24">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-pp-yellow/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-pp-yellow"
        >
          {COMPANY.descriptor}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl font-heading text-4xl font-bold leading-[1.1] text-off-white sm:text-5xl lg:text-6xl"
        >
          SOLUSI PENYEWAAN ALAT BERAT UNTUK SETIAP PROYEK
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 max-w-xl text-base text-off-white/75 sm:text-lg"
        >
          Temukan berbagai pilihan alat berat untuk mendukung kebutuhan proyek konstruksi,
          infrastruktur, dan pekerjaan Anda.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            to="/alat-berat"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-pp-yellow px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-deep-black transition-transform hover:scale-[1.02]"
          >
            Lihat Ketersediaan Unit
            <ArrowRight size={18} />
          </Link>
          <a
            href={buildWhatsAppUrl(generalWhatsAppMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-off-white/30 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-off-white hover:bg-white/10"
          >
            <MessageCircle size={18} />
            Hubungi Kami
          </a>
        </motion.div>

        <p className="mt-3 text-xs italic text-off-white/40">
          Hubungi kami untuk info ketersediaan unit terbaru
        </p>
      </div>
    </section>
  );
}
