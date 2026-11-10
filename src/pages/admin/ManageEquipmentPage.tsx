import { useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, Search } from 'lucide-react';
import { EquipmentImage } from '@/components/common/EquipmentImage';
import { StatusBadge } from '@/components/equipment/StatusBadge';
import { LoadingState, ErrorState, EmptyState } from '@/components/common/StateViews';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { EquipmentFormModal } from '@/components/admin/EquipmentFormModal';
import { useAdminEquipment } from '@/hooks/useAdminEquipment';
import { useToast } from '@/contexts/ToastContext';
import { EQUIPMENT_CATEGORIES } from '@/types/equipment';
import type { Equipment, EquipmentStatus } from '@/types/equipment';

export function ManageEquipmentPage() {
  const {
    filtered,
    loading,
    error,
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
  } = useAdminEquipment();
  const { showToast } = useToast();

  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Equipment | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Equipment | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  function openAddForm() {
    setEditingItem(null);
    setFormOpen(true);
  }

  function openEditForm(item: Equipment) {
    setEditingItem(item);
    setFormOpen(true);
  }

  async function handleFormSubmit(input: Parameters<typeof add>[0]) {
    if (editingItem) {
      await edit(editingItem.id, input);
    } else {
      await add(input);
    }
  }

  async function handleDeleteConfirmed() {
    if (!deleteTarget) return;
    try {
      await remove(deleteTarget.id);
      showToast('Unit berhasil dihapus.');
    } catch {
      showToast('Terjadi kesalahan. Silakan coba kembali.', 'error');
    } finally {
      setDeleteTarget(null);
    }
  }

  async function handleToggleStatus(item: Equipment) {
    setBusyId(item.id);
    try {
      await toggleStatus(item);
      showToast('Status ketersediaan berhasil diperbarui.');
    } catch {
      showToast('Terjadi kesalahan. Silakan coba kembali.', 'error');
    } finally {
      setBusyId(null);
    }
  }

  async function handleTogglePublished(item: Equipment) {
    setBusyId(item.id);
    try {
      await togglePublished(item);
      showToast(
        item.is_published ? 'Unit disembunyikan dari website.' : 'Unit ditampilkan di website.'
      );
    } catch {
      showToast('Terjadi kesalahan. Silakan coba kembali.', 'error');
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-charcoal">Kelola Alat Berat</h1>
          <p className="mt-1 text-sm text-steel-gray">
            Tambah, ubah, atau hapus data unit alat berat.
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 rounded-md bg-pp-yellow px-4 py-2.5 text-sm font-bold text-deep-black"
        >
          <Plus size={18} />
          Tambah Unit
        </button>
      </div>

      {/* Filter */}
      <div className="mt-6 grid gap-3 rounded-lg border border-steel-gray/15 bg-white p-4 sm:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-gray" size={16} />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama unit..."
            className="w-full rounded-md border border-steel-gray/25 py-2 pl-9 pr-3 text-sm focus:border-pp-yellow focus:outline-none"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-md border border-steel-gray/25 px-3 py-2 text-sm"
        >
          <option value="semua">Semua Kategori</option>
          {EQUIPMENT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as EquipmentStatus | 'semua')}
          className="rounded-md border border-steel-gray/25 px-3 py-2 text-sm"
        >
          <option value="semua">Semua Status</option>
          <option value="ready">Tersedia</option>
          <option value="not_ready">Tidak Tersedia</option>
        </select>
      </div>

      {/* Tabel */}
      <div className="mt-6 overflow-x-auto rounded-lg border border-steel-gray/15 bg-white">
        {loading ? (
          <LoadingState label="Memuat data unit..." />
        ) : error ? (
          <ErrorState message={error} />
        ) : filtered.length === 0 ? (
          <div className="p-6">
            <EmptyState
              title="Belum ada unit"
              description="Klik tombol Tambah Unit untuk mulai menambahkan data alat berat."
            />
          </div>
        ) : (
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-steel-gray/15 bg-off-white/60 text-xs uppercase text-steel-gray">
              <tr>
                <th className="px-4 py-3 font-semibold">Unit</th>
                <th className="px-4 py-3 font-semibold">Kategori</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Tampil di Website</th>
                <th className="px-4 py-3 text-right font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-gray/10">
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-16 shrink-0 overflow-hidden rounded-md">
                        <EquipmentImage src={item.image_url} alt={item.name} className="h-full w-full" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-charcoal">{item.name}</p>
                        <p className="truncate text-xs text-steel-gray">
                          {[item.brand, item.model].filter(Boolean).join(' • ') || '—'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-steel-gray">{item.category}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggleStatus(item)}
                      disabled={busyId === item.id}
                      className="disabled:opacity-50"
                      title="Klik untuk mengubah status"
                    >
                      <StatusBadge status={item.status} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleTogglePublished(item)}
                      disabled={busyId === item.id}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold disabled:opacity-50 ${
                        item.is_published
                          ? 'bg-steel-gray/10 text-charcoal'
                          : 'bg-steel-gray/10 text-steel-gray'
                      }`}
                    >
                      {item.is_published ? <Eye size={13} /> : <EyeOff size={13} />}
                      {item.is_published ? 'Tampil' : 'Disembunyikan'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditForm(item)}
                        title="Edit unit"
                        className="rounded-md p-2 text-steel-gray hover:bg-steel-gray/10 hover:text-charcoal"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(item)}
                        title="Hapus unit"
                        className="rounded-md p-2 text-steel-gray hover:bg-danger-red/10 hover:text-danger-red"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <EquipmentFormModal
        open={formOpen}
        editingItem={editingItem}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Hapus Unit"
        description={`Apakah Anda yakin ingin menghapus unit "${deleteTarget?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, Hapus"
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
