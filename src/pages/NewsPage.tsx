import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, ChevronDown, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };

const NewsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const categories = [
    { key: 'All', label: t('news.categories.all') },
    { key: 'Announcements', label: t('news.categories.announcements') },
    { key: 'Partnerships', label: t('news.categories.partnerships') },
    { key: 'Clinical', label: t('news.categories.clinical') },
    { key: 'Medical Tourism', label: t('news.categories.tourism') },
    { key: 'Community', label: t('news.categories.community') },
  ];

  const articles = language === 'ar'
    ? [
        { id: 1, title: 'كابيتال ميد تعلن عن إطلاق المرحلة الأولى', category: 'Announcements', excerpt: 'المستشفى الجامعي يستقبل أول مرضاه.', date: '٧ يناير ٢٠٢٦', author: 'الاتصالات المؤسسية',
          fullContent: 'يسعدنا الإعلان عن أن المستشفى الجامعي في كابيتال ميد قد استقبل أول مرضاه في إنجاز تاريخي. تضم المرحلة الأولى مستشفى بسعة 500 سرير مجهزة بأحدث التقنيات الطبية، ومركز أبحاث متكامل، ومرافق تعليمية للطلاب والأطباء المقيمين. يمثل هذا الإنجاز نقطة تحول في تقديم الرعاية الصحية في مصر والمنطقة.' },
        { id: 2, title: 'شراكة استراتيجية مع ميونخ هيلث', category: 'Partnerships', excerpt: 'اتفاقية تاريخية لإنشاء مركز تميز.', date: '٥ يناير ٢٠٢٦', author: 'د. أيمن',
          fullContent: 'أبرمت كابيتال ميد اتفاقية شراكة استراتيجية مع مؤسسة ميونخ هيلث الألمانية لإنشاء مركز تميز في الجراحة الروبوتية. تشمل الاتفاقية تبادل الخبرات الطبية وبرامج تدريب مشتركة وتطوير بروتوكولات علاجية متقدمة تتوافق مع أعلى المعايير الدولية.' },
        { id: 3, title: 'وحدة القلب المتقدمة تحسن النتائج', category: 'Clinical', excerpt: 'تحسن بنسبة ١٥٪ في أوقات التعافي.', date: '٢٨ ديسمبر ٢٠٢٥', author: 'قسم القلب',
          fullContent: 'حققت وحدة القلب المتقدمة في كابيتال ميد تحسناً ملحوظاً بنسبة 15% في أوقات التعافي للمرضى بفضل استخدام أحدث تقنيات القسطرة والتدخل الجراحي طفيف التوغل. يعتمد القسم على فريق من أمهر أطباء القلب مع أجهزة تشخيص متطورة لضمان أفضل النتائج للمرضى.' },
        { id: 4, title: 'إطلاق برنامج السياحة العلاجية', category: 'Medical Tourism', excerpt: 'باقات كونسيرج جديدة لمرضى الخليج.', date: '٢٠ ديسمبر ٢٠٢٥', author: 'العلاقات الدولية',
          fullContent: 'أطلقت كابيتال ميد برنامج السياحة العلاجية الشامل الذي يتضمن باقات كونسيرج متكاملة مصممة خصيصاً لمرضى دول الخليج. يشمل البرنامج خدمات النقل من وإلى المطار، إقامة فندقية فاخرة، مرافقة طبية مستمرة، وتنسيق كامل للمواعيد والإجراءات الطبية.' },
        { id: 5, title: 'نجاح حملة الفحص الصحي المجتمعي', category: 'Community', excerpt: 'أكثر من ٢٠٠٠ مقيم حصلوا على فحوصات مجانية.', date: '١٥ ديسمبر ٢٠٢٥', author: 'صحة المجتمع',
          fullContent: 'نثمن نجاح حملة الفحص الصحي المجتمعي التي أجرتها كابيتال ميد والتي استفاد منها أكثر من 2000 مقيم في المناطق المحيطة. شملت الحملة فحوصات شاملة للضغط والسكري وأمراض القلب والعيون، مع توفير استشارات طبية مجانية وتوعية صحية للمجتمع المحلي.' },
      ]
    : [
        { id: 1, title: 'CAPITALMED Announces Phase 1 Launch', category: 'Announcements', excerpt: 'The University Hospital welcomes its first patients.', date: '07 Jan 2026', author: 'Corporate Communications',
          fullContent: 'We are thrilled to announce that the CapitalMed University Hospital has welcomed its first patients in a historic milestone. Phase 1 features a 500-bed hospital equipped with cutting-edge medical technology, an integrated research center, and educational facilities for students and resident physicians. This achievement represents a turning point in healthcare delivery across Egypt and the region.' },
        { id: 2, title: 'Strategic Partnership with Munich Health', category: 'Partnerships', excerpt: 'A landmark agreement for robotic surgery training.', date: '05 Jan 2026', author: 'Dr. Ayman',
          fullContent: 'CapitalMed has signed a strategic partnership agreement with Munich Health (Germany) to establish a Center of Excellence in Robotic Surgery. The agreement includes medical expertise exchange, joint training programs, and the development of advanced treatment protocols aligned with the highest international standards.' },
        { id: 3, title: 'Advanced Cardiology Unit Improves Outcomes', category: 'Clinical', excerpt: '15% improvement in recovery times.', date: '28 Dec 2025', author: 'Cardiology Dept',
          fullContent: 'The Advanced Cardiology Unit at CapitalMed has achieved a remarkable 15% improvement in patient recovery times thanks to the latest catheterization and minimally invasive surgical techniques. The department relies on a team of top cardiologists with state-of-the-art diagnostic equipment to ensure the best patient outcomes.' },
        { id: 4, title: 'Medical Tourism Program for GCC', category: 'Medical Tourism', excerpt: 'New door-to-door concierge packages available.', date: '20 Dec 2025', author: 'International Relations',
          fullContent: 'CapitalMed has launched a comprehensive Medical Tourism Program featuring integrated concierge packages designed specifically for GCC patients. The program includes airport transfers, luxury hotel accommodation, continuous medical accompaniment, and full coordination of all appointments and medical procedures.' },
        { id: 5, title: 'Community Health Screening Success', category: 'Community', excerpt: 'Over 2,000 residents received free screenings.', date: '15 Dec 2025', author: 'Community Health',
          fullContent: 'We celebrate the success of the community health screening campaign conducted by CapitalMed, benefiting over 2,000 residents in the surrounding areas. The campaign included comprehensive screenings for blood pressure, diabetes, heart disease, and eye conditions, along with free medical consultations and health awareness for the local community.' },
      ];

  const filtered = activeCategory === 'All' ? articles : articles.filter(a => a.category === activeCategory);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="page-hero">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-secondary text-xs font-semibold uppercase tracking-[0.2em] mb-3">Latest Updates</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4">{t('news.hero.title')}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-white/60">{t('news.hero.subtitle')}</motion.p>
          </div>
        </section>
        <section className="container mx-auto px-6 py-10">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map(cat => (
              <Button key={cat.key} variant={activeCategory === cat.key ? 'default' : 'outline'} size="sm"
                onClick={() => setActiveCategory(cat.key)} className="rounded-[8px] text-xs">{cat.label}</Button>
            ))}
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {filtered.map((article) => (
              <motion.article key={article.id} variants={fadeUp} whileHover={expandedId !== article.id ? { y: -3 } : {}}
                layout className="premium-card overflow-hidden p-0">
                <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <Badge variant="outline">{categories.find(c => c.key === article.category)?.label || article.category}</Badge>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{article.date}</span>
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{article.title}</h3>
                  <p className="text-muted-foreground text-xs mb-3">{article.excerpt}</p>
                  
                  {/* Expanded content */}
                  <AnimatePresence>
                    {expandedId === article.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border pt-3 mb-3">
                          <p className="text-sm text-foreground leading-relaxed">{article.fullContent}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1"><User className="w-3 h-3" />{article.author}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={() => setExpandedId(expandedId === article.id ? null : article.id)}
                    >
                      {expandedId === article.id ? (
                        <>{language === 'ar' ? 'إغلاق' : 'Close'} <X className="w-3 h-3 ml-1" /></>
                      ) : (
                        <>{t('news.readMore')} <ChevronDown className="w-3 h-3 ml-1" /></>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="premium-card p-8 text-center max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-3">{t('news.newsletter.title')}</h2>
            <p className="text-muted-foreground text-sm mb-5">{t('news.newsletter.subtitle')}</p>
            <div className="flex gap-3 max-w-sm mx-auto">
              <Input placeholder={t('news.newsletter.placeholder')} type="email" className="rounded-[6px]" />
              <Button className="rounded-[8px]">{t('news.newsletter.subscribe')}</Button>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default NewsPage;
