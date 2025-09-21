import React, { useState } from 'react';
import { Search, Filter, Download, Lock, Star, Calendar, User, FileText, Eye } from 'lucide-react';

const Bibliotheque = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiliere, setSelectedFiliere] = useState('Toutes');

  const filieres = ['Toutes', 'MP', 'PSI', 'TSI', 'ECS', 'ECT'];

  const documents = [
    {
      id: 1,
      title: 'Cours de Mathématiques - Algèbre Linéaire',
      subject: 'Mathématiques',
      filiere: 'MP',
      year: 2024,
      type: 'Cours',
      downloads: 1250,
      rating: 4.9,
      author: 'Prof. Ahmed Bennani',
      isPremium: false,
      description: 'Cours complet sur l\'algèbre linéaire avec exercices corrigés',
    },
    {
      id: 2,
      title: 'Annales CNC Physique 2023',
      subject: 'Physique',
      filiere: 'PSI',
      year: 2023,
      type: 'Annales',
      downloads: 890,
      rating: 4.8,
      author: 'Prof. Fatima Zahra',
      isPremium: true,
      description: 'Corrections détaillées des épreuves de physique CNC 2023',
    },
    {
      id: 3,
      title: 'Exercices Corrigés - Thermodynamique',
      subject: 'Physique',
      filiere: 'MP',
      year: 2024,
      type: 'Exercices',
      downloads: 2100,
      rating: 4.7,
      author: 'Prof. Omar Hakim',
      isPremium: false,
      description: 'Plus de 100 exercices corrigés en thermodynamique',
    },
    {
      id: 4,
      title: 'Méthodes de Résolution - Équations Différentielles',
      subject: 'Mathématiques',
      filiere: 'TSI',
      year: 2024,
      type: 'Méthodes',
      downloads: 750,
      rating: 4.6,
      author: 'Prof. Khadija Mansouri',
      isPremium: true,
      description: 'Techniques avancées de résolution d\'équations différentielles',
    },
    {
      id: 5,
      title: 'Analyse Économique - Microéconomie',
      subject: 'Économie',
      filiere: 'ECS',
      year: 2024,
      type: 'Cours',
      downloads: 620,
      rating: 4.5,
      author: 'Prof. Youssef Alami',
      isPremium: false,
      description: 'Fondamentaux de la microéconomie pour concours',
    },
    {
      id: 6,
      title: 'TD Corrigés - Mécanique du Point',
      subject: 'Physique',
      filiere: 'MP',
      year: 2024,
      type: 'TD',
      downloads: 1580,
      rating: 4.8,
      author: 'Prof. Nadia El Fassi',
      isPremium: false,
      description: 'Travaux dirigés corrigés en mécanique du point',
    },
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFiliere = selectedFiliere === 'Toutes' || doc.filiere === selectedFiliere;
    return matchesSearch && matchesFiliere;
  });

  const DocumentCard = ({ document }: { document: typeof documents[0] }) => (
    <div className="card-feature group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`px-2 py-1 rounded-md text-xs font-medium ${
            document.isPremium 
              ? 'bg-premium/20 text-premium border border-premium/30' 
              : 'bg-success/20 text-success border border-success/30'
          }`}>
            {document.isPremium ? 'Premium' : 'Gratuit'}
          </div>
          <div className="px-2 py-1 bg-muted rounded-md text-xs font-medium">
            {document.filiere}
          </div>
        </div>
        
        <div className="flex items-center space-x-1 text-warning">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(document.rating) ? 'fill-current' : 'text-muted-foreground'
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-2">{document.rating}</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
        {document.title}
      </h3>
      
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {document.description}
      </p>

      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{document.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{document.year}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Download className="w-4 h-4" />
          <span>{document.downloads.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{document.subject}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{document.type}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-200" title="Aperçu">
            <Eye className="w-4 h-4" />
          </button>
          <button className={`p-2 rounded-lg transition-colors duration-200 ${
            document.isPremium 
              ? 'hover:bg-premium/10 text-premium' 
              : 'hover:bg-success/10 text-success'
          }`} title="Télécharger">
            {document.isPremium ? <Lock className="w-4 h-4" /> : <Download className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-subtle py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="section-title">Bibliothèque CPGEISTES</h1>
            <p className="section-subtitle">
              Accédez à des milliers de ressources pédagogiques de qualité pour toutes les filières CPGE
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher des documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Filiere Filter */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">Filière:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filieres.map((filiere) => (
                  <button
                    key={filiere}
                    onClick={() => setSelectedFiliere(filiere)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      selectedFiliere === filiere
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                  >
                    {filiere}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-6 text-sm text-muted-foreground">
            {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} trouvé{filteredDocuments.length !== 1 ? 's' : ''}
          </div>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-lg">Aucun document trouvé pour votre recherche.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDocuments.map((document, index) => (
                <div
                  key={document.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <DocumentCard document={document} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Premium CTA */}
      <section className="content-section bg-gradient-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card-premium">
            <div className="relative z-10">
              <div className="w-16 h-16 bg-premium rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-premium-foreground" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Débloquez l'accès Premium
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Accédez à des milliers de documents exclusifs, annales corrigées et contenus 
                créés par les meilleurs professeurs du Maroc.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-hero">Découvrir Premium</button>
                <button className="btn-secondary">Voir les offres</button>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-premium/5 to-transparent rounded-xl"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bibliotheque;