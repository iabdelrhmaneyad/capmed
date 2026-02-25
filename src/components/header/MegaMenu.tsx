import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, Plane, FlaskConical, Handshake, Layers, TrendingUp,
  Shield, Newspaper, Briefcase, MapPin, HelpCircle
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  const { t, isRTL } = useLanguage();

  const columns = [
    {
      title: t('nav.services'),
      items: [
        { icon: Building2, label: t('nav.facilities'), href: '/facilities', desc: 'World-class medical facilities' },
        { icon: Plane, label: t('nav.medicalTourism'), href: '/medical-tourism', desc: 'International patient services' },
        { icon: FlaskConical, label: t('nav.research'), href: '/research', desc: 'Innovation & clinical trials' },
      ],
    },
    {
      title: 'Corporate',
      items: [
        { icon: Handshake, label: t('nav.partnerships'), href: '/partnerships', desc: 'Global collaborations' },
        { icon: Layers, label: t('nav.developmentPhases'), href: '/development-phases', desc: 'Project milestones' },
        { icon: TrendingUp, label: t('nav.investment'), href: '/investment', desc: 'Investor relations' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { icon: Shield, label: t('nav.insurance'), href: '/insurance', desc: 'Insurance & billing info' },
        { icon: Newspaper, label: t('nav.news'), href: '/news', desc: 'Latest updates & press' },
        { icon: Briefcase, label: t('nav.careers'), href: '/careers', desc: 'Join our team' },
        { icon: MapPin, label: t('nav.location'), href: '/location', desc: 'Find us & directions' },
        { icon: HelpCircle, label: t('nav.faq'), href: '/faq', desc: 'Frequently asked questions' },
      ],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[calc(2.5rem+5rem)] z-40"
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 z-50 border-t border-border"
          >
            <div className="bg-card shadow-xl border-b border-border">
              <div className="container mx-auto px-4 py-8">
                <div className={`grid grid-cols-3 gap-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {columns.map((col) => (
                    <div key={col.title}>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                        {col.title}
                      </h3>
                      <div className="space-y-1">
                        {col.items.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={onClose}
                            className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-primary/5 group"
                          >
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                              <item.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                                {item.label}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;
