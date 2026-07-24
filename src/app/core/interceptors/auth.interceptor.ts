import {
  HttpInterceptorFn,
  HttpErrorResponse
} from '@angular/common/http';

import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  switchMap,
  throwError
} from 'rxjs';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const http = inject(HttpClient);

  let token = localStorage.getItem('token');

  if (token) {

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {
      

      if (error.status === 401) {

        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {

          localStorage.clear();

          return throwError(() => error);
        }

        return http.post<any>(`${environment.apiUrl}/api/Auth/refresh-token`,
          {
            refreshToken: refreshToken
          })
          .pipe(

            switchMap(response => {

              localStorage.setItem(
                'token',
                response.data.accessToken);

              localStorage.setItem(
                'refreshToken',
                response.data.refreshToken);

              const retryRequest = req.clone({

                setHeaders: {
                  Authorization:
                    `Bearer ${response.data.accessToken}`
                }

              });

              return next(retryRequest);

            })

          );

      }

      return throwError(() => error);

    })

  );

};