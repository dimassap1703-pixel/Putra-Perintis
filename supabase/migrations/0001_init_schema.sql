-- =========================================================================
-- MIGRATION: 0001_init_schema.sql
-- PROJECT  : PUTRA PERINTIS — Heavy Equipment Rental
-- TUJUAN   : Membuat tabel equipment, tabel admin_profiles, trigger, index,
--            dan Row Level Security (RLS) lengkap.
-- =========================================================================

-- Pastikan ekstensi untuk UUID tersedia
create extension if not exists "pgcrypto";

-- -------------------------------------------------------------------------
-- 1. TABEL equipment
-- -------------------------------------------------------------------------
create table if not exists public.equipment (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  category      text not null,
  brand         text,
  model         text,
  capacity      text,
  description   text,
  image_url     text,
  status        text not null default 'not_ready'
                  check (status in ('ready', 'not_ready')),
  is_published  boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.equipment is 'Data unit alat berat yang disewakan oleh PUTRA PERINTIS';
comment on column public.equipment.status is 'ready = Tersedia, not_ready = Tidak Tersedia';
comment on column public.equipment.is_published is 'Menentukan apakah unit ditampilkan di website publik';

-- -------------------------------------------------------------------------
-- 2. INDEX
-- -------------------------------------------------------------------------
create index if not exists idx_equipment_category     on public.equipment (category);
create index if not exists idx_equipment_status        on public.equipment (status);
create index if not exists idx_equipment_is_published  on public.equipment (is_published);
create index if not exists idx_equipment_created_at    on public.equipment (created_at desc);

-- -------------------------------------------------------------------------
-- 3. TRIGGER updated_at otomatis
-- -------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_equipment_updated_at on public.equipment;
create trigger trg_equipment_updated_at
  before update on public.equipment
  for each row
  execute function public.set_updated_at();

-- -------------------------------------------------------------------------
-- 4. TABEL admin_profiles (role administrator, terhubung ke auth.users)
--    Hak admin TIDAK boleh ditentukan dari metadata yang bisa diedit sendiri
--    oleh pengguna, sehingga dibuat tabel terpisah yang hanya bisa diisi
--    melalui proses provisioning (lihat README bagian "Membuat Akun Admin").
-- -------------------------------------------------------------------------
create table if not exists public.admin_profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text,
  created_at  timestamptz not null default now()
);

comment on table public.admin_profiles is 'Daftar pengguna yang diberi hak akses sebagai administrator dashboard';

-- Fungsi bantu: mengecek apakah user yang sedang login adalah admin terverifikasi
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.admin_profiles ap where ap.id = auth.uid()
  );
$$ language sql stable security definer set search_path = public;

-- -------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY
-- -------------------------------------------------------------------------
alter table public.equipment enable row level security;
alter table public.admin_profiles enable row level security;

-- Hapus policy lama jika migration dijalankan ulang
drop policy if exists "Publik dapat membaca unit yang dipublikasikan" on public.equipment;
drop policy if exists "Admin dapat membaca seluruh unit"              on public.equipment;
drop policy if exists "Admin dapat menambah unit"                     on public.equipment;
drop policy if exists "Admin dapat mengubah unit"                     on public.equipment;
drop policy if exists "Admin dapat menghapus unit"                    on public.equipment;

-- (1) Pengunjung publik HANYA boleh membaca unit yang is_published = true
create policy "Publik dapat membaca unit yang dipublikasikan"
  on public.equipment
  for select
  to anon
  using (is_published = true);

-- Admin boleh membaca seluruh data, termasuk yang belum dipublikasikan
create policy "Admin dapat membaca seluruh unit"
  on public.equipment
  for select
  to authenticated
  using (public.is_admin());

-- (5) Admin terverifikasi boleh menambahkan unit
create policy "Admin dapat menambah unit"
  on public.equipment
  for insert
  to authenticated
  with check (public.is_admin());

-- (6) Admin terverifikasi boleh mengubah unit
create policy "Admin dapat mengubah unit"
  on public.equipment
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- (7) Admin terverifikasi boleh menghapus unit
create policy "Admin dapat menghapus unit"
  on public.equipment
  for delete
  to authenticated
  using (public.is_admin());

-- Catatan: Tidak ada policy insert/update/delete untuk role "anon",
-- sehingga pengunjung publik tidak dapat menambah, mengubah, atau
-- menghapus data unit (poin 2, 3, 4 pada ketentuan keamanan).

-- admin_profiles: hanya admin yang bisa melihat daftar admin (opsional, dibatasi ketat)
drop policy if exists "Admin dapat melihat profil admin" on public.admin_profiles;
create policy "Admin dapat melihat profil admin"
  on public.admin_profiles
  for select
  to authenticated
  using (public.is_admin());

-- Tidak ada policy insert/update/delete publik pada admin_profiles.
-- Penambahan admin baru dilakukan melalui SQL editor Supabase oleh pemilik
-- project (service role), BUKAN melalui aplikasi frontend.

-- -------------------------------------------------------------------------
-- 6. STORAGE POLICY untuk bucket foto alat berat
--    Jalankan ini setelah membuat bucket "equipment-photos" (lihat README).
-- -------------------------------------------------------------------------
drop policy if exists "Publik dapat melihat foto alat berat" on storage.objects;
drop policy if exists "Admin dapat mengunggah foto alat berat" on storage.objects;
drop policy if exists "Admin dapat memperbarui foto alat berat" on storage.objects;
drop policy if exists "Admin dapat menghapus foto alat berat" on storage.objects;

create policy "Publik dapat melihat foto alat berat"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'equipment-photos');

create policy "Admin dapat mengunggah foto alat berat"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'equipment-photos' and public.is_admin());

create policy "Admin dapat memperbarui foto alat berat"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'equipment-photos' and public.is_admin());

create policy "Admin dapat menghapus foto alat berat"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'equipment-photos' and public.is_admin());
