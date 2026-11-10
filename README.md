# PUTRA PERINTIS — Website Penyewaan Alat Berat

Website perusahaan untuk **PUTRA PERINTIS**, penyedia jasa penyewaan alat berat.
Terdiri dari website publik (katalog alat berat) dan dashboard admin untuk
mengelola ketersediaan unit.

> **Tagline:** POWERING EVERY PROJECT.

---

## 1. Deskripsi Project

Website ini memiliki dua bagian utama:

1. **Website Publik** — menampilkan katalog alat berat, status ketersediaan,
   dan mengarahkan calon pelanggan untuk menghubungi perusahaan via WhatsApp.
2. **Dashboard Admin** — digunakan pemilik perusahaan untuk menambah, mengubah,
   menghapus, dan mengatur status ketersediaan unit tanpa perlu mengubah kode program.

Seluruh antarmuka menggunakan **Bahasa Indonesia**.

---

## 2. Fitur Website

- Katalog alat berat dinamis (data dari database, bukan hardcode)
- Pencarian, filter kategori, filter status, dan pengurutan
- Status ketersediaan (Tersedia / Tidak Tersedia) yang jelas dan akurat
- Integrasi WhatsApp dengan pesan otomatis dan dinamis per unit
- Dashboard admin dengan autentikasi aman (bukan pendaftaran publik)
- Pengelolaan unit (tambah/edit/hapus/sembunyikan) + pengelolaan foto
- Perubahan status admin langsung tersinkronisasi ke website publik (Supabase Realtime)
- Row Level Security (RLS) penuh di database
- Desain responsif mobile-first, animasi halus dengan Framer Motion

---

## 3. Teknologi yang Digunakan

| Bagian | Teknologi |
|---|---|
| Frontend | React.js, Vite, TypeScript, Tailwind CSS, Framer Motion, Lucide React |
| Backend & Database | Supabase (PostgreSQL, Auth, Storage, Realtime) |
| Deployment | Vercel (frontend), Supabase (backend) |

---

## 4. Persyaratan Instalasi

Sebelum memulai, pastikan sudah terpasang di Ubuntu:

```bash
node -v   # disarankan Node.js versi 18 atau lebih baru
npm -v
```

Jika Node.js belum terpasang:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

## 5. Cara Menjalankan di Ubuntu (Langkah Singkat)

```bash
# 1. Masuk ke folder project
cd putra-perintis

# 2. Install dependency
npm install

# 3. Salin file environment
cp .env.example .env.local
# lalu isi .env.local dengan kredensial Supabase Anda (lihat bagian 7)

# 4. Jalankan server pengembangan
npm run dev
```

Setelah berhasil, buka browser ke alamat yang ditampilkan Vite, biasanya:

```
http://localhost:5173
```

---

## 6. Cara Menginstal Dependency

Perintah `npm install` akan membaca `package.json` dan memasang seluruh
library yang dibutuhkan (React, Supabase client, Tailwind, Framer Motion, dll).
Jalankan ulang perintah ini setiap kali `package.json` berubah.

---

## 7. Cara Membuat Project Supabase

1. Buka https://supabase.com dan buat akun (jika belum punya).
2. Klik **New Project**, isi nama project (misalnya `putra-perintis`), pilih
   region terdekat (misalnya Singapore), dan buat password database yang kuat.
3. Setelah project selesai dibuat, buka menu **Project Settings → API**.
4. Salin nilai **Project URL** dan **anon public key**, lalu tempelkan ke
   file `.env.local`:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> **PENTING:** Jangan pernah menggunakan **Service Role Key** di frontend.
> Hanya gunakan **anon public key**.

---

## 8. Cara Menjalankan SQL Migration

1. Di dashboard Supabase, buka menu **SQL Editor**.
2. Buka file `supabase/migrations/0001_init_schema.sql` dari project ini,
   salin seluruh isinya, tempelkan ke SQL Editor, lalu klik **Run**.
   File ini akan membuat tabel `equipment`, tabel `admin_profiles`, index,
   trigger, fungsi `is_admin()`, dan seluruh kebijakan RLS.
3. **Sebelum** menjalankan bagian Storage Policy di bagian bawah file migration,
   buat terlebih dahulu bucket Storage (lihat bagian 12 di bawah).
4. (Opsional) Untuk mengisi data contoh/demo, jalankan isi file
   `supabase/seed.sql` dengan cara yang sama. **Hapus data ini melalui
   dashboard admin sebelum website digunakan secara resmi.**

---

## 9. Cara Mengatur Environment Variable

Semua environment variable disimpan di file `.env.local` (disalin dari
`.env.example`). File ini **tidak ikut ter-commit ke Git** (lihat `.gitignore`)
agar kredensial tidak bocor.

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Setiap mengubah file `.env.local`, restart server dengan `Ctrl+C` lalu
`npm run dev` kembali agar perubahan terbaca.

---

## 10. Cara Membuat Akun Administrator

Dashboard admin **tidak memiliki fitur pendaftaran publik** — ini disengaja
demi keamanan. Buat akun admin melalui dashboard Supabase:

1. Buka menu **Authentication → Users** di dashboard Supabase.
2. Klik **Add User**, isi email dan password untuk admin.
3. Setelah user berhasil dibuat, salin **User UID**-nya.
4. Buka **SQL Editor**, jalankan query berikut (ganti `UID_ADMIN` dengan UID
   yang baru disalin, dan isi nama jika diinginkan):

