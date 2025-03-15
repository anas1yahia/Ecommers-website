import { ApplicationConfig, inject, PLATFORM_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';


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
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
      provideClientHydration(withEventReplay()),
        provideHttpClient(withFetch())
      ]
};
