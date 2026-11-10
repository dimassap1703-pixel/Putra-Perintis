import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { EquipmentImage } from '@/components/common/EquipmentImage';
import { StatusBadge } from './StatusBadge';
import type { Equipment } from '@/types/equipment';
import { buildWhatsAppUrl, equipmentWhatsAppMessage } from '@/config/company';

export function EquipmentCard({ item }: { item: Equipment }) {
  const isReady = item.status === 'ready';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col overflow-hidden rounded-lg border border-steel-gray/15 bg-white shadow-sm"
    >
      <Link to={`/alat-berat/${item.id}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <EquipmentImage
            src={item.image_url}
            alt={item.name}
            className="h-full w-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <StatusBadge status={item.status} />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-pp-yellow">
          {item.category}
        </span>
        <Link to={`/alat-berat/${item.id}`}>
          <h3 className="font-heading text-lg font-bold leading-tight text-charcoal hover:text-pp-yellow">
            {item.name}
          </h3>
        </Link>
        <p className="text-sm text-steel-gray">
          {[item.brand, item.model].filter(Boolean).join(' • ') || 'Merek & model belum diisi'}
        </p>
        {item.description && (
          <p className="line-clamp-2 text-sm text-steel-gray/90">{item.description}</p>
        )}

        <div className="mt-auto flex items-center gap-2 pt-3">
          <Link
            to={`/alat-berat/${item.id}`}
            className="flex-1 rounded-md border border-charcoal/20 px-3 py-2 text-center text-sm font-medium text-charcoal hover:bg-charcoal hover:text-off-white"
          >
            Lihat Detail
          </Link>
          {isReady ? (
            <a
              href={buildWhatsAppUrl(
                equipmentWhatsAppMessage({ name: item.name, brand: item.brand, model: item.model })
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-md bg-success-green px-3 py-2 text-sm font-semibold text-white"
            >
              <MessageCircle size={15} />
              WA
            </a>
          ) : (
            <button
              type="button"
              disabled
              title="Unit sedang tidak tersedia"
              className="flex cursor-not-allowed items-center justify-center gap-1.5 rounded-md bg-steel-gray/30 px-3 py-2 text-sm font-semibold text-steel-gray"
            >
              <MessageCircle size={15} />
              WA
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
