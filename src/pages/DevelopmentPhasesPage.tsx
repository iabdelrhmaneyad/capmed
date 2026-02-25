import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import hospitalPhase1 from '@/assets/hospital-phase1-1.png';
import hospitalPhase2 from '@/assets/hospital-phase2.png';
import ecosystem3 from '@/assets/ecosystem-3.png';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const DevelopmentPhasesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const stats = [{ value: '$1.2B', label: t('dev.stats.investment') }, { value: '577K', label: t('dev.stats.area') }, { value: '2,000+', label: t('dev.stats.beds') }, { value: '2030', label: t('dev.stats.completion') }];
  const phases = [
    { number: 1, title: t('dev.phase1.title'), period: t('dev.phase1.period'), status: t('dev.phase1.status'), desc: t('dev.phase1.desc'), image: hospitalPhase1, items: language === 'ar' ? ['مستشفى جامعي بـ ١٢٠٠ سرير', 'مركز البحث والتعليم', 'مركز إعادة التأهيل', 'المرافق المركزية'] : ['1,200-bed University Hospital', 'Research & Education Center', 'Rehabilitation Center', 'Central Utilities'], statusType: 'completed' as const },
    { number: 2, title: t('dev.phase2.title'), period: t('dev.phase2.period'), status: t('dev.phase2.status'), desc: t('dev.phase2.desc'), image: hospitalPhase2, items: language === 'ar' ? ['مركز القلب', 'معهد الأورام', 'مركز علوم الأعصاب', 'الفندق الطبي'] : ['Cardiac Center', 'Oncology Institute', 'Neuroscience Center', 'Medical Hotel'], statusType: 'inProgress' as const },
    { number: 3, title: t('dev.phase3.title'), period: t('dev.phase3.period'), status: t('dev.phase3.status'), desc: t('dev.phase3.desc'), image: ecosystem3, items: language === 'ar' ? ['مستشفى النساء والأطفال', 'منتجع العافية', 'حرم التعليم الطبي', 'المنطقة التجارية'] : ['Women & Children Hospital', 'Wellness Resort', 'Medical Education Campus', 'Commercial District'], statusType: 'planned' as const },
  ];
  const milestones = language === 'ar' ? [{ year: '٢٠٢٢', event: 'وضع حجر الأساس' }, { year: '٢٠٢٤', event: 'اكتمال المرحلة الأولى' }, { year: '٢٠٢٥', event: 'استقبال أول المرضى' }, { year: '٢٠٢٧', event: 'اكتمال المرحلة الثانية' }, { year: '٢٠٣٠', event: 'تشغيل المدينة بالكامل' }] : [{ year: '2022', event: 'Project Groundbreaking' }, { year: '2024', event: 'Phase 1 Completion' }, { year: '2025', event: 'First Patients Admitted' }, { year: '2027', event: 'Phase 2 Completion' }, { year: '2030', event: 'Full City Operational' }];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="page-hero">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
              <p className="text-secondary text-sm font-medium mb-1">70%</p>
              <Progress value={70} className="max-w-xs mx-auto mb-1" />
              <p className="text-xs text-white/50">{t('dev.hero.progress')}</p>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4">{t('dev.hero.title')}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-white/60 max-w-2xl mx-auto mb-8">{t('dev.hero.subtitle')}</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="flex justify-center gap-8 flex-wrap">
              {stats.map((s, i) => (<div key={i} className="text-center"><p className="text-2xl font-bold text-white">{s.value}</p><p className="text-xs text-white/50">{s.label}</p></div>))}
            </motion.div>
          </div>
        </section>
        <section className="container mx-auto px-6 py-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="section-title text-center mb-12">{t('dev.phases.title')}</motion.h2>
          <div className="space-y-6 max-w-3xl mx-auto mb-20">
            {phases.map((phase, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -2 }} className="premium-card overflow-hidden p-0">
                <img src={phase.image} alt={phase.title} className="w-full h-44 object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">{phase.number}</div>
                    <h3 className="text-xl font-bold">{phase.title}</h3>
                    <Badge variant={phase.statusType === 'completed' ? 'default' : phase.statusType === 'inProgress' ? 'secondary' : 'outline'} className="text-xs">{phase.status}</Badge>
                  </div>
                  <p className="text-secondary text-sm font-medium mb-2">{phase.period}</p>
                  <p className="text-muted-foreground text-sm mb-3">{phase.desc}</p>
                  <ul className="grid grid-cols-2 gap-2">{phase.items.map((item, j) => (<li key={j} className="text-xs text-muted-foreground flex items-center gap-2">{phase.statusType === 'completed' ? <CheckCircle2 className="w-3.5 h-3.5 text-secondary" /> : <Clock className="w-3.5 h-3.5 text-muted-foreground" />}{item}</li>))}</ul>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="section-title text-center mb-10">{t('dev.milestones.title')}</motion.h2>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center gap-4">
            {milestones.map((m, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -3 }} className="premium-card p-5 text-center min-w-[140px]">
                <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-xl font-bold text-primary">{m.year}</p>
                <p className="text-xs text-muted-foreground">{m.event}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default DevelopmentPhasesPage;
