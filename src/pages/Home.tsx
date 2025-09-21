import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Trophy, Zap, Target, Heart, Award, Rocket } from 'lucide-react';
import heroImage from '@/assets/hero-cpge.jpg';

const Home = () => {
  const features = [
    {
      icon: Users,
      title: 'Communauté',
      description: 'Rejoignez une communauté de plus de 10,000 étudiants CPGE motivés et entraidez-vous vers la réussite.',
    },
    {
      icon: BookOpen,
      title: 'Bibliothèque',
      description: 'Accédez à des milliers de ressources : cours, exercices, annales et corrections pour toutes les filières.',
    },
    {
      icon: Trophy,
      title: 'Excellence',
      description: 'Méthodes éprouvées et contenus de qualité créés par les meilleurs étudiants et professeurs.',
    },
    {
      icon: Zap,
      title: 'Rapidité',
      description: 'Trouvez instantanément les ressources dont vous avez besoin grâce à notre moteur de recherche avancé.',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Étudiants actifs' },
    { value: '5K+', label: 'Documents' },
    { value: '98%', label: 'Taux de satisfaction' },
    { value: '24/7', label: 'Support disponible' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Votre succès en{' '}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  CPGE
                </span>{' '}
                commence ici
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Plateforme éducative complète dédiée aux étudiants des classes préparatoires aux grandes écoles au Maroc. 
                Rejoignez la communauté qui vous mènera vers l'excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/offres-korrid" className="btn-hero group">
                  Découvrir nos offres
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link to="/bibliotheque" className="btn-secondary">
                  Accéder à la bibliothèque
                </Link>
              </div>
            </div>
            
            <div className="relative animate-slide-up">
              <img
                src={heroImage}
                alt="Étudiants CPGE au Maroc"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-card rounded-xl p-4 shadow-glow border">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">10,000+ étudiants connectés</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="content-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Pourquoi choisir CPGEISTES ?</h2>
            <p className="section-subtitle">
              Une plateforme complète conçue spécialement pour les étudiants des classes préparatoires marocaines
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-feature group animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="content-section bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Nos valeurs</h2>
            <p className="section-subtitle">
              Les principes qui guident notre mission d'accompagnement vers l'excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Target,
                title: 'Excellence',
                description: 'Nous visons toujours la plus haute qualité dans nos contenus et nos services.',
              },
              {
                icon: Heart,
                title: 'Entraide',
                description: 'Une communauté solidaire où chaque étudiant peut compter sur les autres.',
              },
              {
                icon: Award,
                title: 'Réussite',
                description: 'Votre succès est notre priorité absolue. Nous vous accompagnons jusqu\'au bout.',
              },
            ].map((value, index) => (
              <div key={index} className="text-center space-y-4 animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
                  <value.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-primary rounded-3xl p-12 text-primary-foreground animate-glow">
            <Rocket className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à rejoindre l'élite des CPGE ?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Découvrez nos offres Korrid et bénéficiez d'un accompagnement personnalisé 
              pour maximiser vos chances de réussite aux concours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/offres-korrid"
                className="bg-primary-foreground text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-opacity-90 transition-all duration-300 hover:shadow-lg"
              >
                Voir les offres Korrid
              </Link>
              <Link
                to="/presentation"
                className="border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-foreground hover:text-primary transition-all duration-300"
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;