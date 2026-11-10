// Tipe data yang merepresentasikan satu unit alat berat di database.

export type EquipmentStatus = 'ready' | 'not_ready';

export interface Equipment {
  id: string;
  name: string;
  category: string;
  brand: string | null;
  model: string | null;
  capacity: string | null;
  description: string | null;
  image_url: string | null;
  status: EquipmentStatus;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

// Payload yang dikirim saat menambah/mengubah unit dari form admin.
export type EquipmentFormInput = Omit<Equipment, 'id' | 'created_at' | 'updated_at'>;

// Daftar kategori default. Dapat disesuaikan oleh developer/administrator.
export const EQUIPMENT_CATEGORIES = [
  'Excavator',
  'Bulldozer',
  'Wheel Loader',
  'Dump Truck',
  'Crane',
  'Vibro Roller',
  'Motor Grader',
  'Forklift',
] as const;

export const STATUS_LABEL: Record<EquipmentStatus, string> = {
  ready: 'Tersedia',
  not_ready: 'Tidak Tersedia',
};
