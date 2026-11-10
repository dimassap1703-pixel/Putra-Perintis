import { useEffect, useMemo, useState } from 'react';
import { fetchPublishedEquipment, subscribeToEquipmentChanges } from '@/services/equipmentService';
import type { Equipment, EquipmentStatus } from '@/types/equipment';

export type SortOption = 'terbaru' | 'nama_az' | 'nama_za';

interface UseEquipmentCatalogResult {
  items: Equipment[];
  filtered: Equipment[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  category: string | 'semua';
  setCategory: (v: string | 'semua') => void;
  status: EquipmentStatus | 'semua';
  setStatus: (v: EquipmentStatus | 'semua') => void;
  sort: SortOption;
  setSort: (v: SortOption) => void;
  resetFilters: () => void;
  stats: { total: number; tersedia: number; tidakTersedia: number };
}

export function useEquipmentCatalog(): UseEquipmentCatalogResult {
  const [items, setItems] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<string | 'semua'>('semua');
  const [status, setStatus] = useState<EquipmentStatus | 'semua'>('semua');
  const [sort, setSort] = useState<SortOption>('terbaru');

  async function load() {
    try {
      setLoading(true);
      const data = await fetchPublishedEquipment();
      setItems(data);
      setError(null);
    } catch (err) {
      setError('Gagal memuat data alat berat. Silakan coba kembali.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // Dengarkan perubahan realtime agar status unit selalu terkini tanpa reload.
    const unsubscribe = subscribeToEquipmentChanges(load);
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    let result = [...items];

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          (item.brand ?? '').toLowerCase().includes(term) ||
          (item.model ?? '').toLowerCase().includes(term)
      );
    }

    if (category !== 'semua') {
      result = result.filter((item) => item.category === category);
    }

    if (status !== 'semua') {
      result = result.filter((item) => item.status === status);
    }

    if (sort === 'nama_az') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'nama_za') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return result;
  }, [items, searchTerm, category, status, sort]);

  function resetFilters() {
    setSearchTerm('');
    setCategory('semua');
    setStatus('semua');
    setSort('terbaru');
  }

  const stats = useMemo(
    () => ({
      total: items.length,
      tersedia: items.filter((i) => i.status === 'ready').length,
      tidakTersedia: items.filter((i) => i.status === 'not_ready').length,
    }),
    [items]
  );

  return {
    items,
    filtered,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    status,
    setStatus,
    sort,
    setSort,
    resetFilters,
    stats,
  };
}
