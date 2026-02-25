import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Brain, Heart, Dna, Bug, Leaf, Cpu, BookOpen, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const ResearchPage: React.FC = () => {
  const { t } = useLanguage();
  const researchAreas = [
    { icon: Heart, title: t('research.areas.oncology'), desc: t('research.areas.oncology.desc') },
    { icon: Heart, title: t('research.areas.cardiology'), desc: t('research.areas.cardiology.desc') },
    { icon: Brain, title: t('research.areas.neuro'), desc: t('research.areas.neuro.desc') },
    { icon: Dna, title: t('research.areas.genomics'), desc: t('research.areas.genomics.desc') },
    { icon: Bug, title: t('research.areas.infectious'), desc: t('research.areas.infectious.desc') },
    { icon: Leaf, title: t('research.areas.regenerative'), desc: t('research.areas.regenerative.desc') },
  ];
  const ecosystem = [
    { icon: Cpu, title: t('research.ecosystem.ai'), desc: t('research.ecosystem.ai.desc') },
    { icon: FlaskConical, title: t('research.ecosystem.biobank'), desc: t('research.ecosystem.biobank.desc') },
    { icon: BookOpen, title: t('research.ecosystem.library'), desc: t('research.ecosystem.library.desc') },
    { icon: Users, title: t('research.ecosystem.hub'), desc: t('research.ecosystem.hub.desc') },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="page-hero">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-secondary text-xs font-semibold uppercase tracking-[0.2em] mb-3">{t('misc.researchInnovation')}</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4">{t('research.hero.title')}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-white/60 max-w-2xl mx-auto">{t('research.hero.subtitle')}</motion.p>
          </div>
        </section>

        <section className="container mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="premium-card p-8 md:p-10 mb-20">
            <h2 className="section-title mb-4">{t('research.vision.title')}</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">{t('research.vision.p1')}</p>
            <p className="text-muted-foreground leading-relaxed">{t('research.vision.p2')}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">{t('research.areas.title')}</h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {researchAreas.map((area, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -3 }} className="premium-card p-6">
                <area.icon className="w-6 h-6 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{area.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{area.desc}</p>
                <Badge variant="outline" className="text-xs">{t('research.planned')}</Badge>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-4">
            <h2 className="section-title">{t('research.ecosystem.title')}</h2>
            <p className="section-subtitle">{t('research.ecosystem.subtitle')}</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {ecosystem.map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -3 }} className="premium-card p-6 text-center">
                <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default ResearchPage;
