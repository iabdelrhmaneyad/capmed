import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Globe, Star, Shield, Database, TrendingUp, Video, FileCheck, Plane,
  Heart, Activity, Users, Smartphone, Link2, Watch, BarChart3,
  Clock, DollarSign, Target, ArrowRight, CheckCircle2, Zap,
  Building, Crown, Briefcase, Stethoscope, HeartPulse, Brain,
  Sparkles, ChevronRight, ChevronLeft, Award, Lock
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

// Animated counter hook
function useCounter(end: number, duration = 2000, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, inView]);
  return count;
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const fadeLeft = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } };
const fadeRight = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } };

const MedicalTourismPage: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const tiers = [
    { tier: 1, icon: Video, title: 'Remote Second Opinion (RSO)', target: 'Information Seekers', color: 'from-primary/20 to-primary/5 border-primary/20',
      deliverables: ['DICOM re-evaluation', 'Multidisciplinary board opinion', 'Surgical Feasibility Score'], cta: 'Request RSO' },
    { tier: 2, icon: Stethoscope, title: 'Procedure-Only Clinical', target: 'Experienced Medical Nomads', color: 'from-secondary/20 to-secondary/5 border-secondary/20',
      deliverables: ['Surgery & anesthesia', 'Immediate hospital stay', 'No hospitality support'], cta: 'Get Quote' },
    { tier: 3, icon: Shield, title: 'Essential International Package', target: 'Mid-market Patients', color: 'from-accent/20 to-accent/5 border-accent/30',
      deliverables: ['Surgery + 3-5 night hotel', 'Basic transfers', '1-month tele-follow-up'], cta: 'Book Package', popular: true },
    { tier: 4, icon: Plane, title: 'Premium Door-to-Door Concierge', target: 'Hands-off Experience Seekers', color: 'from-primary/20 to-primary/5 border-primary/20',
      deliverables: ['Full logistics & visa tracking', '4-star recovery hotel', 'Daily nurse visits'], cta: 'Inquire Now' },
    { tier: 5, icon: Crown, title: 'VIP Executive / Royal Care', target: 'UHNWI & Diplomats', color: 'from-accent/25 to-accent/5 border-accent/30',
      deliverables: ['Private wings', 'Senior surgeon guarantee', 'Personal security & luxury companion services'], cta: 'VIP Inquiry' },
    { tier: 6, icon: HeartPulse, title: 'Advanced Complex Case Program', target: 'Oncology, Cardiac, Multi-stage', color: 'from-destructive/15 to-destructive/5 border-destructive/20',
      deliverables: ['ICU capacity planning', 'Advanced imaging', 'Risk-Adjusted Pricing'], cta: 'Submit Case' },
    { tier: 7, icon: Building, title: 'Institutional & Government', target: 'Embassies, Ministries, Corporations', color: 'from-secondary/20 to-secondary/5 border-secondary/20',
      deliverables: ['Bulk pricing & SLA guarantees', 'Annual performance reports', 'Dedicated account management'], cta: 'Partner With Us' },
  ];

  const phases = [
    { num: 1, title: 'Triage', subtitle: 'Virtual Screening', icon: Video, items: ['Risk scoring algorithm', 'Encrypted video consult', 'Initial case assessment'] },
    { num: 2, title: 'Pre-Arrival', subtitle: 'Medical Clearance', icon: FileCheck, items: ['Digital consent forms', 'Anesthesia pre-clearance', 'Travel coordination'] },
    { num: 3, title: 'Execution', subtitle: 'Clinical Quality', icon: Activity, items: ['Real-time family portal', 'JCI badge transparency', 'Dedicated care team'] },
    { num: 4, title: 'Recovery', subtitle: 'Controlled Tourism', icon: Heart, items: ['Daily mobility milestones', 'Doctor-approved excursions', 'Wellness activities'] },
    { num: 5, title: 'Continuity', subtitle: 'Long-Term Safety', icon: Shield, items: ['Multilingual discharge summary', 'Local physician referral', 'Tele-follow-up plan'] },
  ];

  const differentiation = [
    { icon: DollarSign, title: 'International Cost Transparency Engine', desc: 'Live currency conversion with "Savings vs. Home Country" comparisons.', points: ['Live currency conversion', '"Savings vs. Home Country" comparisons', 'Integrated payment plans'] },
    { icon: BarChart3, title: 'Clinical Performance Dashboard', desc: 'Public-facing 30-day complication rates and PROMs.', points: ['Public 30-day complication rates', 'Patient-reported outcome measures', 'Surgical volume transparency'] },
    { icon: Shield, title: 'Continuity of Care ("Safe Return")', desc: 'Home-Physician Handshake & complication insurance.', points: ['Home-Physician Handshake protocol', 'Complication Insurance coverage', 'Post-return medication management'] },
    { icon: Target, title: 'Risk & Safety Governance', desc: 'Plan B contingency & monthly morbidity reviews.', points: ['Plan B emergency repatriation', 'Monthly morbidity review', 'ICU backup arrangements'] },
  ];

  const tech = [
    { icon: Smartphone, title: 'Patient App', desc: 'Single source of truth for schedules, records, and secure messaging.', gradient: 'from-primary to-primary-light' },
    { icon: Link2, title: 'Blockchain Records', desc: 'Secure, immutable archive of surgical reports and pathology.', gradient: 'from-secondary to-primary' },
    { icon: Watch, title: 'Wearable Integration', desc: 'Remote vitals monitoring during hotel recovery phase.', gradient: 'from-accent to-secondary' },
  ];

  const kpiRef = useRef(null);
  const kpiInView = useInView(kpiRef, { once: true });
  const complication = useCounter(2, 1500, kpiInView);
  const conversion = useCounter(34, 1500, kpiInView);
  const arpu = useCounter(18, 1500, kpiInView);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero - Parallax */}
        <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden">
          <motion.div style={{ y: heroY }} className="absolute inset-0 bg-gradient-to-br from-[hsl(200,90%,16%)] via-[hsl(200,85%,12%)] to-[hsl(210,80%,8%)]" />
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity }}
              className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px]" />
            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }}
              className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[80px]" />
            <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }}
              className="absolute top-1/4 right-1/4 w-2 h-2 bg-secondary/40 rounded-full" />
            <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-accent/30 rounded-full" />
          </div>
          {/* Wave bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <svg viewBox="0 0 1440 80" fill="none" className="w-full"><path d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0V40Z" fill="hsl(var(--background))" /></svg>
          </div>
          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 container mx-auto px-6 text-center pt-16">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 mb-6 mt-8">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-white/80 text-sm font-medium">{t('tourism.badge.icm')}</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.08]">
              {t('tourism.hero.main.title')}<br /><span className="bg-gradient-to-r from-secondary via-white to-accent bg-clip-text text-transparent">{t('tourism.hero.main.subtitle')}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('tourism.hero.desc')}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 h-13 text-base font-semibold shadow-lg shadow-accent/30">
                <Sparkles className="w-4 h-4 mr-2" />{t('tourism.cta.review')}
              </Button>
              <Button size="lg" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-full px-8 h-13 text-base">
                <Clock className="w-4 h-4 mr-2" />{t('tourism.cta.estimate')}
              </Button>
            </motion.div>
            {/* Floating stat badges */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4">
              {[{ label: t('tourism.badge.tiers'), icon: Star }, { label: t('tourism.badge.phases'), icon: Activity }, { label: t('tourism.badge.hipaa'), icon: Lock }].map((badge, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-white/5 backdrop-blur border border-white/10 rounded-full px-4 py-2">
                  <badge.icon className="w-4 h-4 text-secondary" />
                  <span className="text-white/70 text-sm">{badge.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* I. Strategic Positioning - Alternating layout */}
        <section className="container mx-auto px-6 py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <Badge variant="outline" className="mb-3 text-secondary border-secondary/30">{t('tourism.section1.badge')}</Badge>
            <h2 className="section-title text-3xl md:text-4xl">{t('tourism.section1.title')}</h2>
            <p className="section-subtitle">{t('tourism.section1.subtitle')}</p>
          </motion.div>
          <div className="space-y-16 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: t('tourism.pillar.governance'), desc: t('tourism.pillar.governance.desc'), align: 'left' },
              { icon: Database, title: t('tourism.pillar.data'), desc: t('tourism.pillar.data.desc'), align: 'right' },
              { icon: TrendingUp, title: t('tourism.pillar.value'), desc: t('tourism.pillar.value.desc'), align: 'left' },
            ].map((item, i) => (
              <motion.div key={i} variants={i % 2 === 0 ? fadeLeft : fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                <motion.div whileHover={{ scale: 1.05, rotate: 2 }} className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/10 flex items-center justify-center shrink-0 shadow-lg">
                  <item.icon className="w-10 h-10 text-primary" />
                </motion.div>
                <div className={`${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* II. 7-Tier Architecture - Bento grid */}
        <section className="py-24 bg-gradient-to-b from-muted/30 to-muted/70 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-72 h-72 border border-primary rounded-full" />
            <div className="absolute bottom-10 right-10 w-48 h-48 border border-secondary rounded-full" />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <Badge variant="outline" className="mb-3 text-secondary border-secondary/30">{t('tourism.section2.badge')}</Badge>
              <h2 className="section-title text-3xl md:text-4xl">{t('tourism.section2.title')}</h2>
              <p className="section-subtitle">{t('tourism.section2.subtitle')}</p>
            </motion.div>
            {/* Top row: 3 cards, Bottom row: 4 cards for visual interest */}
            {/* Tier Slider */}
            {(() => {
              const [activeTier, setActiveTier] = React.useState(0);
              const nextTier = () => setActiveTier((p) => (p + 1) % tiers.length);
              const prevTier = () => setActiveTier((p) => (p - 1 + tiers.length) % tiers.length);
              const tier = tiers[activeTier];
              return (
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <button onClick={prevTier} className="w-12 h-12 rounded-full border border-border hover:border-primary hover:bg-primary/5 flex items-center justify-center transition-colors">
                      <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <div className="flex gap-2">
                      {tiers.map((_, idx) => (
                        <button key={idx} onClick={() => setActiveTier(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${idx === activeTier ? 'w-8 bg-accent' : 'w-2 bg-border hover:bg-muted-foreground/30'}`} />
                      ))}
                    </div>
                    <button onClick={nextTier} className="w-12 h-12 rounded-full border border-border hover:border-primary hover:bg-primary/5 flex items-center justify-center transition-colors">
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div key={activeTier}
                      initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
                      transition={{ duration: 0.35 }}
                      className={`relative bg-card rounded-2xl border p-10 overflow-hidden ${tier.popular ? 'border-accent ring-2 ring-accent/20 shadow-lg shadow-accent/10' : 'border-border'}`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-30`} />
                      {tier.popular && (
                        <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground text-xs shadow-lg">⭐ Core Offer</Badge>
                      )}
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center">
                            <span className="text-xl font-bold text-primary">{tier.tier}</span>
                          </div>
                          <tier.icon className="w-7 h-7 text-muted-foreground" />
                        </div>
                        <h3 className="font-bold text-xl mb-2">{tier.title}</h3>
                        <p className="text-sm text-secondary font-medium mb-6">Target: {tier.target}</p>
                        <ul className="space-y-3 mb-8">
                          {tier.deliverables.map((d, j) => (
                            <motion.li key={j} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.1 }}
                              className="text-sm text-muted-foreground flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />{d}
                            </motion.li>
                          ))}
                        </ul>
                        <Button size="lg" variant={tier.popular ? 'default' : 'outline'} className="rounded-xl">
                          {tier.cta} <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              );
            })()}
          </div>
        </section>

        {/* III. 5-Phase Patient Lifecycle - Creative stepper */}
        <section className="container mx-auto px-6 py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <Badge variant="outline" className="mb-3 text-secondary border-secondary/30">{t('tourism.section3.badge')}</Badge>
            <h2 className="section-title text-3xl md:text-4xl">{t('tourism.section3.title')}</h2>
            <p className="section-subtitle">{t('tourism.section3.subtitle')}</p>
          </motion.div>
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical connector line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />
            <div className="space-y-12 md:space-y-0">
              {phases.map((phase, i) => (
                <motion.div
                  key={phase.num}
                  variants={i % 2 === 0 ? fadeLeft : fadeRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  className={`md:grid md:grid-cols-2 md:gap-12 items-center ${i > 0 ? 'md:mt-8' : ''}`}
                >
                  {/* Left side (or right if odd) */}
                  <div className={`${i % 2 === 0 ? '' : 'md:order-2'} mb-6 md:mb-0 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <motion.div whileHover={{ scale: 1.02 }} className="premium-card p-6 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />
                      <div className="flex items-center gap-3 mb-3">
                        <phase.icon className="w-5 h-5 text-primary" />
                        <h3 className="font-bold">{phase.title}</h3>
                      </div>
                      <p className="text-xs text-secondary font-medium mb-3">{phase.subtitle}</p>
                      <ul className="space-y-2">
                        {phase.items.map((item, j) => (
                          <motion.li key={j} initial={{ opacity: 0, x: i % 2 === 0 ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            transition={{ delay: j * 0.1 }}
                            className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />{item}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                  {/* Center circle */}
                  <div className={`hidden md:flex ${i % 2 === 0 ? 'md:order-2' : ''} justify-center`}>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-lg font-bold shadow-lg shadow-primary/30 relative z-10"
                    >
                      {phase.num}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* IV. Advanced Differentiation - Overlapping cards */}
        <section className="py-24 bg-gradient-to-br from-[hsl(200,90%,16%)] via-[hsl(200,85%,12%)] to-[hsl(210,80%,8%)] relative overflow-hidden">
          <div className="absolute inset-0">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-40 -right-40 w-[600px] h-[600px] border border-white/5 rounded-full" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-20 -left-20 w-[400px] h-[400px] border border-white/5 rounded-full" />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <Badge variant="outline" className="mb-3 text-secondary border-secondary/30 bg-white/5">{t('tourism.section4.badge')}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white">{t('tourism.section4.title')}</h2>
              <p className="text-white/50 max-w-xl mx-auto mt-3">{t('tourism.section4.subtitle')}</p>
            </motion.div>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {differentiation.map((item, i) => (
                <motion.div key={i} variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 group hover:bg-white/10 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <motion.div whileHover={{ rotate: 10 }} className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-secondary" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-white/50 text-sm mb-3">{item.desc}</p>
                      <ul className="space-y-2">
                        {item.points.map((p, j) => (
                          <motion.li key={j} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: j * 0.1 }}
                            className="text-sm text-white/60 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0" />{p}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* V. Revenue & Conversion - Full width cards */}
        <section className="container mx-auto px-6 py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <Badge variant="outline" className="mb-3 text-accent border-accent/30">{t('tourism.section5.badge')}</Badge>
            <h2 className="section-title text-3xl md:text-4xl">{t('tourism.section5.title')}</h2>
            <p className="section-subtitle">{t('tourism.section5.subtitle')}</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Zap, title: 'Upsell Mechanics', desc: 'VIP surgeon upgrades, premium recovery suites, and companion wellness packages.', color: 'text-accent' },
              { icon: Users, title: 'Flex-Upgrade System', desc: 'Modular care — add private nurse or extend telemedicine on demand.', color: 'text-primary' },
              { icon: ArrowRight, title: 'Conversion Tools', desc: '"Free Case Review" CTAs and 48-hour cost estimate guarantee.', color: 'text-secondary' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                whileHover={{ y: -6, rotateY: 5 }}
                className="premium-card p-8 text-center group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <motion.div whileHover={{ rotate: 15, scale: 1.1 }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/5 flex items-center justify-center mx-auto mb-4">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </motion.div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* VI. Technology & Infrastructure - Futuristic cards */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <Badge variant="outline" className="mb-3 text-secondary border-secondary/30">{t('tourism.section6.badge')}</Badge>
              <h2 className="section-title text-3xl md:text-4xl">{t('tourism.section6.title')}</h2>
              <p className="section-subtitle">{t('tourism.section6.subtitle')}</p>
            </motion.div>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {tech.map((item, i) => (
                <motion.div key={i} variants={scaleIn}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="relative bg-card rounded-2xl border border-border p-8 text-center overflow-hidden group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700`} />
                  <motion.div whileHover={{ y: -5, rotate: 5 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/5 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-300">
                    <item.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* VII. KPIs - Animated counters */}
        <section className="container mx-auto px-6 py-24" ref={kpiRef}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <Badge variant="outline" className="mb-3 text-secondary border-secondary/30">{t('tourism.section7.badge')}</Badge>
            <h2 className="section-title text-3xl md:text-4xl">{t('tourism.section7.title')}</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { icon: Brain, label: 'Clinical', value: `<${complication}%`, sub: 'Complication Rate', color: 'text-primary', bg: 'from-primary/10 to-primary/5' },
              { icon: Clock, label: 'Operational', value: `${conversion}%`, sub: 'Conversion Rate', color: 'text-secondary', bg: 'from-secondary/10 to-secondary/5' },
              { icon: DollarSign, label: 'Financial', value: `$${arpu}K`, sub: 'Avg Revenue Per User', color: 'text-accent', bg: 'from-accent/10 to-accent/5' },
            ].map((kpi, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="premium-card p-8 text-center relative overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-br ${kpi.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <kpi.icon className={`w-8 h-8 ${kpi.color} mx-auto mb-3`} />
                  <h3 className="font-semibold text-sm mb-1">{kpi.label}</h3>
                  <p className={`text-4xl font-bold ${kpi.color}`}>{kpi.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* VIII. Final Positioning CTA */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="relative bg-gradient-to-br from-[hsl(200,90%,18%)] via-[hsl(200,85%,14%)] to-[hsl(210,80%,10%)] rounded-3xl p-12 md:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 10, repeat: Infinity }}
                  className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[80px]" />
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity, delay: 2 }}
                  className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-[60px]" />
              </div>
              <div className="relative z-10">
                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', delay: 0.2 }}>
                  <Award className="w-12 h-12 text-accent mx-auto mb-6" />
                </motion.div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {t('tourism.cta.final.title')}<br />{t('tourism.cta.final.subtitle')}
                </h2>
                <p className="text-white/60 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
                  {t('tourism.cta.final.desc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 h-13 text-base font-semibold shadow-lg shadow-accent/30">
                    {t('tourism.cta.final.review')}
                  </Button>
                  <Button size="lg" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-full px-10 h-13 text-base">
                    {t('tourism.cta.final.brochure')}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default MedicalTourismPage;
