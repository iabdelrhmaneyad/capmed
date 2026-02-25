import React from 'react';
import { motion } from 'framer-motion';
import { 
  Siren, Scissors, Heart, Ribbon, Brain, Baby, ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const services = [
  { key: 'emergency', icon: Siren },
  { key: 'surgery', icon: Scissors },
  { key: 'cardiology', icon: Heart },
  { key: 'oncology', icon: Ribbon },
  { key: 'neurology', icon: Brain },
  { key: 'pediatrics', icon: Baby },
];

const Services: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="services" className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-label">{t('services.title')}</p>
          <h2 className="section-title">{t('services.subtitle')}</h2>
          <p className="section-subtitle">{t('services.description')}</p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group premium-card p-7 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
                  <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>

                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {t(`services.${service.key}.title`)}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {t(`services.${service.key}.desc`)}
                </p>

                <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>{t('hero.cta.learn')}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/services">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-[8px] px-8">
              {t('nav.services')}
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
