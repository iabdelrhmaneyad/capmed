import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, ChevronDown, Globe, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import MegaMenu from '@/components/header/MegaMenu';
import MobileNav from '@/components/header/MobileNav';
import SearchBar from '@/components/SearchBar';

const Header: React.FC = () => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const location = useLocation();
  const megaMenuTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMegaMenuOpen(false);
  }, [location.pathname]);

  const mainNavItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.services'), href: '/services' },
    { label: t('nav.doctors'), href: '/doctors' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  const handleMoreEnter = () => {
    clearTimeout(megaMenuTimeout.current);
    setIsMegaMenuOpen(true);
  };

  const handleMoreLeave = () => {
    megaMenuTimeout.current = setTimeout(() => setIsMegaMenuOpen(false), 200);
  };

  const textColor = isScrolled ? 'text-foreground' : 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]';
  const hoverColor = isScrolled ? 'hover:text-primary' : 'hover:text-white/70';

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      {/* Top Bar */}
      <div className={`hidden md:block transition-colors duration-300 ${isScrolled ? 'border-b border-border/30' : 'border-b border-white/10'}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-9 text-xs">
            <div className={`flex items-center gap-4 ${isScrolled ? 'text-muted-foreground' : 'text-white/70'}`}>
              <a href="tel:+201234567890" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                <Phone className="w-3 h-3" />
                <span>+20 2 1234 5678</span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className={`h-7 text-xs ${textColor}`}>
                    <Globe className="w-3.5 h-3.5 mr-1" />
                    {language === 'en' ? 'EN' : 'عربي'}
                    <ChevronDown className="w-3 h-3 ml-0.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="bg-popover">
                  <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('ar')}>العربية</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo - fixed, no change on scroll */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="CapitalMed"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`nav-link ${location.pathname === item.href ? 'active' : ''} ${textColor} ${hoverColor}`}
              >
                {item.label}
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={handleMoreEnter}
              onMouseLeave={handleMoreLeave}
            >
              <button
                className={`nav-link flex items-center gap-1 ${textColor} ${hoverColor}`}
                onClick={() => setIsMegaMenuOpen((v) => !v)}
              >
                {t('nav.more')}
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </nav>

          {/* Search + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <SearchBar />
            <Link to="/doctors">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-[8px] px-6 text-sm font-semibold">
                {t('hero.cta.doctor')}
              </Button>
            </Link>
          </div>

          {/* Mobile: Search + Menu */}
          <div className="flex lg:hidden items-center gap-1">
            <SearchBar />
            <Button
              variant="ghost"
              size="icon"
              className={textColor}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mega Menu */}
      <div
        onMouseEnter={handleMoreEnter}
        onMouseLeave={handleMoreLeave}
      >
        <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
      </div>

      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </motion.header>
  );
};

export default Header;
