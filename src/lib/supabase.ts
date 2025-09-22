import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database Types
export interface Profile {
  id: string
  email: string
  role: 'admin' | 'student'
  created_at: string
}

export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  image_url?: string
  category: 'concours' | 'methodologie' | 'classements' | 'orientation'
  author: string
  published_at: string
  created_at: string
}

export interface Document {
  id: string
  title: string
  subject: string
  filiere: 'MP' | 'PSI' | 'TSI' | 'ECS' | 'ECT'
  year: number
  document_url: string
  is_premium: boolean
  downloads: number
  created_at: string
}

export interface Concour {
  id: string
  name: string
  type: 'CNC' | 'CNAEM'
  year: number
  inscription_start: string
  inscription_end: string
  ecrits_start: string
  ecrits_end: string
  oraux_start: string
  oraux_end: string
  results_date: string
  filieres: string[]
  stats: {
    candidats: number
    places: number
    taux_reussite: number
  }
  ecoles: string[]
  created_at: string
}