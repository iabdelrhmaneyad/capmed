import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, MapPin, Phone, Calendar, ArrowRight, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useLocation } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  action?: React.ReactNode; // Optional UI elements like buttons
}

const Chatbot: React.FC = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isAr = language === 'ar';

  const initialQuickReplies = isAr
    ? ['حجز موعد', 'ابحث عن طبيب', 'الموقع والاتجاهات', 'ساعات الزيارة', 'التأمين', 'الطوارئ']
    : ['Book Appointment', 'Find a Doctor', 'Location & Directions', 'Visiting Hours', 'Insurance', 'Emergency'];

  const [quickReplies, setQuickReplies] = useState(initialQuickReplies);

  const botResponses: Record<string, { en: string; ar: string; action?: React.ReactNode; nextReplies?: string[] }> = {
    appointment: {
      en: "I'd be happy to help you book an appointment! You can call us directly or visit our Doctors page to book online.",
      ar: "يسعدني مساعدتك في حجز موعد! يمكنك الاتصال بنا مباشرة أو زيارة صفحة الأطباء للحجز عبر الإنترنت.",
      action: (
        <div className="flex flex-col gap-2 mt-2">
          <Link to="/doctors"><Button size="sm" className="w-full text-xs h-8"><Calendar className="w-3 h-3 mr-2" /> Book Online</Button></Link>
          <a href="tel:+20212345678"><Button size="sm" variant="outline" className="w-full text-xs h-8"><Phone className="w-3 h-3 mr-2" /> Call 19999</Button></a>
        </div>
      ),
      nextReplies: isAr ? ['ساعات الزيارة', 'عن المستشفى'] : ['Visiting Hours', 'About Hospital']
    },
    doctor: {
      en: "We have 100+ medical specialties and elite consultants. Would you like to search through our specialized directory?",
      ar: "لدينا أكثر من ١٠٠ تخصص طبي واستشاريين نخبة. هل ترغب في البحث من خلال دليلنا المتخصص؟",
      action: (
        <div className="mt-2">
          <Link to="/doctors"><Button size="sm" className="w-full text-xs h-8">Search Directory <ArrowRight className="w-3 h-3 ml-2" /></Button></Link>
        </div>
      )
    },
    location: {
      en: "CapitalMed is located in Badr City, Cairo, just 25km from the New Administrative Capital. We offer a 3D Interactive Campus Map to help you navigate.",
      ar: "تقع كابيتال ميد في مدينة بدر، القاهرة، على بعد ٢٥ كم فقط من العاصمة الإدارية الجديدة. نقدم خريطة تفاعلية ثلاثية الأبعاد للمساعدة في التنقل.",
      action: (
        <div className="flex flex-col gap-2 mt-2">
          <Link to="/campus-map"><Button size="sm" className="w-full text-xs h-8"><MapPin className="w-3 h-3 mr-2" /> Open 3D Map</Button></Link>
          <Link to="/location"><Button size="sm" variant="outline" className="w-full text-xs h-8">View Transit Options</Button></Link>
        </div>
      ),
      nextReplies: isAr ? ['حجز موعد', 'ساعات العمل'] : ['Book Appointment', 'Working Hours']
    },
    visiting: {
      en: "General visiting hours: Sunday–Thursday 9AM–9PM, Friday–Saturday 10AM–6PM. ICU visits are limited to specific times. Emergency services are 24/7.",
      ar: "ساعات الزيارة العامة: الأحد–الخميس ٩ صباحاً–٩ مساءً، الجمعة–السبت ١٠ صباحاً–٦ مساءً. زيارات العناية المركزة محدودة بأوقات معينة. خدمات الطوارئ ٢٤/٧.",
    },
    emergency: {
      en: "🚨 For emergencies, call 19999 immediately or come to our Emergency Department (Ground Floor, Building 1). We operate 24/7 with Level I Trauma Center capabilities.",
      ar: "🚨 للطوارئ، اتصل بـ 19999 فوراً أو توجه إلى قسم الطوارئ (الطابق الأرضي، المبنى ١). نعمل على مدار الساعة مع إمكانيات مركز إصابات المستوى الأول.",
      action: (
        <div className="mt-2">
          <a href="tel:19999"><Button size="sm" variant="destructive" className="w-full text-xs h-8 font-bold"><Phone className="w-3 h-3 mr-2" /> Dial 19999 Now</Button></a>
        </div>
      )
    },
    insurance: {
      en: "We accept 50+ insurance providers including AXA, Bupa, MetLife, and Allianz. You can verify coverage online.",
      ar: "نقبل أكثر من ٥٠ مزود تأمين بما في ذلك أكسا وبوبا وميتلايف وأليانز. يمكنك التحقق من التغطية عبر الإنترنت.",
      action: (
        <div className="mt-2">
          <Link to="/insurance"><Button size="sm" className="w-full text-xs h-8">Verify Insurance</Button></Link>
        </div>
      )
    },
    tourism: {
      en: "We offer end-to-end Medical Tourism packages! Complete with hotel stays, airport transfers, and VIP concierge services.",
      ar: "نحن نقدم باقات سياحة علاجية متكاملة! مع إقامات فندقية وتنقلات المطار وخدمات كبار الشخصيات.",
      action: (
        <div className="mt-2">
          <Link to="/medical-tourism"><Button size="sm" className="w-full text-xs h-8">View Tourism Packages <ArrowRight className="w-3 h-3 ml-2" /></Button></Link>
        </div>
      )
    },
    default: {
      en: "I understand. I'm a virtual assistant so my capabilities are limited. Would you like to speak to a human representative or leave us a message?",
      ar: "أنا أفهم. أنا مساعد افتراضي قدراتي محدودة. هل ترغب في التحدث إلى ممثل بشري أو ترك رسالة لنا؟",
      action: (
        <div className="mt-2">
          <Link to="/contact"><Button size="sm" className="w-full text-xs h-8">Contact Support</Button></Link>
        </div>
      )
    },
  };

  const getPageGreeting = () => {
    const path = location.pathname;
    if (path.includes('doctors')) {
      return isAr ? 'مرحبا بك في دليل الاستشاريين! هل تبحث عن تخصص معين أو طبيب محدد؟' : 'Welcome to our Consultants Directory! Are you looking for a specific specialty or doctor?';
    }
    if (path.includes('medical-tourism')) {
      return isAr ? 'مرحباً بالمسافرين الدوليين! ✈️ هل تحتاج إلى مساعدة في تفاصيل باقات الرعاية الخاصة بنا؟' : 'Welcome International Travelers! ✈️ Do you need help understanding our care tiers or travel logistics?';
    }
    if (path.includes('campus-map')) {
      return isAr ? 'هل فقدت طريقك؟ يمكنني مساعدتك في العثور على المبنى أو العيادة التي تبحث عنها داخل الحرم الجامعي.' : 'Lost your way? I can help you find the building or clinic you are looking for on our campus.';
    }
    return isAr ? 'مرحباً! 👋 أنا مساعد كابيتال ميد. كيف يمكنني مساعدتك اليوم؟' : "Hello! 👋 I'm CapitalMed's virtual assistant. How can I help you today?";
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { id: 1, text: getPageGreeting(), sender: 'bot' },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getResponse = (text: string) => {
    const lower = text.toLowerCase();
    let responseKey = 'default';

    if (lower.includes('appointment') || lower.includes('book') || lower.includes('موعد') || lower.includes('حجز')) responseKey = 'appointment';
    else if (lower.includes('doctor') || lower.includes('specialist') || lower.includes('طبيب') || lower.includes('find')) responseKey = 'doctor';
    else if (lower.includes('visit') || lower.includes('hour') || lower.includes('زيارة') || lower.includes('ساعات') || lower.includes('time')) responseKey = 'visiting';
    else if (lower.includes('emergency') || lower.includes('urgent') || lower.includes('طوارئ') || lower.includes('help')) responseKey = 'emergency';
    else if (lower.includes('insurance') || lower.includes('billing') || lower.includes('تأمين') || lower.includes('pay')) responseKey = 'insurance';
    else if (lower.includes('location') || lower.includes('where') || lower.includes('map') || lower.includes('موقع') || lower.includes('خريطة') || lower.includes('directions')) responseKey = 'location';
    else if (lower.includes('tourism') || lower.includes('travel') || lower.includes('flight') || lower.includes('سياحة') || lower.includes('سفر')) responseKey = 'tourism';

    return botResponses[responseKey];
  };

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: Message = { id: Date.now(), text: messageText, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Hide quick replies temporarily while typing
    setQuickReplies([]);

    setTimeout(() => {
      const respData = getResponse(messageText);
      const botMsg: Message = {
        id: Date.now() + 1,
        text: respData[language as 'en' | 'ar'],
        sender: 'bot',
        action: respData.action
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      // Update quick replies contextually or reset
      setQuickReplies(respData.nextReplies || initialQuickReplies);

    }, 1000 + Math.random() * 800);
  };

  const resetChat = () => {
    setMessages([{ id: Date.now(), text: getPageGreeting(), sender: 'bot' }]);
    setQuickReplies(initialQuickReplies);
    setInput('');
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={!isOpen ? { boxShadow: ['0 0 0 0 hsl(var(--accent) / 0.4)', '0 0 0 12px hsl(var(--accent) / 0)', '0 0 0 0 hsl(var(--accent) / 0)'] } : {}}
        transition={!isOpen ? { duration: 2, repeat: Infinity } : {}}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="bg-accent text-accent-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-foreground/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">CapitalMed Assistant</p>
                  <p className="text-xs text-accent-foreground/70">
                    {isAr ? 'متصل الآن • عادة يرد فوراً' : 'Online • Usually replies instantly'}
                  </p>
                </div>
              </div>
              <button onClick={resetChat} title="Restart Chat" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent-foreground/10 transition-colors">
                <RefreshCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'bot' ? 'bg-primary/10' : 'bg-secondary/10'
                    }`}>
                    {msg.sender === 'bot' ? <Bot className="w-4 h-4 text-primary" /> : <User className="w-4 h-4 text-secondary" />}
                  </div>
                  <div className={`flex flex-col max-w-[75%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-sm'
                        : 'bg-muted text-foreground rounded-bl-sm'
                      }`}>
                      {msg.text}
                    </div>
                    {/* Render Interactive Bot UI (Buttons/Links) */}
                    {msg.action && (
                      <div className="w-full mt-1.5">
                        {msg.action}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Contextual Quick Replies */}
            {quickReplies.length > 0 && !isTyping && (
              <div className="px-4 py-3 bg-muted/30 border-t border-border flex gap-2 overflow-x-auto scrollbar-hide shrink-0">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="shrink-0 px-3 py-1.5 text-xs font-medium rounded-full border border-primary/30 bg-background text-primary hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border flex gap-2 bg-background shrink-0">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isAr ? 'اكتب رسالتك...' : 'Type a message...'}
                className="text-sm h-10 border-muted-foreground/20 rounded-xl"
              />
              <Button size="icon" onClick={() => handleSend()} disabled={!input.trim() || isTyping} className="h-10 w-10 shrink-0 rounded-xl">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
