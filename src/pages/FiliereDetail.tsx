import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Users, Trophy, Target, ChevronRight, Download, Calendar } from 'lucide-react';

const FiliereDetail = () => {
  const { filiere } = useParams<{ filiere: string }>();
  
  const filiereData: { [key: string]: any } = {
    mp: {
      name: 'MP',
      fullName: 'Mathématiques-Physique',
      description: 'La filière MP privilégie les mathématiques et la physique théorique. Elle s\'adresse aux étudiants passionnés par l\'abstraction mathématique et la modélisation physique.',
      color: 'from-blue-500 to-blue-600',
      duration: '2 ans',
      students: '3200+',
      successRate: '78%',
      subjects: [
        { name: 'Mathématiques', hours: '12h/semaine', coefficient: '9' },
        { name: 'Physique', hours: '8h/semaine', coefficient: '8' },
        { name: 'Sciences Industrielles', hours: '2h/semaine', coefficient: '3' },
        { name: 'Informatique', hours: '2h/semaine', coefficient: '2' },
        { name: 'Français-Philosophie', hours: '2h/semaine', coefficient: '4' },
        { name: 'Langues Vivantes', hours: '3h/semaine', coefficient: '3' }
      ],
      schools: [
        'École Polytechnique',
        'École Normale Supérieure',
        'École Centrale',
        'ENSIAS',
        'EHTP',
        'EMI'
      ],
      programme: {
        '1ere_annee': [
          'Analyse mathématique',
          'Algèbre linéaire',
          'Mécanique du point',
          'Thermodynamique',
          'Électrocinétique',
          'Optique géométrique'
        ],
        '2eme_annee': [
          'Analyse complexe',
          'Séries de Fourier',
          'Mécanique des fluides',
          'Électromagnétisme',
          'Physique quantique',
          'Probabilités et statistiques'
        ]
      },
      conseils: [
        'Maîtrisez parfaitement les outils mathématiques fondamentaux',
        'Développez votre capacité d\'abstraction',
        'Travaillez régulièrement les démonstrations',
        'Liez toujours théorie physique et mathématiques'
      ]
    },
    psi: {
      name: 'PSI',
      fullName: 'Physique et Sciences de l\'Ingénieur',
      description: 'La filière PSI offre un équilibre entre physique théorique et sciences appliquées. Elle prépare aux écoles d\'ingénieurs avec une approche pratique.',
      color: 'from-green-500 to-green-600',
      duration: '2 ans',
      students: '2800+',
      successRate: '82%',
      subjects: [
        { name: 'Physique', hours: '10h/semaine', coefficient: '8' },
        { name: 'Sciences Industrielles', hours: '8h/semaine', coefficient: '7' },
        { name: 'Mathématiques', hours: '9h/semaine', coefficient: '7' },
        { name: 'Chimie', hours: '2h/semaine', coefficient: '3' },
        { name: 'Français-Philosophie', hours: '2h/semaine', coefficient: '4' },
        { name: 'Langues Vivantes', hours: '3h/semaine', coefficient: '3' }
      ],
      schools: [
        'ENSIAS',
        'EHTP',
        'EMI',
        'INPT',
        'ENSEM',
        'FST'
      ],
      programme: {
        '1ere_annee': [
          'Mécanique',
          'Thermodynamique',
          'Électricité',
          'Automatique',
          'Construction mécanique',
          'Résistance des matériaux'
        ],
        '2eme_annee': [
          'Mécanique des fluides',
          'Transferts thermiques',
          'Électronique',
          'Traitement du signal',
          'Systèmes asservis',
          'Conception mécanique'
        ]
      },
      conseils: [
        'Équilibrez théorie et pratique',
        'Maîtrisez les outils de simulation',
        'Développez votre sens physique',
        'Travaillez les projets techniques'
      ]
    },
    tsi: {
      name: 'TSI',
      fullName: 'Technologie et Sciences Industrielles',
      description: 'La filière TSI privilégie l\'approche technologique et industrielle. Elle s\'adresse aux bacheliers STI2D et STL.',
      color: 'from-orange-500 to-orange-600',
      duration: '2 ans',
      students: '1500+',
      successRate: '85%',
      subjects: [
        { name: 'Sciences Industrielles', hours: '10h/semaine', coefficient: '8' },
        { name: 'Mathématiques', hours: '8h/semaine', coefficient: '7' },
        { name: 'Physique', hours: '7h/semaine', coefficient: '6' },
        { name: 'Technologies', hours: '6h/semaine', coefficient: '6' },
        { name: 'Français-Philosophie', hours: '2h/semaine', coefficient: '4' },
        { name: 'Langues Vivantes', hours: '2h/semaine', coefficient: '3' }
      ],
      schools: [
        'EHTP',
        'ENSEM',
        'FST',
        'ENSA',
        'EST',
        'ENCG'
      ],
      programme: {
        '1ere_annee': [
          'Systèmes automatisés',
          'Énergétique',
          'Matériaux',
          'Production mécanique',
          'Électrotechnique',
          'Informatique industrielle'
        ],
        '2eme_annee': [
          'Robotique',
          'Gestion de production',
          'Qualité',
          'Maintenance',
          'Systèmes embarqués',
          'Génie civil'
        ]
      },
      conseils: [
        'Valorisez votre expérience technologique',
        'Maîtrisez les outils CAO/DAO',
        'Développez votre approche projet',
        'Restez au courant des innovations'
      ]
    },
    ecs: {
      name: 'ECS',
      fullName: 'Économique et Commerciale Scientifique',
      description: 'La filière ECS combine formation scientifique solide et culture générale étendue pour accéder aux grandes écoles de commerce.',
      color: 'from-purple-500 to-purple-600',
      duration: '2 ans',
      students: '2100+',
      successRate: '79%',
      subjects: [
        { name: 'Mathématiques', hours: '9h/semaine', coefficient: '7' },
        { name: 'Économie Sociologie Histoire', hours: '6h/semaine', coefficient: '6' },
        { name: 'Géopolitique', hours: '6h/semaine', coefficient: '6' },
        { name: 'Culture Générale', hours: '3h/semaine', coefficient: '4' },
        { name: 'Langues Vivantes 1', hours: '3h/semaine', coefficient: '4' },
        { name: 'Langues Vivantes 2', hours: '3h/semaine', coefficient: '3' }
      ],
      schools: [
        'HEC',
        'ESSEC',
        'ESCP',
        'ISCAE',
        'ENCG',
        'ESC'
      ],
      programme: {
        '1ere_annee': [
          'Microéconomie',
          'Macroéconomie',
          'Histoire contemporaine',
          'Géographie économique',
          'Sociologie',
          'Mathématiques financières'
        ],
        '2eme_annee': [
          'Économie internationale',
          'Relations internationales',
          'Sociologie des organisations',
          'Marketing',
          'Probabilités',
          'Statistiques'
        ]
      },
      conseils: [
        'Cultivez votre culture générale',
        'Maîtrisez l\'actualité économique',
        'Développez vos capacités d\'analyse',
        'Travaillez les langues étrangères'
      ]
    },
    ect: {
      name: 'ECT',
      fullName: 'Économique et Commerciale Technologique',
      description: 'La filière ECT s\'adresse aux bacheliers STMG et propose une formation équilibrée entre économie, management et technologies.',
      color: 'from-red-500 to-red-600',
      duration: '2 ans',
      students: '1800+',
      successRate: '83%',
      subjects: [
        { name: 'Économie', hours: '8h/semaine', coefficient: '7' },
        { name: 'Management', hours: '6h/semaine', coefficient: '6' },
        { name: 'Droit', hours: '4h/semaine', coefficient: '5' },
        { name: 'Mathématiques', hours: '6h/semaine', coefficient: '6' },
        { name: 'Culture Générale', hours: '3h/semaine', coefficient: '4' },
        { name: 'Langues Vivantes', hours: '6h/semaine', coefficient: '6' }
      ],
      schools: [
        'ISCAE',
        'ENCG',
        'ESC',
        'FSJES',
        'EST',
        'OFPPT Supérieur'
      ],
      programme: {
        '1ere_annee': [
          'Économie générale',
          'Gestion d\'entreprise',
          'Droit commercial',
          'Comptabilité',
          'Marketing',
          'Communication'
        ],
        '2eme_annee': [
          'Économie internationale',
          'Management stratégique',
          'Droit des affaires',
          'Finance d\'entreprise',
          'Commerce international',
          'Entrepreneuriat'
        ]
      },
      conseils: [
        'Maîtrisez les fondamentaux de gestion',
        'Suivez l\'actualité économique',
        'Développez vos soft skills',
        'Pratiquez les langues en contexte business'
      ]
    }
  };

  const currentFiliere = filiereData[filiere?.toLowerCase() || ''];
  
  if (!currentFiliere) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Filière non trouvée</h1>
          <Link to="/ecoles" className="btn-primary">
            Retour aux filières
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="content-section bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/ecoles" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200 mb-8">
            <ArrowLeft className="w-5 h-5" />
            <span>Retour aux filières</span>
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-start space-x-6 mb-8">
                <div className={`w-24 h-24 bg-gradient-to-r ${currentFiliere.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <span className="text-3xl font-bold text-white">{currentFiliere.name}</span>
                </div>
                
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-4">{currentFiliere.fullName}</h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {currentFiliere.description}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Stats Card */}
            <div className="card-feature">
              <h3 className="text-lg font-semibold mb-6">Statistiques</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Durée</span>
                  </div>
                  <span className="font-semibold">{currentFiliere.duration}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Étudiants</span>
                  </div>
                  <span className="font-semibold">{currentFiliere.students}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Taux de réussite</span>
                  </div>
                  <span className="font-semibold text-green-600">{currentFiliere.successRate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Matières */}
      <section className="content-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-12">Matières et Coefficients</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentFiliere.subjects.map((subject: any, index: number) => (
              <div key={index} className="card-feature">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg">{subject.name}</h3>
                  <span className="text-sm px-2 py-1 bg-primary/10 text-primary rounded-full">
                    Coef. {subject.coefficient}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{subject.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme */}
      <section className="content-section bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-12">Programme détaillé</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card-feature">
              <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>1ère année</span>
              </h3>
              <div className="space-y-3">
                {currentFiliere.programme['1ere_annee'].map((item: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="card-feature">
              <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>2ème année</span>
              </h3>
              <div className="space-y-3">
                {currentFiliere.programme['2eme_annee'].map((item: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Écoles accessibles */}
      <section className="content-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-12">Écoles accessibles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentFiliere.schools.map((school: string, index: number) => (
              <div key={index} className="card-feature text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold">{school}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conseils */}
      <section className="content-section bg-gradient-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-12">Conseils pour réussir</h2>
          
          <div className="space-y-6">
            {currentFiliere.conseils.map((conseil: string, index: number) => (
              <div key={index} className="card-feature">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-primary-foreground">{index + 1}</span>
                  </div>
                  <p className="text-lg leading-relaxed">{conseil}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="content-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card-feature">
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl font-bold mb-6">
              Prêt à vous lancer en {currentFiliere.name} ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Accédez aux ressources spécialisées et aux annales pour cette filière
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/bibliotheque" className="btn-hero">
                Accéder aux ressources
              </Link>
              <Link to="/concours" className="btn-secondary">
                Voir les concours
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FiliereDetail;