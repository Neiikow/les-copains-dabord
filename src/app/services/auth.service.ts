import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../class/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://localhost:8888',
    'Content-Type': 'application/json',
  }),
};
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
    return this.http.post<any>(this.url + 'register', user, httpOptions)
    .pipe(
      catchError(this.handleError),
    );
  }

  public login(user: User): Observable<User> {
    this.authSub.next(true);
    return this.http.post<any>(this.url + 'login_check', user, httpOptions)
    .pipe(
      catchError(this.handleError),
    );
  }

  public logout(): void {
    this.authSub.next(false);
    localStorage.clear();
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getDecodedToken(token: string): any {
    try {
        return jwt_decode(token);
    } catch (Error) {
        return 'Decode error';
    }
  }

  public isAuthenticated(): boolean {
    if (this.getToken()) {
      const token = this.getToken();
      if (this.jwtHelper.isTokenExpired(token)) {
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
