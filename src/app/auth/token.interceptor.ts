import {  HttpErrorResponse, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent,
          HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  public isRefreshingToken: boolean = false;
  public tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  public intercept(request: HttpRequest<any>, next: HttpHandler)
  : Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {

    return next.handle(this.addTokenToRequest(request, this.authService.getToken()))
      .pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            if (request.url.includes('token/refresh') || request.url.includes('login')) {
                if (request.url.includes('token/refresh')) {
                    this.authService.logout();
                }
                return throwError(err);
            }
            switch ((err as HttpErrorResponse).status) {
              case 401:
                return this.handle401Error(request, next);
              case 400:
                return this.authService.logout();
              case 404:
                return throwError(err);
            }
          } else {
            return throwError(err);
          }
        }));
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}`}});
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): any {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);
      return this.authService.refreshToken()
        .pipe(
          switchMap((data) => {
            if (data) {
              this.tokenSubject.next(data['token']);
              localStorage.setItem('token', data['token']);
              localStorage.setItem('refresh_token', data['refresh_token']);
              return next.handle(this.addTokenToRequest(request, data['token']));
            }

            return this.authService.logout() as any;
          }),
          catchError(err => {
            return this.authService.logout() as any;
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          }),
        );
    } else {
      this.isRefreshingToken = false;

      return this.tokenSubject
        .pipe(
          filter(token => token != null),
          take(1),
          switchMap(token => {
            return next.handle(this.addTokenToRequest(request, token));
          }),
        );
    }
  }
}
