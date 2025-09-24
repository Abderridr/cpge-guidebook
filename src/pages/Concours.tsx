import React, { useState } from 'react';
import { Calendar, Users, School, TrendingUp, FileText, Video, Target } from 'lucide-react';

const Concours = () => {
  const [activeTab, setActiveTab] = useState('CNC 2026');

  const concoursData = {
    'CNC 2026': {
      dates: {
        inscription: '15 janvier - 15 mars 2026',
        ecrits: '8-15 mai 2026',
        oraux: '20 juin - 25 juillet 2026',
        resultats: '30 juillet 2026',
      },
      filieres: ['MP', 'PSI', 'TSI', 'TPC'],
      stats: {
        candidats: '12,500',
        places: '3,200',
        taux: '25.6%',
      },
      ecoles: [
        { name: 'École Mohammadia d\'Ingénieurs', places: 180, filiere: 'MP/PSI' },
        { name: 'ENSAM Rabat', places: 120, filiere: 'MP/PSI/TSI' },
        { name: 'INPT Rabat', places: 100, filiere: 'MP/PSI' },
        { name: 'ENSIAS Rabat', places: 80, filiere: 'MP/PSI' },
        { name: 'FST Fès', places: 150, filiere: 'MP/PSI/TSI' },
        { name: 'ENIM Rabat', places: 90, filiere: 'MP/PSI' },
      ],
    },
    'CNAEM 2026': {
      dates: {
        inscription: '1 février - 31 mars 2026',
        ecrits: '15-22 mai 2026',
        oraux: '1-30 juillet 2026',
        resultats: '15 août 2026',
      },
      filieres: ['ECS', 'ECT'],
      stats: {
        candidats: '8,200',
        places: '1,800',
        taux: '22.0%',
      },
      ecoles: [
        { name: 'ISCAE Casablanca', places: 200, filiere: 'ECS/ECT' },
        { name: 'ENCG Casablanca', places: 150, filiere: 'ECS/ECT' },
        { name: 'FSJES Rabat', places: 180, filiere: 'ECS/ECT' },
        { name: 'ENCG Marrakech', places: 120, filiere: 'ECS/ECT' },
        { name: 'ISCAE Rabat', places: 100, filiere: 'ECS/ECT' },
        { name: 'EST Casablanca', places: 80, filiere: 'ECS/ECT' },
      ],
    },
  };

  const currentConcours = concoursData[activeTab as keyof typeof concoursData];

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              {Object.keys(concoursData).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-md font-medium text-sm transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Concours Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Dates Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-primary" />
              Calendrier {activeTab}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(currentConcours.dates).map(([phase, date], index) => (
                <div
                  key={phase}
                  className="card-feature text-center animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2 capitalize">{phase}</h3>
                  <p className="text-muted-foreground text-sm">{date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-primary" />
              Statistiques {activeTab}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-feature text-center">
                <div className="text-3xl font-bold text-primary mb-2">{(currentConcours.stats as any)?.candidats || 0}</div>
                <div className="text-muted-foreground">Candidats inscrits</div>
              </div>
              <div className="card-feature text-center">
                <div className="text-3xl font-bold text-success mb-2">{(currentConcours.stats as any)?.places || 0}</div>
                <div className="text-muted-foreground">Places disponibles</div>
              </div>
              <div className="card-feature text-center">
                <div className="text-3xl font-bold text-warning mb-2">{(currentConcours.stats as any)?.taux_reussite || 0}</div>
                <div className="text-muted-foreground">Taux de réussite</div>
              </div>
            </div>
          </div>

          {/* Filières Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Target className="w-6 h-6 mr-2 text-primary" />
              Filières concernées
            </h2>
            <div className="flex flex-wrap gap-3">
              {currentConcours.filieres.map((filiere) => (
                <div
                  key={filiere}
                  className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-medium"
                >
                  {filiere}
                </div>
              ))}
            </div>
          </div>

          {/* Écoles Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <School className="w-6 h-6 mr-2 text-primary" />
              Écoles accessibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentConcours.ecoles.map((ecole, index) => (
                <div
                  key={index}
                  className="card-feature animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg flex-1">{ecole.name}</h3>
                    <div className="text-primary font-bold">{ecole.places}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">{ecole.filiere}</span>
                    <span className="text-xs bg-muted px-2 py-1 rounded-md">
                      {ecole.places} places
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="content-section bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Méthodologie & Préparation</h2>
            <p className="section-subtitle">
              Conseils d'experts pour maximiser vos chances de réussite aux concours
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {methodologies.map((method, index) => (
              <div
                key={index}
                className="card-feature animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mr-4">
                    <method.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">{method.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {method.description}
                </p>

                <ul className="space-y-3">
                  {method.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <button className="btn-secondary">
                    En savoir plus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-primary rounded-3xl p-12 text-primary-foreground">
            <Users className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Besoin d'un accompagnement personnalisé ?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Découvrez nos offres Korrid pour un coaching sur-mesure et maximisez 
              vos chances de réussite aux concours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary-foreground text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-opacity-90 transition-all duration-300">
                Voir les offres Korrid
              </button>
              <button className="border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-foreground hover:text-primary transition-all duration-300">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Concours;