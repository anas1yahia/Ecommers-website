import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  defaultLang = 'en';
  // Add a BehaviorSubject to track current language
  currentLanguage$ = new BehaviorSubject<string>('en');

  constructor(
    public translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lng');
      if (savedLang) {
        this.defaultLang = savedLang;
      }
      this.translateService.setDefaultLang(this.defaultLang);
      this.translateService.use(this.defaultLang);
      this.currentLanguage$.next(this.defaultLang);
    }
  }

  changeLang(lang: string) {
    this.translateService.use(lang);
    this.currentLanguage$.next(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lng', lang);
    }
  }

  translate(key: string, params: any = {}): string {
    let translation = '';
    // Get translation synchronously if available
    if (this.translateService.instant(key) !== key) {
      translation = this.translateService.instant(key, params);
    }
    return translation || key;
  }

  getCurrentLanguage(): string {
    return this.translateService.currentLang || this.defaultLang;
  }
}
