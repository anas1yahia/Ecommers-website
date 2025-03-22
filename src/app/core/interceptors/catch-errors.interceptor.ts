import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToasterService } from '../../features/product/services/toaster-service.service';

export const catchErrorsInterceptor: HttpInterceptorFn = (req, next) => {

  let toaster = inject(ToasterService);



  return next(req).pipe(
    catchError((err) => {
      toaster.show(err.error.message);
      return throwError(() => err);
    })
  );
};
