import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Microscope, Stethoscope, Cpu } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const partners = [
  { name: 'Johns Hopkins Medicine', country: 'USA', type: 'Academic', focus: 'Medical Research', key: true },
  { name: 'German Heart Center', country: 'Germany', type: 'Clinical', focus: 'Cardiology', key: true },
  { name: 'Mayo Clinic', country: 'USA', type: 'Research', focus: 'Multi-specialty', key: true },
  { name: 'NHS Foundation Trust', country: 'UK', type: 'Healthcare', focus: 'Public Health', key: false },
  { name: 'Charité Berlin', country: 'Germany', type: 'Academic', focus: 'Medical Education', key: false },
  { name: 'Singapore General Hospital', country: 'Singapore', type: 'Clinical', focus: 'Multi-specialty', key: false },
  { name: 'Cleveland Clinic', country: 'USA', type: 'Clinical', focus: 'Heart Care', key: false },
  { name: 'Karolinska Institute', country: 'Sweden', type: 'Research', focus: 'Research', key: false },
];

const PartnershipsPage: React.FC = () => {
  const { t } = useLanguage();
  const areas = [
    { icon: Stethoscope, title: t('partnerships.areas.clinical'), desc: t('partnerships.areas.clinical.desc') },
    { icon: Microscope, title: t('partnerships.areas.research'), desc: t('partnerships.areas.research.desc') },
    { icon: GraduationCap, title: t('partnerships.areas.education'), desc: t('partnerships.areas.education.desc') },
    { icon: Cpu, title: t('partnerships.areas.technology'), desc: t('partnerships.areas.technology.desc') },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="page-hero">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-secondary text-xs font-semibold uppercase tracking-[0.2em] mb-3">{t('partnerships.hero.label')}</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4">{t('partnerships.hero.title')}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-white/60 max-w-2xl mx-auto mb-8">{t('partnerships.hero.subtitle')}</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex justify-center gap-10">
              {[{ n: '15+', l: t('partnerships.stats.partners') }, { n: '8', l: t('partnerships.stats.countries') }, { n: '4', l: t('partnerships.stats.continents') }].map((s, i) => (
                <div key={i} className="text-center"><p className="text-2xl font-bold text-white">{s.n}</p><p className="text-xs text-white/50">{s.l}</p></div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">{t('partnerships.areas.title')}</h2>
            <p className="section-subtitle">{t('partnerships.areas.subtitle')}</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {areas.map((area, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -3 }} className="premium-card p-6 text-center">
                <area.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-sm mb-2">{area.title}</h3>
                <p className="text-xs text-muted-foreground">{area.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">{t('partnerships.global.title')}</h2>
            <p className="section-subtitle">{t('partnerships.global.subtitle')}</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {partners.map((partner, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -3 }} className="premium-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-xs">{partner.type}</Badge>
                  {partner.key && <span className="text-[10px] text-accent font-medium">{t('partnerships.keyPartner')}</span>}
                </div>
                <h3 className="font-semibold text-sm mb-1">{partner.name}</h3>
                <p className="text-xs text-muted-foreground mb-1">{partner.country}</p>
                <p className="text-xs text-primary">{partner.focus}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default PartnershipsPage;
