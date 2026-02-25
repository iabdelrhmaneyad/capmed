import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import capitalmedLogo from '@/assets/logo_background_white.png';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const contactInfo = [
    { icon: MapPin, text: t('contact.address') },
    { icon: Phone, text: t('contact.phone') },
    { icon: Mail, text: t('contact.email') },
    { icon: Clock, text: t('contact.hours') },
  ];

  const quickLinks = [
    t('nav.about'),
    t('nav.services'),
    t('nav.doctors'),
    t('nav.patients'),
    t('nav.research'),
    t('nav.contact'),
  ];

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Youtube, href: '#' },
  ];

  return (
    <footer className="bg-[hsl(210,100%,14%)] text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <img
              src={capitalmedLogo}
              alt="CapitalMed"
              className="h-12 w-auto object-contain mb-6"
            />
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-6">{t('footer.quicklinks')}</h3>
            <ul className="space-y-3">
              {[
                { label: t('nav.about'), href: '/about' },
                { label: t('nav.services'), href: '/services' },
                { label: t('nav.doctors'), href: '/doctors' },
                { label: t('nav.patients'), href: '/medical-tourism' },
                { label: t('nav.research'), href: '/research' },
                { label: t('nav.contact'), href: '/contact' },
              ].map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-6">{t('footer.services')}</h3>
            <ul className="space-y-3">
              {[
                { label: t('services.emergency.title'), href: '/services' },
                { label: t('services.surgery.title'), href: '/services' },
                { label: t('services.cardiology.title'), href: '/services' },
                { label: t('services.oncology.title'), href: '/services' },
                { label: t('services.neurology.title'), href: '/services' },
                { label: t('services.pediatrics.title'), href: '/services' },
              ].map((service, index) => (
                <li key={index}>
                  <Link to={service.href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-6">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const isPhone = item.icon === Phone;
                const isEmail = item.icon === Mail;
                return (
                  <li key={index} className="flex items-start gap-3">
                    <Icon className="w-4 h-4 text-white/40 mt-0.5 flex-shrink-0" />
                    {isPhone ? (
                      <a href={`tel:${item.text.replace(/\s/g, '')}`} className="text-white/60 text-sm hover:text-white transition-colors">{item.text}</a>
                    ) : isEmail ? (
                      <a href={`mailto:${item.text}`} className="text-white/60 text-sm hover:text-white transition-colors">{item.text}</a>
                    ) : (
                      <span className="text-white/60 text-sm">{item.text}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              {t('footer.copyright')}
            </p>
            <div className="flex gap-6 text-xs">
              <a href="#" className="text-white/40 hover:text-white/70 transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="text-white/40 hover:text-white/70 transition-colors">
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
