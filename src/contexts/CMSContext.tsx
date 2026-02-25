import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface CMSContent {
  id: string;
  page: string;
  section: string;
  content: Record<string, string>;
  lastUpdated: Date;
}

interface CMSContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  content: Record<string, CMSContent>;
  updateContent: (id: string, newContent: Record<string, string>) => void;
  getContent: (page: string, section: string) => CMSContent | undefined;
}

const defaultContent: Record<string, CMSContent> = {
  'home-hero': {
    id: 'home-hero',
    page: 'home',
    section: 'hero',
    content: {
      title_en: 'CAPITALMED',
      title_ar: 'كابيتال ميد',
      tagline_en: 'Trusted for Life',
      tagline_ar: 'موثوق به مدى الحياة',
    },
    lastUpdated: new Date(),
  },
  'home-stats': {
    id: 'home-stats',
    page: 'home',
    section: 'stats',
    content: {
      patients: '500000',
      beds: '4500',
      icu: '450',
      operating: '120',
      providers: '3000',
      specialties: '100',
    },
    lastUpdated: new Date(),
  },
};

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState<Record<string, CMSContent>>(() => {
    const saved = localStorage.getItem('cms_content');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultContent;
      }
    }
    return defaultContent;
  });

  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev);
  }, []);

  const updateContent = useCallback((id: string, newContent: Record<string, string>) => {
    setContent(prev => {
      const updated = {
        ...prev,
        [id]: {
          ...prev[id],
          content: { ...prev[id]?.content, ...newContent },
          lastUpdated: new Date(),
        },
      };
      localStorage.setItem('cms_content', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getContent = useCallback((page: string, section: string): CMSContent | undefined => {
    const id = `${page}-${section}`;
    return content[id];
  }, [content]);

  return (
    <CMSContext.Provider value={{ isEditMode, toggleEditMode, content, updateContent, getContent }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = (): CMSContextType => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
