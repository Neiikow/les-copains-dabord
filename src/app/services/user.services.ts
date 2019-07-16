import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'https://neiikow.fr/api/public/api/users';

  constructor(private http: HttpClient) { }

  public getUsers(currentPage: number, pageSize: number): Observable<any> {
    const pageOptions = {
      currentPage,
      pageSize,
    };
    return this.http.post<any>(this.url, pageOptions);
  }
  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.url + '/view/' + id);
  }
  public deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.url + '/delete/' + id);
  }
}
