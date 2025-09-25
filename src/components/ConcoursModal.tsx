import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Trophy, Target } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

interface ConcoursModalProps {
  isOpen: boolean;
  onClose: () => void;
  concours?: Tables<'concours'> | null;
  onSuccess: () => void;
}

export const ConcoursModal: React.FC<ConcoursModalProps> = ({
  isOpen,
  onClose,
  concours,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'CNC' as 'CNC' | 'CNAEM',
    year: new Date().getFullYear(),
    inscription_start: '',
    inscription_end: '',
    ecrits_start: '',
    ecrits_end: '',
    oraux_start: '',
    oraux_end: '',
    results_date: '',
    filieres: [] as string[],
    stats: {
      candidats: 0,
      places: 0,
      taux_reussite: 0
    },
    ecoles: [] as string[]
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const filiereOptions = ['MP', 'PSI', 'TSI', 'ECS', 'ECT'];
  const ecoleOptions = [
    'EMI', 'INSEA', 'ENSAM', 'ENSA Rabat', 'ENSA Casablanca', 
    'EHTP', 'EST', 'ENCG', 'ISCAE', 'ESI'
  ];

  useEffect(() => {
    if (isOpen) {
      if (concours) {
        setFormData({
          name: concours.name,
          type: concours.type as 'CNC' | 'CNAEM',
          year: concours.year,
          inscription_start: concours.inscription_start,
          inscription_end: concours.inscription_end,
          ecrits_start: concours.ecrits_start,
          ecrits_end: concours.ecrits_end,
          oraux_start: concours.oraux_start,
          oraux_end: concours.oraux_end,
          results_date: concours.results_date,
          filieres: concours.filieres as string[],
          stats: concours.stats as any,
          ecoles: concours.ecoles as string[]
        });
      } else {
        setFormData({
          name: '',
          type: 'CNC',
          year: new Date().getFullYear(),
          inscription_start: '',
          inscription_end: '',
          ecrits_start: '',
          ecrits_end: '',
          oraux_start: '',
          oraux_end: '',
          results_date: '',
          filieres: [],
          stats: {
            candidats: 0,
            places: 0,
            taux_reussite: 0
          },
          ecoles: []
        });
      }
    }
  }, [isOpen, concours]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (concours) {
        const { error } = await supabase
          .from('concours')
          .update(formData)
          .eq('id', concours.id);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Concours modifié avec succès",
        });
      } else {
        const { error } = await supabase
          .from('concours')
          .insert(formData);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Concours créé avec succès",
        });
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving concours:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le concours",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFiliereToggle = (filiere: string) => {
    setFormData(prev => ({
      ...prev,
      filieres: prev.filieres.includes(filiere)
        ? prev.filieres.filter(f => f !== filiere)
        : [...prev.filieres, filiere]
    }));
  };

  const handleEcoleToggle = (ecole: string) => {
    setFormData(prev => ({
      ...prev,
      ecoles: prev.ecoles.includes(ecole)
        ? prev.ecoles.filter(e => e !== ecole)
        : [...prev.ecoles, ecole]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">
            {concours ? 'Modifier le concours' : 'Nouveau concours'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nom du concours</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="CNC, CNAEM..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'CNC' | 'CNAEM' }))}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="CNC">CNC</option>
                <option value="CNAEM">CNAEM</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Année</label>
              <input
                type="number"
                required
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Dates importantes
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Début inscription</label>
                <input
                  type="date"
                  required
                  value={formData.inscription_start}
                  onChange={(e) => setFormData(prev => ({ ...prev, inscription_start: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Fin inscription</label>
                <input
                  type="date"
                  required
                  value={formData.inscription_end}
                  onChange={(e) => setFormData(prev => ({ ...prev, inscription_end: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Début écrits</label>
                <input
                  type="date"
                  required
                  value={formData.ecrits_start}
                  onChange={(e) => setFormData(prev => ({ ...prev, ecrits_start: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Fin écrits</label>
                <input
                  type="date"
                  required
                  value={formData.ecrits_end}
                  onChange={(e) => setFormData(prev => ({ ...prev, ecrits_end: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Début oraux</label>
                <input
                  type="date"
                  required
                  value={formData.oraux_start}
                  onChange={(e) => setFormData(prev => ({ ...prev, oraux_start: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Fin oraux</label>
                <input
                  type="date"
                  required
                  value={formData.oraux_end}
                  onChange={(e) => setFormData(prev => ({ ...prev, oraux_end: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Date des résultats</label>
                <input
                  type="date"
                  required
                  value={formData.results_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, results_date: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Filières concernées
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {filiereOptions.map((filiere) => (
                <label key={filiere} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.filieres.includes(filiere)}
                    onChange={() => handleFiliereToggle(filiere)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span className="text-sm">{filiere}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Écoles participantes
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {ecoleOptions.map((ecole) => (
                <label key={ecole} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.ecoles.includes(ecole)}
                    onChange={() => handleEcoleToggle(ecole)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span className="text-sm">{ecole}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Statistiques
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Candidats</label>
                <input
                  type="number"
                  min="0"
                  value={formData.stats.candidats}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    stats: { ...prev.stats, candidats: parseInt(e.target.value) || 0 }
                  }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Places</label>
                <input
                  type="number"
                  min="0"
                  value={formData.stats.places}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    stats: { ...prev.stats, places: parseInt(e.target.value) || 0 }
                  }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Taux réussite (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.stats.taux_reussite}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    stats: { ...prev.stats, taux_reussite: parseFloat(e.target.value) || 0 }
                  }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-border">
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
              {loading ? 'Enregistrement...' : (concours ? 'Modifier' : 'Créer')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};