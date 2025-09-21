import React, { useState } from 'react';
import { Calendar, User, Filter, Search, ChevronDown } from 'lucide-react';

const Actualites = () => {
  const [selectedFilter, setSelectedFilter] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');

  const filters = ['Tous', 'Concours', 'Méthodologie', 'Classements', 'Orientation'];

  const articles = [
    {
      id: 1,
      title: 'Résultats CNC 2024 : Analyse des admissions par filière',
      excerpt: 'Découvrez les statistiques complètes des admissions aux grandes écoles d\'ingénieurs via le concours CNC 2024...',
      category: 'Concours',
      author: 'Ahmed Bennani',
      date: '2024-01-15',
      image: '/api/placeholder/400/250',
      readTime: '5 min de lecture',
    },
    {
      id: 2,
      title: 'Méthodologie TIPE : Comment choisir son sujet en MP',
      excerpt: 'Guide complet pour bien choisir et développer votre sujet de TIPE en filière MP. Conseils d\'experts et exemples...',
      category: 'Méthodologie',
      author: 'Fatima Zahra',
      date: '2024-01-12',
      image: '/api/placeholder/400/250',
      readTime: '8 min de lecture',
    },
    {
      id: 3,
      title: 'Classement 2024 des meilleures prépas du Maroc',
      excerpt: 'Notre analyse exclusive du classement des classes préparatoires marocaines basée sur les résultats aux concours...',
      category: 'Classements',
      author: 'Omar Alami',
      date: '2024-01-10',
      image: '/api/placeholder/400/250',
      readTime: '12 min de lecture',
    },
    {
      id: 4,
      title: 'Orientation post-prépa : Les nouvelles écoles à découvrir',
      excerpt: 'Panorama des nouvelles écoles d\'ingénieurs et de commerce qui recrutent via les concours communs...',
      category: 'Orientation',
      author: 'Khadija Mansouri',
      date: '2024-01-08',
      image: '/api/placeholder/400/250',
      readTime: '6 min de lecture',
    },
    {
      id: 5,
      title: 'Préparation aux oraux : Techniques pour gérer le stress',
      excerpt: 'Méthodes éprouvées pour aborder sereinement les épreuves orales des concours. Témoignages d\'étudiants...',
      category: 'Méthodologie',
      author: 'Youssef Hakim',
      date: '2024-01-05',
      image: '/api/placeholder/400/250',
      readTime: '7 min de lecture',
    },
    {
      id: 6,
      title: 'CNC vs CNAEM : Comparatif des deux concours',
      excerpt: 'Analyse détaillée des différences entre les deux principaux concours d\'accès aux grandes écoles...',
      category: 'Concours',
      author: 'Nadia El Fassi',
      date: '2024-01-03',
      image: '/api/placeholder/400/250',
      readTime: '10 min de lecture',
    },
  ];

  const filteredArticles = articles.filter(article => {
    const matchesFilter = selectedFilter === 'Tous' || article.category === selectedFilter;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-subtle py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="section-title">Actualités CPGE</h1>
            <p className="section-subtitle">
              Restez informés des dernières nouvelles, conseils et analyses pour réussir en classe préparatoire
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    selectedFilter === filter
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Aucun article trouvé pour votre recherche.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <article
                  key={article.id}
                  className="card-feature group cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
                        {article.category}
                      </span>
                      <span className="text-muted-foreground">{article.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-200 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {filteredArticles.length > 0 && (
            <div className="text-center mt-12">
              <button className="btn-secondary group">
                Charger plus d'articles
                <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform duration-200" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Actualites;