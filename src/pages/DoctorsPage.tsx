import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Calendar, Phone, Stethoscope } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Doctor {
  id: number; name_en: string; name_ar: string; specialty_en: string; specialty_ar: string;
  experience: number; rating: number; gender: 'Male' | 'Female';
  languages: string[]; acceptingNew: boolean; sameDayAvailable: boolean; insurance: string[];
  initials: string; avatarColor: string;
}

const doctors: Doctor[] = [
  { id: 1, name_en: 'Dr. Ahmed Hassan', name_ar: 'د. أحمد حسن', specialty_en: 'Cardiology', specialty_ar: 'أمراض القلب', experience: 15, rating: 4.9, gender: 'Male', languages: ['English', 'Arabic'], acceptingNew: true, sameDayAvailable: false, insurance: ['AXA', 'Bupa'], initials: 'AH', avatarColor: 'from-primary to-primary/70' },
  { id: 2, name_en: 'Dr. Fatima Al-Sayed', name_ar: 'د. فاطمة السيد', specialty_en: 'Neurology', specialty_ar: 'الأعصاب', experience: 12, rating: 4.8, gender: 'Female', languages: ['English', 'Arabic', 'French'], acceptingNew: true, sameDayAvailable: true, insurance: ['AXA', 'MetLife'], initials: 'FA', avatarColor: 'from-secondary to-secondary/70' },
  { id: 3, name_en: 'Dr. Mohamed Khalil', name_ar: 'د. محمد خليل', specialty_en: 'Orthopedics', specialty_ar: 'العظام', experience: 20, rating: 4.9, gender: 'Male', languages: ['English', 'Arabic'], acceptingNew: false, sameDayAvailable: false, insurance: ['Bupa', 'Allianz'], initials: 'MK', avatarColor: 'from-accent to-accent/70' },
  { id: 4, name_en: 'Dr. Sara Ibrahim', name_ar: 'د. سارة إبراهيم', specialty_en: 'Pediatrics', specialty_ar: 'طب الأطفال', experience: 10, rating: 4.7, gender: 'Female', languages: ['English', 'Arabic'], acceptingNew: true, sameDayAvailable: true, insurance: ['AXA', 'Cigna'], initials: 'SI', avatarColor: 'from-primary to-secondary' },
  { id: 5, name_en: 'Dr. Omar Mahmoud', name_ar: 'د. عمر محمود', specialty_en: 'Oncology', specialty_ar: 'الأورام', experience: 18, rating: 4.9, gender: 'Male', languages: ['English', 'Arabic', 'German'], acceptingNew: true, sameDayAvailable: false, insurance: ['Bupa', 'MetLife', 'Allianz'], initials: 'OM', avatarColor: 'from-secondary to-accent' },
  { id: 6, name_en: 'Dr. Layla Abdel-Rahman', name_ar: 'د. ليلى عبد الرحمن', specialty_en: 'Ophthalmology', specialty_ar: 'طب العيون', experience: 14, rating: 4.8, gender: 'Female', languages: ['English', 'Arabic'], acceptingNew: true, sameDayAvailable: true, insurance: ['AXA', 'Cigna'], initials: 'LA', avatarColor: 'from-accent to-primary' },
  { id: 7, name_en: 'Dr. Khaled Nasser', name_ar: 'د. خالد ناصر', specialty_en: 'Internal Medicine', specialty_ar: 'الباطنة', experience: 16, rating: 4.7, gender: 'Male', languages: ['English', 'Arabic'], acceptingNew: false, sameDayAvailable: false, insurance: ['Bupa'], initials: 'KN', avatarColor: 'from-primary/80 to-primary' },
  { id: 8, name_en: 'Dr. Nour El-Din', name_ar: 'د. نور الدين', specialty_en: 'Surgery', specialty_ar: 'الجراحة', experience: 22, rating: 4.9, gender: 'Male', languages: ['English', 'Arabic', 'French'], acceptingNew: true, sameDayAvailable: false, insurance: ['AXA', 'Bupa', 'MetLife'], initials: 'NE', avatarColor: 'from-secondary/80 to-secondary' },
];

const specialties = [
  { en: 'All Specialties', ar: 'كل التخصصات', value: 'all' },
  { en: 'Cardiology', ar: 'أمراض القلب', value: 'cardiology' },
  { en: 'Neurology', ar: 'الأعصاب', value: 'neurology' },
  { en: 'Orthopedics', ar: 'العظام', value: 'orthopedics' },
  { en: 'Pediatrics', ar: 'طب الأطفال', value: 'pediatrics' },
  { en: 'Oncology', ar: 'الأورام', value: 'oncology' },
  { en: 'Ophthalmology', ar: 'طب العيون', value: 'ophthalmology' },
  { en: 'Internal Medicine', ar: 'الباطنة', value: 'internal' },
  { en: 'Surgery', ar: 'الجراحة', value: 'surgery' },
];

const insuranceProviders = ['AXA', 'Bupa', 'MetLife', 'Allianz', 'Cigna'];

