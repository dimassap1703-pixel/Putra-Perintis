import { CheckCircle2, AlertCircle } from 'lucide-react';
import type { EquipmentStatus } from '@/types/equipment';
import { STATUS_LABEL } from '@/types/equipment';

export function StatusBadge({ status }: { status: EquipmentStatus }) {
  const isReady = status === 'ready';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        isReady
          ? 'bg-success-green/10 text-success-green'
          : 'bg-danger-red/10 text-danger-red'
      }`}
    >
      {isReady ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
      {STATUS_LABEL[status]}
    </span>
  );
}
