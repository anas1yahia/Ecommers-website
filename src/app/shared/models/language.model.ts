export interface Language {
  code: string;
  name: string;
  dir: 'ltr' | 'rtl';
  active: boolean;
}

// Define the available languages
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
