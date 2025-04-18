import en from './locales/en.json';
import ar from './locales/ar.json';

type TranslationDictionary = { [key: string]: any };

const translations: { [key: string]: TranslationDictionary } = {
  en,
  ar
};

export default translations;

export interface Language {
  code: string;
  name: string;
  dir: 'ltr' | 'rtl';
  active: boolean;
}

// Export language information
export const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    dir: 'ltr', // left-to-right
    active: true
  },
  {
    code: 'ar',
    name: 'العربية', // Arabic
    dir: 'rtl', // right-to-left
    active: true
  }
];

// Helper function to get translation
export const getTranslation = (langCode: string): TranslationDictionary => {
  return translations[langCode] || translations['en']; // Fallback to English
};
