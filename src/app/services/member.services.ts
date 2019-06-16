import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../class/member';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://localhost:8888',
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private url = 'http://localhost:8888/les-copains-dabord/api/public/members/';

  constructor(private http: HttpClient) { }

  public getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.url);
  }
  public addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.url + 'new', member, httpOptions);
  }
}
