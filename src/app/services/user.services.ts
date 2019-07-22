import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:8888/les-copains-dabord/api/public/api/users';

  constructor(private http: HttpClient) { }

  public getUsers(currentPage: number, pageSize: number): Observable<any> {
    const pageOptions = {
      currentPage,
      pageSize,
    };
    return this.http.post<any>(this.url, pageOptions);
  }
  public getUserById(id: number): Observable<any> {
    return this.http.get<any>(this.url + '/view/' + id)
    .pipe(
      catchError(this.handleError),
    );
  }
  public deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/delete/' + id)
    .pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse): any {
    const errorMsg = error.error.message;
    return throwError(errorMsg);
  }
}
