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
  whatsappNumber: 'PLACEHOLDER_NOMOR_WHATSAPP',

  email: 'PLACEHOLDER_EMAIL@putraperintis.co.id',
  address: 'PLACEHOLDER_ALAMAT_LENGKAP_PERUSAHAAN',
  operationalHours: 'Senin–Sabtu, 08.00–17.00 WIB (PLACEHOLDER)',

  // Tautan embed Google Maps, kosongkan ("") jika belum tersedia.
  googleMapsUrl: '',

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
