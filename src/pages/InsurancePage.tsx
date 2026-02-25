import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Building, Banknote } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const InsurancePage: React.FC = () => {
  const { t } = useLanguage();
  const billingSteps = [
    { step: 1, title: t('insurance.step1.title'), desc: t('insurance.step1.desc') },
    { step: 2, title: t('insurance.step2.title'), desc: t('insurance.step2.desc') },
    { step: 3, title: t('insurance.step3.title'), desc: t('insurance.step3.desc') },
  ];
  const paymentOptions = [
    { icon: CreditCard, title: t('insurance.payment.online'), desc: t('insurance.payment.online.desc') },
    { icon: Banknote, title: t('insurance.payment.installment'), desc: t('insurance.payment.installment.desc') },
    { icon: Smartphone, title: t('insurance.payment.mobile'), desc: t('insurance.payment.mobile.desc') },
    { icon: Building, title: t('insurance.payment.corporate'), desc: t('insurance.payment.corporate.desc') },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="page-hero">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-secondary text-xs font-semibold uppercase tracking-[0.2em] mb-3">{t('insurance.hero.label')}</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4">{t('insurance.hero.title')}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-white/60 max-w-2xl mx-auto mb-8">{t('insurance.hero.subtitle')}</motion.p>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-[8px]">{t('insurance.check')}</Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-[8px]">{t('insurance.billing')}</Button>
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="premium-card p-8 max-w-xl mx-auto mb-20">
            <h2 className="text-xl font-bold mb-2">{t('insurance.search.title')}</h2>
            <p className="text-muted-foreground text-sm mb-5">{t('insurance.search.subtitle')}</p>
            <div className="flex gap-3">
              <Input placeholder={t('insurance.search.placeholder')} className="rounded-[6px]" />
              <Button className="rounded-[8px]">{t('common.search')}</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">{t('insurance.search.popular')}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">{t('insurance.journey.title')}</h2>
            <p className="section-subtitle">{t('insurance.journey.subtitle')}</p>
          </motion.div>
          <div className="max-w-2xl mx-auto space-y-6 mb-20">
            {billingSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex gap-5">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">{step.step}</div>
                <div><h3 className="font-semibold mb-1">{step.title}</h3><p className="text-muted-foreground text-sm">{step.desc}</p></div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">{t('insurance.payment.title')}</h2>
            <p className="section-subtitle">{t('insurance.payment.subtitle')}</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {paymentOptions.map((opt, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -3 }} className="premium-card p-6 text-center">
                <opt.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-sm mb-2">{opt.title}</h3>
                <p className="text-xs text-muted-foreground">{opt.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default InsurancePage;
