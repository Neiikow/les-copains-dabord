import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiMcService {
  private url = 'http://localhost:8888/les-copains-dabord/api/public/apimc/';

  constructor(private http: HttpClient) { }

  public getStatus(): Observable<Object> {
    const request = this.http.request('GET', this.url + 'status');
    return request;
  }
  public getVersion(): Observable<Object> {
    const request = this.http.request('GET', this.url + 'version');
    return request;
  }
  public getTotal(): Observable<Object> {
    const request = this.http.request('GET', this.url + 'total');
    return request;
  }
  public getOnlinePlayers(): Observable<object> {
    return this.http.request('GET', this.url + 'playerlist');
  }
}
