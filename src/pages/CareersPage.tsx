import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Clock, Briefcase, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

const CareersPage: React.FC = () => {
  const { t, language } = useLanguage();
  const jobs = language === 'ar'
    ? [
        { id: 1, title: 'استشاري قلب أول', department: 'طبي', type: 'دوام كامل', location: 'المستشفى الجامعي', posted: '٢٠٢٦-٠١-٠٥' },
        { id: 2, title: 'ممرض عناية مركزة', department: 'تمريض', type: 'دوام كامل', location: 'الحرم الرئيسي', posted: '٢٠٢٦-٠١-٠٢' },
        { id: 3, title: 'منسق أبحاث سريرية', department: 'أبحاث', type: 'دوام كامل', location: 'معهد الأبحاث', posted: '٢٠٢٥-١٢-٣٠' },
        { id: 4, title: 'أخصائي موارد بشرية', department: 'إداري', type: 'دوام كامل', location: 'المبنى الإداري', posted: '٢٠٢٥-١٢-٢٥' },
        { id: 5, title: 'جراح أطفال', department: 'طبي', type: 'دوام كامل', location: 'المستشفى الجامعي', posted: '٢٠٢٥-١٢-٢٠' },
        { id: 6, title: 'فني أشعة', department: 'طبي', type: 'دوام جزئي', location: 'مركز التشخيص', posted: '٢٠٢٥-١٢-١٨' },
      ]
    : [
        { id: 1, title: 'Senior Cardiologist Consultant', department: 'Medical', type: 'Full-time', location: 'University Hospital', posted: '2026-01-05' },
        { id: 2, title: 'ICU Registered Nurse', department: 'Nursing', type: 'Full-time', location: 'Main Campus', posted: '2026-01-02' },
        { id: 3, title: 'Clinical Research Coordinator', department: 'Research', type: 'Full-time', location: 'Research Institute', posted: '2025-12-30' },
        { id: 4, title: 'HR Specialist', department: 'Administrative', type: 'Full-time', location: 'Admin Building', posted: '2025-12-25' },
        { id: 5, title: 'Pediatric Surgeon', department: 'Medical', type: 'Full-time', location: 'University Hospital', posted: '2025-12-20' },
        { id: 6, title: 'Radiology Technician', department: 'Medical', type: 'Part-time', location: 'Diagnostic Center', posted: '2025-12-18' },
      ];
  const departments = [
    { key: 'all', label: t('careers.filter.allDepts') },
    { key: 'Medical', label: t('careers.filter.medical') },
    { key: 'Nursing', label: t('careers.filter.nursing') },
    { key: 'Research', label: t('careers.filter.research') },
    { key: 'Administrative', label: t('careers.filter.admin') },
  ];
  const types = [
    { key: 'all', label: t('careers.filter.allTypes') },
    { key: 'Full-time', label: t('careers.filter.fulltime') },
    { key: 'Part-time', label: t('careers.filter.parttime') },
  ];
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [search, setSearch] = useState('');
  const filtered = jobs.filter(job => {
    const deptMatch = selectedDept === 'all' || (language === 'ar' ? departments.find(d => d.key === selectedDept)?.label === job.department : job.department === selectedDept);
    const typeMatch = selectedType === 'all' || (language === 'ar' ? types.find(tp => tp.key === selectedType)?.label === job.type : job.type === selectedType);
    return deptMatch && typeMatch && job.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="page-hero">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-secondary text-xs font-semibold uppercase tracking-[0.2em] mb-3">Join Our Team</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4">{t('careers.hero.title')}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-white/60 max-w-2xl mx-auto">{t('careers.hero.subtitle')}</motion.p>
          </div>
        </section>
        <section className="container mx-auto px-6 py-8">
          <div className="flex flex-wrap gap-3 items-center mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder={t('careers.search.placeholder')} value={search} onChange={e => setSearch(e.target.value)} className="pl-10 rounded-[6px]" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {departments.map(d => (<Button key={d.key} variant={selectedDept === d.key ? 'default' : 'outline'} size="sm" onClick={() => setSelectedDept(d.key)} className="rounded-[8px] text-xs">{d.label}</Button>))}
            </div>
            <div className="flex gap-2">
              {types.map(tp => (<Button key={tp.key} variant={selectedType === tp.key ? 'default' : 'outline'} size="sm" onClick={() => setSelectedType(tp.key)} className="rounded-[8px] text-xs">{tp.label}</Button>))}
            </div>
          </div>
          <div className="space-y-3">
            {filtered.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                whileHover={{ y: -2 }} className="premium-card p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold mb-1">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.type}</span>
                      <span className="flex items-center gap-1"><Filter className="w-3 h-3" />{job.department}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{t('careers.posted')} {job.posted}</span>
                    </div>
                  </div>
                  <Button size="sm" className="rounded-[8px]">{t('careers.viewDetails')}</Button>
                </div>
              </motion.div>
            ))}
            {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">{t('careers.noResults')}</p>}
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default CareersPage;
