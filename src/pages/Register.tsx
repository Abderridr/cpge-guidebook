import React, { useState, useEffect } from 'react';
import logoImage from '@/assets/logo.png';
import { Eye, EyeOff, Mail, Lock, User, Calendar, MapPin, School, Target, CreditCard, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const registrationSchema = z.object({
  // Basic info
  email: z.string().email('Email invalide').max(255, 'Email trop long'),
  password: z.string().min(6, 'Au moins 6 caractères').max(100, 'Mot de passe trop long'),
  confirmPassword: z.string(),
  
  // Personal info
  nom: z.string().trim().min(2, 'Nom requis').max(50, 'Nom trop long'),
  prenom: z.string().trim().min(2, 'Prénom requis').max(50, 'Prénom trop long'),
  dateNaissance: z.string().min(1, 'Date de naissance requise'),
  cin: z.string().trim().min(6, 'CIN requis').max(20, 'CIN invalide'),
  cne: z.string().trim().min(8, 'CNE requis').max(20, 'CNE invalide'),
  telephone: z.string().trim().min(10, 'Téléphone requis').max(15, 'Téléphone invalide'),
  
  // Academic info
  filiere: z.string().min(1, 'Filière requise'),
  ville: z.string().trim().min(2, 'Ville requise').max(50, 'Ville trop longue'),
  centreCpge: z.string().trim().min(2, 'Centre CPGE requis').max(100, 'Centre trop long'),
  niveau: z.string().min(1, 'Niveau requis'),
  concoursVise: z.string().min(1, 'Concours visé requis'),
  numeroInscription: z.string().trim().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type RegistrationForm = z.infer<typeof baseSchema>;

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationForm>({
    email: '',
    password: '',
    confirmPassword: '',
    nom: '',
    prenom: '',
    dateNaissance: '',
    cin: '',
    cne: '',
    telephone: '',
    filiere: '',
    ville: '',
    centreCpge: '',
    niveau: '',
    concoursVise: '',
    numeroInscription: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<RegistrationForm>>({});
  
  const { signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const filieres = ['MP', 'PSI', 'TSI', 'ECS', 'ECT', 'BCPST', 'PT'];
  const niveaux = ['1ère année', '2ème année'];
  const concours = ['CNC', 'CNAEM', 'Autre'];
  
  const villes = [
    'Casablanca', 'Rabat', 'Fès', 'Marrakech', 'Agadir', 'Tanger', 
    'Meknès', 'Oujda', 'Kenitra', 'Tétouan', 'Safi', 'El Jadida',
    'Nador', 'Khouribga', 'Settat', 'Autre'
  ];

  const centresCpge = [
    'Lycée Mohammed V - Casablanca',
    'Lycée Moulay Youssef - Rabat',
    'Lycée Omar Ibn Khattab - Nador',
    'Lycée Reda Slaoui - Agadir',
    'CPGE Hassan II - Fès',
    'CPGE Ibn Taimiya - Marrakech',
    'CPGE Al Khwarizmi - Tanger',
    'CPGE Averroès - Meknès',
    'Autre'
  ];

  const handleInputChange = (field: keyof RegistrationForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

const baseSchema = z.object({
  // Basic info
  email: z.string().email('Email invalide').max(255, 'Email trop long'),
  password: z.string().min(6, 'Au moins 6 caractères').max(100, 'Mot de passe trop long'),
  confirmPassword: z.string(),
  
  // Personal info
  nom: z.string().trim().min(2, 'Nom requis').max(50, 'Nom trop long'),
  prenom: z.string().trim().min(2, 'Prénom requis').max(50, 'Prénom trop long'),
  dateNaissance: z.string().min(1, 'Date de naissance requise'),
  cin: z.string().trim().min(6, 'CIN requis').max(20, 'CIN invalide'),
  cne: z.string().trim().min(8, 'CNE requis').max(20, 'CNE invalide'),
  telephone: z.string().trim().min(10, 'Téléphone requis').max(15, 'Téléphone invalide'),
  
  // Academic info
  filiere: z.string().min(1, 'Filière requise'),
  ville: z.string().trim().min(2, 'Ville requise').max(50, 'Ville trop longue'),
  centreCpge: z.string().trim().min(2, 'Centre CPGE requis').max(100, 'Centre trop long'),
  niveau: z.string().min(1, 'Niveau requis'),
  concoursVise: z.string().min(1, 'Concours visé requis'),
  numeroInscription: z.string().trim().optional(),
});

const registrationSchema = baseSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all steps
    const isValid = validateStep(1) && validateStep(2) && validateStep(3);
    if (!isValid) return;

    setIsLoading(true);

    try {
      const { error } = await signUp(formData.email, formData.password);
      
      if (error) {
        throw error;
      }

      toast({
        title: "Compte créé avec succès",
        description: "Vérifiez votre email pour confirmer votre compte",
      });

      navigate('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Erreur lors de la création du compte",
        description: error.message === 'User already registered' 
          ? "Un compte existe déjà avec cette adresse email" 
          : error.message || "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center mb-6">Informations de connexion</h3>
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Adresse email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="votre.email@exemple.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Mot de passe <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.password ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="Au moins 6 caractères"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Confirmer le mot de passe <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.confirmPassword ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="Répétez votre mot de passe"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center mb-6">Informations personnelles</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nom */}
              <div>
                <label htmlFor="nom" className="block text-sm font-medium mb-2">
                  Nom <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="nom"
                    type="text"
                    required
                    value={formData.nom}
                    onChange={(e) => handleInputChange('nom', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.nom ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Votre nom"
                  />
                </div>
                {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
              </div>

              {/* Prénom */}
              <div>
                <label htmlFor="prenom" className="block text-sm font-medium mb-2">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="prenom"
                    type="text"
                    required
                    value={formData.prenom}
                    onChange={(e) => handleInputChange('prenom', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.prenom ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Votre prénom"
                  />
                </div>
                {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>}
              </div>
            </div>

            {/* Date de naissance */}
            <div>
              <label htmlFor="dateNaissance" className="block text-sm font-medium mb-2">
                Date de naissance <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="dateNaissance"
                  type="date"
                  required
                  value={formData.dateNaissance}
                  onChange={(e) => handleInputChange('dateNaissance', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.dateNaissance ? 'border-red-500' : 'border-border'
                  }`}
                />
              </div>
              {errors.dateNaissance && <p className="text-red-500 text-sm mt-1">{errors.dateNaissance}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CIN */}
              <div>
                <label htmlFor="cin" className="block text-sm font-medium mb-2">
                  CIN <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="cin"
                    type="text"
                    required
                    value={formData.cin}
                    onChange={(e) => handleInputChange('cin', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.cin ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Votre CIN"
                  />
                </div>
                {errors.cin && <p className="text-red-500 text-sm mt-1">{errors.cin}</p>}
              </div>

              {/* CNE */}
              <div>
                <label htmlFor="cne" className="block text-sm font-medium mb-2">
                  CNE <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="cne"
                    type="text"
                    required
                    value={formData.cne}
                    onChange={(e) => handleInputChange('cne', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.cne ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Votre CNE"
                  />
                </div>
                {errors.cne && <p className="text-red-500 text-sm mt-1">{errors.cne}</p>}
              </div>
            </div>

            {/* Téléphone */}
            <div>
              <label htmlFor="telephone" className="block text-sm font-medium mb-2">
                Téléphone <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="telephone"
                  type="tel"
                  required
                  value={formData.telephone}
                  onChange={(e) => handleInputChange('telephone', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.telephone ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="+212 6XX XXXXXX"
                />
              </div>
              {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center mb-6">Informations académiques</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Filière */}
              <div>
                <label htmlFor="filiere" className="block text-sm font-medium mb-2">
                  Filière <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <School className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <select
                    id="filiere"
                    required
                    value={formData.filiere}
                    onChange={(e) => handleInputChange('filiere', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.filiere ? 'border-red-500' : 'border-border'
                    }`}
                  >
                    <option value="">Sélectionnez votre filière</option>
                    {filieres.map(filiere => (
                      <option key={filiere} value={filiere}>{filiere}</option>
                    ))}
                  </select>
                </div>
                {errors.filiere && <p className="text-red-500 text-sm mt-1">{errors.filiere}</p>}
              </div>

              {/* Niveau */}
              <div>
                <label htmlFor="niveau" className="block text-sm font-medium mb-2">
                  Niveau <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <School className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <select
                    id="niveau"
                    required
                    value={formData.niveau}
                    onChange={(e) => handleInputChange('niveau', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.niveau ? 'border-red-500' : 'border-border'
                    }`}
                  >
                    <option value="">Sélectionnez votre niveau</option>
                    {niveaux.map(niveau => (
                      <option key={niveau} value={niveau}>{niveau}</option>
                    ))}
                  </select>
                </div>
                {errors.niveau && <p className="text-red-500 text-sm mt-1">{errors.niveau}</p>}
              </div>
            </div>

            {/* Ville */}
            <div>
              <label htmlFor="ville" className="block text-sm font-medium mb-2">
                Ville <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                </div>
                <select
                  id="ville"
                  required
                  value={formData.ville}
                  onChange={(e) => handleInputChange('ville', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.ville ? 'border-red-500' : 'border-border'
                  }`}
                >
                  <option value="">Sélectionnez votre ville</option>
                  {villes.map(ville => (
                    <option key={ville} value={ville}>{ville}</option>
                  ))}
                </select>
              </div>
              {errors.ville && <p className="text-red-500 text-sm mt-1">{errors.ville}</p>}
            </div>

            {/* Centre CPGE */}
            <div>
              <label htmlFor="centreCpge" className="block text-sm font-medium mb-2">
                Centre CPGE <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <School className="h-5 w-5 text-muted-foreground" />
                </div>
                <select
                  id="centreCpge"
                  required
                  value={formData.centreCpge}
                  onChange={(e) => handleInputChange('centreCpge', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.centreCpge ? 'border-red-500' : 'border-border'
                  }`}
                >
                  <option value="">Sélectionnez votre centre</option>
                  {centresCpge.map(centre => (
                    <option key={centre} value={centre}>{centre}</option>
                  ))}
                </select>
              </div>
              {errors.centreCpge && <p className="text-red-500 text-sm mt-1">{errors.centreCpge}</p>}
            </div>

            {/* Concours visé */}
            <div>
              <label htmlFor="concoursVise" className="block text-sm font-medium mb-2">
                Concours visé <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Target className="h-5 w-5 text-muted-foreground" />
                </div>
                <select
                  id="concoursVise"
                  required
                  value={formData.concoursVise}
                  onChange={(e) => handleInputChange('concoursVise', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.concoursVise ? 'border-red-500' : 'border-border'
                  }`}
                >
                  <option value="">Sélectionnez votre concours</option>
                  {concours.map(concours => (
                    <option key={concours} value={concours}>{concours}</option>
                  ))}
                </select>
              </div>
              {errors.concoursVise && <p className="text-red-500 text-sm mt-1">{errors.concoursVise}</p>}
            </div>

            {/* Numéro d'inscription (optionnel) */}
            <div>
              <label htmlFor="numeroInscription" className="block text-sm font-medium mb-2">
                Numéro d'inscription (optionnel)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="numeroInscription"
                  type="text"
                  value={formData.numeroInscription}
                  onChange={(e) => handleInputChange('numeroInscription', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Votre numéro d'inscription"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
            <img src={logoImage} alt="CPGEISTES Logo" className="w-12 h-12 rounded-xl" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
              CPGEISTES
            </span>
          </Link>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Créer un compte</h2>
            <p className="text-muted-foreground">
              Rejoignez la communauté CPGEISTES - Étape {currentStep}/3
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  step === currentStep
                    ? 'bg-primary text-primary-foreground shadow-lg scale-110'
                    : step < currentStep
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <div className="card-feature">
          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-secondary"
                >
                  Précédent
                </button>
              )}
              
              <div className="ml-auto">
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-hero"
                  >
                    Suivant
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-hero disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Création du compte...' : 'Créer mon compte'}
                  </button>
                )}
              </div>
            </div>

            {/* Terms & Conditions for final step */}
            {currentStep === 3 && (
              <div className="flex items-center mt-6">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-muted-foreground">
                  J'accepte les{' '}
                  <Link to="/terms" className="text-primary hover:text-primary/80 transition-colors duration-200">
                    conditions d'utilisation
                  </Link>{' '}
                  et la{' '}
                  <Link to="/privacy" className="text-primary hover:text-primary/80 transition-colors duration-200">
                    politique de confidentialité
                  </Link>
                </label>
              </div>
            )}
          </form>

          {/* Login Link */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Déjà un compte ?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full btn-secondary block text-center"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;