import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import heroImage1 from '@/assets/hero-campus-aerial.png';
import heroImage2 from '@/assets/hero-hospital-interior.jpg';
import heroImage3 from '@/assets/hero-hospital-aerial.jpg';

const heroSlides = [
  { image: heroImage1 },
  { image: heroImage2 },
  { image: heroImage3 },
];

const Hero: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen min-h-[600px] max-h-[900px] flex items-center overflow-hidden"
    >
      {/* Background - smooth crossfade with blur */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <motion.img
            key={index}
            src={slide.image}
            alt="CapitalMed"
            className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105"
            initial={false}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(200,90%,8%)]/90 via-[hsl(200,85%,10%)]/75 to-[hsl(200,80%,12%)]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(200,85%,8%)]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-secondary text-sm font-semibold uppercase tracking-[0.2em] mb-4"
          >
            Smart Healthcare City
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight leading-[1.1] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-4 font-light drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]"
          >
            {t('hero.tagline')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base text-white/70 mb-8 max-w-lg leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/campus-map">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-[8px] px-8 h-12 text-sm font-semibold">
                <MapPin className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                Navigate Campus
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-[8px] px-8 h-12 text-sm font-semibold border-0">
                {t('hero.cta.learn')}
              </Button>
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10"
          >
            {[
              { value: '577K m²', label: 'Campus Area' },
              { value: '$1.2B', label: 'Investment' },
              { value: '4,500+', label: 'Hospital Beds' },
              { value: '100+', label: 'Specialties' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              >
                <p className="text-white font-bold text-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">{stat.value}</p>
                <p className="text-white/60 text-xs uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-8 right-8 flex items-center gap-3 z-20">
        <button onClick={prevSlide} className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white/80 hover:text-white hover:border-white/60 hover:bg-white/10 transition-all cursor-pointer active:scale-95">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                index === currentSlide ? 'w-8 bg-accent' : 'w-3 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
        <button onClick={nextSlide} className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white/80 hover:text-white hover:border-white/60 hover:bg-white/10 transition-all cursor-pointer active:scale-95">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
