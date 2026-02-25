import React from 'react';
import { motion } from 'framer-motion';
import {
  Heart, Brain, Stethoscope, Baby, Bone, Eye,
  Pill, Syringe, Activity, Microscope, Ribbon, Ear,
  ArrowRight, AlertTriangle
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import heroImage2 from '@/assets/hero-hospital-interior.jpg';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ServicesPage: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const services = [
    { icon: Heart, key: 'cardiology' },
    { icon: Brain, key: 'neurology' },
    { icon: Bone, key: 'orthopedics' },
    { icon: Baby, key: 'pediatrics' },
    { icon: Ribbon, key: 'oncology' },
    { icon: Eye, key: 'ophthalmology' },
    { icon: Stethoscope, key: 'internal' },
    { icon: Syringe, key: 'surgery' },
    { icon: Activity, key: 'emergency' },
    { icon: Microscope, key: 'laboratory' },
    { icon: Pill, key: 'pharmacy' },
    { icon: Ear, key: 'ent' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      <Header />

      {/* Hero with staggered animations */}
      <section className="page-hero">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-secondary text-xs font-semibold uppercase tracking-[0.2em] mb-3">Healthcare Excellence</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4">{t('services.page.title')}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto">{t('services.page.subtitle')}</motion.p>
        </div>
      </section>

      {/* Services Grid with stagger */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {services.map((service) => (
              <motion.div
                key={service.key}
                variants={fadeUp}
                whileHover={{ y: -4, boxShadow: '0 12px 24px -4px rgba(0,40,100,0.08)' }}
                className="group premium-card p-6 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t(`services.${service.key}.title`)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  {t(`services.${service.key}.desc`)}
                </p>
                <div className={`flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span>{t('services.learn.more')}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Emergency - Dark neutral background with red accents */}
      <section className="py-20 bg-[hsl(200,90%,14%)]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div className="h-px flex-1 bg-destructive/20" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">{t('services.emergency.title')}</h2>
              <p className="text-white/60 mb-6">{t('services.emergency.desc')}</p>
              <ul className="space-y-2 mb-8">
                {['24/7', 'trauma', 'ambulance', 'rapid'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
                    <div className="w-1.5 h-1.5 bg-destructive rounded-full" />
                    {t(`services.emergency.${item}`)}
                  </li>
                ))}
              </ul>
              <Button size="lg" className="bg-destructive hover:bg-destructive/90 text-white rounded-[8px]">
                {t('services.emergency.call')}
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10">
              <img src={heroImage2} alt="Emergency" className="w-full h-full object-cover opacity-80" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-[hsl(200,90%,14%)] rounded-xl p-10 md:p-14 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">{t('services.cta.title')}</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">{t('services.cta.subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-[8px]">
                {t('services.cta.appointment')}
              </Button>
              <Button size="lg" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-[8px]">
                {t('services.cta.contact')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
};

export default ServicesPage;
