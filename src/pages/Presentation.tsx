import React from 'react';
import { Target, Users, BookOpen, Award, Mail, Linkedin } from 'lucide-react';

const Presentation = () => {
  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'Nous visons la plus haute qualité dans tous nos contenus éducatifs, créés par les meilleurs professeurs et étudiants.',
    },
    {
      icon: Users,
      title: 'Communauté',
      description: 'Une communauté solidaire où chaque étudiant peut partager, apprendre et progresser ensemble vers la réussite.',
    },
    {
      icon: BookOpen,
      title: 'Pédagogie',
      description: 'Méthodes d\'enseignement innovantes adaptées aux spécificités des classes préparatoires marocaines.',
    },
    {
      icon: Target,
      title: 'Réussite',
      description: 'Votre succès aux concours est notre objectif principal. Nous vous accompagnons jusqu\'à l\'intégration.',
    },
  ];

  const team = [
    {
      name: 'Dr. Ahmed Bennani',
      role: 'Fondateur & Directeur Pédagogique',
      description: 'Ancien élève de Polytechnique, 15 ans d\'expérience dans l\'enseignement en CPGE.',
      image: '/api/placeholder/200/200',
      linkedin: '#',
    },
    {
      name: 'Fatima Zahra El Alami',
      role: 'Responsable Contenu Mathématiques',
      description: 'Agrégée de mathématiques, spécialiste des filières MP et PSI.',
      image: '/api/placeholder/200/200',
      linkedin: '#',
    },
    {
      name: 'Omar Hakim',
      role: 'Responsable Sciences Physiques',
      description: 'Docteur en physique, expert en préparation aux concours d\'ingénieurs.',
      image: '/api/placeholder/200/200',
      linkedin: '#',
    },
    {
      name: 'Khadija Mansouri',
      role: 'Responsable Orientation',
      description: 'Conseillère en orientation, spécialiste des écoles de commerce et d\'ingénieurs.',
      image: '/api/placeholder/200/200',
      linkedin: '#',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Étudiants accompagnés' },
    { value: '85%', label: 'Taux de réussite aux concours' },
    { value: '5+', label: 'Années d\'expérience' },
    { value: '50+', label: 'Partenaires écoles' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-subtle py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="section-title">À propos de CPGEISTES</h1>
            <p className="section-subtitle">
              Découvrez notre mission, nos valeurs et l'équipe qui vous accompagne vers l'excellence
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="content-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold">
                Notre <span className="text-primary">Mission</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                CPGEISTES est née de la conviction que chaque étudiant en classe préparatoire mérite 
                d'accéder aux meilleures ressources et à un accompagnement de qualité pour réussir 
                son parcours académique.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Notre plateforme réunit une communauté dynamique d'étudiants, d'enseignants et 
                d'experts qui partagent un objectif commun : démocratiser l'accès à l'excellence 
                éducative au Maroc.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-hero">Rejoindre la communauté</button>
                <button className="btn-secondary">Découvrir nos ressources</button>
              </div>
            </div>
            
            <div className="relative animate-slide-up">
              <div className="bg-gradient-primary rounded-2xl p-8 text-primary-foreground">
                <h3 className="text-2xl font-bold mb-6">Impact en chiffres</h3>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold mb-2">{stat.value}</div>
                      <div className="text-sm opacity-90">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="content-section bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos Valeurs</h2>
            <p className="section-subtitle">
              Les principes fondamentaux qui guident notre approche pédagogique
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center space-y-4 animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
                  <value.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="content-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Notre Équipe</h2>
            <p className="section-subtitle">
              Des experts passionnés dédiés à votre réussite académique
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="card-feature text-center group animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <a
                    href={member.linkedin}
                    className="absolute top-0 right-1/2 translate-x-1/2 transform -translate-y-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin className="w-5 h-5 text-primary-foreground" />
                  </a>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="content-section bg-gradient-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-card rounded-3xl p-12 shadow-card">
            <Mail className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Une question sur notre approche ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Notre équipe pédagogique est à votre disposition pour vous présenter 
              en détail notre méthode et répondre à vos questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-hero">Nous contacter</button>
              <button className="btn-secondary">Programmer un rendez-vous</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Presentation;