import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { EquipmentImage } from '@/components/common/EquipmentImage';
import { StatusBadge } from '@/components/equipment/StatusBadge';
import { LoadingState, ErrorState } from '@/components/common/StateViews';
import { fetchPublishedEquipmentById } from '@/services/equipmentService';
import { buildWhatsAppUrl, equipmentWhatsAppMessage } from '@/config/company';
import type { Equipment } from '@/types/equipment';

export function EquipmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchPublishedEquipmentById(id)
      .then((data) => setItem(data))
      .catch(() => setError('Gagal memuat detail alat berat. Silakan coba kembali.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="pt-28">
        <LoadingState label="Memuat detail alat berat..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container pt-28">
        <ErrorState message={error} />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container flex flex-col items-center gap-4 pt-32 text-center">
        <h1 className="font-heading text-2xl font-bold text-charcoal">
          Unit tidak ditemukan
        </h1>
        <p className="text-sm text-steel-gray">
          Unit ini mungkin sudah tidak tersedia atau belum dipublikasikan.
        </p>
        <Link to="/alat-berat" className="text-sm font-semibold text-pp-yellow">
          Kembali ke Daftar Alat Berat
        </Link>
      </div>
    );
  }

  const isReady = item.status === 'ready';

  return (
    <div className="bg-off-white pb-20 pt-28">
      <div className="container">
        <Link
          to="/alat-berat"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-steel-gray hover:text-charcoal"
        >
          <ArrowLeft size={16} />
          Kembali ke Daftar Alat Berat
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-steel-gray/15">
            <EquipmentImage
              src={item.image_url}
              alt={item.name}
              eager
              className="aspect-[4/3] w-full"
            />
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-pp-yellow">
              {item.category}
            </span>
            <h1 className="mt-2 font-heading text-3xl font-bold text-charcoal">{item.name}</h1>

            <div className="mt-3">
              <StatusBadge status={item.status} />
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 rounded-lg border border-steel-gray/15 bg-white p-5">
              <div>
                <dt className="text-xs text-steel-gray">Merek</dt>
                <dd className="font-medium text-charcoal">{item.brand || '—'}</dd>
              </div>
              <div>
                <dt className="text-xs text-steel-gray">Model</dt>
                <dd className="font-medium text-charcoal">{item.model || '—'}</dd>
              </div>
              <div>
                <dt className="text-xs text-steel-gray">Kapasitas</dt>
                <dd className="font-medium text-charcoal">{item.capacity || '—'}</dd>
              </div>
              <div>
                <dt className="text-xs text-steel-gray">Kategori</dt>
                <dd className="font-medium text-charcoal">{item.category}</dd>
              </div>
            </dl>

            {item.description && (
              <div className="mt-6">
                <h2 className="font-heading text-base font-semibold text-charcoal">Deskripsi</h2>
                <p className="mt-2 text-sm leading-relaxed text-steel-gray">{item.description}</p>
              </div>
            )}

            <div className="mt-8">
              {isReady ? (
                <a
                  href={buildWhatsAppUrl(
                    equipmentWhatsAppMessage({
                      name: item.name,
                      brand: item.brand,
                      model: item.model,
                    })
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-success-green px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white"
                >
                  <MessageCircle size={18} />
                  Hubungi via WhatsApp
                </a>
              ) : (
                <div className="rounded-md bg-danger-red/10 px-5 py-4 text-sm font-medium text-danger-red">
                  Maaf, unit ini sedang tidak tersedia.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
