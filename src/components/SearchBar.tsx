import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Home, Info, Stethoscope, UserSearch, Phone,
  Building2, Plane, FlaskConical, Handshake, Layers,
  TrendingUp, Shield, Newspaper, Briefcase, MapPin, HelpCircle, Map,
  Star, Clock, X, ArrowRight, Flame, ChevronRight,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  CommandDialog, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem, CommandSeparator,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';

interface SearchEntry {
  title: string;
  titleAr: string;
  href: string;
  keywords: string[];
  icon: React.ElementType;
  description?: string;
  descriptionAr?: string;
  group: 'main' | 'explore' | 'doctor';
  color: string; // tailwind bg class for icon
}

const pages: SearchEntry[] = [
  { title: 'Home', titleAr: 'الرئيسية', href: '/', keywords: ['home', 'main', 'landing', 'الرئيسية'], icon: Home, description: 'Back to homepage', descriptionAr: 'العودة للصفحة الرئيسية', group: 'main', color: 'bg-blue-500/15 text-blue-600' },
  { title: 'About Us', titleAr: 'من نحن', href: '/about', keywords: ['about', 'history', 'mission', 'vision', 'من نحن'], icon: Info, description: 'Our story & mission', descriptionAr: 'قصتنا ورسالتنا', group: 'main', color: 'bg-purple-500/15 text-purple-600' },
  { title: 'Services', titleAr: 'الخدمات', href: '/services', keywords: ['services', 'medical', 'healthcare', 'treatment', 'خدمات'], icon: Stethoscope, description: 'Medical services offered', descriptionAr: 'الخدمات الطبية المقدمة', group: 'main', color: 'bg-emerald-500/15 text-emerald-600' },
  { title: 'Find a Doctor', titleAr: 'ابحث عن طبيب', href: '/doctors', keywords: ['doctor', 'physician', 'specialist', 'find', 'طبيب'], icon: UserSearch, description: 'Browse our medical team', descriptionAr: 'تصفح فريقنا الطبي', group: 'main', color: 'bg-teal-500/15 text-teal-600' },
  { title: 'Contact Us', titleAr: 'اتصل بنا', href: '/contact', keywords: ['contact', 'phone', 'email', 'address', 'اتصل'], icon: Phone, description: 'Get in touch', descriptionAr: 'تواصل معنا', group: 'main', color: 'bg-pink-500/15 text-pink-600' },
  { title: 'Facilities', titleAr: 'المرافق', href: '/facilities', keywords: ['facilities', 'building', 'campus', 'hospital', 'مرافق'], icon: Building2, description: 'Our world-class facilities', descriptionAr: 'مرافقنا العالمية', group: 'explore', color: 'bg-orange-500/15 text-orange-600' },
  { title: 'Medical Tourism', titleAr: 'السياحة العلاجية', href: '/medical-tourism', keywords: ['tourism', 'travel', 'international', 'patient', 'سياحة', 'علاجية'], icon: Plane, description: 'International patient services', descriptionAr: 'خدمات المرضى الدوليين', group: 'explore', color: 'bg-sky-500/15 text-sky-600' },
  { title: 'Research', titleAr: 'الأبحاث', href: '/research', keywords: ['research', 'science', 'innovation', 'study', 'أبحاث'], icon: FlaskConical, description: 'Innovation & research', descriptionAr: 'الابتكار والبحث', group: 'explore', color: 'bg-violet-500/15 text-violet-600' },
  { title: 'Partnerships', titleAr: 'الشراكات', href: '/partnerships', keywords: ['partnership', 'collaborate', 'partner', 'شراكات'], icon: Handshake, description: 'Our global partners', descriptionAr: 'شركاؤنا العالميون', group: 'explore', color: 'bg-indigo-500/15 text-indigo-600' },
  { title: 'Development Phases', titleAr: 'مراحل التطوير', href: '/development-phases', keywords: ['development', 'phases', 'construction', 'progress', 'تطوير', 'مراحل'], icon: Layers, description: 'Project milestones', descriptionAr: 'مراحل المشروع', group: 'explore', color: 'bg-yellow-500/15 text-yellow-600' },
  { title: 'Investment', titleAr: 'الاستثمار', href: '/investment', keywords: ['investment', 'invest', 'finance', 'opportunity', 'استثمار'], icon: TrendingUp, description: 'Investment opportunities', descriptionAr: 'فرص الاستثمار', group: 'explore', color: 'bg-green-500/15 text-green-600' },
  { title: 'Insurance & Billing', titleAr: 'التأمين والفواتير', href: '/insurance', keywords: ['insurance', 'billing', 'payment', 'coverage', 'تأمين', 'فواتير'], icon: Shield, description: 'Insurance & payment info', descriptionAr: 'معلومات التأمين والدفع', group: 'explore', color: 'bg-cyan-500/15 text-cyan-600' },
  { title: 'News', titleAr: 'الأخبار', href: '/news', keywords: ['news', 'updates', 'press', 'media', 'أخبار'], icon: Newspaper, description: 'Latest updates', descriptionAr: 'آخر الأخبار', group: 'explore', color: 'bg-red-500/15 text-red-600' },
  { title: 'Careers', titleAr: 'الوظائف', href: '/careers', keywords: ['careers', 'jobs', 'work', 'employment', 'hiring', 'وظائف'], icon: Briefcase, description: 'Join our team', descriptionAr: 'انضم لفريقنا', group: 'explore', color: 'bg-amber-500/15 text-amber-600' },
  { title: 'Location', titleAr: 'الموقع', href: '/location', keywords: ['location', 'map', 'directions', 'address', 'badr', 'موقع'], icon: MapPin, description: 'How to find us', descriptionAr: 'كيف تصل إلينا', group: 'explore', color: 'bg-rose-500/15 text-rose-600' },
  { title: 'FAQ', titleAr: 'الأسئلة الشائعة', href: '/faq', keywords: ['faq', 'questions', 'help', 'support', 'أسئلة'], icon: HelpCircle, description: 'Common questions', descriptionAr: 'الأسئلة الشائعة', group: 'explore', color: 'bg-fuchsia-500/15 text-fuchsia-600' },
  { title: 'Campus Map', titleAr: 'خريطة الحرم', href: '/campus-map', keywords: ['campus', 'map', '3d', 'building', 'خريطة'], icon: Map, description: '3D campus overview', descriptionAr: 'نظرة عامة ثلاثية الأبعاد', group: 'explore', color: 'bg-lime-500/15 text-lime-600' },
];

