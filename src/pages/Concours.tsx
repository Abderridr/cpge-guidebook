import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, Users, School, TrendingUp, FileText, Video, Target } from 'lucide-react';

const Concours = () => {
  const [concoursList, setConcoursList] = useState<any[]>([]);
  const [activeConcours, setActiveConcours] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Example methodologies (static)
  const methodologies = [
    {
      title: 'TIPE - Travail d\'Initiative Personnelle Encadré',
      description: 'Méthodes et conseils pour réussir votre TIPE, du choix du sujet à la présentation orale.',
      icon: FileText,
      color: 'text-primary',
      items: [
        'Choisir un sujet pertinent et original',
        'Structurer votre démarche scientifique',
        'Préparer une présentation efficace',
        'Gérer les questions du jury',
      ],
    },
    {
      title: 'Épreuves Orales',
      description: 'Techniques pour exceller lors des entretiens et épreuves orales des concours.',
      icon: Video,
      color: 'text-success',
      items: [
        'Techniques de communication orale',
        'Gestion du stress et de l\'anxiété',
        'Présentation personnelle impactante',
        'Répondre aux questions pièges',
      ],
    },
  ];

  // ✅ Fetch concours from Supabase
  useEffect(() => {
    const fetchConcours = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('concours')
        .select('*')
        .order('year', { ascending: true });

      if (error) {
        console.error('Error fetching concours:', error);
      } else if (data && data.length > 0) {
        setConcoursList(data);
        setActiveConcours(data[0].name); // default first concours
      }

      setLoading(false);
    };

    fetchConcours();
  }, []);

  const currentConcours = concoursList.find(c => c.name === activeConcours);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-subtle py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="section-title">Concours CPGE</h1>
            <p className="section-subtitle">
              Toutes les informations essentielles sur les concours d'accès aux grandes écoles marocaines
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg overflow-x-auto">
            {concoursList.map((concours) => (
              <button
                key={concours.name}
                onClick={() => setActiveConcours(concours.name)}
                className={`px-6 py-3 rounded-md font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                  activeConcours === concours.name
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background'
                }`}
              >
                {concours.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {loading ? (
        <div className="text-center py-12">Chargement des concours...</div>
      ) : currentConcours ? (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dates */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-primary" />
              Calendrier {currentConcours.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                ['Inscription', `${currentConcours.inscription_start} - ${currentConcours.inscrition_end}`],
                ['Écrits', `${currentConcours.ecrits_start} - ${currentConcours.ecrits_end}`],
                ['Oraux', `${currentConcours.oraux_start} - ${currentConcours.oraux_end}`],
                ['Résultats', currentConcours.resilts_date],
              ].map(([phase, date], index) => (
                <div key={phase} className="card-feature text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2 capitalize">{phase}</h3>
                  <p className="text-muted-foreground text-sm">{date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-primary" />
              Statistiques {currentConcours.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-feature text-center">
                <div className="text-3xl font-bold text-primary mb-2">{currentConcours.stats?.candidats || 0}</div>
                <div className="text-muted-foreground">Candidats inscrits</div>
              </div>
              <div className="card-feature text-center">
                <div className="text-3xl font-bold text-success mb-2">{currentConcours.stats?.places || 0}</div>
                <div className="text-muted-foreground">Places disponibles</div>
              </div>
              <div className="card-feature text-center">
                <div className="text-3xl font-bold text-warning mb-2">{currentConcours.stats?.taux || 0}</div>
                <div className="text-muted-foreground">Taux de réussite</div>
              </div>
            </div>
          </div>

          {/* Filieres */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Target className="w-6 h-6 mr-2 text-primary" />
              Filières concernées
            </h2>
            <div className="flex flex-wrap gap-3">
              {currentConcours.filieres.map((f: string) => (
                <div key={f} className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-medium">{f}</div>
              ))}
            </div>
          </div>

          {/* Ecoles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <School className="w-6 h-6 mr-2 text-primary" />
              Écoles accessibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentConcours.ecoles.map((ecole: any, idx: number) => (
                <div key={idx} className="card-feature animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg flex-1">{ecole.name}</h3>
                    <div className="text-primary font-bold">{ecole.places}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">{ecole.filiere}</span>
                    <span className="text-xs bg-muted px-2 py-1 rounded-md">{ecole.places} places</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology */}
          <section className="content-section bg-gradient-subtle">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {methodologies.map((method, index) => (
                <div key={index} className="card-feature animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mr-4">
                      <method.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">{method.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{method.description}</p>
                  <ul className="space-y-3">
                    {method.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <button className="btn-secondary">En savoir plus</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      ) : (
        <div className="text-center py-12">Aucun concours disponible.</div>
      )}
    </div>
  );
};

export default Concours;
