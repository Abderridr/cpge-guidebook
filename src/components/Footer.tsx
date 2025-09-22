import React from 'react';
import logoImage from '@/assets/logo.png';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Actualités', href: '/actualites' },
    { name: 'Bibliothèque', href: '/bibliotheque' },
    { name: 'Concours', href: '/concours' },
    { name: 'Offres Korrid', href: '/offres-korrid' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logoImage} alt="CPGEISTES Logo" className="w-8 h-8 rounded-lg" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                CPGEISTES
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Plateforme éducative dédiée aux étudiants des classes préparatoires aux grandes écoles au Maroc. 
              Excellence, communauté et réussite.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Liens Rapides</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/dashboard"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                >
                  Dashboard (Admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>contact@cpgeistes.ma</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+212 6 XX XX XX XX</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Rabat, Maroc</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Suivez-nous</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200 group"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              Rejoignez notre communauté de plus de 10,000 étudiants CPGE
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2024 CPGEISTES. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Politique de confidentialité
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;