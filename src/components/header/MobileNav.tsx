import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, Info, Stethoscope, UserSearch, Phone,
  Building2, Plane, FlaskConical, Handshake, Layers,
  TrendingUp, Shield, Newspaper, Briefcase, MapPin, HelpCircle, Globe
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import capitalmedLogo from '@/assets/logo.svg';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const mainItems = [
    { icon: Home, label: t('nav.home'), href: '/' },
    { icon: Info, label: t('nav.about'), href: '/about' },
    { icon: Stethoscope, label: t('nav.services'), href: '/services' },
    { icon: UserSearch, label: t('nav.doctors'), href: '/doctors' },
    { icon: Phone, label: t('nav.contact'), href: '/contact' },
  ];

  const moreItems = [
    { icon: Building2, label: t('nav.facilities'), href: '/facilities' },
    { icon: Plane, label: t('nav.medicalTourism'), href: '/medical-tourism' },
    { icon: FlaskConical, label: t('nav.research'), href: '/research' },
    { icon: Handshake, label: t('nav.partnerships'), href: '/partnerships' },
    { icon: Layers, label: t('nav.developmentPhases'), href: '/development-phases' },
    { icon: TrendingUp, label: t('nav.investment'), href: '/investment' },
    { icon: Shield, label: t('nav.insurance'), href: '/insurance' },
    { icon: Newspaper, label: t('nav.news'), href: '/news' },
    { icon: Briefcase, label: t('nav.careers'), href: '/careers' },
    { icon: MapPin, label: t('nav.location'), href: '/location' },
    { icon: HelpCircle, label: t('nav.faq'), href: '/faq' },
  ];

  const NavItem = ({ item }: { item: { icon: React.ElementType; label: string; href: string } }) => {
    const isActive = location.pathname === item.href;
    return (
      <Link
        to={item.href}
        onClick={onClose}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
            ? 'bg-primary text-primary-foreground font-semibold'
            : 'text-foreground hover:bg-muted'
          }`}
      >
        <item.icon className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm">{item.label}</span>
      </Link>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="left" className="w-[300px] p-0 overflow-y-auto">
        <SheetHeader className="p-5 pb-3">
          <SheetTitle className="flex items-center gap-2">
            <img src={capitalmedLogo} alt="CapitalMed" className="h-10 w-auto" />
          </SheetTitle>
        </SheetHeader>

        <div className="px-3 pb-6 space-y-1">
          {mainItems.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}

          <Separator className="my-3" />

          <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {t('nav.more')}
          </p>

          {moreItems.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}

          <Separator className="my-3" />

          {/* Language Switcher */}
          <div className="flex items-center gap-2 px-4 py-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <Button
              variant={language === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('en')}
            >
              EN
            </Button>
            <Button
              variant={language === 'ar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('ar')}
            >
              عربي
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
