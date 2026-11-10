import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  fetchAllEquipmentForAdmin,
  createEquipment,
  updateEquipment,
  deleteEquipment,
} from '@/services/equipmentService';
import type { Equipment, EquipmentFormInput, EquipmentStatus } from '@/types/equipment';

export function useAdminEquipment() {
  const [items, setItems] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<string | 'semua'>('semua');
  const [status, setStatus] = useState<EquipmentStatus | 'semua'>('semua');

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchAllEquipmentForAdmin();
      setItems(data);
      setError(null);
    } catch {
      setError('Gagal memuat data unit. Silakan periksa koneksi dan coba kembali.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    let result = [...items];
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter((i) => i.name.toLowerCase().includes(term));
    }
    if (category !== 'semua') result = result.filter((i) => i.category === category);
    if (status !== 'semua') result = result.filter((i) => i.status === status);
    return result;
  }, [items, searchTerm, category, status]);

  const stats = useMemo(
    () => ({
      total: items.length,
      tersedia: items.filter((i) => i.status === 'ready').length,
      tidakTersedia: items.filter((i) => i.status === 'not_ready').length,
      ditampilkan: items.filter((i) => i.is_published).length,
    }),
    [items]
  );

  async function add(input: EquipmentFormInput) {
    await createEquipment(input);
    await load();
  }

  async function edit(id: string, input: Partial<EquipmentFormInput>) {
    await updateEquipment(id, input);
    await load();
  }

  async function remove(id: string) {
    await deleteEquipment(id);
    await load();
  }

  async function toggleStatus(item: Equipment) {
    const newStatus: EquipmentStatus = item.status === 'ready' ? 'not_ready' : 'ready';
    await updateEquipment(item.id, { status: newStatus });
    await load();
  }

  async function togglePublished(item: Equipment) {
    await updateEquipment(item.id, { is_published: !item.is_published });
    await load();
  }

  return {
    items,
    filtered,
    loading,
    error,
    stats,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    status,
    setStatus,
    add,
    edit,
    remove,
    toggleStatus,
    togglePublished,
    reload: load,
  };
}
