
-- Add role column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN role TEXT DEFAULT 'user';

-- Update existing profiles to have user role
UPDATE public.profiles 
SET role = 'user' 
WHERE role IS NULL;

-- Create an admin user (you can change the email to your actual email)
-- First, you'll need to sign up with this email, then run this to make yourself admin
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'your-admin-email@example.com';
