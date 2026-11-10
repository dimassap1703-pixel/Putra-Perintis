import { Search, ClipboardCheck, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    icon: Search,
    title: '1. Pilih Alat Berat',
    description: 'Jelajahi katalog dan pilih unit alat berat yang sesuai dengan kebutuhan proyek Anda.',
  },
  {
    icon: ClipboardCheck,
    title: '2. Periksa Ketersediaan Unit',
    description: 'Lihat status ketersediaan unit secara langsung sebelum menghubungi kami.',
  },
  {
    icon: MessageCircle,
    title: '3. Hubungi PUTRA PERINTIS via WhatsApp',
    description: 'Kirim pesan melalui WhatsApp untuk menanyakan harga dan persyaratan penyewaan.',
  },
];

export function HowToRentSteps({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const isDark = variant === 'dark';

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {STEPS.map((step, idx) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: idx * 0.1 }}
          className={`rounded-lg border p-6 ${
            isDark ? 'border-white/10 bg-white/5' : 'border-steel-gray/15 bg-white shadow-sm'
          }`}
        >
          <step.icon className="text-pp-yellow" size={30} />
          <h3
            className={`mt-4 font-heading text-lg font-bold ${
              isDark ? 'text-off-white' : 'text-charcoal'
            }`}
          >
            {step.title}
          </h3>
          <p className={`mt-2 text-sm ${isDark ? 'text-off-white/60' : 'text-steel-gray'}`}>
            {step.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
