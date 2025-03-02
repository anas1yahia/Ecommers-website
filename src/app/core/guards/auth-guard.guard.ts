import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  console.log('Auth guard running, checking auth status');

  // Skip authentication check during SSR
  if (!isPlatformBrowser(platformId)) {
    console.log('SSR detected, bypassing auth check');
    return true;
  }

  // Now check authentication in browser
  const isAuth = authService.isAuthnticated();
  console.log('User authenticated?', isAuth);

  if (isAuth) {
    return true;
  }

  // Redirect to login if not authenticated
  console.log('Not authenticated, redirecting to login');
  router.navigate(['/login-user']);
  return false;
};
