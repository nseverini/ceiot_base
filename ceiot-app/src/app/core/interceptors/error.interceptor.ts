import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 400) {
          let errorMessage: string;
          errorMessage =
            typeof error?.error == 'string'
              ? error.error
              : error.error?.message;
          return throwError(() => errorMessage);
        }

        this.router.navigate(['/error/' + error.status]);
        return throwError(() => error);
      })
    );
  }
}
