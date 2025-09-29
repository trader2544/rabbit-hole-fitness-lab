-- Create missing storage bucket for resources
INSERT INTO storage.buckets (id, name, public) VALUES ('resources', 'resources', false);

-- Create RLS policies for resources bucket
CREATE POLICY "Anyone can view resources" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'resources');

CREATE POLICY "Admins can upload resources" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'resources' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can update resources" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'resources' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete resources" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'resources' AND public.is_admin(auth.uid()));