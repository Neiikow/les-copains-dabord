import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:8888/les-copains-dabord/api/public/api/users/';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.url + 'view/' + id);
  }
  public deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.url + 'delete/' + id);
  }
}
