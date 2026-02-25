import React from 'react';
import { motion } from 'framer-motion';
import { UserSearch, Calendar, Building2, Stethoscope, Plane, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const quickActions = [
  { key: 'quick.doctor', icon: UserSearch, href: '/doctors' },
  { key: 'quick.appointments', icon: Calendar, href: '/contact' },
  { key: 'quick.facilities', icon: Building2, href: '/facilities' },
  { key: 'quick.specializations', icon: Stethoscope, href: '/services' },
  { key: 'quick.tourism', icon: Plane, href: '/medical-tourism' },
  { key: 'quick.contact', icon: Phone, href: '/contact' },
];

const QuickActions: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative -mt-16 z-20 pb-16">
      <div className="container mx-auto px-6">
        <p className="text-center text-muted-foreground text-xs font-semibold uppercase tracking-[0.2em] mb-8">
          {t('quick.title')}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link to={action.href}>
                  <div className="group flex flex-col items-center justify-center p-6 bg-card rounded-xl border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300 cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                      <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <span className="text-xs font-medium text-foreground text-center leading-tight">
                      {t(action.key)}
                    </span>
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

export default QuickActions;