interface DoctorEntry {
  name: string;
  nameAr: string;
  specialty: string;
  specialtyAr: string;
  rating: number;
  color: string;
}

const doctorEntries: DoctorEntry[] = [
  { name: 'Dr. Ahmed Hassan', nameAr: 'د. أحمد حسن', specialty: 'Cardiology', specialtyAr: 'أمراض القلب', rating: 4.9, color: 'bg-red-500' },
  { name: 'Dr. Fatima Al-Sayed', nameAr: 'د. فاطمة السيد', specialty: 'Neurology', specialtyAr: 'الأعصاب', rating: 4.8, color: 'bg-purple-500' },
  { name: 'Dr. Mohamed Khalil', nameAr: 'د. محمد خليل', specialty: 'Orthopedics', specialtyAr: 'العظام', rating: 4.9, color: 'bg-blue-500' },
  { name: 'Dr. Sara Ibrahim', nameAr: 'د. سارة إبراهيم', specialty: 'Pediatrics', specialtyAr: 'طب الأطفال', rating: 4.7, color: 'bg-pink-500' },
  { name: 'Dr. Omar Mahmoud', nameAr: 'د. عمر محمود', specialty: 'Oncology', specialtyAr: 'الأورام', rating: 4.9, color: 'bg-orange-500' },
  { name: 'Dr. Layla Abdel-Rahman', nameAr: 'د. ليلى عبد الرحمن', specialty: 'Ophthalmology', specialtyAr: 'طب العيون', rating: 4.8, color: 'bg-teal-500' },
  { name: 'Dr. Khaled Nasser', nameAr: 'د. خالد ناصر', specialty: 'Internal Medicine', specialtyAr: 'الباطنة', rating: 4.7, color: 'bg-indigo-500' },
  { name: 'Dr. Nour El-Din', nameAr: 'د. نور الدين', specialty: 'Surgery', specialtyAr: 'الجراحة', rating: 4.9, color: 'bg-emerald-500' },
];

const TRENDING = ['Cardiology', 'Find a Doctor', 'Campus Map', 'Medical Tourism', 'Careers'];
const RECENT_KEY = 'capitalmed-recent-searches';

function getRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]').slice(0, 5); }
  catch { return []; }
}
function addRecent(term: string) {
  const list = getRecent().filter((t) => t !== term);
  list.unshift(term);
  localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 5)));
}
function clearRecent() {
  localStorage.removeItem(RECENT_KEY);
}

