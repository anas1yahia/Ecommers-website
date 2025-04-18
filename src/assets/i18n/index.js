import en from './locales/en.json';
import ar from './locales/ar.json';

const translations = {
  en,
  ar
};

export default translations;

// Export language information
export const languages = [
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
export const getTranslation = (langCode) => {
  return translations[langCode] || translations.en; // Fallback to English
};
