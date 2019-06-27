import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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
export class UserService {
  private url = 'http://localhost:8888/les-copains-dabord/api/public/api/';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'users', httpOptions);
  }
  public getUser(user: User): Observable<User> {
    return this.http.post<any>(this.url + 'login_check', user, httpOptions)
    .pipe(
      catchError(this.handleError),
    );
  }
  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.url + 'users/view/' + id, httpOptions);
  }
  public addUser(user: User): Observable<User> {
    return this.http.post<any>(this.url + 'register', user, httpOptions)
    .pipe(
      catchError( this.handleError),
    );
  }
  private handleError(error: HttpErrorResponse): any {
    const errorMsg = error.error.message;
    return throwError(errorMsg);
  }
}
