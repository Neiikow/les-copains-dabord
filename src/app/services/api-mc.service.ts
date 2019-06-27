import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://localhost:8888',
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ApiMcService {
  private url = 'http://localhost:8888/les-copains-dabord/api/public/apimc/';

  constructor(private http: HttpClient) { }

  public getStatus(): Observable<Object> {
    const request = this.http.request('GET', this.url + 'status', httpOptions);
    return request;
  }
  public getVersion(): Observable<Object> {
    const request = this.http.request('GET', this.url + 'version', httpOptions);
    return request;
  }
  public getTotal(): Observable<Object> {
    const request = this.http.request('GET', this.url + 'total', httpOptions);
    return request;
  }
  public getOnlinePlayers(): Observable<object> {
    return this.http.request('GET', this.url + 'playerlist', httpOptions);
  }
}
