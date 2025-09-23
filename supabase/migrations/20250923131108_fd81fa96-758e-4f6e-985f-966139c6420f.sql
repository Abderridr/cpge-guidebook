-- Enable RLS
ALTER DATABASE postgres SET row_security = on;

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'student' CHECK (role IN ('admin', 'student')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create articles table
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('concours', 'methodologie', 'classements', 'orientation')),
  author TEXT NOT NULL,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create documents table  
CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  filiere TEXT NOT NULL CHECK (filiere IN ('MP', 'PSI', 'TSI', 'ECS', 'ECT')),
  year INTEGER NOT NULL,
  document_url TEXT NOT NULL,
  is_premium BOOLEAN DEFAULT FALSE,
  downloads INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create concours table
CREATE TABLE concours (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('CNC', 'CNAEM')),
  year INTEGER NOT NULL,
  inscription_start DATE NOT NULL,
  inscription_end DATE NOT NULL,
  ecrits_start DATE NOT NULL,
  ecrits_end DATE NOT NULL,
  oraux_start DATE NOT NULL,
  oraux_end DATE NOT NULL,
  results_date DATE NOT NULL,
  filieres JSONB NOT NULL DEFAULT '[]',
  stats JSONB NOT NULL DEFAULT '{"candidats": 0, "places": 0, "taux_reussite": 0}',
  ecoles JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies

-- Profiles: Users can read their own profile, admins can read all
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Articles: Public read, admin write
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read articles" ON articles
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage articles" ON articles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Documents: Public read, admin write
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read documents" ON documents
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage documents" ON documents
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Concours: Public read, admin write
ALTER TABLE concours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read concours" ON concours
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage concours" ON concours
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'student');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Sample data
INSERT INTO articles (title, excerpt, content, image_url, category, author, published_at) VALUES
(
  'Résultats CNC 2024 : Analyse complète des admissions',
  'Découvrez les statistiques détaillées des admissions CNC 2024 et les tendances par filière.',
  'Le Concours National Commun (CNC) 2024 a révélé des tendances intéressantes...',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
  'concours',
  'Ahmed Bennani',
  NOW() - INTERVAL '2 days'
),
(
  'Guide méthodologique TIPE 2025',
  'Tout ce qu''il faut savoir pour réussir son TIPE.',
  'Le TIPE représente un élément clé de l''évaluation...',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop',
  'methodologie',
  'Fatima Zahra Alami',
  NOW() - INTERVAL '5 days'
);

INSERT INTO documents (title, subject, filiere, year, document_url, is_premium, downloads) VALUES
(
  'Cours complet d''Algèbre Linéaire MP',
  'Mathématiques',
  'MP',
  2024,
  'https://drive.google.com/file/d/example-algebra-mp/view',
  false,
  450
),
(
  'Annales CNC Physique 2023',
  'Physique',
  'PSI',
  2023,
  'https://drive.google.com/file/d/example-physique-psi/view',
  true,
  320
);

INSERT INTO concours (name, type, year, inscription_start, inscription_end, ecrits_start, ecrits_end, oraux_start, oraux_end, results_date, filieres, stats, ecoles) VALUES
(
  'CNC',
  'CNC',
  2026,
  '2025-12-15',
  '2026-01-31',
  '2026-04-15',
  '2026-04-25',
  '2026-06-15',
  '2026-07-15',
  '2026-08-30',
  '["MP", "PSI", "TSI"]',
  '{"candidats": 12500, "places": 3200, "taux_reussite": 25.6}',
  '["École Mohammadia d''Ingénieurs", "ENSIAS", "INPT"]'
);

-- Create admin user directly in auth.users
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

-- Create admin profile
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'admin'
FROM auth.users 
WHERE email = 'admin@cpgeistes.ma';