import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  Download, 
  Crown, 
  Plus, 
  Edit3, 
  Trash2, 
  Search,
  Calendar,
  TrendingUp,
  BookOpen,
  Award
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Utilisateurs actifs',
      value: '10,247',
      change: '+12%',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: 'Documents',
      value: '5,839',
      change: '+8%',
      icon: FileText,
      color: 'text-green-500',
    },
    {
      title: 'Téléchargements',
      value: '45,291',
      change: '+23%',
      icon: Download,
      color: 'text-purple-500',
    },
    {
      title: 'Abonnements Premium',
      value: '2,156',
      change: '+15%',
      icon: Crown,
      color: 'text-yellow-500',
    },
  ];

  const recentArticles = [
    {
      id: 1,
      title: 'Résultats CNC 2024 : Analyse des admissions',
      author: 'Ahmed Bennani',
      date: '2024-01-15',
      status: 'Publié',
      views: 1250,
    },
    {
      id: 2,
      title: 'Méthodologie TIPE : Guide complet MP',
      author: 'Fatima Zahra',
      date: '2024-01-12',
      status: 'Brouillon',
      views: 0,
    },
    {
      id: 3,
      title: 'Classement 2024 des prépas marocaines',
      author: 'Omar Alami',
      date: '2024-01-10',
      status: 'Publié',
      views: 2100,
    },
  ];

  const recentDocuments = [
    {
      id: 1,
      title: 'Cours Algèbre Linéaire MP',
      subject: 'Mathématiques',
      filiere: 'MP',
      downloads: 450,
      isPremium: false,
    },
    {
      id: 2,
      title: 'Annales CNC Physique 2023',
      subject: 'Physique',
      filiere: 'PSI',
      downloads: 320,
      isPremium: true,
    },
    {
      id: 3,
      title: 'Exercices Thermodynamique',
      subject: 'Physique',
      filiere: 'MP',
      downloads: 280,
      isPremium: false,
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: TrendingUp },
    { id: 'articles', label: 'Actualités', icon: FileText },
    { id: 'documents', label: 'Bibliothèque', icon: BookOpen },
    { id: 'concours', label: 'Concours', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Dashboard Administrateur</h1>
                <p className="text-muted-foreground mt-1">
                  Gérez votre plateforme CPGEISTES
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="btn-secondary">
                  <Search className="w-4 h-4 mr-2" />
                  Rechercher
                </button>
                <button className="btn-hero">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-border">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                  }`}
                >
                  <tab.icon className="w-4 h-4 inline mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="card-feature">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                      <p className="text-sm text-success mt-1">{stat.change} ce mois</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Recent Articles */}
              <div className="card-feature">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Actualités récentes</h3>
                  <button className="text-primary hover:text-primary/80 text-sm font-medium">
                    Voir tout
                  </button>
                </div>
                <div className="space-y-4">
                  {recentArticles.map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-1">{article.title}</h4>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <span>{article.author}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                          <span className="mx-2">•</span>
                          <span className={`px-2 py-1 rounded ${
                            article.status === 'Publié' 
                              ? 'bg-success/20 text-success' 
                              : 'bg-warning/20 text-warning'
                          }`}>
                            {article.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <span className="text-xs text-muted-foreground">{article.views} vues</span>
                        <button className="p-1 hover:bg-background rounded">
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Documents */}
              <div className="card-feature">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Documents récents</h3>
                  <button className="text-primary hover:text-primary/80 text-sm font-medium">
                    Voir tout
                  </button>
                </div>
                <div className="space-y-4">
                  {recentDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-sm line-clamp-1">{doc.title}</h4>
                          {doc.isPremium && (
                            <Crown className="w-4 h-4 text-premium" />
                          )}
                        </div>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <span>{doc.subject}</span>
                          <span className="mx-2">•</span>
                          <span>{doc.filiere}</span>
                          <span className="mx-2">•</span>
                          <span>{doc.downloads} téléchargements</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="p-1 hover:bg-background rounded">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-background rounded text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Gestion des Actualités</h2>
              <button className="btn-hero">
                <Plus className="w-4 h-4 mr-2" />
                Nouvel article
              </button>
            </div>
            
            <div className="card-feature">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium">Titre</th>
                      <th className="text-left py-3 px-4 font-medium">Auteur</th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium">Statut</th>
                      <th className="text-left py-3 px-4 font-medium">Vues</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentArticles.map((article) => (
                      <tr key={article.id} className="border-b border-border hover:bg-muted/30">
                        <td className="py-3 px-4">{article.title}</td>
                        <td className="py-3 px-4">{article.author}</td>
                        <td className="py-3 px-4">{new Date(article.date).toLocaleDateString('fr-FR')}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            article.status === 'Publié' 
                              ? 'bg-success/20 text-success' 
                              : 'bg-warning/20 text-warning'
                          }`}>
                            {article.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{article.views}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 hover:bg-muted rounded">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button className="p-1 hover:bg-muted rounded text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Gestion de la Bibliothèque</h2>
              <button className="btn-hero">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau document
              </button>
            </div>
            
            <div className="card-feature">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium">Titre</th>
                      <th className="text-left py-3 px-4 font-medium">Matière</th>
                      <th className="text-left py-3 px-4 font-medium">Filière</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">Téléchargements</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDocuments.map((doc) => (
                      <tr key={doc.id} className="border-b border-border hover:bg-muted/30">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <span>{doc.title}</span>
                            {doc.isPremium && (
                              <Crown className="w-4 h-4 text-premium" />
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">{doc.subject}</td>
                        <td className="py-3 px-4">{doc.filiere}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            doc.isPremium 
                              ? 'bg-premium/20 text-premium' 
                              : 'bg-success/20 text-success'
                          }`}>
                            {doc.isPremium ? 'Premium' : 'Gratuit'}
                          </span>
                        </td>
                        <td className="py-3 px-4">{doc.downloads}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 hover:bg-muted rounded">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button className="p-1 hover:bg-muted rounded text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Concours Tab */}
        {activeTab === 'concours' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Gestion des Concours</h2>
              <button className="btn-hero">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau concours
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-feature">
                <h3 className="text-lg font-semibold mb-4">CNC 2026</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Candidats inscrits</span>
                    <span className="font-medium">12,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Places disponibles</span>
                    <span className="font-medium">3,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taux de réussite</span>
                    <span className="font-medium text-success">25.6%</span>
                  </div>
                </div>
                <button className="btn-secondary w-full mt-4">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Modifier
                </button>
              </div>

              <div className="card-feature">
                <h3 className="text-lg font-semibold mb-4">CNAEM 2026</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Candidats inscrits</span>
                    <span className="font-medium">8,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Places disponibles</span>
                    <span className="font-medium">1,800</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taux de réussite</span>
                    <span className="font-medium text-success">22.0%</span>
                  </div>
                </div>
                <button className="btn-secondary w-full mt-4">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Modifier
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;