/** Highlight matching substring in text */
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase().trim());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <mark className="bg-primary/20 text-primary rounded-[2px] px-0.5">{text.slice(idx, idx + query.trim().length)}</mark>
      {text.slice(idx + query.trim().length)}
    </span>
  );
}

type FilterTab = 'all' | 'pages' | 'doctors';

// Detect if Mac (⌘) or Windows/Linux (Ctrl)
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform);

const SearchBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<string[]>([]);
  const [filterTab, setFilterTab] = useState<FilterTab>('all');
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isAr = language === 'ar';

  useEffect(() => {
    if (open) { setRecent(getRecent()); setQuery(''); setFilterTab('all'); }
  }, [open]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen((o) => !o); }
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

  const handleTrendingSelect = useCallback((term: string) => {
    const match = pages.find((p) => p.title === term || p.title.includes(term));
    if (match) { addRecent(match.title); setOpen(false); navigate(match.href); }
  }, [navigate]);

  const mainPages = pages.filter((p) => p.group === 'main');
  const explorePages = pages.filter((p) => p.group === 'explore');
  const showPages = filterTab !== 'doctors';
  const showDoctors = filterTab !== 'pages';
  const hasQuery = query.trim().length > 0;

  // Doctor initials avatar
  const getInitials = (name: string) => name.split(' ').filter(Boolean).slice(1, 3).map(w => w[0]).join('');

  return (
    <>
      {/* ── Trigger button ── */}
      <button
        onClick={() => setOpen(true)}
        className="group relative flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/60 bg-background/70 backdrop-blur-md text-muted-foreground text-sm hover:border-primary/40 hover:bg-primary/5 hover:text-foreground transition-all duration-200 shadow-sm"
      >
        <Search className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
        <span className="hidden sm:inline font-medium">{isAr ? 'بحث...' : 'Search...'}</span>
        <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 ring-1 ring-primary/20 transition-opacity pointer-events-none" />
      </button>

      {/* ── Command palette dialog ── */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        {/* Header strip */}
        <div className="flex flex-wrap items-center gap-2 px-3 pt-3 pb-1">
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-1 p-1 rounded-lg bg-primary/10">
              <Search className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest whitespace-nowrap">
              {isAr ? 'البحث' : 'Quick Search'}
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {(['all', 'pages', 'doctors'] as FilterTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-2 py-0.5 rounded-md text-xs font-medium transition-colors ${filterTab === tab
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted/60'
                  }`}
              >
                {tab === 'all' ? (isAr ? 'الكل' : 'All') :
                  tab === 'pages' ? (isAr ? 'صفحات' : 'Pages') :
                    (isAr ? 'أطباء' : 'Doctors')}
              </button>
            ))}
            <div className="w-px h-4 bg-border mx-1 shrink-0" />
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-md text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <CommandInput
          placeholder={isAr ? 'ابحث عن صفحات، أطباء، خدمات...' : 'Search pages, doctors, services...'}
          value={query}
          onValueChange={setQuery}
          className="border-0 focus:ring-0"
        />

        <CommandList className="max-h-[420px] overflow-y-auto scrollbar-thin">
          <CommandEmpty>
            <div className="flex flex-col items-center gap-3 py-10">
              <div className="w-14 h-14 rounded-full bg-muted/50 flex items-center justify-center">
                <Search className="w-6 h-6 text-muted-foreground/40" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">{isAr ? 'لا توجد نتائج' : 'No results found'}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {isAr ? `لا نتائج لـ "${query}"` : `No matches for "${query}"`}
                </p>
              </div>
            </div>
          </CommandEmpty>

          {/* ── Trending (when no query) ── */}
          {!hasQuery && filterTab !== 'doctors' && (
            <>
              <CommandGroup heading={
                <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <Flame className="w-3 h-3 text-orange-400" />
                  {isAr ? 'الأكثر بحثاً' : 'Trending'}
                </span>
              }>
                <div className="flex flex-wrap gap-1.5 px-2 py-1.5">
                  {TRENDING.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleTrendingSelect(term)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted/60 hover:bg-primary/10 hover:text-primary text-xs font-medium text-muted-foreground transition-colors border border-border/50 hover:border-primary/30"
                    >
                      <ArrowRight className="w-3 h-3" />
                      {term}
                    </button>
                  ))}
                </div>
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          {/* ── Recent searches ── */}
          {!hasQuery && recent.length > 0 && (
            <>
              <CommandGroup heading={
                <div className="flex items-center justify-between w-full pr-2">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {isAr ? 'الأخيرة' : 'Recent'}
                  </span>
                  <button
                    onClick={() => { clearRecent(); setRecent([]); }}
                    className="text-[10px] text-muted-foreground/60 hover:text-destructive transition-colors flex items-center gap-0.5"
                  >
                    <X className="w-2.5 h-2.5" />
                    {isAr ? 'مسح' : 'Clear'}
                  </button>
                </div>
              }>
                {recent.map((term) => (
                  <CommandItem
                    key={term}
                    value={`recent ${term}`}
                    onSelect={() => handleRecentSelect(term)}
                    className="cursor-pointer group"
                  >
                    <Clock className="mr-2 h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-primary" />
                    <span className="text-sm flex-1">{term}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-muted-foreground" />
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          {/* ── Main Pages ── */}
          {showPages && (
            <CommandGroup heading={isAr ? 'الصفحات الرئيسية' : 'Main Pages'}>
              {mainPages.map((page) => {
                const Icon = page.icon;
                return (
                  <CommandItem
                    key={page.href}
                    value={`${page.title} ${page.titleAr} ${page.keywords.join(' ')} ${page.description || ''} ${page.descriptionAr || ''}`}
                    onSelect={() => handleSelect(page.href, isAr ? page.titleAr : page.title)}
                    className="cursor-pointer group flex items-center"
                  >
                    <div className={`flex items-center justify-center w-7 h-7 rounded-lg mr-2.5 shrink-0 ${page.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-none">
                        <Highlight text={isAr ? page.titleAr : page.title} query={query} />
                      </p>
                      {page.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">
                          {isAr ? page.descriptionAr : page.description}
                        </p>
                      )}
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 group-data-[selected=true]:text-primary shrink-0" />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          {showPages && <CommandSeparator />}

          {/* ── Doctors ── */}
          {showDoctors && (
            <CommandGroup heading={isAr ? 'الأطباء' : 'Our Doctors'}>
              {doctorEntries.map((doc) => (
                <CommandItem
                  key={doc.name}
                  value={`${doc.name} ${doc.nameAr} ${doc.specialty} ${doc.specialtyAr} doctor طبيب`}
                  onSelect={() => handleSelect('/doctors', isAr ? doc.nameAr : doc.name)}
                  className="cursor-pointer group"
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2.5 shrink-0 text-white text-xs font-bold ${doc.color}`}>
                    {getInitials(doc.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none">
                      <Highlight text={isAr ? doc.nameAr : doc.name} query={query} />
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      <Highlight text={isAr ? doc.specialtyAr : doc.specialty} query={query} />
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium text-amber-600">{doc.rating}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {showDoctors && showPages && <CommandSeparator />}

          {/* ── Explore ── */}
          {showPages && (
            <CommandGroup heading={isAr ? 'استكشف' : 'Explore'}>
              {explorePages.map((page) => {
                const Icon = page.icon;
                return (
                  <CommandItem
                    key={page.href}
                    value={`${page.title} ${page.titleAr} ${page.keywords.join(' ')} ${page.description || ''} ${page.descriptionAr || ''}`}
                    onSelect={() => handleSelect(page.href, isAr ? page.titleAr : page.title)}
                    className="cursor-pointer group"
                  >
                    <div className={`flex items-center justify-center w-7 h-7 rounded-lg mr-2.5 shrink-0 ${page.color}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-none">
                        <Highlight text={isAr ? page.titleAr : page.title} query={query} />
                      </p>
                      {page.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">
                          {isAr ? page.descriptionAr : page.description}
                        </p>
                      )}
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 group-data-[selected=true]:text-primary shrink-0" />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between px-3 py-2 border-t border-border/50 bg-muted/20">
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground/60">
            <span className="flex items-center gap-1"><kbd className="rounded border border-border/50 bg-muted/60 px-1 font-mono">↑↓</kbd> {isAr ? 'تنقل' : 'navigate'}</span>
            <span className="flex items-center gap-1"><kbd className="rounded border border-border/50 bg-muted/60 px-1 font-mono">↵</kbd> {isAr ? 'فتح' : 'open'}</span>
            <span className="flex items-center gap-1"><kbd className="rounded border border-border/50 bg-muted/60 px-1 font-mono">esc</kbd> {isAr ? 'إغلاق' : 'close'}</span>
          </div>
          <span className="text-[10px] text-muted-foreground/40 font-medium">CapMed Search</span>
        </div>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
