import type { ReactNode } from 'react';
import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import { COMPANY, buildWhatsAppUrl, generalWhatsAppMessage } from '@/config/company';

export function ContactPage() {
  const hasMap = Boolean(COMPANY.googleMapsUrl);

  return (
    <div className="bg-off-white pb-20 pt-28">
      <div className="container">
        <span className="text-xs font-semibold uppercase tracking-widest text-pp-yellow">
          Hubungi Kami
        </span>
        <h1 className="mt-2 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
          Kami Siap Membantu Kebutuhan Proyek Anda
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <InfoRow icon={MessageCircle} label="WhatsApp" value="Klik tombol di bawah untuk memulai percakapan">
              <a
                href={buildWhatsAppUrl(generalWhatsAppMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 rounded-md bg-success-green px-5 py-3 text-sm font-semibold text-white"
              >
                <MessageCircle size={16} />
                Hubungi via WhatsApp
              </a>
            </InfoRow>

            <InfoRow icon={Mail} label="Email" value={COMPANY.email} />
            <InfoRow icon={MapPin} label="Alamat" value={COMPANY.address} />
            <InfoRow icon={Clock} label="Jam Operasional" value={COMPANY.operationalHours} />
          </div>

          <div className="overflow-hidden rounded-lg border border-steel-gray/15 bg-white">
            {hasMap ? (
              <iframe
                src={COMPANY.googleMapsUrl}
                className="h-full min-h-[320px] w-full"
                loading="lazy"
                title="Lokasi PUTRA PERINTIS"
              />
            ) : (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-2 p-6 text-center text-steel-gray">
                <MapPin size={28} />
                <p className="text-sm">
                  Tautan lokasi Google Maps belum diatur. Tambahkan melalui
                  <code className="mx-1 rounded bg-steel-gray/10 px-1.5 py-0.5 text-xs">
                    src/config/company.ts
                  </code>
                  pada field <code className="text-xs">googleMapsUrl</code>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  children,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-lg border border-steel-gray/15 bg-white p-5">
      <Icon className="mt-0.5 shrink-0 text-pp-yellow" size={22} />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-steel-gray">{label}</p>
        <p className="mt-1 text-sm font-medium text-charcoal">{value}</p>
        {children}
      </div>
    </div>
  );
}