const DoctorsPage: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedInsurance, setSelectedInsurance] = useState('all');
  const [sameDayOnly, setSameDayOnly] = useState(false);
  const [acceptingNewOnly, setAcceptingNewOnly] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const filteredDoctors = doctors.filter((doctor) => {
    const name = language === 'ar' ? doctor.name_ar : doctor.name_en;
    const specialty = language === 'ar' ? doctor.specialty_ar : doctor.specialty_en;
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) || specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty_en.toLowerCase().includes(selectedSpecialty);
    const matchesGender = selectedGender === 'all' || doctor.gender === selectedGender;
    const matchesInsurance = selectedInsurance === 'all' || doctor.insurance.includes(selectedInsurance);
    const matchesSameDay = !sameDayOnly || doctor.sameDayAvailable;
    const matchesAccepting = !acceptingNewOnly || doctor.acceptingNew;
    const matchesLang = selectedLanguage === 'all' || doctor.languages.includes(selectedLanguage);
    return matchesSearch && matchesSpecialty && matchesGender && matchesInsurance && matchesSameDay && matchesAccepting && matchesLang;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      <Header />

      <section className="page-hero">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-secondary text-xs font-semibold uppercase tracking-[0.2em] mb-3">{t('misc.expertTeam')}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4">{t('doctors.page.title')}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto">{t('doctors.page.subtitle')}</motion.p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-6 bg-card border-b border-border">
        <div className="container mx-auto px-6">
          <div className="relative mb-4">
            <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
            <Input placeholder={t('doctors.search.placeholder')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`${isRTL ? 'pr-10' : 'pl-10'} rounded-[6px]`} />
          </div>
          <div className="flex flex-wrap gap-3">
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-auto min-w-[160px] rounded-[6px] text-sm"><SelectValue placeholder="Specialty" /></SelectTrigger>
              <SelectContent>{specialties.map((spec) => (<SelectItem key={spec.value} value={spec.value}>{language === 'ar' ? spec.ar : spec.en}</SelectItem>))}</SelectContent>
            </Select>
            <Select value={selectedGender} onValueChange={setSelectedGender}>
              <SelectTrigger className="w-auto min-w-[120px] rounded-[6px] text-sm"><SelectValue placeholder="Gender" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === 'ar' ? 'الكل' : 'All Genders'}</SelectItem>
                <SelectItem value="Male">{language === 'ar' ? 'ذكر' : 'Male'}</SelectItem>
                <SelectItem value="Female">{language === 'ar' ? 'أنثى' : 'Female'}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedInsurance} onValueChange={setSelectedInsurance}>
              <SelectTrigger className="w-auto min-w-[140px] rounded-[6px] text-sm"><SelectValue placeholder="Insurance" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === 'ar' ? 'كل التأمينات' : 'All Insurance'}</SelectItem>
                {insuranceProviders.map((ins) => (<SelectItem key={ins} value={ins}>{ins}</SelectItem>))}</SelectContent>
            </Select>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-auto min-w-[140px] rounded-[6px] text-sm"><SelectValue placeholder="Language" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === 'ar' ? 'كل اللغات' : 'All Languages'}</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Arabic">العربية</SelectItem>
                <SelectItem value="French">Français</SelectItem>
                <SelectItem value="German">Deutsch</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-[6px]">
              <Checkbox id="sameDay" checked={sameDayOnly} onCheckedChange={(c) => setSameDayOnly(!!c)} />
              <Label htmlFor="sameDay" className="text-xs cursor-pointer">{language === 'ar' ? 'موعد اليوم' : 'Same-day'}</Label>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-[6px]">
              <Checkbox id="acceptingNew" checked={acceptingNewOnly} onCheckedChange={(c) => setAcceptingNewOnly(!!c)} />
              <Label htmlFor="acceptingNew" className="text-xs cursor-pointer">{language === 'ar' ? 'يقبل مرضى جدد' : 'Accepting New'}</Label>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="mb-6 text-muted-foreground text-sm">{t('doctors.results').replace('{count}', filteredDoctors.length.toString())}</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredDoctors.map((doctor, index) => (
              <motion.div key={doctor.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.04 }}
                whileHover={{ y: -4 }} className="premium-card overflow-hidden p-0">
                {/* Professional Avatar */}
                <div className="aspect-square bg-muted relative flex items-center justify-center overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${doctor.avatarColor} opacity-15`} />
                  <div className="relative flex flex-col items-center gap-3">
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${doctor.avatarColor} flex items-center justify-center shadow-lg`}>
                      <span className="text-3xl font-bold text-white">{doctor.initials}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1">
                      <Stethoscope className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-medium text-foreground">{language === 'ar' ? doctor.specialty_ar : doctor.specialty_en}</span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 text-accent mb-2">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-medium">{doctor.rating}</span>
                    {doctor.acceptingNew && (
                      <span className="ml-auto text-[10px] text-secondary font-medium bg-secondary/10 px-2 py-0.5 rounded-full">
                        {language === 'ar' ? 'يقبل جدد' : 'Accepting'}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold mb-1">{language === 'ar' ? doctor.name_ar : doctor.name_en}</h3>
                  <p className="text-primary text-sm font-medium mb-1">{language === 'ar' ? doctor.specialty_ar : doctor.specialty_en}</p>
                  <p className="text-xs text-muted-foreground mb-3">{t('doctors.experience').replace('{years}', doctor.experience.toString())}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 rounded-[8px] text-xs bg-primary hover:bg-primary/90">
                      <Calendar className="w-3.5 h-3.5 mr-1" />{t('doctors.book')}
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-[8px]"><Phone className="w-3.5 h-3.5" /></Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {filteredDoctors.length === 0 && (
            <div className="text-center py-16"><p className="text-muted-foreground">{t('doctors.no.results')}</p></div>
          )}
        </div>
      </section>

      <Footer />
    </motion.div>
  );
};

export default DoctorsPage;
