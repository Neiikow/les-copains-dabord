import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  private url = 'http://localhost:8888/les-copains-dabord/api/public/api/users/';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url, httpOptions);
  }
  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.url + 'view/' + id, httpOptions);
  }
}
