import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../class/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://localhost:8888',
// tslint:disable-next-line: max-line-length
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjEzODQ4MzIsImV4cCI6MTU2MjU5NDQzMiwicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJ1c2VybmFtZSI6ImFkbWluIiwiaXAiOjY1LCJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSIsImRpc2NvcmQiOm51bGwsInBpY3R1cmUiOm51bGx9.SVUyynJk-jRvlGWpCu-rBwG0idd4hPKLpqQHpi-_ZMw6uvzUyDr0r_zM7tD-_knzv3h8svc6G0Rf_lFlmZHcE9-7fasvlAgyfJscFXbOI8xWHWeg2rNJtt2htud0-K4do0XhWpiWwJZbJg94PBEwLdR4yDZR5nsJBEamvVGRvVJsTXLi7vm_27jqOcm7xp4Sv1Udb9LfOKOWMs9PeGJrijNPszG17dlbjCoFp-G9s5VZedGJLXeE2LIJJTALX2q8Bm0RBjbYpHNp92t0lNCaMl7bs2IX4hCjJFFp1dTgPXdnwsAXm8kgNRDIZlgt6hdbX8EtmQDL6kLG6HdIHrnNka041qtDZo0VDWko1Jl5XGU4sQBPBuzHnuO_6ewAarbi9uNa7FhNs_0_hqKuk9TnwoKeUU1wrh2-zYOZAO4e1CFJg93URoqjNssne7XSVYk_VdBYdW6KTX84_wil0B8b97Uf0l5OWKWWr2c3PKScOuMQVbtI9SVcSAgDeifLJT7q-JIqQE3Zn1Qjx6kkxkA2NVjcC2lQl-Xmn4hxBZEQIyMjJkR2Zwe2vA0B0lIOlPRgJ0p4uv1sWmlhx_TtplwhQ6mGgQmL8I6IsxLBoJjQ5TzR8wV60ForeEMxZodVsE_BTKtepOJJwpDdanoTrs9p2yZGJMKER63X74Vsk_OFczg',
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:8888/les-copains-dabord/api/public/api/users/';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url, httpOptions);
  }
  public addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + 'register', user, httpOptions)
    .pipe(
      catchError(this.handleError),
    );
  }
  private handleError(error: HttpErrorResponse): any {
    const errorMsg = error.error.errors.message;
    return throwError(errorMsg);
  }
}
