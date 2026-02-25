import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCMS } from '@/contexts/CMSContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Activity, BedDouble, Stethoscope, Users, Siren, Building2 } from 'lucide-react';

interface StatItem {
  value: number;
  suffix?: string;
  labelKey: string;
  icon: React.ElementType;
}

const statsData: StatItem[] = [
  { value: 500000, suffix: '+', labelKey: 'stats.patients', icon: Activity },
  { value: 4500, suffix: '+', labelKey: 'stats.beds', icon: BedDouble },
  { value: 450, suffix: '+', labelKey: 'stats.icu', icon: Siren },
  { value: 120, suffix: '+', labelKey: 'stats.operating', icon: Building2 },
  { value: 3000, suffix: '+', labelKey: 'stats.providers', icon: Users },
  { value: 100, suffix: '+', labelKey: 'stats.specialties', icon: Stethoscope },
];

const AnimatedCounter: React.FC<{ value: number; suffix?: string; duration?: number }> = ({
  value, suffix = '', duration = 2,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    const startTime = Date.now();
    const updateCounter = () => {
      const progress = Math.min((Date.now() - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(updateCounter);
    };
    requestAnimationFrame(updateCounter);
  }, [isInView, value, duration]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K';
    return num.toLocaleString();
  };

  return <span ref={ref}>{formatNumber(count)}{suffix}</span>;
};

const Stats: React.FC = () => {
  const { t } = useLanguage();
  const { getContent, isEditMode } = useCMS();
  const statsContent = getContent('home', 'stats');

  const getStatValue = (key: string, defaultValue: number): number => {
    if (statsContent?.content?.[key]) return parseInt(statsContent.content[key], 10) || defaultValue;
    return defaultValue;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[hsl(200,90%,18%)] via-[hsl(200,85%,14%)] to-[hsl(200,80%,10%)] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent rounded-full blur-[100px]" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
        >
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-secondary/20 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-secondary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
                  <AnimatedCounter
                    value={getStatValue(stat.labelKey.split('.')[1], stat.value)}
                    suffix={stat.suffix}
                  />
                </div>
                <span className="text-white/60 text-xs uppercase tracking-wider font-medium">
                  {t(stat.labelKey)}
                </span>
                {isEditMode && <span className="text-xs text-accent mt-1 block">[Editable]</span>}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
