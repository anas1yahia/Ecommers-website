import { CardService } from './../../../features/product/services/card.service';
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  Inject,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/services/auth.service';
import { SearchPipe } from '../../pipes/search.pipe';
import { TranslationService } from '../../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';

// Define interface for language objects
export interface Language {
  code: string;
  name: string;
  dir?: 'ltr' | 'rtl';
  active?: boolean;
}

// Get languages from the service instead of importing directly
const defaultLanguages: Language[] = [
  { code: 'en', name: 'English', dir: 'ltr', active: true },
  { code: 'ar', name: 'العربية', dir: 'rtl', active: true },
  { code: 'fr', name: 'Français', dir: 'ltr', active: false },
  { code: 'es', name: 'Español', dir: 'ltr', active: false },
];

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslateModule],
  providers: [AuthService],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  @Input() layout: string = 'user';

  isAuthenticated = false;
  userName: string = '';
  darkMode = false;
  searchTerm: string = '';

  cartItemCount: number = 0;
  showMobileMenu: boolean = false;
  showMobileSearch: boolean = false;
  userEmail: string = 'user@example.com';

  // Define languages with proper typing
  languages: Language[] = defaultLanguages;
  currentLang: string = 'en';

  // Add flag to track RTL direction
  isRtl: boolean = false;

  private authService = inject(AuthService);
  private isBrowser: boolean;
  $index: any;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private router: Router,
    public translationService: TranslationService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    // Get current language from translation service
    if (this.isBrowser) {
      this.currentLang = translationService.getCurrentLanguage();
      this.updateDirectionBasedOnLanguage(this.currentLang);
    }
  }

  private readonly cartService = inject(CardService);
  private readonly id = inject(PLATFORM_ID);

  ngOnInit(): void {
    // Check authentication only in browser environment
    if (this.isBrowser) {
      try {
        this.isAuthenticated = this.authService?.isAuthnticated() || false;
        const user = this.authService?.getUserData();
        this.userName = user?.name || '';

        // Only subscribe if service exists
        this.authService?.currentUser$?.subscribe((user) => {
          this.isAuthenticated = !!user;
          this.userName = user?.name || '';
        });

        // Add event listener only in browser
        window.addEventListener('scroll', this.handleScroll);
      } catch (error) {
        console.error('Auth service error:', error);
      }
    }

    this.cartService.counter.subscribe({
      next: (count) => {
        this.cartItemCount = count;
      },
    });
    if (typeof localStorage !== 'undefined') {
      this.cartService.getLoggedUserCart().subscribe({
        next: (count) => {
          this.cartService.counter.next(count.numOfCartItems);
        },
      });
    }

    // Subscribe to language changes
    if (this.isBrowser) {
      this.translationService.translateService.onLangChange.subscribe((event) => {
        this.currentLang = event.lang;
        this.updateDirectionBasedOnLanguage(this.currentLang);
      });
    }
  }

  onSearchTermChanged() {
    this.router.navigate(['/home'], {
      queryParams: { searchTerm: this.searchTerm },
    });
  }

  closeMobileMenu() {
    this.showMobileMenu = false;
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  toggleMobileSearch() {
    this.showMobileSearch = !this.showMobileSearch;
  }

  handleScroll = () => {
    if (!this.isBrowser) return;

    const nav = document.getElementById('main-nav');
    if (nav) {
      if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    }
  };

  ngOnDestroy() {
    // Remove event listener only in browser
    if (this.isBrowser) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  checkAuthStatus(): void {
    try {
      this.isAuthenticated = this.authService?.isAuthnticated() || false;
      const user = this.authService?.getUserData();
      this.userName = user?.name || '';
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  }

  logout(): void {
    try {
      this.authService?.logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  toggleDarkMode(): void {
    if (this.isBrowser) {
      document.documentElement.classList.toggle('dark', this.darkMode);

      localStorage.setItem('darkMode', this.darkMode ? 'true' : 'false');
    }
  }

  // Update the changeLanguage method
  changeLanguage(langCode: string): void {
    this.translationService.changeLang(langCode);
    this.currentLang = langCode;
    this.updateDirectionBasedOnLanguage(langCode);
  }

  // Add method to update document direction based on language
  private updateDirectionBasedOnLanguage(langCode: string): void {
    if (!this.isBrowser) return;

    const lang = this.languages.find((l) => l.code === langCode);
    this.isRtl = lang?.dir === 'rtl';

    // Set dir attribute on document
    document.documentElement.dir = this.isRtl ? 'rtl' : 'ltr';

    // Optionally add a class for RTL-specific styling
    document.documentElement.classList.toggle('rtl', this.isRtl);
  }

  // Get language name from code
  getLanguageName(code: string): string {
    const lang = this.languages.find((lang: Language) => lang.code === code);
    return lang ? lang.name : 'English';
  }

  // Get current language name
  getCurrentLanguageName(): string {
    return this.getLanguageName(this.currentLang);
  }
}
