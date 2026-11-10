-- =========================================================================
-- UPDATE FOTO DEMO — PUTRA PERINTIS
-- Nama tabel yang benar: "equipment" (bukan "alat_berat")
-- Nama kolom kategori yang benar: "category" (bukan "kategori")
-- Jalankan di Supabase SQL Editor.
-- =========================================================================

UPDATE public.equipment
SET image_url = 'https://images.unsplash.com/photo-1580901369227-30f5b8752ae8?auto=format&fit=crop&w=800&q=80'
WHERE category ILIKE '%excavator%';

UPDATE public.equipment
SET image_url = 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80'
WHERE category ILIKE '%bulldozer%';

UPDATE public.equipment
SET image_url = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
WHERE category ILIKE '%crane%';

UPDATE public.equipment
SET image_url = 'https://images.unsplash.com/photo-1579488040477-3c72173172e2?auto=format&fit=crop&w=800&q=80'
WHERE category ILIKE '%loader%';

UPDATE public.equipment
SET image_url = 'https://images.unsplash.com/photo-1591638246122-c4c0fe9e8a5e?auto=format&fit=crop&w=800&q=80'
WHERE category ILIKE '%dump truck%';

UPDATE public.equipment
SET image_url = 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80'
WHERE category ILIKE '%vibro%' OR category ILIKE '%roller%';

UPDATE public.equipment
SET image_url = 'https://images.unsplash.com/photo-1621922263966-a917fb3d64f0?auto=format&fit=crop&w=800&q=80'
WHERE category ILIKE '%grader%';

UPDATE public.equipment
SET image_url = 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80'
WHERE category ILIKE '%forklift%';