
-- Create a helper function to get the current user's role.
-- This is a performant and secure way to check user roles in policies.
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Enable Row-Level Security on the products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to view products.
CREATE POLICY "Allow public read access to products" ON public.products
  FOR SELECT
  USING (true);

-- Create a policy to allow only admins to manage (create, update, delete) products.
CREATE POLICY "Allow admins to manage products" ON public.products
  FOR ALL
  USING (public.get_current_user_role() = 'admin')
  WITH CHECK (public.get_current_user_role() = 'admin');
