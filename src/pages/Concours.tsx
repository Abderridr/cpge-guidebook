import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, Users, School, TrendingUp, FileText, Video, Target, Plus } from 'lucide-react';

interface ConcoursType {
  id: number;
  name: string;
  type: string;
  year: number;
  inscription_start: string;
  inscrition_end: string;
  ecrits_start: string;
  ecrits_end: string;
  oraux_start: string;
  oraux_end: string;
  resilts_date: string;
  filieres: string[];
  stats: any;
  ecoles: any[];
  created_at: string;
}

const Concours = () => {
  const [concoursList, setConcoursList] = useState<ConcoursType[]>([]);
  const [activeConcours, setActiveConcours] = useState<ConcoursType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // New concours form state
  const [newConcours, setNewConcours] = useState({
    name: '',
    type: '',
    year: new Date().getFullYear(),
    inscription_start: '',
    inscrition_end: '',
    ecrits_start: '',
    ecrits_end: '',
    oraux_start: '',
    oraux_end: '',
    resilts_date: '',
    filieres: [] as string[],
    stats: {},
    ecoles: [],
  });

  // Fetch concours from Supabase
  useEffect(() => {
    const fetchConcours = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('concours')
        .select('*')
        .order('year', { ascending: true });

      if (error) {
        console.error('Error fetching concours:', error);
      } else {
        setConcoursList(data || []);
        if (data && data.length > 0) setActiveConcours(data[0]);
      }
      setLoading(false);
    };
    fetchConcours();
  }, []);

  // Handle new concours form submit
  const handleAddConcours = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('concours')
      .insert([newConcours])
      .select();

    if (error) {
      alert('Erreur lors de l\'ajout du concours: ' + error.message);
    } else {
      alert('Concours ajouté avec succès!');
      setConcoursList(prev => [...prev, data[0]]);
      setActiveConcours(data[0]);
      setShowForm(false);
      setNewConcours({
        name: '',
        type: '',
        year: new Date().getFullYear(),
        inscription_start: '',
        inscrition_end: '',
        ecrits_start: '',
        ecrits_end: '',
        oraux_start: '',
        oraux_end: '',
        resilts_date: '',
        filieres: [],
        stats: {},
        ecoles: [],
      });
    }
  };

  if (loading) return <p className="text-center py-12">Chargement des concours...</p>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-subtle py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="section-title">Concours CPGE</h1>
              <p className="section-subtitle">
                Toutes les informations essentielles sur les concours d'accès aux grandes écoles marocaines
              </p>
            </div>
            <button
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:shadow-md"
              onClick={() => setShowForm(true)}
            >
              <Plus className="w-5 h-5" /> Nouveau concours
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            {concoursList.map((concours) => (
              <button
                key={concours.id}
                onClick={() => setActiveConcours(concours)}
                className={`px-6 py-3 rounded-md font-medium text-sm transition-all duration-200 ${
                  activeConcours?.id === concours.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background'
                }`}
              >
                {concours.name} {concours.year}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-xl p-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Ajouter un nouveau concours</h2>
            <form onSubmit={handleAddConcours} className="space-y-4">
              <input
                type="text"
                placeholder="Nom du concours"
                className="w-full border px-4 py-2 rounded-lg"
                value={newConcours.name}
                onChange={(e) => setNewConcours({ ...newConcours, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Type"
                className="w-full border px-4 py-2 rounded-lg"
                value={newConcours.type}
                onChange={(e) => setNewConcours({ ...newConcours, type: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Année"
                className="w-full border px-4 py-2 rounded-lg"
                value={newConcours.year}
                onChange={(e) => setNewConcours({ ...newConcours, year: Number(e.target.value) })}
                required
              />
              {/* Add more fields as needed */}
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg border"
                  onClick={() => setShowForm(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Active Concours Content */}
      {activeConcours && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-primary" /> Calendrier {activeConcours.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card-feature text-center">
                <h3 className="font-semibold">Inscription</h3>
                <p>{activeConcours.inscription_start} - {activeConcours.inscrition_end}</p>
              </div>
              <div className="card-feature text-center">
                <h3 className="font-semibold">Écrits</h3>
                <p>{activeConcours.ecrits_start} - {activeConcours.ecrits_end}</p>
              </div>
              <div className="card-feature text-center">
                <h3 className="font-semibold">Oraux</h3>
                <p>{activeConcours.oraux_start} - {activeConcours.oraux_end}</p>
              </div>
              <div className="card-feature text-center">
                <h3 className="font-semibold">Résultats</h3>
                <p>{activeConcours.resilts_date}</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Concours;
