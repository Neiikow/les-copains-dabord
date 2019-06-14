import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../class/event';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://localhost:8888',
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root',
})
export class EventService {
  private url = 'http://localhost:8888/les-copains-dabord/api/public/events/';

  constructor(private http: HttpClient) { }

  public getEventsByStatus(status: string): Observable<Event[]> {
    return this.http.get<Event[]>(this.url + status);
  }
  public getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(this.url + 'view/' + id);
  }
  public addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.url + 'new', event, httpOptions);
  }
  public editEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.url + 'edit/' + event.id, event, httpOptions);
  }
  public deleteEvent(id: number): Observable<Event> {
    return this.http.delete<Event>(this.url + 'delete/' + id, httpOptions);
  }
}
