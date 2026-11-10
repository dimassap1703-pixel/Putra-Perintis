import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface Props {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Ya, Lanjutkan',
  danger = true,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className={danger ? 'text-danger-red' : 'text-pp-yellow'} size={24} />
              <div>
                <h3 className="font-heading text-base font-bold text-charcoal">{title}</h3>
                <p className="mt-1 text-sm text-steel-gray">{description}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="rounded-md border border-steel-gray/25 px-4 py-2 text-sm font-medium text-charcoal"
              >
                Batal
              </button>
              <button
                onClick={onConfirm}
                className={`rounded-md px-4 py-2 text-sm font-semibold text-white ${
                  danger ? 'bg-danger-red' : 'bg-pp-yellow text-deep-black'
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
