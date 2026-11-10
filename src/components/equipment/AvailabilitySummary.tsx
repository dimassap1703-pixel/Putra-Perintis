import { Boxes, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  total: number;
  tersedia: number;
  tidakTersedia: number;
}

const items = (p: Props) => [
  { label: 'Total Unit', value: p.total, icon: Boxes, color: 'text-charcoal' },
  { label: 'Unit Tersedia', value: p.tersedia, icon: CheckCircle2, color: 'text-success-green' },
  { label: 'Unit Tidak Tersedia', value: p.tidakTersedia, icon: XCircle, color: 'text-danger-red' },
];

export function AvailabilitySummary(props: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items(props).map((item, idx) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: idx * 0.08 }}
          className="flex items-center gap-4 rounded-lg border border-steel-gray/15 bg-white p-5 shadow-sm"
        >
          <item.icon className={item.color} size={28} />
          <div>
            <p className="font-heading text-2xl font-bold text-charcoal">{item.value}</p>
            <p className="text-sm text-steel-gray">{item.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
