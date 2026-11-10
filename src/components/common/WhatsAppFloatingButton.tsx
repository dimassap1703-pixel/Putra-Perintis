import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, generalWhatsAppMessage } from '@/config/company';

export function WhatsAppFloatingButton() {
  return (
    <a
      href={buildWhatsAppUrl(generalWhatsAppMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi kami via WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-success-green text-white shadow-lg transition-transform hover:scale-105 motion-reduce:transition-none"
    >
      <MessageCircle size={26} />
    </a>
  );
}
