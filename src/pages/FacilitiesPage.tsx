import React from 'react';
import { motion } from 'framer-motion';
import { Hotel, ShoppingBag, UtensilsCrossed, Car, Wifi, Coffee, Flower2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import capitalmedHotel from '@/assets/capitalmed-hotel.png';
import rehabCenter from '@/assets/rehab-center-1.png';
import patientRooms from '@/assets/patient-rooms.png';
import commercialMall from '@/assets/commercial-mall.png';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const FacilitiesPage: React.FC = () => {
  const { t } = useLanguage();

  const amenities = [
    { icon: UtensilsCrossed, title: t('facilities.retail.cafes'), items: ['Starbucks Reserve', 'Healthy Eats Bistro', '24/7 Main Cafeteria'] },
    { icon: ShoppingBag, title: t('facilities.retail.shops'), items: ['Wellness Gift Shop', 'Convenience Store', 'Florist & Books'] },
    { icon: Hotel, title: t('facilities.retail.bank'), items: ['Full-Service Bank Branch', 'ATM Center', 'Travel Agency'] },
  ];

  const support = [
    { icon: Car, title: t('facilities.support.parking'), desc: t('facilities.support.parking.desc') },
    { icon: Wifi, title: t('facilities.support.wifi'), desc: t('facilities.support.wifi.desc') },
    { icon: Coffee, title: t('facilities.support.lounge'), desc: t('facilities.support.lounge.desc') },
    { icon: Flower2, title: t('facilities.support.green'), desc: t('facilities.support.green.desc') },
  ];

  const hotelFeatures = [
    { title: t('facilities.hotel.concierge'), desc: t('facilities.hotel.concierge.desc') },
    { title: t('facilities.hotel.suites'), desc: t('facilities.hotel.suites.desc') },
    { title: t('facilities.hotel.dining'), desc: t('facilities.hotel.dining.desc') },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="page-hero">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-secondary text-xs font-semibold uppercase tracking-[0.2em] mb-3">{t('facilities.hero.label')}</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4">{t('facilities.hero.title')}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-white/60 max-w-2xl mx-auto">{t('facilities.hero.subtitle')}</motion.p>
          </div>
        </section>

        <section className="container mx-auto px-6 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-lg mb-16">
            <img src={capitalmedHotel} alt="CapitalMed Hotel" className="w-full h-[300px] md:h-[400px] object-cover" />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="premium-card overflow-hidden p-0 mb-16">
            <div className="grid md:grid-cols-2">
              <img src={patientRooms} alt="Patient Rooms" className="w-full h-full object-cover" />
              <div className="p-8 md:p-10">
                <p className="section-label">{t('facilities.hotel.label')}</p>
                <h2 className="section-title mb-4">{t('facilities.hotel.title')}</h2>
                <p className="text-muted-foreground text-sm mb-6">{t('facilities.hotel.desc')}</p>
                <div className="space-y-3">
                  {hotelFeatures.map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="bg-muted/50 rounded-lg p-4">
                      <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 mb-16">
            <motion.div initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="rounded-xl overflow-hidden"><img src={rehabCenter} alt="Rehabilitation" className="w-full h-[260px] object-cover" /></motion.div>
            <motion.div initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="rounded-xl overflow-hidden"><img src={commercialMall} alt="Commercial" className="w-full h-[260px] object-cover" /></motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">{t('facilities.retail.title')}</h2>
            <p className="section-subtitle">{t('facilities.retail.subtitle')}</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-5 mb-20">
            {amenities.map((cat, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -3 }} className="premium-card p-6">
                <cat.icon className="w-6 h-6 text-primary mb-4" />
                <h3 className="font-semibold mb-3">{cat.title}</h3>
                <ul className="space-y-2">
                  {cat.items.map((item, j) => (
                    <li key={j} className="text-muted-foreground text-sm flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-secondary" />{item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">{t('facilities.support.title')}</h2>
            <p className="section-subtitle">{t('facilities.support.subtitle')}</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {support.map((item, i) => (
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

export default FacilitiesPage;
