import { Loader2, Inbox, AlertTriangle } from 'lucide-react';

export function LoadingState({ label = 'Memuat data...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-steel-gray">
      <Loader2 className="animate-spin motion-reduce:animate-none" size={28} />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function EmptyState({
  title = 'Belum ada data',
  description,
  action,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-steel-gray/40 py-16 text-center">
      <Inbox size={32} className="text-steel-gray" />
      <p className="font-heading text-base font-semibold text-charcoal">{title}</p>
      {description && <p className="max-w-sm text-sm text-steel-gray">{description}</p>}
      {action}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg bg-danger-red/5 py-16 text-center">
      <AlertTriangle size={28} className="text-danger-red" />
      <p className="text-sm font-medium text-danger-red">{message}</p>
    </div>
  );
}
