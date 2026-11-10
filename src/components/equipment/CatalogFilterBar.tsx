import { Search, RotateCcw } from 'lucide-react';
import { EQUIPMENT_CATEGORIES } from '@/types/equipment';
import type { EquipmentStatus } from '@/types/equipment';
import type { SortOption } from '@/hooks/useEquipmentCatalog';

interface Props {
  searchTerm: string;
  onSearchTermChange: (v: string) => void;
  category: string | 'semua';
  onCategoryChange: (v: string | 'semua') => void;
  status: EquipmentStatus | 'semua';
  onStatusChange: (v: EquipmentStatus | 'semua') => void;
  sort: SortOption;
  onSortChange: (v: SortOption) => void;
  onReset: () => void;
  resultCount: number;
}

export function CatalogFilterBar({
  searchTerm,
  onSearchTermChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
  onReset,
  resultCount,
}: Props) {
  return (
    <div className="rounded-lg border border-steel-gray/15 bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr_1fr_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-gray" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            placeholder="Cari nama alat, merek, atau model..."
            className="w-full rounded-md border border-steel-gray/25 py-2 pl-10 pr-3 text-sm focus:border-pp-yellow focus:outline-none focus:ring-1 focus:ring-pp-yellow"
          />
        </div>

        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-md border border-steel-gray/25 px-3 py-2 text-sm focus:border-pp-yellow focus:outline-none"
        >
          <option value="semua">Semua Kategori</option>
          {EQUIPMENT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value as EquipmentStatus | 'semua')}
          className="rounded-md border border-steel-gray/25 px-3 py-2 text-sm focus:border-pp-yellow focus:outline-none"
        >
          <option value="semua">Semua Status</option>
          <option value="ready">Tersedia</option>
          <option value="not_ready">Tidak Tersedia</option>
        </select>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="rounded-md border border-steel-gray/25 px-3 py-2 text-sm focus:border-pp-yellow focus:outline-none"
        >
          <option value="terbaru">Terbaru</option>
          <option value="nama_az">Nama A-Z</option>
          <option value="nama_za">Nama Z-A</option>
        </select>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center justify-center gap-1.5 rounded-md border border-steel-gray/25 px-3 py-2 text-sm font-medium text-steel-gray hover:bg-steel-gray/5"
        >
          <RotateCcw size={15} />
          Reset
        </button>
      </div>

      <p className="mt-3 text-xs text-steel-gray">
        Menampilkan <span className="font-semibold text-charcoal">{resultCount}</span> unit
      </p>
    </div>
  );
}
