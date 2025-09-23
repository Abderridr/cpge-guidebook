-- Create admin user profile
-- Note: The user must first sign up through the application with email admin@cpgeistes.ma
-- Then run this to update their role to admin:

-- Insert admin profile (this will work after the user signs up)
INSERT INTO public.profiles (id, email, role) 
VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@cpgeistes.ma' LIMIT 1),
  'admin@cpgeistes.ma',
  'admin'
) ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- Alternative: If you want to directly insert into auth.users (not recommended for production)
-- This creates the user directly in the auth system
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmation_sent_at,
  confirmation_token,
  recovery_sent_at,
  recovery_token,
  email_change_token_new,
  email_change,
  email_change_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at,
  is_sso_user,
  deleted_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@cpgeistes.ma',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  '',
  NULL,
  '',
  '',
  '',
  NULL,
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{}',
  FALSE,
  NOW(),
  NOW(),
  NULL,
  NULL,
  '',
  '',
  NULL,
  '',
  0,
  NULL,
  '',
  NULL,
  FALSE,
  NULL
);

-- Ensure the profile is created with admin role
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'admin'
FROM auth.users 
WHERE email = 'admin@cpgeistes.ma'
ON CONFLICT (id) DO UPDATE SET role = 'admin';