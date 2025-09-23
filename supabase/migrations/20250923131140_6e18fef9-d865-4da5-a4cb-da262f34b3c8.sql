-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'student' CHECK (role IN ('admin', 'student')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
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
CREATE TABLE IF NOT EXISTS documents (
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
CREATE TABLE IF NOT EXISTS concours (
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

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE concours ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for articles
DROP POLICY IF EXISTS "Anyone can read articles" ON articles;
CREATE POLICY "Anyone can read articles" ON articles
  FOR SELECT USING (true);

-- Create policies for documents
DROP POLICY IF EXISTS "Anyone can read documents" ON documents;
CREATE POLICY "Anyone can read documents" ON documents
  FOR SELECT USING (true);

-- Create policies for concours
DROP POLICY IF EXISTS "Anyone can read concours" ON concours;
CREATE POLICY "Anyone can read concours" ON concours
  FOR SELECT USING (true);

-- Create function to handle new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'student')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();