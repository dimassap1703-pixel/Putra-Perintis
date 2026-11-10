import { Link } from 'react-router-dom';
import { Boxes, CheckCircle2, XCircle, Eye, ArrowRight } from 'lucide-react';
import { StatusBadge } from '@/components/equipment/StatusBadge';
import { EquipmentImage } from '@/components/common/EquipmentImage';
import { LoadingState, ErrorState, EmptyState } from '@/components/common/StateViews';
import { useAdminEquipment } from '@/hooks/useAdminEquipment';

export function DashboardPage() {
  const { items, loading, error, stats } = useAdminEquipment();
  const terbaru = items.slice(0, 5);

  const cards = [
    { label: 'Total Unit', value: stats.total, icon: Boxes, color: 'text-charcoal' },
    { label: 'Unit Tersedia', value: stats.tersedia, icon: CheckCircle2, color: 'text-success-green' },
    { label: 'Unit Tidak Tersedia', value: stats.tidakTersedia, icon: XCircle, color: 'text-danger-red' },
    { label: 'Ditampilkan di Website', value: stats.ditampilkan, icon: Eye, color: 'text-pp-yellow' },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-charcoal">Dasbor</h1>
      <p className="mt-1 text-sm text-steel-gray">
        Ringkasan kondisi alat berat PUTRA PERINTIS saat ini.
      </p>

      {loading ? (
        <div className="mt-8"><LoadingState /></div>
      ) : error ? (
        <div className="mt-8"><ErrorState message={error} /></div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <div
                key={card.label}
                className="flex items-center gap-4 rounded-lg border border-steel-gray/15 bg-white p-5 shadow-sm"
              >
                <card.icon className={card.color} size={26} />
                <div>
                  <p className="font-heading text-2xl font-bold text-charcoal">{card.value}</p>
                  <p className="text-xs text-steel-gray">{card.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-steel-gray/15 bg-white">
            <div className="flex items-center justify-between border-b border-steel-gray/15 px-5 py-4">
              <h2 className="font-heading text-base font-bold text-charcoal">Unit Terbaru</h2>
              <Link
                to="/admin/equipment"
                className="inline-flex items-center gap-1 text-xs font-semibold text-charcoal hover:text-pp-yellow"
              >
                Kelola Semua Unit <ArrowRight size={14} />
              </Link>
            </div>

            {terbaru.length === 0 ? (
              <div className="p-5">
                <EmptyState
                  title="Belum ada unit"
                  description="Tambahkan unit pertama melalui halaman Kelola Alat Berat."
                />
              </div>
            ) : (
              <ul className="divide-y divide-steel-gray/10">
                {terbaru.map((item) => (
                  <li key={item.id} className="flex items-center gap-4 px-5 py-3">
                    <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md">
                      <EquipmentImage src={item.image_url} alt={item.name} className="h-full w-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-charcoal">{item.name}</p>
                      <p className="text-xs text-steel-gray">{item.category}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