```sql
insert into public.admin_profiles (id, full_name)
values ('UID_ADMIN', 'Nama Administrator');
```

5. Admin tersebut sekarang dapat login melalui halaman `/admin/login`
   menggunakan email dan password yang didaftarkan di langkah 2.

---

## 11. Cara Mengatur Nomor WhatsApp dan Informasi Perusahaan

Semua informasi perusahaan diatur di **satu file**:

```
src/config/company.ts
```

Ubah nilai berikut sesuai data perusahaan Anda:

```ts
export const COMPANY = {
  name: 'PUTRA PERINTIS',
  whatsappNumber: '6281234567890', // format internasional, tanpa + spasi -
  email: 'info@putraperintis.co.id',
  address: 'Alamat lengkap perusahaan Anda',
  operationalHours: 'Senin–Sabtu, 08.00–17.00 WIB',
  googleMapsUrl: '', // tautan embed Google Maps (opsional)
  ...
};
```

---

## 12. Cara Mengganti Logo

1. Siapkan file logo resmi (disarankan format SVG atau PNG transparan).
2. Letakkan file di `public/images/company/`, misalnya `logo.svg`.
3. Buka `src/components/common/Logo.tsx` dan ganti elemen logo teks "PP"
   dengan:

```tsx
<img src="/images/company/logo.svg" alt="PUTRA PERINTIS" className="h-9" />
```

---

## 13. Cara Mengganti Foto Alat Berat

**Cara yang disarankan:** unggah langsung melalui Dashboard Admin
(`/admin/equipment` → Tambah/Edit Unit → Pilih Foto). Foto akan otomatis
tersimpan ke Supabase Storage.

**Membuat bucket Storage** (sekali saja, saat setup awal):

1. Di dashboard Supabase, buka **Storage → New Bucket**.
2. Beri nama bucket: `equipment-photos`.
3. Set sebagai **Public bucket**.
4. Setelah bucket dibuat, jalankan bagian "STORAGE POLICY" pada file
   `supabase/migrations/0001_init_schema.sql` (bagian paling bawah) di SQL Editor.

---

## 14. Cara Menjalankan Frontend (Development)

```bash
npm run dev
```

Buka alamat lokal yang ditampilkan di terminal (biasanya `http://localhost:5173`).

---

## 15. Cara Melakukan Build

```bash
npm run build
```

Perintah ini menjalankan pengecekan TypeScript (`tsc -b`) lalu membangun
versi produksi ke folder `dist/`. Perbaiki seluruh error yang muncul sebelum
melakukan deployment.

Untuk melihat hasil build secara lokal:

```bash
npm run preview
```

---

## 16. Cara Deployment ke Vercel

1. Push project ini ke repository GitHub/GitLab.
2. Buka https://vercel.com, login, lalu klik **Add New Project**.
3. Pilih repository project ini.
4. Pada bagian **Environment Variables**, tambahkan:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Klik **Deploy**. Vercel akan otomatis mendeteksi project Vite.
6. Setelah selesai, website dapat diakses melalui domain yang diberikan Vercel
   (atau domain kustom yang Anda hubungkan).

---

## 17. Cara Mengatasi Error Umum

| Masalah | Kemungkinan Penyebab & Solusi |
|---|---|
| Halaman blank / error "Failed to fetch" | `.env.local` belum diisi atau salah. Periksa kembali `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`. |
| Katalog tidak menampilkan data | Pastikan migration SQL sudah dijalankan dan ada data di tabel `equipment` dengan `is_published = true`. |
| Tidak bisa login admin | Pastikan akun sudah didaftarkan di Authentication **dan** sudah ditambahkan ke tabel `admin_profiles` (lihat bagian 10). |
| Admin bisa login tapi tidak bisa menambah/edit unit | Periksa apakah UID admin sudah benar dimasukkan ke `admin_profiles`, dan RLS sudah aktif sesuai migration. |
| Foto tidak muncul setelah upload | Pastikan bucket `equipment-photos` sudah dibuat sebagai **Public** dan storage policy sudah dijalankan. |
| `npm run build` gagal | Baca pesan error TypeScript yang muncul di terminal, biasanya menunjukkan file dan baris yang bermasalah. |
| Perubahan status tidak muncul otomatis di publik | Pastikan Realtime diaktifkan untuk tabel `equipment` di Supabase (**Database → Replication**). |

---

## Struktur Folder

```
putra-perintis/
├── public/
│   ├── images/{hero,equipment,company}/
│   └── favicon.svg
├── src/
│   ├── components/{layout,common,equipment,admin}/
│   ├── pages/{public,admin}/
│   ├── hooks/        → useEquipmentCatalog, useAdminEquipment
│   ├── contexts/      → AuthContext, ToastContext
│   ├── services/       → equipmentService.ts
│   ├── config/         → company.ts
│   ├── lib/            → supabase.ts
│   ├── types/          → equipment.ts
│   └── styles/         → index.css
├── supabase/
│   ├── migrations/0001_init_schema.sql
│   └── seed.sql
└── .env.example
```

---

## Catatan Penting

- Seluruh foto pada data demo (`supabase/seed.sql`) adalah **data contoh**,
  bukan dokumentasi armada asli PUTRA PERINTIS. Ganti melalui dashboard admin.
- Informasi kontak di `src/config/company.ts` masih berupa **placeholder** —
  wajib diisi dengan data resmi perusahaan sebelum website dipublikasikan.
- Jangan menyimpan Service Role Key atau password database di file manapun
  dalam repository ini.
