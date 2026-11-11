// =============================================================================
// KONFIGURASI PERUSAHAAN — PUTRA PERINTIS
// Satu-satunya tempat untuk mengubah informasi perusahaan (nomor WhatsApp,
// alamat, email, dsb). Jangan menuliskan informasi ini berulang di komponen
// lain — selalu import dari file ini.
//
// GANTI seluruh nilai "PLACEHOLDER" di bawah dengan data perusahaan yang
// sebenarnya sebelum website digunakan secara resmi.
// =============================================================================

export const COMPANY = {
  name: 'PUTRA PERINTIS',
  descriptor: 'HEAVY EQUIPMENT RENTAL',
  tagline: 'POWERING EVERY PROJECT.',

  // Format internasional TANPA tanda plus/spasi/strip, contoh: 6281234567890
  whatsappNumber: '6283891235144',

  email: 'putraperintis@gmail.com',
  address: 'Jl. Kp. Rancamalang, Kadu Sirung, Kec. Pagedangan, Kabupaten Tangerang, Banten 15336',
  operationalHours: 'Senin–Sabtu, 08.00–16.00 WIB',

  // Tautan embed Google Maps, kosongkan ("") jika belum tersedia.
  googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.5617984709943!2d106.60758137485571!3d-6.321142893668412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e31d9ae76f25%3A0xd3b95db4fe81738f!2sPUTRA%20PERINTIS%20RENTAL%20ALAT%20BERAT!5e0!3m2!1sid!2sid!4v1794381027424!5m2!1sid!2sid%22',

  // Tahun digunakan di footer sebagai cadangan jika Date() gagal dihitung.
  foundingYearPlaceholderNote:
    'Tahun berdiri belum ditentukan — jangan ditampilkan sampai data resmi tersedia.',
} as const;

/**
 * Membangun URL wa.me dengan pesan yang sudah di-encode.
 */
export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${encoded}`;
}

/**
 * Pesan WhatsApp umum (dipakai navbar & bagian kontak).
 */
export function generalWhatsAppMessage(): string {
  return `Halo ${COMPANY.name}, saya ingin menanyakan informasi mengenai penyewaan alat berat. Mohon informasinya. Terima kasih.`;
}

/**
 * Pesan WhatsApp khusus untuk satu unit alat berat.
 */
export function equipmentWhatsAppMessage(params: {
  name: string;
  brand?: string | null;
  model?: string | null;
}): string {
  const { name, brand, model } = params;
  const brandModel = [brand, model].filter(Boolean).join(' ');
  const detail = brandModel ? ` dengan merek ${brandModel}` : '';
  return `Halo ${COMPANY.name}, saya ingin menanyakan informasi penyewaan unit ${name}${detail}. Mohon informasi mengenai harga dan persyaratan penyewaannya. Terima kasih.`;
}
