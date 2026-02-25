import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const FAQPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState('');
  const faqs = language === 'ar' ? [
    { q: 'أين يقع قسم الطوارئ؟', a: 'يقع في الطابق الأرضي من المبنى ١ مع وصول مباشر لسيارات الإسعاف.' },
    { q: 'ما هي ساعات عمل العيادات الخارجية؟', a: 'الأحد إلى الخميس ٨ صباحاً - ٨ مساءً، السبت ٩ صباحاً - ٣ عصراً.' },
    { q: 'هل أحتاج موعد للتصوير التشخيصي؟', a: 'الأشعة السينية بدون موعد. الأشعة المقطعية والرنين تتطلب حجز.' },
    { q: 'كيف أصل إلى المواقف؟', a: 'من المدخل الرئيسي. B1 للمرضى، B2 للموظفين. خدمة صف السيارات متوفرة.' },
    { q: 'ما الخدمات في طابق الحديقة؟', a: 'كافتيريا ومتجر هدايا وغرف صلاة وصالات زوار وحديقة الشفاء.' },
    { q: 'هل هناك نقل بين المباني؟', a: 'عربات كهربائية مجانية كل ١٠ دقائق.' },
    { q: 'ما شبكات التأمين المقبولة؟', a: 'أكثر من ٥٠ مزود بما في ذلك أكسا وبوبا وأليانز وميتلايف.' },
  ] : [
    { q: 'Where is the Emergency Department?', a: 'Ground floor of Building 1 with direct ambulance access.' },
    { q: 'What are outpatient clinic hours?', a: 'Sunday–Thursday 8AM–8PM, Saturday 9AM–3PM.' },
    { q: 'Do I need an appointment for imaging?', a: 'Walk-ins for X-rays. CT, MRI, ultrasound require appointments.' },
    { q: 'How do I access parking?', a: 'From main entrance. B1 for patients, B2 for staff. Valet available.' },
    { q: 'What is on the Garden Floor?', a: 'Cafeteria, gift shop, prayer rooms, visitor lounges, healing garden.' },
    { q: 'Is there shuttle service?', a: 'Free electric shuttles every 10 minutes between all buildings.' },
    { q: 'Which insurance is accepted?', a: 'Over 50 providers including AXA, Bupa, Allianz, MetLife, Cigna.' },
  ];
  const filteredFaqs = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary/5 pt-32 pb-20">
          <div className="container mx-auto px-6 text-center">
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-secondary text-xs font-semibold uppercase tracking-[0.2em] mb-3">{t('misc.helpCenter')}</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6">{t('faq.hero.title')}</motion.h1>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder={t('faq.search.placeholder')} value={search} onChange={e => setSearch(e.target.value)} className="pl-11 h-11 rounded-[6px] bg-white text-foreground" />
            </motion.div>
          </div>
        </section>
        <section className="container mx-auto px-6 py-20 max-w-2xl">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-xl font-bold mb-6">{t('faq.top.title')}</motion.h2>
          <Accordion type="single" collapsible className="space-y-2">
            {filteredFaqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                <AccordionItem value={`faq-${i}`} className="premium-card px-5 border">
                  <AccordionTrigger className="text-left text-sm hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">{faq.a}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
          {filteredFaqs.length === 0 && <p className="text-center text-muted-foreground py-8">{t('careers.noResults')}</p>}
        </section>
        <section className="container mx-auto px-6 pb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-xl font-bold text-center mb-3">{t('faq.help.title')}</motion.h2>
          <p className="text-muted-foreground text-center text-sm mb-8">{t('faq.help.subtitle')}</p>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-5 max-w-2xl mx-auto">
            {[
              { icon: MessageCircle, title: t('faq.help.chat'), desc: t('faq.help.chat.desc'), btn: t('faq.help.chat.btn'), variant: 'default' as const },
              { icon: Phone, title: t('faq.help.emergency'), desc: t('faq.help.emergency.desc'), btn: '19999', variant: 'outline' as const },
              { icon: ArrowRight, title: t('faq.help.callback'), desc: t('faq.help.callback.desc'), btn: t('faq.help.callback.btn'), variant: 'outline' as const },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -3 }} className="premium-card p-6 text-center">
                <item.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{item.desc}</p>
                <Button size="sm" variant={item.variant} className="rounded-[8px]">{item.btn}</Button>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default FAQPage;
