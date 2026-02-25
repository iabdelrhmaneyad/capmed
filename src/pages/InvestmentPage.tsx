import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Stethoscope, FlaskConical, Cpu, MonitorCheck } from 'lucide-react';
import adminBuilding from '@/assets/admin-building.png';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const InvestmentPage: React.FC = () => {
  const { t, language } = useLanguage();
  const stats = [
    { value: '144', label: t('investment.stats.acres') },
    { value: '2k+', label: t('investment.stats.beds') },
    { value: '19', label: t('investment.stats.centres') },
    { value: '70', label: t('investment.stats.theaters') },
  ];
  const opportunities = [
    { icon: GraduationCap, title: t('investment.opp.academic'), desc: t('investment.opp.academic.desc'), items: language === 'ar' ? ['برامج درجات مشتركة', 'تبادل الطلاب'] : ['Joint Degree Programs', 'Student Exchange'] },
    { icon: Stethoscope, title: t('investment.opp.clinical'), desc: t('investment.opp.clinical.desc'), items: language === 'ar' ? ['إدارة مركز الأورام', 'خدمات إعادة التأهيل'] : ['Oncology Center Management', 'Rehabilitation Services'] },
    { icon: FlaskConical, title: t('investment.opp.rnd'), desc: t('investment.opp.rnd.desc'), items: language === 'ar' ? ['التجارب السريرية المرحلة I-IV', 'البحث الجينومي'] : ['Clinical Trials Phase I-IV', 'Genomic Research'] },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="page-hero">
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-secondary text-xs font-semibold uppercase tracking-[0.2em] mb-3">{t('investment.hero.label')}</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4">{t('investment.hero.title')}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-white/60 max-w-2xl mx-auto mb-8">{t('investment.hero.subtitle')}</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="flex justify-center gap-6 sm:gap-8 flex-wrap">
              {stats.map((s, i) => (<div key={i} className="text-center"><p className="text-2xl font-bold text-white">{s.value}</p><p className="text-xs text-white/50">{s.label}</p></div>))}
            </motion.div>
          </div>
        </section>
        <section className="container mx-auto px-4 md:px-6 py-10 md:py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-lg max-w-3xl mx-auto mb-20">
            <img src={adminBuilding} alt="CapitalMed Campus" className="w-full h-48 sm:h-64 md:h-[350px] object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">{t('investment.opportunities.title')}</h2>
            <p className="section-subtitle">{t('investment.opportunities.subtitle')}</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-5 mb-20">
            {opportunities.map((opp, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -3 }} className="premium-card p-6">
                <opp.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{opp.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{opp.desc}</p>
                <ul className="space-y-1">{opp.items.map((item, j) => (<li key={j} className="text-xs text-muted-foreground flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-secondary" />{item}</li>))}</ul>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">{t('investment.smart.title')}</h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-5 max-w-2xl mx-auto mb-20">
            {[{ icon: Cpu, title: t('investment.smart.digital'), desc: t('investment.smart.digital.desc') }, { icon: MonitorCheck, title: t('investment.smart.simulation'), desc: t('investment.smart.simulation.desc') }].map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -3 }} className="premium-card p-8 text-center">
                <item.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-primary/5 border border-primary/15 rounded-xl p-6 md:p-10 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-5">{t('investment.cta.title')}</h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
              <Link to="/contact" className="w-full sm:w-auto"><Button size="lg" className="rounded-[8px] w-full sm:w-auto">{t('investment.cta.visit')}</Button></Link>
              <Button size="lg" variant="outline" className="rounded-[8px] w-full sm:w-auto">{t('investment.cta.download')}</Button>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default InvestmentPage;
