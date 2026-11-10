import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { HeroSection } from '@/components/layout/HeroSection';
import { AvailabilitySummary } from '@/components/equipment/AvailabilitySummary';
import { EquipmentCard } from '@/components/equipment/EquipmentCard';
import { LoadingState, ErrorState, EmptyState } from '@/components/common/StateViews';
import { useEquipmentCatalog } from '@/hooks/useEquipmentCatalog';
import { HowToRentSteps } from '@/components/equipment/HowToRentSteps';

export function HomePage() {
  const { items, loading, error, stats } = useEquipmentCatalog();
  const featured = items.slice(0, 6);

  return (
    <>
      <HeroSection />

      {/* Ringkasan Ketersediaan Unit */}
      <section className="bg-off-white py-16">
        <div className="container">
          <h2 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">
            Ringkasan Ketersediaan Unit
          </h2>
          <p className="mt-2 max-w-xl text-sm text-steel-gray">
            Data diperbarui secara langsung mengikuti status unit di sistem kami.
          </p>
          <div className="mt-8">
            {loading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState message={error} />
            ) : (
              <AvailabilitySummary
                total={stats.total}
                tersedia={stats.tersedia}
                tidakTersedia={stats.tidakTersedia}
              />
            )}
          </div>
        </div>
      </section>

      {/* Katalog ringkas */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">
                Alat Berat Pilihan
              </h2>
              <p className="mt-2 text-sm text-steel-gray">
                Sebagian unit yang tersedia di katalog kami.
              </p>
            </div>
            <Link
              to="/alat-berat"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal hover:text-pp-yellow"
            >
              Lihat Semua Unit
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-8">
            {loading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState message={error} />
            ) : featured.length === 0 ? (
              <EmptyState
                title="Belum ada unit yang ditampilkan"
                description="Admin belum menambahkan data alat berat. Silakan periksa kembali nanti."
              />
            ) : (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {featured.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                  >
                    <EquipmentCard item={item} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Cara Penyewaan ringkas */}
      <section className="bg-charcoal py-16">
        <div className="container">
          <h2 className="font-heading text-2xl font-bold text-off-white sm:text-3xl">
            Cara Penyewaan
          </h2>
          <p className="mt-2 max-w-xl text-sm text-off-white/60">
            Hanya tiga langkah mudah untuk menyewa alat berat dari kami.
          </p>
          <div className="mt-8">
            <HowToRentSteps variant="dark" />
          </div>
        </div>
      </section>
    </>
  );
}
