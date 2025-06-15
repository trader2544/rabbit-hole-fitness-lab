
-- Create storage buckets for product images and resources
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('product-images', 'product-images', true, 10485760, '{"image/*"}'),
  ('resources', 'resources', true, 52428800, '{"application/pdf","image/*","video/*","audio/*"}');

-- Create policies for product images bucket
CREATE POLICY "Anyone can view product images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Admins can upload product images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'product-images' AND 
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

CREATE POLICY "Admins can update product images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'product-images' AND 
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

CREATE POLICY "Admins can delete product images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'product-images' AND 
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

-- Create policies for resources bucket
CREATE POLICY "Anyone can view resources" ON storage.objects
  FOR SELECT USING (bucket_id = 'resources');

CREATE POLICY "Admins can upload resources" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'resources' AND 
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

CREATE POLICY "Admins can update resources" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'resources' AND 
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

CREATE POLICY "Admins can delete resources" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'resources' AND 
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

-- Create resources table for the free resources library
CREATE TABLE public.resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS to resources table
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view resources" ON public.resources
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage resources" ON public.resources
  FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- Add customer info columns to orders table
ALTER TABLE public.orders ADD COLUMN customer_name TEXT;
ALTER TABLE public.orders ADD COLUMN customer_email TEXT;
ALTER TABLE public.orders ADD COLUMN customer_phone TEXT;
ALTER TABLE public.orders ADD COLUMN delivery_address JSONB;
ALTER TABLE public.orders ADD COLUMN delivery_notes TEXT;

-- Add trigger for updated_at on resources
CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON public.resources
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_set_timestamp();
