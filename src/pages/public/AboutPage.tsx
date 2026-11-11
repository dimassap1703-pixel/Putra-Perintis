import { Zap, Eye, MessageCircle } from 'lucide-react';
import { COMPANY, buildWhatsAppUrl, generalWhatsAppMessage } from '@/config/company';

const VALUES = [
  {
    icon: Zap,
    title: 'Respon Cepat',
    description: 'Pertanyaan dan kebutuhan Anda kami tanggapi secepat mungkin melalui WhatsApp.',
  },
  {
    icon: Eye,
    title: 'Informasi Transparan',
    description: 'Status ketersediaan unit selalu jelas, akurat, dan mudah dicek kapan saja.',
  },
  {
    icon: MessageCircle,
    title: 'Mudah Dihubungi',
    description: 'Tidak perlu proses rumit, cukup satu pesan WhatsApp untuk memulai.',
  },
];

export function AboutPage() {
  return (
    <div className="bg-off-white pb-20 pt-28">
      <div className="container max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-pp-yellow">
          Tentang Kami
        </span>
        <h1 className="mt-2 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
          Mengenal {COMPANY.name}
        </h1>

        <p className="mt-6 text-base leading-relaxed text-steel-gray">
          Di balik setiap proyek konstruksi yang berjalan lancar, ada alat berat yang tepat di
          waktu yang tepat. Itu yang {COMPANY.name} tawarkan: layanan penyewaan alat berat yang
          mengutamakan kejelasan ketersediaan unit, kecepatan respons, dan kemudahan komunikasi.
        </p>

        <p className="mt-4 text-base leading-relaxed text-steel-gray">
          Kami memahami bahwa setiap proyek memiliki kebutuhan dan jadwal yang berbeda. Karena
          itu, kami berupaya memastikan Anda bisa fokus menyelesaikan pekerjaan, bukan
          menghabiskan waktu mencari-cari alat.
        </p>
      </div>

      {/* Nilai-nilai kami */}
      <div className="container mt-14 max-w-5xl">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="rounded-lg border border-steel-gray/15 bg-white p-6 shadow-sm"
            >
              <value.icon className="text-pp-yellow" size={28} />
              <h3 className="mt-4 font-heading text-base font-bold text-charcoal">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-gray">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ajakan hubungi */}
      <div className="container mt-14 max-w-3xl">
        <div className="flex flex-col items-start gap-4 rounded-lg bg-charcoal p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-heading text-lg font-bold text-off-white">
              Ada kebutuhan alat berat untuk proyek Anda?
            </h3>
            <p className="mt-1 text-sm text-off-white/60">
              Hubungi kami sekarang, kami siap membantu.
            </p>
          </div>
          <a
            href={buildWhatsAppUrl(generalWhatsAppMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-pp-yellow px-5 py-3 text-sm font-bold uppercase tracking-wide text-deep-black"
          >
            <MessageCircle size={18} />
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}