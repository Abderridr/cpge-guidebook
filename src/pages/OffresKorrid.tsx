import React, { useState } from 'react';
import { Check, X, Star, Users, Calendar, BookOpen, Video, MessageCircle, Crown } from 'lucide-react';

const OffresKorrid = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const offers = [
    {
      name: 'Solo',
      description: 'Parfait pour les étudiants autonomes',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      popular: false,
      monthlyPrice: 299,
      yearlyPrice: 2990,
      features: {
        included: [
          'Accès complet à la bibliothèque',
          'Documents Premium illimités',
          'Annales corrigées détaillées',
          'Cours vidéo HD',
          'Support par email',
          'Planning personnalisé',
          'Exercices interactifs',
        ],
        excluded: [
          'Coaching individuel',
          'Sessions de groupe',
          'Correction de copies',
          'Entretiens blancs',
        ],
      },
    },
    {
      name: 'Track',
      description: 'Accompagnement personnalisé avec coaching',
      icon: Users,
      color: 'from-green-500 to-green-600',
      popular: true,
      monthlyPrice: 699,
      yearlyPrice: 6990,
      features: {
        included: [
          'Tout de l\'offre Solo',
          '4h de coaching individuel/mois',
          'Correction de copies (2/mois)',
          'Sessions de révision en groupe',
          'Entretiens blancs',
          'Suivi personnalisé',
          'Groupes WhatsApp exclusifs',
          'Webinaires experts',
        ],
        excluded: [
          'Coaching illimité',
          'Classe virtuelle privée',
        ],
      },
    },
    {
      name: 'Class',
      description: 'Programme intensif avec classe virtuelle',
      icon: Crown,
      color: 'from-purple-500 to-purple-600',
      popular: false,
      monthlyPrice: 1299,
      yearlyPrice: 12990,
      features: {
        included: [
          'Tout de l\'offre Track',
          'Classe virtuelle privée (12 étudiants max)',
          'Coaching individuel illimité',
          'Professeurs dédiés',
          'Corrections illimitées',
          'Entretiens blancs hebdomadaires',
          'Suivi intensif quotidien',
          'Garantie intégration*',
        ],
        excluded: [],
      },
    },
  ];

  const comparisonFeatures = [
    'Accès bibliothèque Premium',
    'Documents et annales',
    'Cours vidéo HD',
    'Exercices interactifs',
    'Support technique',
    'Planning personnalisé',
    'Coaching individuel',
    'Correction de copies',
    'Sessions de groupe',
    'Entretiens blancs',
    'Classe virtuelle',
    'Professeurs dédiés',
    'Garantie intégration',
  ];

  const faqs = [
    {
      question: 'Puis-je changer d\'offre en cours d\'année ?',
      answer: 'Oui, vous pouvez upgrader votre offre à tout moment. La différence sera calculée au prorata temporis.',
    },
    {
      question: 'Y a-t-il une période d\'essai ?',
      answer: 'Nous offrons 7 jours d\'essai gratuit pour toutes nos offres. Aucun engagement.',
    },
    {
      question: 'Que comprend la garantie intégration ?',
      answer: 'Si vous ne réussissez aucun concours après avoir suivi assidûment le programme Class, nous vous remboursons 50% des frais.',
    },
    {
      question: 'Les cours sont-ils adaptés aux filières marocaines ?',
      answer: 'Absolument ! Tous nos contenus sont spécialement conçus pour les filières CPGE marocaines (MP, PSI, TSI, ECS, ECT).',
    },
    {
      question: 'Puis-je annuler mon abonnement ?',
      answer: 'Oui, vous pouvez annuler à tout moment. Pour les abonnements annuels, remboursement possible les 30 premiers jours.',
    },
    {
      question: 'Le coaching est-il disponible en arabe ?',
      answer: 'Nos coachs sont bilingues et peuvent vous accompagner en français et en arabe selon vos préférences.',
    },
  ];

  const getPrice = (offer: typeof offers[0]) => {
    return billingCycle === 'monthly' ? offer.monthlyPrice : Math.round(offer.yearlyPrice / 12);
  };

  const getAnnualSavings = (offer: typeof offers[0]) => {
    const monthlyCost = offer.monthlyPrice * 12;
    const yearlyCost = offer.yearlyPrice;
    return monthlyCost - yearlyCost;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-subtle py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="section-title">Offres Korrid</h1>
            <p className="section-subtitle">
              Choisissez l'accompagnement qui correspond à vos ambitions et maximisez vos chances de réussite
            </p>
          </div>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-muted p-1 rounded-lg">
              <div className="flex">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    billingCycle === 'monthly'
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Mensuel
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 relative ${
                    billingCycle === 'yearly'
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Annuel
                  <span className="absolute -top-2 -right-2 bg-success text-success-foreground text-xs px-2 py-1 rounded-full">
                    -20%
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <div
                key={offer.name}
                className={`relative rounded-2xl border-2 transition-all duration-300 hover:shadow-xl animate-fade-in ${
                  offer.popular
                    ? 'border-primary shadow-lg scale-105'
                    : 'border-border hover:border-primary/50'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {offer.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium">
                      Plus populaire
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${offer.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <offer.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{offer.name}</h3>
                    <p className="text-muted-foreground">{offer.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-4xl font-bold">{getPrice(offer)}</span>
                      <span className="text-muted-foreground ml-2">DH/mois</span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <p className="text-sm text-success">
                        Économisez {getAnnualSavings(offer)} DH/an
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {offer.features.included.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-success mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {offer.features.excluded.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center opacity-50">
                        <X className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      offer.popular
                        ? 'btn-hero'
                        : 'btn-secondary hover:bg-primary hover:text-primary-foreground'
                    }`}
                  >
                    Choisir {offer.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="content-section bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Comparaison détaillée</h2>
            <p className="section-subtitle">
              Comparez en détail les fonctionnalités de chaque offre
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-6 font-semibold">Fonctionnalités</th>
                  {offers.map((offer) => (
                    <th key={offer.name} className="text-center py-4 px-6 font-semibold">
                      {offer.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/30">
                    <td className="py-4 px-6">{feature}</td>
                    {offers.map((offer) => {
                      const isIncluded = offer.features.included.some(f => 
                        f.toLowerCase().includes(feature.toLowerCase().split(' ')[0])
                      );
                      const isExcluded = offer.features.excluded.some(f => 
                        f.toLowerCase().includes(feature.toLowerCase().split(' ')[0])
                      );
                      
                      return (
                        <td key={offer.name} className="py-4 px-6 text-center">
                          {isIncluded || (!isExcluded && index < 6) ? (
                            <Check className="w-5 h-5 text-success mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="content-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Questions fréquentes</h2>
            <p className="section-subtitle">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="card-feature animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="content-section bg-gradient-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-primary rounded-3xl p-12 text-primary-foreground">
            <Star className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à rejoindre l'excellence ?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Plus de 5,000 étudiants nous font confiance pour leur réussite aux concours. 
              Rejoignez la communauté CPGEISTES dès aujourd'hui !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary-foreground text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-opacity-90 transition-all duration-300">
                Commencer l'essai gratuit
              </button>
              <button className="border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-foreground hover:text-primary transition-all duration-300">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OffresKorrid;