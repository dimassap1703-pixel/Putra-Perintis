import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface EquipmentImageProps {
  src: string | null;
  alt: string;
  className?: string;
  eager?: boolean;
}

export function EquipmentImage({ src, alt, className = '', eager = false }: EquipmentImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center bg-steel-gray/10 ${className}`}>
        <ImageOff className="text-steel-gray/60" size={28} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
      className={`object-cover object-center ${className}`}
    />
  );
}
