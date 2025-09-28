import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Building2, MapPin, Star, Users, Trophy, ArrowRight, Target, School } from 'lucide-react';

const Ecoles = () => {
  const filieres = [
    {
      name: 'MP',
      fullName: 'Mathématiques-Physique',
      description: 'Formation orientée vers les mathématiques et la physique théorique',
      students: '3200+',
      schools: '45+',
      color: 'from-blue-500 to-blue-600',
      subjects: ['Mathématiques', 'Physique', 'Sciences Industrielles', 'Informatique']
    },
    {
      name: 'PSI',
      fullName: 'Physique et Sciences de l\'Ingénieur',
      description: 'Équilibre entre physique théorique et sciences appliquées',
      students: '2800+',
      schools: '38+',
      color: 'from-green-500 to-green-600',
      subjects: ['Physique', 'Sciences Industrielles', 'Mathématiques', 'Chimie']
    },
    {
      name: 'TSI',
      fullName: 'Technologie et Sciences Industrielles',
      description: 'Approche technologique et industrielle des sciences',
      students: '1500+',
      schools: '25+',
      color: 'from-orange-500 to-orange-600',
      subjects: ['Sciences Industrielles', 'Mathématiques', 'Physique', 'Technologies']
    },
    {
      name: 'ECS',
      fullName: 'Économique et Commerciale Scientifique',
      description: 'Management et économie avec approche scientifique',
      students: '2100+',
      schools: '30+',
      color: 'from-purple-500 to-purple-600',
      subjects: ['Mathématiques', 'Économie', 'Géopolitique', 'Langues']
    },
    {
      name: 'ECT',
      fullName: 'Économique et Commerciale Technologique',
      description: 'Commerce et gestion avec base technologique',
      students: '1800+',
      schools: '28+',
      color: 'from-red-500 to-red-600',
      subjects: ['Économie', 'Management', 'Droit', 'Mathématiques']
    }
  ];

  const centresCpge = [
    {
      name: 'Lycée Mohammed V',
      ville: 'Casablanca',
      filieres: ['MP', 'PSI', 'TSI'],
      ranking: 1,
      places: 240
    },
    {
      name: 'Lycée Moulay Youssef',
      ville: 'Rabat',
      filieres: ['MP', 'PSI', 'ECS'],
      ranking: 2,
      places: 200
    },
    {
      name: 'Lycée Omar Ibn Khattab',
      ville: 'Nador',
      filieres: ['MP', 'PSI', 'TSI'],
      ranking: 3,
      places: 180
    },
    {
      name: 'Lycée Reda Slaoui',
      ville: 'Agadir',
      filieres: ['PSI', 'TSI', 'ECT'],
      ranking: 4,
      places: 160
    }
  ];

  const grandesEcoles = {
    ingenieur: [
      { name: 'ENSIAS', type: 'École Nationale Supérieure d\'Informatique et d\'Analyse des Systèmes', ville: 'Rabat' },
      { name: 'EHTP', type: 'École Hassania des Travaux Publics', ville: 'Casablanca' },
      { name: 'EMI', type: 'École Mohammadia d\'Ingénieurs', ville: 'Rabat' },
      { name: 'INPT', type: 'Institut National des Postes et Télécommunications', ville: 'Rabat' },
      { name: 'ENSEM', type: 'École Nationale Supérieure d\'Électricité et de Mécanique', ville: 'Casablanca' },
      { name: 'FST', type: 'Facultés des Sciences et Techniques', ville: 'Diverses villes' }
    ],
    management: [
      { name: 'ISCAE', type: 'Institut Supérieur de Commerce et d\'Administration des Entreprises', ville: 'Casablanca' },
      { name: 'ENCG', type: 'École Nationale de Commerce et de Gestion', ville: 'Diverses villes' },
      { name: 'ESC', type: 'École Supérieure de Commerce', ville: 'Diverses villes' },
      { name: 'FSJES', type: 'Facultés des Sciences Juridiques, Économiques et Sociales', ville: 'Diverses villes' }
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="content-section bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GraduationCap className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Écoles & Filières CPGE
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Découvrez toutes les filières des classes préparatoires, les centres CPGE au Maroc 
            et les grandes écoles accessibles après votre formation.
          </p>
        </div>
      </section>

      {/* Filières Section */}
      <section className="content-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Filières CPGE</h2>
            <p className="section-subtitle">
              Choisissez la filière qui correspond à vos ambitions et vos aptitudes
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filieres.map((filiere, index) => (
              <Link
                key={filiere.name}
                to={`/ecoles/filieres/${filiere.name.toLowerCase()}`}
                className="card-feature group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start space-x-6">
                  <div className={`w-20 h-20 bg-gradient-to-r ${filiere.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl font-bold text-white">{filiere.name}</span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-200">
                      {filiere.fullName}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {filiere.description}
                    </p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="font-medium">{filiere.students}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <School className="w-4 h-4 text-primary" />
                          <span className="font-medium">{filiere.schools}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {filiere.subjects.slice(0, 3).map((subject, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                          {subject}
                        </span>
                      ))}
                      {filiere.subjects.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                          +{filiere.subjects.length - 3} autres
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Centres CPGE Section */}
      <section className="content-section bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Centres des Classes Préparatoires</h2>
            <p className="section-subtitle">
              Les meilleurs établissements CPGE du Maroc classés par performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {centresCpge.map((centre, index) => (
              <div
                key={centre.name}
                className="card-feature animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <span className="text-lg font-bold text-primary-foreground">#{centre.ranking}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{centre.name}</h3>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{centre.ville}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-semibold">{centre.places} places</div>
                    <div className="text-muted-foreground">disponibles</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Filières proposées :</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {centre.filieres.map((filiere, idx) => (
                        <span key={idx} className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                          {filiere}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/ecoles/centres" className="btn-hero">
              Voir tous les centres CPGE
            </Link>
          </div>
        </div>
      </section>

      {/* Grandes Écoles Section */}
      <section className="content-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Grandes Écoles du Cycle</h2>
            <p className="section-subtitle">
              Les établissements d'excellence accessibles après les CPGE
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Écoles d'Ingénieurs */}
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Cycle Ingénieur</h3>
                  <p className="text-muted-foreground">Formations scientifiques et techniques</p>
                </div>
              </div>

              <div className="space-y-4">
                {grandesEcoles.ingenieur.map((ecole, index) => (
                  <div key={ecole.name} className="card-feature">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-primary">{ecole.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{ecole.type}</p>
                        <div className="flex items-center space-x-1 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{ecole.ville}</span>
                        </div>
                      </div>
                      <Star className="w-5 h-5 text-yellow-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Écoles de Management */}
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Cycle Management</h3>
                  <p className="text-muted-foreground">Formations en commerce et gestion</p>
                </div>
              </div>

              <div className="space-y-4">
                {grandesEcoles.management.map((ecole, index) => (
                  <div key={ecole.name} className="card-feature">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-primary">{ecole.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{ecole.type}</p>
                        <div className="flex items-center space-x-1 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{ecole.ville}</span>
                        </div>
                      </div>
                      <Star className="w-5 h-5 text-yellow-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Orientation Section */}
      <section className="content-section bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Orientation</h2>
            <p className="section-subtitle">
              Guidage personnalisé pour choisir votre parcours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/ecoles/orientation/post-bac" className="card-feature group text-center hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Orientation Post-Bac</h3>
              <p className="text-muted-foreground mb-6">
                Simulateur de choix CPGE et conseils pour les bacheliers
              </p>
              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>

            <Link to="/ecoles/orientation/post-prepa" className="card-feature group text-center hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Orientation Post-Prépa</h3>
              <p className="text-muted-foreground mb-6">
                Guidance IA et recommandations d'écoles personnalisées
              </p>
              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ecoles;