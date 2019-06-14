import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiMcService {
  private url = 'http://localhost:8888/les-copains-dabord/api/public/index.php/apimc/';

  constructor(private http: HttpClient) { }

  public getStatus(): Observable<string> {
    return this.http.request('GET', this.url + 'status', {responseType: 'text'});
  }
  public getVersion(): Observable<string> {
    return this.http.request('GET', this.url + 'version', {responseType: 'text'});
  }
  public getTotal(): Observable<string> {
    return this.http.request('GET', this.url + 'total', {responseType: 'text'});
  }
  public getOnlineMembers(): Observable<object> {
    return this.http.request('GET', this.url + 'playerlist', {responseType: 'json'});
  }
}
