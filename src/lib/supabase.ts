import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // Peringatan ini muncul di console developer, bukan di tampilan pengguna,
  // agar developer tahu environment variable belum diisi.
  // eslint-disable-next-line no-console
  console.warn(
    '[PUTRA PERINTIS] VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY belum diatur. ' +
      'Salin .env.example menjadi .env.local dan isi dengan kredensial project Supabase Anda.'
  );
}

// PENTING: Hanya gunakan anon key di frontend. JANGAN PERNAH menaruh
// Service Role Key di sini atau di file frontend manapun.
export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '');

export const EQUIPMENT_PHOTO_BUCKET = 'equipment-photos';
