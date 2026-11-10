import { useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, X, UploadCloud } from 'lucide-react';
import { EQUIPMENT_CATEGORIES } from '@/types/equipment';
import type { Equipment, EquipmentFormInput, EquipmentStatus } from '@/types/equipment';
import { uploadEquipmentPhoto, deleteEquipmentPhotoByUrl } from '@/services/equipmentService';
import { useToast } from '@/contexts/ToastContext';

const MAX_FILE_SIZE_MB = 5;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

interface Props {
  open: boolean;
  editingItem: Equipment | null;
  onClose: () => void;
  onSubmit: (input: EquipmentFormInput, previousImageUrl?: string | null) => Promise<void>;
}

const emptyForm: EquipmentFormInput = {
  name: '',
  category: EQUIPMENT_CATEGORIES[0],
  brand: '',
  model: '',
  capacity: '',
  description: '',
  image_url: null,
  status: 'not_ready' as EquipmentStatus,
  is_published: true,
};

export function EquipmentFormModal({ open, editingItem, onClose, onSubmit }: Props) {
  const { showToast } = useToast();
  const [form, setForm] = useState<EquipmentFormInput>(emptyForm);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editingItem) {
      const { id, created_at, updated_at, ...rest } = editingItem;
      setForm(rest);
      setPreviewUrl(editingItem.image_url);
    } else {
      setForm(emptyForm);
      setPreviewUrl(null);
    }
    setFile(null);
    setErrors({});
  }, [editingItem, open]);

  function validate(): boolean {
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = 'Nama alat wajib diisi.';
    if (!form.category) nextErrors.category = 'Kategori wajib dipilih.';
    if (!form.status) nextErrors.status = 'Status wajib dipilih.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleFileChange(selected: File | undefined) {
    if (!selected) return;
    if (!ACCEPTED_TYPES.includes(selected.type)) {
      showToast('Format gambar harus JPG, PNG, atau WEBP.', 'error');
      return;
    }
    if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      showToast(`Ukuran gambar maksimal ${MAX_FILE_SIZE_MB}MB.`, 'error');
      return;
    }
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      let imageUrl = form.image_url;
      const previousImageUrl = editingItem?.image_url ?? null;

      if (file) {
        setUploading(true);
        imageUrl = await uploadEquipmentPhoto(file);
        setUploading(false);
      }

      await onSubmit({ ...form, image_url: imageUrl }, previousImageUrl);

      // Bersihkan foto lama jika diganti dengan foto baru.
      if (file && previousImageUrl && previousImageUrl !== imageUrl) {
        await deleteEquipmentPhotoByUrl(previousImageUrl).catch(() => {});
      }

      showToast(
        editingItem ? 'Perubahan berhasil disimpan.' : 'Data alat berat berhasil ditambahkan.'
      );
      onClose();
    } catch (err) {
      showToast('Terjadi kesalahan. Silakan coba kembali.', 'error');
    } finally {
      setSaving(false);
      setUploading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-xl bg-white sm:rounded-xl"
          >
            <div className="flex items-center justify-between border-b border-steel-gray/15 px-6 py-4">
              <h2 className="font-heading text-lg font-bold text-charcoal">
                {editingItem ? 'Edit Unit' : 'Tambah Unit'}
              </h2>
              <button onClick={onClose} aria-label="Tutup formulir">
                <X size={20} className="text-steel-gray" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
              <Field label="Nama Alat" error={errors.name} required>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-admin"
                  placeholder="Contoh: Excavator PC200"
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Kategori" error={errors.category} required>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="input-admin"
                  >
                    {EQUIPMENT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Status Ketersediaan" error={errors.status} required>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as EquipmentStatus })}
                    className="input-admin"
                  >
                    <option value="ready">Tersedia</option>
                    <option value="not_ready">Tidak Tersedia</option>
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Merek">
                  <input
                    value={form.brand ?? ''}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    className="input-admin"
                  />
                </Field>
                <Field label="Model">
                  <input
                    value={form.model ?? ''}
                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                    className="input-admin"
                  />
                </Field>
              </div>

              <Field label="Kapasitas">
                <input
                  value={form.capacity ?? ''}
                  onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                  className="input-admin"
                  placeholder="Contoh: 20 Ton"
                />
              </Field>

              <Field label="Deskripsi Singkat">
                <textarea
                  value={form.description ?? ''}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="input-admin resize-none"
                />
              </Field>

              <Field label="Foto Alat Berat">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-28 shrink-0 overflow-hidden rounded-md border border-steel-gray/20 bg-steel-gray/5">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Pratinjau" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-steel-gray/50">
                        <UploadCloud size={22} />
                      </div>
                    )}
                  </div>
                  <label className="cursor-pointer rounded-md border border-steel-gray/25 px-4 py-2 text-sm font-medium text-charcoal hover:bg-steel-gray/5">
                    Pilih Foto
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => handleFileChange(e.target.files?.[0])}
                    />
                  </label>
                </div>
                <p className="mt-1.5 text-xs text-steel-gray">
                  Format JPG/PNG/WEBP, maksimal {MAX_FILE_SIZE_MB}MB.
                </p>
              </Field>

              <label className="flex items-center gap-2 text-sm text-charcoal">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                  className="h-4 w-4 rounded border-steel-gray/40 text-pp-yellow focus:ring-pp-yellow"
                />
                Tampilkan di website
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md border border-steel-gray/25 px-5 py-2.5 text-sm font-medium text-charcoal"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-md bg-pp-yellow px-5 py-2.5 text-sm font-bold text-deep-black disabled:opacity-60"
                >
                  {saving && <Loader2 className="animate-spin" size={16} />}
                  {uploading
                    ? 'Mengunggah foto...'
                    : editingItem
                      ? 'Simpan Perubahan'
                      : 'Simpan Unit'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-charcoal">
        {label} {required && <span className="text-danger-red">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-danger-red">{error}</p>}
    </div>
  );
}
