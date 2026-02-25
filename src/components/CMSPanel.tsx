import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Settings, Edit3 } from 'lucide-react';
import { useCMS } from '@/contexts/CMSContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CMSPanel: React.FC = () => {
  const { isEditMode, toggleEditMode, content, updateContent } = useCMS();
  const { t, language } = useLanguage();
  const [editingContent, setEditingContent] = useState<Record<string, string>>({});

  const handleInputChange = (key: string, value: string) => {
    setEditingContent(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = (contentId: string) => {
    if (Object.keys(editingContent).length > 0) {
      updateContent(contentId, editingContent);
      setEditingContent({});
    }
  };

  if (!isEditMode) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        className="fixed top-0 right-0 h-full w-96 bg-card shadow-2xl z-50 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-lg">{t('cms.title')}</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleEditMode}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <Tabs defaultValue="hero" className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="hero" className="flex-1">Hero</TabsTrigger>
              <TabsTrigger value="stats" className="flex-1">Stats</TabsTrigger>
            </TabsList>

            <TabsContent value="hero" className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  Hero Section
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="title_en">Title (English)</Label>
                    <Input
                      id="title_en"
                      defaultValue={content['home-hero']?.content?.title_en || 'CAPITALMED'}
                      onChange={(e) => handleInputChange('title_en', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title_ar">Title (Arabic)</Label>
                    <Input
                      id="title_ar"
                      defaultValue={content['home-hero']?.content?.title_ar || 'كابيتال ميد'}
                      onChange={(e) => handleInputChange('title_ar', e.target.value)}
                      className="mt-1"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tagline_en">Tagline (English)</Label>
                    <Input
                      id="tagline_en"
                      defaultValue={content['home-hero']?.content?.tagline_en || 'Trusted for Life'}
                      onChange={(e) => handleInputChange('tagline_en', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tagline_ar">Tagline (Arabic)</Label>
                    <Input
                      id="tagline_ar"
                      defaultValue={content['home-hero']?.content?.tagline_ar || 'موثوق به مدى الحياة'}
                      onChange={(e) => handleInputChange('tagline_ar', e.target.value)}
                      className="mt-1"
                      dir="rtl"
                    />
                  </div>
                </div>

                <Button 
                  onClick={() => handleSave('home-hero')} 
                  className="w-full"
                  disabled={Object.keys(editingContent).length === 0}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {t('cms.save')}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  Statistics
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'patients', label: 'Patients', default: '500000' },
                    { key: 'beds', label: 'Beds', default: '4500' },
                    { key: 'icu', label: 'ICU Beds', default: '450' },
                    { key: 'operating', label: 'Operating Rooms', default: '120' },
                    { key: 'providers', label: 'Providers', default: '3000' },
                    { key: 'specialties', label: 'Specialties', default: '100' },
                  ].map((stat) => (
                    <div key={stat.key}>
                      <Label htmlFor={stat.key}>{stat.label}</Label>
                      <Input
                        id={stat.key}
                        type="number"
                        defaultValue={content['home-stats']?.content?.[stat.key] || stat.default}
                        onChange={(e) => handleInputChange(stat.key, e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={() => handleSave('home-stats')} 
                  className="w-full"
                  disabled={Object.keys(editingContent).length === 0}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {t('cms.save')}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/50">
          <p className="text-xs text-muted-foreground text-center">
            Changes are saved locally. Connect to backend for persistence.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CMSPanel;
