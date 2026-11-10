import { motion } from 'framer-motion';
import { useEquipmentCatalog } from '@/hooks/useEquipmentCatalog';
import { CatalogFilterBar } from '@/components/equipment/CatalogFilterBar';
import { EquipmentCard } from '@/components/equipment/EquipmentCard';
import { LoadingState, ErrorState, EmptyState } from '@/components/common/StateViews';

export function CatalogPage() {
  const {
    filtered,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    status,
    setStatus,
    sort,
    setSort,
    resetFilters,
  } = useEquipmentCatalog();

  return (
    <div className="bg-off-white pb-20 pt-28">
      <div className="container">
        <h1 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
          Daftar Alat Berat
        </h1>
        <p className="mt-2 max-w-xl text-sm text-steel-gray">
          Temukan unit alat berat sesuai kebutuhan proyek Anda. Status ketersediaan diperbarui
          secara langsung.
        </p>

        <div className="mt-8">
          <CatalogFilterBar
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            category={category}
            onCategoryChange={setCategory}
            status={status}
            onStatusChange={setStatus}
            sort={sort}
            onSortChange={setSort}
            onReset={resetFilters}
            resultCount={filtered.length}
          />
        </div>

        <div className="mt-8">
          {loading ? (
            <LoadingState label="Memuat daftar alat berat..." />
          ) : error ? (
            <ErrorState message={error} />
          ) : filtered.length === 0 ? (
            <EmptyState
              title="Tidak ada unit yang sesuai"
              description="Coba ubah kata kunci pencarian atau atur ulang filter yang digunakan."
            />
          ) : (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((item) => (
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
    </div>
  );
}
