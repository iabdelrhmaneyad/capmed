import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Home, Info, Stethoscope, UserSearch, Phone,
  Building2, Plane, FlaskConical, Handshake, Layers,
  TrendingUp, Shield, Newspaper, Briefcase, MapPin, HelpCircle, Map,
  Star, ArrowRight,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  CommandDialog, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem, CommandSeparator,
} from '@/components/ui/command';

interface SearchEntry {
  title: string;
  titleAr: string;
  href: string;
  keywords: string[];
  icon: React.ElementType;
  description?: string;
  descriptionAr?: string;
  group: 'main' | 'explore' | 'doctor';
}

const pages: SearchEntry[] = [
  { title: 'Home', titleAr: 'الرئيسية', href: '/', keywords: ['home', 'main', 'landing', 'الرئيسية'], icon: Home, description: 'Back to homepage', descriptionAr: 'العودة للصفحة الرئيسية', group: 'main' },
  { title: 'About Us', titleAr: 'من نحن', href: '/about', keywords: ['about', 'history', 'mission', 'vision', 'من نحن'], icon: Info, description: 'Our story & mission', descriptionAr: 'قصتنا ورسالتنا', group: 'main' },
  { title: 'Services', titleAr: 'الخدمات', href: '/services', keywords: ['services', 'medical', 'healthcare', 'treatment', 'خدمات'], icon: Stethoscope, description: 'Medical services offered', descriptionAr: 'الخدمات الطبية المقدمة', group: 'main' },
  { title: 'Find a Doctor', titleAr: 'ابحث عن طبيب', href: '/doctors', keywords: ['doctor', 'physician', 'specialist', 'find', 'طبيب'], icon: UserSearch, description: 'Browse our medical team', descriptionAr: 'تصفح فريقنا الطبي', group: 'main' },
  { title: 'Contact Us', titleAr: 'اتصل بنا', href: '/contact', keywords: ['contact', 'phone', 'email', 'address', 'اتصل'], icon: Phone, description: 'Get in touch', descriptionAr: 'تواصل معنا', group: 'main' },
  { title: 'Facilities', titleAr: 'المرافق', href: '/facilities', keywords: ['facilities', 'building', 'campus', 'hospital', 'مرافق'], icon: Building2, description: 'Our world-class facilities', descriptionAr: 'مرافقنا العالمية', group: 'explore' },
  { title: 'Medical Tourism', titleAr: 'السياحة العلاجية', href: '/medical-tourism', keywords: ['tourism', 'travel', 'international', 'patient', 'سياحة', 'علاجية'], icon: Plane, description: 'International patient services', descriptionAr: 'خدمات المرضى الدوليين', group: 'explore' },
  { title: 'Research', titleAr: 'الأبحاث', href: '/research', keywords: ['research', 'science', 'innovation', 'study', 'أبحاث'], icon: FlaskConical, description: 'Innovation & research', descriptionAr: 'الابتكار والبحث', group: 'explore' },
  { title: 'Partnerships', titleAr: 'الشراكات', href: '/partnerships', keywords: ['partnership', 'collaborate', 'partner', 'شراكات'], icon: Handshake, description: 'Our global partners', descriptionAr: 'شركاؤنا العالميون', group: 'explore' },
  { title: 'Development Phases', titleAr: 'مراحل التطوير', href: '/development-phases', keywords: ['development', 'phases', 'construction', 'progress', 'تطوير', 'مراحل'], icon: Layers, description: 'Project milestones', descriptionAr: 'مراحل المشروع', group: 'explore' },
  { title: 'Investment', titleAr: 'الاستثمار', href: '/investment', keywords: ['investment', 'invest', 'finance', 'opportunity', 'استثمار'], icon: TrendingUp, description: 'Investment opportunities', descriptionAr: 'فرص الاستثمار', group: 'explore' },
  { title: 'Insurance & Billing', titleAr: 'التأمين والفواتير', href: '/insurance', keywords: ['insurance', 'billing', 'payment', 'coverage', 'تأمين', 'فواتير'], icon: Shield, description: 'Insurance & payment info', descriptionAr: 'معلومات التأمين والدفع', group: 'explore' },
  { title: 'News', titleAr: 'الأخبار', href: '/news', keywords: ['news', 'updates', 'press', 'media', 'أخبار'], icon: Newspaper, description: 'Latest updates', descriptionAr: 'آخر الأخبار', group: 'explore' },
  { title: 'Careers', titleAr: 'الوظائف', href: '/careers', keywords: ['careers', 'jobs', 'work', 'employment', 'hiring', 'وظائف'], icon: Briefcase, description: 'Join our team', descriptionAr: 'انضم لفريقنا', group: 'explore' },
  { title: 'Location', titleAr: 'الموقع', href: '/location', keywords: ['location', 'map', 'directions', 'address', 'badr', 'موقع'], icon: MapPin, description: 'How to find us', descriptionAr: 'كيف تصل إلينا', group: 'explore' },
  { title: 'FAQ', titleAr: 'الأسئلة الشائعة', href: '/faq', keywords: ['faq', 'questions', 'help', 'support', 'أسئلة'], icon: HelpCircle, description: 'Common questions', descriptionAr: 'الأسئلة الشائعة', group: 'explore' },
  { title: 'Campus Map', titleAr: 'خريطة الحرم', href: '/campus-map', keywords: ['campus', 'map', '3d', 'building', 'خريطة'], icon: Map, description: '3D campus overview', descriptionAr: 'نظرة عامة ثلاثية الأبعاد', group: 'explore' },
];

