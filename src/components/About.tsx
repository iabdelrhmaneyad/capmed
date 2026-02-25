import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ecosystemImage from '@/assets/ecosystem-2.png';

const About: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-xl overflow-hidden">
              <img
                src={ecosystemImage}
                alt="CapitalMed Campus"
                className="w-full h-[420px] lg:h-[500px] object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="section-label">{t('about.subtitle')}</p>
            <h2 className="section-title mb-5">{t('about.title')}</h2>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {t('about.description')}
            </p>

            {/* Mission & Vision */}
            <div className="space-y-4">
              <div className="flex gap-4 p-5 bg-muted/60 rounded-xl group hover:bg-muted transition-colors duration-300">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm mb-1">{t('about.mission')}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t('about.mission.text')}</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-muted/60 rounded-xl group hover:bg-muted transition-colors duration-300">
                <div className="w-11 h-11 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm mb-1">{t('about.vision')}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t('about.vision.text')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
