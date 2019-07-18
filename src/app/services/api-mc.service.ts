import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiMcService {
  private url = 'http://localhost:8888/les-copains-dabord/api/public/apimc/';

  constructor(private http: HttpClient) { }

  public getStatus(): Observable<any> {
    return this.http.request('GET', this.url + 'status');
  }
  public getVersion(): Observable<any> {
    return this.http.request('GET', this.url + 'version');
  }
  public getTotal(): Observable<any> {
    return this.http.request('GET', this.url + 'total');
  }
  public getOnlinePlayers(currentPage: number, pageSize: number): Observable<any> {
    const pageOptions = {
      currentPage,
      pageSize,
    };
    return this.http.post<any>(this.url + 'playerlist', pageOptions);
  }
}
