import React from 'react';
import { Target, Users, BookOpen, Award, Mail, Phone, MapPin, Send } from 'lucide-react';

const APropos = () => {
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
    },
    {
      name: 'Fatima Zahra El Alami',
      role: 'Responsable Contenu Mathématiques',
      description: 'Agrégée de mathématiques, spécialiste des filières MP et PSI.',
      image: '/api/placeholder/200/200',
    },
    {
      name: 'Omar Hakim',
      role: 'Responsable Sciences Physiques',
      description: 'Docteur en physique, expert en préparation aux concours d\'ingénieurs.',
      image: '/api/placeholder/200/200',
    },
    {
      name: 'Khadija Mansouri',
      role: 'Responsable Orientation',
      description: 'Conseillère en orientation, spécialiste des écoles de commerce et d\'ingénieurs.',
      image: '/api/placeholder/200/200',
    },
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
            </div>
            
            <div className="relative animate-slide-up">
              <div className="bg-gradient-primary rounded-2xl p-8 text-primary-foreground">
                <h3 className="text-2xl font-bold mb-6">Notre impact</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">10,000+</div>
                    <div className="text-sm opacity-90">Étudiants accompagnés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">85%</div>
                    <div className="text-sm opacity-90">Taux de réussite</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">5+</div>
                    <div className="text-sm opacity-90">Années d'expérience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-sm opacity-90">Partenaires écoles</div>
                  </div>
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
                className="card-feature text-center animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="content-section bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Contactez-nous</h2>
            <p className="section-subtitle">
              Une question ? Notre équipe est là pour vous accompagner
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">contact@cpgeistes.ma</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Téléphone</h3>
                    <p className="text-muted-foreground">+212 6 XX XX XX XX</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Adresse</h3>
                    <p className="text-muted-foreground">
                      Avenue Hassan II<br />
                      Rabat, Maroc
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border">
                <h3 className="font-semibold mb-4">Horaires d'ouverture</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lundi - Vendredi</span>
                    <span>8h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Samedi</span>
                    <span>9h00 - 15h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dimanche</span>
                    <span className="text-destructive">Fermé</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card-feature">
              <h3 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Prénom</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="votre.email@exemple.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Filière</label>
                  <select className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>Sélectionnez votre filière</option>
                    <option>MP</option>
                    <option>PSI</option>
                    <option>TSI</option>
                    <option>ECS</option>
                    <option>ECT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Décrivez votre demande..."
                  ></textarea>
                </div>

                <button className="btn-hero w-full group">
                  Envoyer le message
                  <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default APropos;