-- Drop the problematic admin policy that causes recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create a security definer function to check if user is admin
-- This bypasses RLS policies to prevent recursion
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE id = user_id AND role = 'admin'
  );
$$;

-- Create a new admin policy using the security definer function
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Also update other policies that might reference profiles table
-- Update notification policies to use the security definer function
DROP POLICY IF EXISTS "Admins can manage all notifications" ON public.notifications;
CREATE POLICY "Admins can manage all notifications"
ON public.notifications
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- Update other admin policies to use the security definer function
DROP POLICY IF EXISTS "Admins can view all activity" ON public.activity_logs;
CREATE POLICY "Admins can view all activity"
ON public.activity_logs
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
CREATE POLICY "Admins can view all orders"
ON public.orders
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
CREATE POLICY "Admins can update orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can view all order items" ON public.order_items;
CREATE POLICY "Admins can view all order items"
ON public.order_items
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can view all products" ON public.products;
CREATE POLICY "Admins can view all products"
ON public.products
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Only admins can manage products" ON public.products;
CREATE POLICY "Only admins can manage products"
ON public.products
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Only admins can manage categories" ON public.resource_categories;
CREATE POLICY "Only admins can manage categories"
ON public.resource_categories
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Only admins can manage resources" ON public.resources;
CREATE POLICY "Only admins can manage resources"
ON public.resources
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Only admins can insert trainers" ON public.trainers;
CREATE POLICY "Only admins can insert trainers"
ON public.trainers
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Only admins can update trainers" ON public.trainers;
CREATE POLICY "Only admins can update trainers"
ON public.trainers
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Only admins can delete trainers" ON public.trainers;
CREATE POLICY "Only admins can delete trainers"
ON public.trainers
FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));