interface DoctorEntry {
  name: string;
  nameAr: string;
  specialty: string;
  specialtyAr: string;
  rating: number;
}

const doctorEntries: DoctorEntry[] = [
  { name: 'Dr. Ahmed Hassan', nameAr: 'د. أحمد حسن', specialty: 'Cardiology', specialtyAr: 'أمراض القلب', rating: 4.9 },
  { name: 'Dr. Fatima Al-Sayed', nameAr: 'د. فاطمة السيد', specialty: 'Neurology', specialtyAr: 'الأعصاب', rating: 4.8 },
  { name: 'Dr. Mohamed Khalil', nameAr: 'د. محمد خليل', specialty: 'Orthopedics', specialtyAr: 'العظام', rating: 4.9 },
  { name: 'Dr. Sara Ibrahim', nameAr: 'د. سارة إبراهيم', specialty: 'Pediatrics', specialtyAr: 'طب الأطفال', rating: 4.7 },
  { name: 'Dr. Omar Mahmoud', nameAr: 'د. عمر محمود', specialty: 'Oncology', specialtyAr: 'الأورام', rating: 4.9 },
  { name: 'Dr. Layla Abdel-Rahman', nameAr: 'د. ليلى عبد الرحمن', specialty: 'Ophthalmology', specialtyAr: 'طب العيون', rating: 4.8 },
  { name: 'Dr. Khaled Nasser', nameAr: 'د. خالد ناصر', specialty: 'Internal Medicine', specialtyAr: 'الباطنة', rating: 4.7 },
  { name: 'Dr. Nour El-Din', nameAr: 'د. نور الدين', specialty: 'Surgery', specialtyAr: 'الجراحة', rating: 4.9 },
];

const RECENT_KEY = 'capitalmed-recent-searches';

function getRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]').slice(0, 5);
  } catch { return []; }
}

function addRecent(term: string) {
  const list = getRecent().filter((t) => t !== term);
  list.unshift(term);
  localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 5)));
}

// Custom filter that matches across title, titleAr, keywords, and descriptions
function customFilter(value: string, search: string): number {
  const searchLower = search.toLowerCase().trim();
  if (!searchLower) return 1;
  const valueLower = value.toLowerCase();
  
  // Exact start match
  if (valueLower.startsWith(searchLower)) return 1;
  // Contains match
  if (valueLower.includes(searchLower)) return 0.8;
  
  // Word-level matching
  const searchWords = searchLower.split(/\s+/);
  const matchCount = searchWords.filter(w => valueLower.includes(w)).length;
  if (matchCount > 0) return 0.5 * (matchCount / searchWords.length);
  
  return 0;
}

const SearchBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isAr = language === 'ar';

  useEffect(() => {
    if (open) setRecent(getRecent());
  }, [open]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = useCallback((href: string, label: string) => {
    addRecent(label);
    setOpen(false);
    navigate(href);
  }, [navigate]);

  const handleRecentSelect = useCallback((term: string) => {
    const match = [...pages, ...doctorEntries.map((d) => ({
      title: d.name, titleAr: d.nameAr, href: '/doctors', keywords: [],
    }))].find((p) => p.title === term || p.titleAr === term);
    setOpen(false);
    navigate(match?.href || '/');
  }, [navigate]);

  const mainPages = pages.filter((p) => p.group === 'main');
  const explorePages = pages.filter((p) => p.group === 'explore');

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm text-muted-foreground text-sm hover:bg-muted/50 transition-colors"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">
          {isAr ? 'بحث...' : 'Search...'}
        </span>
        <kbd className="hidden md:inline-flex h-5 items-center gap-0.5 rounded border border-border/50 bg-muted/50 px-1.5 text-[10px] font-mono text-muted-foreground">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={isAr ? 'ابحث في الصفحات والأطباء...' : 'Search pages, doctors...'} />
        <CommandList className="max-h-[400px]">
          <CommandEmpty>
            <div className="flex flex-col items-center gap-2 py-4">
              <Search className="w-8 h-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                {isAr ? 'لا توجد نتائج.' : 'No results found.'}
              </p>
            </div>
          </CommandEmpty>

          {/* Recent searches */}
          {recent.length > 0 && (
            <>
              <CommandGroup heading={isAr ? 'عمليات البحث الأخيرة' : 'Recent'}>
                {recent.map((term) => (
                  <CommandItem
                    key={term}
                    value={`recent ${term}`}
                    onSelect={() => handleRecentSelect(term)}
                    className="cursor-pointer"
                  >
                    <ArrowRight className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm">{term}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          {/* Main pages */}
          <CommandGroup heading={isAr ? 'الصفحات الرئيسية' : 'Main Pages'}>
            {mainPages.map((page) => {
              const Icon = page.icon;
              return (
                <CommandItem
                  key={page.href}
                  value={`${page.title} ${page.titleAr} ${page.keywords.join(' ')} ${page.description || ''} ${page.descriptionAr || ''}`}
                  onSelect={() => handleSelect(page.href, isAr ? page.titleAr : page.title)}
                  className="cursor-pointer"
                >
                  <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <span className="text-sm">{isAr ? page.titleAr : page.title}</span>
                    {page.description && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        {isAr ? page.descriptionAr : page.description}
                      </span>
                    )}
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandSeparator />

          {/* Doctors */}
          <CommandGroup heading={isAr ? 'الأطباء' : 'Doctors'}>
            {doctorEntries.map((doc) => (
              <CommandItem
                key={doc.name}
                value={`${doc.name} ${doc.nameAr} ${doc.specialty} ${doc.specialtyAr} doctor طبيب`}
                onSelect={() => handleSelect('/doctors', isAr ? doc.nameAr : doc.name)}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                    <UserSearch className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{isAr ? doc.nameAr : doc.name}</p>
                    <p className="text-xs text-muted-foreground">{isAr ? doc.specialtyAr : doc.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    {doc.rating}
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Explore pages */}
          <CommandGroup heading={isAr ? 'استكشف' : 'Explore'}>
            {explorePages.map((page) => {
              const Icon = page.icon;
              return (
                <CommandItem
                  key={page.href}
                  value={`${page.title} ${page.titleAr} ${page.keywords.join(' ')} ${page.description || ''} ${page.descriptionAr || ''}`}
                  onSelect={() => handleSelect(page.href, isAr ? page.titleAr : page.title)}
                  className="cursor-pointer"
                >
                  <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <span className="text-sm">{isAr ? page.titleAr : page.title}</span>
                    {page.description && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        {isAr ? page.descriptionAr : page.description}
                      </span>
                    )}
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
