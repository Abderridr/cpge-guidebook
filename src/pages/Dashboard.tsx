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
  TrendingUp,
  BookOpen,
  Award
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ArticleModal } from '@/components/ArticleModal';
import { DocumentModal } from '@/components/DocumentModal';
import { SearchModal } from '@/components/SearchModal';
import { ConcoursModal } from '@/components/ConcoursModal'; // NEW

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [articles, setArticles] = useState<Tables<'articles'>[]>([]);
  const [documents, setDocuments] = useState<Tables<'documents'>[]>([]);
  const [concours, setConcours] = useState<Tables<'concours'>[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [articleModal, setArticleModal] = useState<{isOpen: boolean; article?: Tables<'articles'> | null}>({isOpen: false, article: null});
  const [documentModal, setDocumentModal] = useState<{isOpen: boolean; document?: Tables<'documents'> | null}>({isOpen: false, document: null});
  const [concoursModal, setConcoursModal] = useState<{isOpen: boolean; concours?: Tables<'concours'> | null}>({isOpen: false, concours: null}); // NEW
  const [searchModal, setSearchModal] = useState(false);

  const { user, isAdmin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isAdmin) fetchData();
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
      console.error(error);
      toast({ title: 'Erreur', description: "Impossible de charger les données", variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // Handlers
  const handleCreateArticle = () => setArticleModal({ isOpen: true, article: null });
  const handleEditArticle = (article: Tables<'articles'>) => setArticleModal({ isOpen: true, article });
  const handleCreateDocument = () => setDocumentModal({ isOpen: true, document: null });
  const handleEditDocument = (document: Tables<'documents'>) => setDocumentModal({ isOpen: true, document });

  // NEW: Concours handlers
  const handleCreateConcours = () => setConcoursModal({ isOpen: true, concours: null });
  const handleEditConcours = (concour: Tables<'concours'>) => setConcoursModal({ isOpen: true, concours: concour });

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Accès non autorisé</h1>
          <p className="text-muted-foreground">Vous n'avez pas les permissions pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: TrendingUp },
    { id: 'articles', label: 'Actualités', icon: FileText },
    { id: 'documents', label: 'Bibliothèque', icon: BookOpen },
    { id: 'concours', label: 'Concours', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header & New buttons */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Administrateur</h1>
            <p className="text-muted-foreground mt-1">Gérez votre plateforme CPGEISTES</p>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setSearchModal(true)} className="btn-secondary">
              <Search className="w-4 h-4 mr-2" /> Rechercher
            </button>
            <button onClick={handleCreateArticle} className="btn-hero">
              <Plus className="w-4 h-4 mr-2" /> Nouvel article
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-b border-border mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                }`}
              >
                <tab.icon className="w-4 h-4 inline mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Concours Tab */}
        {activeTab === 'concours' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Gestion des Concours</h2>
              <button onClick={handleCreateConcours} className="btn-hero">
                <Plus className="w-4 h-4 mr-2" /> Nouveau concours
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
                          {new Date(concour.inscription_start).toLocaleDateString()} - {new Date(concour.inscrition_end).toLocaleDateString()}
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
                            {(concour.stats as any)?.candidats || 0} candidats • {(concour.stats as any)?.places || 0} places • {(concour.stats as any)?.taux_reussite || 0}% réussite
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <button onClick={() => handleEditConcours(concour)} className="p-1 hover:bg-muted rounded">
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

      {/* Modals */}
      <ArticleModal isOpen={articleModal.isOpen} onClose={() => setArticleModal({isOpen: false, article: null})} article={articleModal.article} onSuccess={fetchData} />
      <DocumentModal isOpen={documentModal.isOpen} onClose={() => setDocumentModal({isOpen: false, document: null})} document={documentModal.document} onSuccess={fetchData} />
      <ConcoursModal isOpen={concoursModal.isOpen} onClose={() => setConcoursModal({isOpen: false, concours: null})} concours={concoursModal.concours} onSuccess={fetchData} /> {/* NEW */}
      <SearchModal isOpen={searchModal} onClose={() => setSearchModal(false)} />
    </div>
  );
};

export default Dashboard;
