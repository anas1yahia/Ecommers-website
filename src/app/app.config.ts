import { ApplicationConfig, CUSTOM_ELEMENTS_SCHEMA, importProvidersFrom, inject, PLATFORM_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { catchErrorsInterceptor } from './core/interceptors/catch-errors.interceptor';



// Custom SSR-safe interceptor function
export function tokenSafeInterceptor(req: { clone: (arg0: { headers: any; }) => any; headers: { set: (arg0: string, arg1: string) => any; }; }, next: (arg0: any) => any) {
  const platformId = inject(PLATFORM_ID);

  // Skip token handling in SSR
  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  const token = localStorage.getItem('token');
  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('token', token)
    });
    return next(clonedReq);
  }

  return next(req);
}

export const appConfig: ApplicationConfig = {
  providers: [
     provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideClientHydration(withEventReplay()),
     provideHttpClient(withFetch(), withInterceptors([authInterceptor,loadingInterceptor, catchErrorsInterceptor])),
     importProvidersFrom(
       BrowserAnimationsModule,
       NgxSpinnerModule.forRoot()
     )
  ]
};
