import React, { useState, useEffect } from 'react';
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
import { supabase, Article, Document, Concour } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [articles, setArticles] = useState<Article[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [concours, setConcours] = useState<Concour[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [articlesRes, documentsRes, concoursRes] = await Promise.all([
        supabase.from('articles').select('*').order('created_at', { ascending: false }),
        supabase.from('documents').select('*').order('created_at', { ascending: false }),
        supabase.from('concours').select('*').order('created_at', { ascending: false })
      ]);

      if (articlesRes.data) setArticles(articlesRes.data);
      if (documentsRes.data) setDocuments(documentsRes.data);
      if (concoursRes.data) setConcours(concoursRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const recentArticles = articles.slice(0, 3);
  const recentDocuments = documents.slice(0, 3);

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: TrendingUp },
    { id: 'articles', label: 'Actualités', icon: FileText },
    { id: 'documents', label: 'Bibliothèque', icon: BookOpen },
    { id: 'concours', label: 'Concours', icon: Award },
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Accès non autorisé</h1>
          <p className="text-muted-foreground">Vous n'avez pas les permissions pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
              <div className="card-feature">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{user ? '1' : '0'}</p>
                    <p className="text-muted-foreground">Utilisateurs</p>
                  </div>
                </div>
              </div>

              <div className="card-feature">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{documents.length}</p>
                    <p className="text-muted-foreground">Documents</p>
                  </div>
                </div>
              </div>

              <div className="card-feature">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <Download className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{documents.reduce((sum, doc) => sum + doc.downloads, 0)}</p>
                    <p className="text-muted-foreground">Téléchargements</p>
                  </div>
                </div>
              </div>

              <div className="card-feature">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <Crown className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{documents.filter(doc => doc.is_premium).length}</p>
                    <p className="text-muted-foreground">Documents Premium</p>
                  </div>
                </div>
              </div>
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
                  {recentArticles.length > 0 ? (
                    recentArticles.map((article) => (
                      <div key={article.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-1">{article.title}</h4>
                          <div className="flex items-center mt-1 text-xs text-muted-foreground">
                            <span>{article.author}</span>
                            <span className="mx-2">•</span>
                            <span>{new Date(article.published_at).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button className="p-1 hover:bg-background rounded">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">Aucun article pour le moment</p>
                  )}
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
                  {recentDocuments.length > 0 ? (
                    recentDocuments.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-sm line-clamp-1">{doc.title}</h4>
                            {doc.is_premium && (
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
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">Aucun document pour le moment</p>
                  )}
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
                      <th className="text-left py-3 px-4 font-medium">Catégorie</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.length > 0 ? (
                      articles.map((article) => (
                        <tr key={article.id} className="border-b border-border hover:bg-muted/30">
                          <td className="py-3 px-4">{article.title}</td>
                          <td className="py-3 px-4">{article.author}</td>
                          <td className="py-3 px-4">{new Date(article.published_at).toLocaleDateString('fr-FR')}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded text-xs bg-primary/20 text-primary">
                              {article.category}
                            </span>
                          </td>
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
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-muted-foreground">
                          Aucun article pour le moment
                        </td>
                      </tr>
                    )}
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
                    {documents.length > 0 ? (
                      documents.map((doc) => (
                        <tr key={doc.id} className="border-b border-border hover:bg-muted/30">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <span>{doc.title}</span>
                              {doc.is_premium && (
                                <Crown className="w-4 h-4 text-premium" />
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">{doc.subject}</td>
                          <td className="py-3 px-4">{doc.filiere}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              doc.is_premium 
                                ? 'bg-premium/20 text-premium' 
                                : 'bg-success/20 text-success'
                            }`}>
                              {doc.is_premium ? 'Premium' : 'Gratuit'}
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
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-muted-foreground">
                          Aucun document pour le moment
                        </td>
                      </tr>
                    )}
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
              {concours.length > 0 ? (
                concours.map((concour) => (
                  <div key={concour.id} className="card-feature">
                    <h3 className="text-lg font-semibold mb-4">{concour.name} {concour.year}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Inscription</span>
                        <span className="text-sm font-medium">
                          {new Date(concour.inscription_start).toLocaleDateString()} - {new Date(concour.inscription_end).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Écrits</span>
                        <span className="text-sm font-medium">
                          {new Date(concour.ecrits_start).toLocaleDateString()} - {new Date(concour.ecrits_end).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Oraux</span>
                        <span className="text-sm font-medium">
                          {new Date(concour.oraux_start).toLocaleDateString()} - {new Date(concour.oraux_end).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="pt-4 border-t border-border">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Stats</span>
                          <div className="text-xs text-muted-foreground">
                            {concour.stats.candidats} candidats • {concour.stats.places} places • {concour.stats.taux_reussite}% réussite
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <button className="p-1 hover:bg-muted rounded">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-muted rounded text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8 text-muted-foreground">
                  Aucun concours pour le moment
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;