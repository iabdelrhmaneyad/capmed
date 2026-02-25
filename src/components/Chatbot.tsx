import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

const Chatbot: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isAr = language === 'ar';

  const quickReplies = isAr
    ? ['حجز موعد', 'ابحث عن طبيب', 'ساعات الزيارة', 'الطوارئ', 'التأمين']
    : ['Book Appointment', 'Find a Doctor', 'Visiting Hours', 'Emergency', 'Insurance'];

  const botResponses: Record<string, { en: string; ar: string }> = {
    appointment: {
      en: "I'd be happy to help you book an appointment! You can call us at +20 2 1234 5678 or visit our Doctors page to browse specialists and book online.",
      ar: "يسعدني مساعدتك في حجز موعد! يمكنك الاتصال بنا على +20 2 1234 5678 أو زيارة صفحة الأطباء لتصفح المتخصصين والحجز عبر الإنترنت.",
    },
    doctor: {
      en: "We have 100+ medical specialties. Visit our Find a Doctor page to search by specialty, name, or condition. Would you like me to guide you?",
      ar: "لدينا أكثر من ١٠٠ تخصص طبي. زر صفحة ابحث عن طبيب للبحث حسب التخصص أو الاسم أو الحالة. هل تريدني أن أرشدك؟",
    },
    visiting: {
      en: "General visiting hours: Sunday–Thursday 9AM–9PM, Friday–Saturday 10AM–6PM. ICU visits are limited to specific times. Emergency services are 24/7.",
      ar: "ساعات الزيارة العامة: الأحد–الخميس ٩ صباحاً–٩ مساءً، الجمعة–السبت ١٠ صباحاً–٦ مساءً. زيارات العناية المركزة محدودة بأوقات معينة. خدمات الطوارئ ٢٤/٧.",
    },
    emergency: {
      en: "🚨 For emergencies, call 123 immediately or come to our Emergency Department (Ground Floor, Building 1). We operate 24/7 with Level I Trauma Center capabilities.",
      ar: "🚨 للطوارئ، اتصل بـ ١٢٣ فوراً أو توجه إلى قسم الطوارئ (الطابق الأرضي، المبنى ١). نعمل على مدار الساعة مع إمكانيات مركز إصابات المستوى الأول.",
    },
    insurance: {
      en: "We accept 50+ insurance providers including AXA, Bupa, MetLife, and Allianz. Visit our Insurance page to check if your provider is in our network.",
      ar: "نقبل أكثر من ٥٠ مزود تأمين بما في ذلك أكسا وبوبا وميتلايف وأليانز. زر صفحة التأمين للتحقق مما إذا كان مزودك ضمن شبكتنا.",
    },
    default: {
      en: "Thank you for reaching out! I can help with appointments, finding doctors, visiting hours, emergency info, and insurance. What would you like to know?",
      ar: "شكراً لتواصلك! يمكنني المساعدة في المواعيد والبحث عن أطباء وساعات الزيارة ومعلومات الطوارئ والتأمين. ماذا تريد أن تعرف؟",
    },
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: isAr
            ? 'مرحباً! 👋 أنا مساعد كابيتال ميد. كيف يمكنني مساعدتك اليوم؟'
            : "Hello! 👋 I'm CapitalMed's virtual assistant. How can I help you today?",
          sender: 'bot',
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getResponse = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes('appointment') || lower.includes('book') || lower.includes('موعد') || lower.includes('حجز'))
      return botResponses.appointment[language];
    if (lower.includes('doctor') || lower.includes('specialist') || lower.includes('طبيب'))
      return botResponses.doctor[language];
    if (lower.includes('visit') || lower.includes('hour') || lower.includes('زيارة') || lower.includes('ساعات'))
      return botResponses.visiting[language];
    if (lower.includes('emergency') || lower.includes('urgent') || lower.includes('طوارئ'))
      return botResponses.emergency[language];
    if (lower.includes('insurance') || lower.includes('billing') || lower.includes('تأمين'))
      return botResponses.insurance[language];
    return botResponses.default[language];
  };

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: Message = { id: Date.now(), text: messageText, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = { id: Date.now() + 1, text: getResponse(messageText), sender: 'bot' };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      {/* Floating Button */}
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

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: '480px' }}
          >
            {/* Header */}
            <div className="bg-accent text-accent-foreground p-4 flex items-center gap-3">
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

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    msg.sender === 'bot' ? 'bg-primary/10' : 'bg-secondary/10'
                  }`}>
                    {msg.sender === 'bot' ? <Bot className="w-4 h-4 text-primary" /> : <User className="w-4 h-4 text-secondary" />}
                  </div>
                  <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-muted text-foreground rounded-bl-sm'
                  }`}>
                    {msg.text}
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
                          className="w-2 h-2 rounded-full bg-muted-foreground/40"
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

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="px-3 py-1.5 text-xs rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isAr ? 'اكتب رسالتك...' : 'Type a message...'}
                className="text-sm"
              />
              <Button size="icon" onClick={() => handleSend()} disabled={!input.trim()}>
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
