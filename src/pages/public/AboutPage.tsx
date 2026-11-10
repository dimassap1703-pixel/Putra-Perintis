import { COMPANY } from '@/config/company';

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
          {COMPANY.name} hadir sebagai penyedia layanan penyewaan alat berat untuk mendukung
          berbagai kebutuhan proyek konstruksi dan infrastruktur. Kami berkomitmen memberikan
          kemudahan bagi pelanggan dalam menemukan unit alat berat sesuai kebutuhan pekerjaan.
        </p>

        <p className="mt-4 text-base leading-relaxed text-steel-gray">
          Kami memahami bahwa setiap proyek memiliki kebutuhan yang berbeda. Karena itu, kami
          berupaya menyediakan informasi ketersediaan unit yang jelas dan mudah diakses, sehingga
          pelanggan dapat merencanakan pekerjaan dengan lebih baik.
        </p>

        <div className="mt-10 rounded-lg border border-dashed border-steel-gray/30 bg-white p-6">
          <p className="text-sm text-steel-gray">
            <span className="font-semibold text-charcoal">Catatan untuk pemilik website:</span>{' '}
            Bagian ini dapat dilengkapi dengan informasi tambahan seperti sejarah perusahaan,
            jumlah armada, cakupan wilayah layanan, atau sertifikasi resmi setelah data tersebut
            tersedia. Jangan menampilkan informasi yang belum dapat dipastikan kebenarannya.
          </p>
        </div>
      </div>
    </div>
  );
}
