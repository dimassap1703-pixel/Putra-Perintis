import { supabase, EQUIPMENT_PHOTO_BUCKET } from '@/lib/supabase';
import type { Equipment, EquipmentFormInput } from '@/types/equipment';

/**
 * Mengambil unit yang dipublikasikan untuk website publik.
 * RLS database memastikan hanya unit is_published = true yang terbaca
 * oleh pengunjung anonim, sehingga query ini aman digunakan di halaman publik.
 */
export async function fetchPublishedEquipment(): Promise<Equipment[]> {
  const { data, error } = await supabase
    .from('equipment')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as Equipment[];
}

/**
 * Mengambil satu unit (hanya yang dipublikasikan) berdasarkan id, untuk
 * halaman detail publik.
 */
export async function fetchPublishedEquipmentById(id: string): Promise<Equipment | null> {
  const { data, error } = await supabase
    .from('equipment')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data as Equipment | null;
}

/**
 * Mengambil SELURUH unit (termasuk yang disembunyikan) — hanya bisa berhasil
 * jika pengguna yang login terverifikasi sebagai admin (lihat RLS).
 */
export async function fetchAllEquipmentForAdmin(): Promise<Equipment[]> {
  const { data, error } = await supabase
    .from('equipment')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as Equipment[];
}

export async function createEquipment(input: EquipmentFormInput): Promise<Equipment> {
  const { data, error } = await supabase.from('equipment').insert(input).select().single();
  if (error) throw new Error(error.message);
  return data as Equipment;
}

export async function updateEquipment(
  id: string,
  input: Partial<EquipmentFormInput>
): Promise<Equipment> {
  const { data, error } = await supabase
    .from('equipment')
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as Equipment;
}

export async function deleteEquipment(id: string): Promise<void> {
  const { error } = await supabase.from('equipment').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

/**
 * Mengunggah foto alat berat ke Supabase Storage dan mengembalikan URL publik.
 */
export async function uploadEquipmentPhoto(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `units/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(EQUIPMENT_PHOTO_BUCKET)
    .upload(filePath, file, { cacheControl: '3600', upsert: false });

  if (uploadError) throw new Error(uploadError.message);

  const { data } = supabase.storage.from(EQUIPMENT_PHOTO_BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}

/**
 * Menghapus foto lama dari Storage berdasarkan URL publiknya.
 * Hanya dipanggil ketika foto tersebut sudah tidak dipakai unit manapun.
 */
export async function deleteEquipmentPhotoByUrl(publicUrl: string): Promise<void> {
  const marker = `/${EQUIPMENT_PHOTO_BUCKET}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return;
  const path = publicUrl.substring(idx + marker.length);
  await supabase.storage.from(EQUIPMENT_PHOTO_BUCKET).remove([path]);
}

/**
 * Berlangganan perubahan realtime pada tabel equipment, agar katalog publik
 * dapat memperbarui status tanpa reload manual.
 */
export function subscribeToEquipmentChanges(onChange: () => void) {
  const channel = supabase
    .channel('equipment-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'equipment' }, onChange)
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
