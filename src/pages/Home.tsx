import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Trophy, Zap, Target, Heart, Award, Rocket, LogIn, Facebook, Instagram, Twitter, Linkedin, MessageCircle, Phone, Mail, User, GraduationCap, Building2, Calendar, Star, CheckCircle, HelpCircle } from 'lucide-react';
import heroImage from '@/assets/hero-cpge.jpg';
import { useAuth } from '@/hooks/useAuth';

const Home = () => {
  const { user, isAdmin } = useAuth();
  const [showLoginBox, setShowLoginBox] = useState(false);

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
    { value: '12K+', label: 'Étudiants actifs' },
    { value: '8K+', label: 'Documents' },
    { value: '98%', label: 'Taux de réussite' },
    { value: '24/7', label: 'Support disponible' },
  ];

  const actualites = [
    {
      id: 1,
      title: 'CNC 2026 : Nouvelles dates annoncées',
      excerpt: 'Les dates du Concours National Commun 2026 ont été officiellement publiées. Inscriptions du 15 janvier au 28 février.',
      date: '15 Jan 2026',
      category: 'Concours'
    },
    {
      id: 2,
      title: 'CNAEM 2026 : Ouverture des inscriptions',
      excerpt: 'Le Concours National d\'Accès aux Écoles de Management ouvre ses inscriptions pour la session 2026.',
      date: '12 Jan 2026',
      category: 'Concours'
    },
    {
      id: 3,
      title: 'Nouvelle bibliothèque numérique CPGEISTES',
      excerpt: 'Découvrez notre nouvelle collection de plus de 3000 documents pour toutes les filières.',
      date: '10 Jan 2026',
      category: 'Actualité'
    }
  ];

  const filieres = [
    { name: 'MP', fullName: 'Mathématiques-Physique', students: '3200+', schools: '45+' },
    { name: 'PSI', fullName: 'Physique et Sciences de l\'Ingénieur', students: '2800+', schools: '38+' },
    { name: 'TSI', fullName: 'Technologie et Sciences Industrielles', students: '1500+', schools: '25+' },
    { name: 'ECS', fullName: 'Économique et Commerciale Scientifique', students: '2100+', schools: '30+' },
    { name: 'ECT', fullName: 'Économique et Commerciale Technologique', students: '1800+', schools: '28+' }
  ];

  const socialStats = [
    { platform: 'Facebook', followers: '25K+', icon: Facebook, color: 'text-blue-600' },
    { platform: 'Instagram', followers: '18K+', icon: Instagram, color: 'text-pink-600' },
    { platform: 'TikTok', followers: '32K+', icon: MessageCircle, color: 'text-black' },
    { platform: 'LinkedIn', followers: '8K+', icon: Linkedin, color: 'text-blue-700' }
  ];

  const faq = [
    {
      question: 'Comment accéder aux annales des concours ?',
      answer: 'Vous pouvez accéder aux annales via notre section Bibliothèque. Un compte gratuit vous donne accès aux annales récentes, tandis que les abonnements premium offrent un accès complet à toutes les archives.'
    },
    {
      question: 'Qu\'est-ce que KORRID et comment ça marche ?',
      answer: 'KORRID est notre système d\'accompagnement personnalisé avec trois niveaux : Solo (gratuit), Track (premium) et Class (ultra). Chaque niveau offre des fonctionnalités adaptées à vos besoins d\'apprentissage.'
    },
    {
      question: 'Comment puis-je suivre les dates des concours ?',
      answer: 'Notre section Concours est régulièrement mise à jour avec toutes les dates importantes. Vous pouvez aussi vous abonner aux notifications pour ne rien manquer.'
    },
    {
      question: 'Les ressources sont-elles disponibles pour toutes les filières ?',
      answer: 'Oui, nous couvrons toutes les filières CPGE : MP, PSI, TSI, ECS, ECT avec des ressources spécialisées pour chacune.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2 space-y-8 animate-fade-in">
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
                  Découvrir KORRID
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link to="/bibliotheque" className="btn-secondary">
                  Accéder à la bibliothèque
                </Link>
              </div>
            </div>
            
            {/* Admin Dashboard Login Box */}
            <div className="bg-card rounded-2xl p-6 shadow-xl border border-border">
              <div className="text-center mb-6">
                <LogIn className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Espace Admin</h3>
                <p className="text-sm text-muted-foreground">Accès réservé aux administrateurs</p>
              </div>
              
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{user.email?.split('@')[0]}</p>
                      <p className="text-xs text-muted-foreground">{isAdmin ? 'Administrateur' : 'Étudiant'}</p>
                    </div>
                  </div>
                  {isAdmin && (
                    <Link to="/dashboard" className="w-full btn-hero">
                      Dashboard Admin
                    </Link>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <Link to="/login" className="w-full btn-hero">
                    Connexion Admin
                  </Link>
                  <Link to="/register" className="w-full btn-secondary">
                    Créer un compte
                  </Link>
                </div>
              )}
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

      {/* Actualités Section */}
      <section className="content-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="section-title">Actualités</h2>
              <p className="section-subtitle">Restez informés des dernières nouvelles</p>
            </div>
            <Link to="/actualites" className="btn-secondary">
              Voir toutes les actualités
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {actualites.map((article, index) => (
              <div key={article.id} className="card-feature group animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors duration-200">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <Link to="/actualites" className="text-primary text-sm font-medium hover:text-primary/80 transition-colors duration-200">
                  Lire la suite →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KORRID Presentation Section */}
      <section className="content-section bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">KORRID - Votre Assistant d'Apprentissage</h2>
            <p className="section-subtitle">
              Système intelligent d'accompagnement personnalisé pour maximiser vos chances de réussite
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-feature text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Solo Korrid</h3>
              <p className="text-muted-foreground mb-4">Accès gratuit aux fonctionnalités de base</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Annales récentes</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Exercices de base</span>
                </div>
              </div>
              <Link to="/offres-korrid" className="btn-secondary mt-6 w-full">
                Commencer gratuitement
              </Link>
            </div>

            <div className="card-feature text-center border-2 border-primary">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-4">Track Korrid</h3>
              <p className="text-muted-foreground mb-4">Suivi personnalisé et IA avancée</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Toutes les annales</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Suivi personnalisé</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Assistant IA</span>
                </div>
              </div>
              <Link to="/offres-korrid" className="btn-hero mt-6 w-full">
                Choisir Premium
              </Link>
            </div>

            <div className="card-feature text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Class Korrid</h3>
              <p className="text-muted-foreground mb-4">Expérience complète avec mentorat</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span>Tout Track +</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span>Mentorat personnel</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span>Classes en direct</span>
                </div>
              </div>
              <Link to="/offres-korrid" className="btn-secondary mt-6 w-full">
                Accès Ultra
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Filières Section */}
      <section className="content-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Filières CPGE</h2>
            <p className="section-subtitle">
              Toutes les filières des classes préparatoires couvertes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {filieres.map((filiere, index) => (
              <Link
                key={filiere.name}
                to={`/ecoles/filieres/${filiere.name.toLowerCase()}`}
                className="card-feature group text-center hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl font-bold text-primary-foreground">{filiere.name}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{filiere.fullName}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>{filiere.students} étudiants</p>
                  <p>{filiere.schools} écoles</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Organigramme & Grandes Écoles Section */}
      <section className="content-section bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Organigramme */}
            <div className="text-center">
              <h2 className="section-title mb-8">Organigramme de la Prépa</h2>
              <div className="space-y-6">
                <div className="card-feature">
                  <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Direction Pédagogique</h3>
                  <p className="text-muted-foreground">Coordination des programmes et suivi académique</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="card-feature">
                    <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Corps Professoral</h4>
                    <p className="text-sm text-muted-foreground">Enseignants experts par filière</p>
                  </div>
                  <div className="card-feature">
                    <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Support Pédagogique</h4>
                    <p className="text-sm text-muted-foreground">Ressources et documentation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grandes Écoles */}
            <div className="text-center">
              <h2 className="section-title mb-8">Grandes Écoles après CPGE</h2>
              <div className="space-y-4">
                <div className="card-feature">
                  <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Écoles d'Ingénieurs</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="p-2 bg-muted rounded">ENSIAS</div>
                    <div className="p-2 bg-muted rounded">EHTP</div>
                    <div className="p-2 bg-muted rounded">EMI</div>
                    <div className="p-2 bg-muted rounded">INPT</div>
                  </div>
                </div>
                
                <div className="card-feature">
                  <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">Écoles de Commerce</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="p-2 bg-muted rounded">ISCAE</div>
                    <div className="p-2 bg-muted rounded">ENCG</div>
                    <div className="p-2 bg-muted rounded">ESC</div>
                    <div className="p-2 bg-muted rounded">FSJES</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message du Fondateur */}
      <section className="content-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card-feature">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8">
              <User className="w-12 h-12 text-primary-foreground" />
            </div>
            
            <h2 className="section-title mb-6">Mot du Fondateur</h2>
            
            <blockquote className="text-lg text-muted-foreground leading-relaxed mb-8 italic">
              "CPGEISTES est né d'une vision : démocratiser l'accès à l'excellence académique pour tous les étudiants des classes préparatoires au Maroc. Notre mission est de vous accompagner, pas à pas, vers les grandes écoles de vos rêves."
            </blockquote>
            
            <div className="space-y-2">
              <p className="font-semibold text-lg">Ahmed El Mansouri</p>
              <p className="text-sm text-muted-foreground">Fondateur & CEO, CPGEISTES</p>
              <p className="text-xs text-muted-foreground">Ancien élève Centrale Paris, promotion 2015</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Followers - Réseaux Sociaux */}
      <section className="content-section bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Nos Followers</h2>
            <p className="section-subtitle">Rejoignez notre communauté sur les réseaux sociaux</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {socialStats.map((social, index) => (
              <div key={social.platform} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-16 h-16 bg-card rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <social.icon className={`w-8 h-8 ${social.color}`} />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{social.followers}</div>
                <div className="text-sm text-muted-foreground">{social.platform}</div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center space-x-6">
            <a href="#" className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="p-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors duration-200">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="p-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors duration-200">
              <MessageCircle className="w-6 h-6" />
            </a>
            <a href="#" className="p-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors duration-200">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="content-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Questions Fréquentes</h2>
            <p className="section-subtitle">Trouvez rapidement les réponses à vos questions</p>
          </div>
          
          <div className="space-y-6">
            {faq.map((item, index) => (
              <div key={index} className="card-feature">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <HelpCircle className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-3">{item.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/a-propos#contact" className="btn-secondary">
              Plus de questions ? Contactez-nous
            </Link>
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