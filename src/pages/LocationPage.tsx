import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plane, Car, Train, Bus, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const LocationPage: React.FC = () => {
  const { t, language } = useLanguage();
  const transport = [
    { icon: Plane, title: t('location.transport.air'), desc: t('location.transport.air.desc') },
    { icon: Car, title: t('location.transport.road'), desc: t('location.transport.road.desc') },
    { icon: Train, title: t('location.transport.metro'), desc: t('location.transport.metro.desc') },
    { icon: Bus, title: t('location.transport.bus'), desc: t('location.transport.bus.desc') },
  ];
  const landmarks = language === 'ar' ? [{ distance: '٣٥ كم', name: 'مطار القاهرة الدولي' }, { distance: '٤٥ كم', name: 'وسط القاهرة' }, { distance: '٦٠ كم', name: 'أهرامات الجيزة' }, { distance: '٢٥ كم', name: 'العاصمة الإدارية' }, { distance: '٢ كم', name: 'جامعة بدر' }, { distance: '٥ كم', name: 'طريق القاهرة-السويس' }] : [{ distance: '35 km', name: 'Cairo International Airport' }, { distance: '45 km', name: 'Downtown Cairo' }, { distance: '60 km', name: 'Giza Pyramids' }, { distance: '25 km', name: 'New Administrative Capital' }, { distance: '2 km', name: 'Badr University' }, { distance: '5 km', name: 'Cairo-Suez Highway' }];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="page-hero">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-secondary text-xs font-semibold uppercase tracking-[0.2em] mb-3">{t('location.hero.label')}</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4">{t('location.hero.title')}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-white/60 max-w-2xl mx-auto mb-8">{t('location.hero.subtitle')}</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="flex justify-center gap-8 flex-wrap">
              {[{ value: '45KM', label: t('location.stats.airport') }, { value: '144', label: t('location.stats.acres') }, { value: '3', label: t('location.stats.continents') }].map((s, i) => (
                <div key={i} className="text-center"><p className="text-2xl font-bold text-white">{s.value}</p><p className="text-xs text-white/50">{s.label}</p></div>
              ))}
            </motion.div>
          </div>
        </section>
        <section className="container mx-auto px-6 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-xl overflow-hidden shadow-lg max-w-4xl mx-auto mb-4">
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%86%D9%87+%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%D9%87+%D9%83%D8%A7%D8%A8%D9%8A%D8%AA%D8%A7%D9%84+%D9%85%D9%8A%D8%AF,Badr,Cairo&zoom=14&maptype=roadmap"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CapitalMed Location"
              className="w-full h-[350px] md:h-[500px]"
            />
            {/* Highlight overlay badge */}
            <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-10">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-bold">CapitalMed</span>
            </div>
          </motion.div>
          {/* CapitalMed Location Info */}
          <div className="max-w-4xl mx-auto mb-4">
            <div className="flex items-center justify-center gap-3 bg-primary/10 border-2 border-primary/30 rounded-xl px-6 py-5 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-md">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-foreground">CapitalMed Healthcare City</h3>
                <p className="text-sm text-muted-foreground font-medium">المدينة الطبية «كابيتال ميد» المهندسين</p>
                <p className="text-xs text-muted-foreground mt-1">4Q43+XG9, طريق, Badr, Cairo Governorate 4956010</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 mb-16">
            <a href="https://www.google.com/maps/search/%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%86%D9%87+%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%D9%87+%D9%83%D8%A7%D8%A8%D9%8A%D8%AA%D8%A7%D9%84+%D9%85%D9%8A%D8%AF,+Badr,+Cairo" target="_blank" rel="noopener noreferrer"><Button size="lg" className="rounded-[8px]"><MapPin className="w-4 h-4 mr-2" />{t('location.directions')}</Button></a>
            <a href="https://www.google.com/maps/@30.074,31.738,1500m/data=!3m1!1e3" target="_blank" rel="noopener noreferrer"><Button size="lg" variant="outline" className="rounded-[8px]">{t('location.satellite')}</Button></a>
          </div>
          <div className="grid md:grid-cols-2 gap-5 max-w-2xl mx-auto mb-20">
            <motion.div initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="premium-card p-6">
              <h3 className="font-semibold text-sm mb-3">{t('location.contact.title')}</h3>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /><strong>{t('location.contact.hotline')}</strong> 19999</p>
                <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /><strong>{t('location.contact.international')}</strong> +20 (02) 2123 4567</p>
                <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" />info@capitalmed.com.eg</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="premium-card p-6">
              <h3 className="font-semibold text-sm mb-3">{t('location.hours.title')}</h3>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />{t('location.hours.weekday')}</p>
                <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />{t('location.hours.weekend')}</p>
                <p className="flex items-center gap-2 text-secondary font-medium"><Clock className="w-3.5 h-3.5" />{t('location.hours.emergency')}</p>
              </div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">{t('location.getting.title')}</h2>
            <p className="section-subtitle">{t('location.getting.subtitle')}</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {transport.map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -3 }} className="premium-card p-6 text-center">
                <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="section-title text-center mb-10">{t('location.landmarks.title')}</motion.h2>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-2xl mx-auto mb-20">
            {landmarks.map((l, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -2 }} className="premium-card p-4 flex items-center gap-4">
                <span className="text-xl font-bold text-primary">{l.distance}</span>
                <span className="text-sm">{l.name}</span>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-primary/5 border border-primary/15 rounded-xl p-10 text-center">
            <h2 className="text-2xl font-bold mb-5">{t('location.cta.title')}</h2>
            <p className="text-muted-foreground text-sm mb-5">{t('location.cta.subtitle')}</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
              <Link to="/contact" className="w-full sm:w-auto"><Button size="lg" className="rounded-[8px] w-full sm:w-auto">{t('location.cta.schedule')}</Button></Link>
              <Link to="/medical-tourism" className="w-full sm:w-auto"><Button size="lg" variant="outline" className="rounded-[8px] w-full sm:w-auto">{t('location.cta.tourism')}</Button></Link>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default LocationPage;
