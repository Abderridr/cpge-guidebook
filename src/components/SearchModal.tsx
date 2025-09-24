import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResults {
  articles: Tables<'articles'>[];
  documents: Tables<'documents'>[];
  concours: Tables<'concours'>[];
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults>({
    articles: [],
    documents: [],
    concours: []
  });
  const [loading, setLoading] = useState(false);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults({ articles: [], documents: [], concours: [] });
      return;
    }

    setLoading(true);
    try {
      const [articlesRes, documentsRes, concoursRes] = await Promise.all([
        supabase
          .from('articles')
          .select('*')
          .or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,author.ilike.%${searchQuery}%`)
          .limit(5),
        supabase
          .from('documents')
          .select('*')
          .or(`title.ilike.%${searchQuery}%,subject.ilike.%${searchQuery}%`)
          .limit(5),
        supabase
          .from('concours')
          .select('*')
          .or(`name.ilike.%${searchQuery}%`)
          .limit(5)
      ]);

      setResults({
        articles: articlesRes.data || [],
        documents: documentsRes.data || [],
        concours: concoursRes.data || []
      });
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  if (!isOpen) return null;

  const totalResults = results.articles.length + results.documents.length + results.concours.length;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 p-4">
      <div className="bg-background rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Rechercher</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher dans les articles, documents, concours..."
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              autoFocus
            />
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground mt-2">Recherche en cours...</p>
              </div>
            )}

            {!loading && query && totalResults === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Aucun résultat trouvé pour "{query}"</p>
              </div>
            )}

            {!loading && totalResults > 0 && (
              <div className="space-y-6">
                {results.articles.length > 0 && (
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">
                      Articles ({results.articles.length})
                    </h3>
                    <div className="space-y-2">
                      {results.articles.map((article) => (
                        <div key={article.id} className="p-3 border border-border rounded-lg hover:bg-muted/30">
                          <h4 className="font-medium">{article.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Par {article.author} • {article.category}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {results.documents.length > 0 && (
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">
                      Documents ({results.documents.length})
                    </h3>
                    <div className="space-y-2">
                      {results.documents.map((doc) => (
                        <div key={doc.id} className="p-3 border border-border rounded-lg hover:bg-muted/30">
                          <h4 className="font-medium">{doc.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {doc.subject} • {doc.filiere} • {doc.year}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {results.concours.length > 0 && (
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">
                      Concours ({results.concours.length})
                    </h3>
                    <div className="space-y-2">
                      {results.concours.map((concour) => (
                        <div key={concour.id} className="p-3 border border-border rounded-lg hover:bg-muted/30">
                          <h4 className="font-medium">{concour.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {concour.type} • {concour.year}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};