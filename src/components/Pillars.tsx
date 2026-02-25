import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Brain, Briefcase, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const pillars = [
  {
    icon: Heart,
    titleKey: 'pillars.patients.title',
    subtitleKey: 'pillars.patients.subtitle',
    descKey: 'pillars.patients.desc',
    href: '/services',
  },
  {
    icon: Brain,
    titleKey: 'pillars.professionals.title',
    subtitleKey: 'pillars.professionals.subtitle',
    descKey: 'pillars.professionals.desc',
    href: '/research',
  },
  {
    icon: Briefcase,
    titleKey: 'pillars.partners.title',
    subtitleKey: 'pillars.partners.subtitle',
    descKey: 'pillars.partners.desc',
    href: '/investment',
  },
];

const Pillars: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-label">CAPITALMED</p>
          <h2 className="section-title">{t('pillars.title')}</h2>
          <p className="section-subtitle">{t('pillars.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={pillar.href} className="block group">
                  <div className="premium-card p-8 h-full">
                    <div className="w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {t(pillar.titleKey)}
                    </h3>
                    <p className="text-secondary text-sm font-medium mb-3">
                      {t(pillar.subtitleKey)}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {t(pillar.descKey)}
                    </p>

                    <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all duration-300">
                      <span>{t('hero.cta.learn')}</span>
                      <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pillars;
