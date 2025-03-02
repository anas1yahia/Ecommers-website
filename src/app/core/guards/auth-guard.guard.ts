import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  // Skip authentication check during SSR
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // Now check authentication in browser
  if (authService.isAuthnticated()) {
    return true;
  }

  // Redirect to login if not authenticated
  router.navigate(['/login-user']);
  return false;
};
