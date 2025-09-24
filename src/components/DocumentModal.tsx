import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  document?: Tables<'documents'> | null;
  onSuccess: () => void;
}

export const DocumentModal = ({ isOpen, onClose, document, onSuccess }: DocumentModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: document?.title || '',
    subject: document?.subject || '',
    filiere: document?.filiere || 'MP',
    year: document?.year || new Date().getFullYear(),
    document_url: document?.document_url || '',
    is_premium: document?.is_premium || false
  });

  const filieres = [
    { value: 'MP', label: 'MP' },
    { value: 'PSI', label: 'PSI' },
    { value: 'TSI', label: 'TSI' },
    { value: 'ECS', label: 'ECS' },
    { value: 'ECT', label: 'ECT' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (document) {
        // Update existing document
        const { error } = await supabase
          .from('documents')
          .update(formData)
          .eq('id', document.id);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Document mis à jour avec succès",
        });
      } else {
        // Create new document
        const { error } = await supabase
          .from('documents')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Document créé avec succès",
        });
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving document:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le document",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              {document ? 'Modifier le document' : 'Nouveau document'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Titre</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Matière</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Filière</label>
                <select
                  value={formData.filiere}
                  onChange={(e) => setFormData({ ...formData, filiere: e.target.value })}
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  {filieres.map((filiere) => (
                    <option key={filiere.value} value={filiere.value}>
                      {filiere.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Année</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  min={2000}
                  max={2030}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">URL du document</label>
              <input
                type="url"
                value={formData.document_url}
                onChange={(e) => setFormData({ ...formData, document_url: e.target.value })}
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_premium"
                checked={formData.is_premium}
                onChange={(e) => setFormData({ ...formData, is_premium: e.target.checked })}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="is_premium" className="text-sm font-medium">
                Document Premium
              </label>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
                disabled={loading}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="btn-hero"
                disabled={loading}
              >
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};