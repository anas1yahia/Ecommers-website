import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToasterService } from '../../features/product/services/toaster-service.service';

export const catchErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster = inject(ToasterService);

  return next(req).pipe(
    catchError((err) => {

      const errorMessage =
        err.error?.message ||
        err.error?.error ||
        err.message ||
        'An unexpected error occurred';


      toaster.show(errorMessage);

      
      return throwError(() => err);
    })
  );
};
