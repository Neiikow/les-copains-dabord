import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authSub = new Subject<boolean>();
  private url = 'http://localhost:8888/les-copains-dabord/api/public/api/';

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService) { }

  public onAuth(): Observable<boolean> {
    return this.authSub.asObservable();
  }

  public register(user: User): Observable<User> {
    return this.http.post<any>(this.url + 'register', user)
    .pipe(
      catchError(this.handleError),
    );
  }

  public login(user: User): Observable<User> {
    this.authSub.next(true);
    return this.http.post<any>(this.url + 'login_check', user)
    .pipe(
      catchError(this.handleError),
    );
  }

  public logout(): void {
    this.authSub.next(false);
    localStorage.clear();
  }

  public edit(user: User): Observable<User> {
    return this.http.post<any>(this.url + 'edit/' + user.id, user)
    .pipe(
      catchError(this.handleError),
    );
  }
  public passwordOldMatch(user: User): Observable<User> {
    return this.http.post<any>(this.url + 'users/match', user)
    .pipe(
      catchError(this.handleError),
    );
  }
  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getDecodedToken(): any {
    const token = this.getToken();
    try {
        return jwt_decode(token);
    } catch (Error) {
        return 'Decode error';
    }
  }

  public refreshToken(): Observable<any> {
    const data = {'refresh_token': localStorage.getItem('refresh_token')};
    return this.http.post<any>(this.url + 'token/refresh', data)
    .pipe(
      map(data => {
        localStorage.setItem('token', data['token']);
        localStorage.setItem('refresh_token', data['refresh_token']);

        return data;
      }),
      catchError(this.handleError),
    );
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      // if (this.jwtHelper.isTokenExpired(token)) {
      //   return false;
      // }
      return true;
    }
    return false;
  }

  public haveRoles(role: string): boolean {
    if (this.getToken()) {
      const decodedToken = this.getDecodedToken();

      if (!this.isAuthenticated() || !decodedToken.roles.find((value: string) => value === role)) {
        return false;
      }
      return true;
    }
    return false;
  }

  private handleError(error: HttpErrorResponse): any {
    const errorMsg = error.error.message;
    return throwError(errorMsg);
  }
}
