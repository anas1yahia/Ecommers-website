import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthService);
  const token = auth.getToken()!;

  if (req.url.includes('cart') && token || req.url.includes('order') && token) {

    req = req.clone({
      setHeaders: {
        token : token
      }
    });

  }



  return next(req);
};
