import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';

const ContactPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t('contact.form.success'));
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: MapPin, title: 'contact.info.address', content: 'contact.address' },
    { icon: Phone, title: 'contact.info.phone', content: 'contact.phone' },
    { icon: Mail, title: 'contact.info.email', content: 'contact.email' },
    { icon: Clock, title: 'contact.info.hours', content: 'contact.hours' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      <Header />
      
      <section className="page-hero">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-secondary text-xs font-semibold uppercase tracking-[0.2em] mb-3">Get In Touch</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4">{t('contact.page.title')}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto">{t('contact.page.subtitle')}</motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-10 -mt-10 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, index) => (
              <motion.div key={info.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}
                whileHover={{ y: -3 }}
                className="premium-card text-center p-6">
                <info.icon className="w-5 h-5 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-sm mb-1">{t(info.title)}</h3>
                {info.icon === Phone ? (
                  <a href={`tel:${t(info.content).replace(/\s/g, '')}`} className="text-muted-foreground text-xs hover:text-primary transition-colors">{t(info.content)}</a>
                ) : info.icon === Mail ? (
                  <a href={`mailto:${t(info.content)}`} className="text-muted-foreground text-xs hover:text-primary transition-colors">{t(info.content)}</a>
                ) : (
                  <p className="text-muted-foreground text-xs">{t(info.content)}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Map */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold">{t('contact.form.title')}</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm">{t('contact.form.name')}</Label>
                    <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="rounded-[6px]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm">{t('contact.form.email')}</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="rounded-[6px]" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm">{t('contact.form.phone')}</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="rounded-[6px]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm">{t('contact.form.subject')}</Label>
                    <Input id="subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required className="rounded-[6px]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm">{t('contact.form.message')}</Label>
                  <Textarea id="message" rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required className="rounded-[6px]" />
                </div>
                <Button type="submit" size="lg" className="rounded-[8px] bg-primary hover:bg-primary/90">
                  <Send className={`w-4 h-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                  {t('contact.form.submit')}
                </Button>
              </form>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="rounded-xl overflow-hidden min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.37709424156!2d31.655566!3d30.0131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583d5f2e7b3f9d%3A0x2dc7a7c7c3c3c3c3!2sNew%20Administrative%20Capital!5e0!3m2!1sen!2seg!4v1234567890"
                width="100%" height="100%" style={{ border: 0, minHeight: '400px' }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="CapitalMed Location"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ - Accordion */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="section-title">{t('contact.faq.title')}</h2>
            <p className="section-subtitle">{t('contact.faq.subtitle')}</p>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-2">
              {[1, 2, 3, 4].map((faq) => (
                <AccordionItem key={faq} value={`faq-${faq}`} className="premium-card px-5 border">
                  <AccordionTrigger className="text-left text-sm hover:no-underline font-semibold">
                    {t(`contact.faq.q${faq}`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    {t(`contact.faq.a${faq}`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
};

export default ContactPage;
