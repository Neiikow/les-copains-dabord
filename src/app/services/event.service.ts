import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../class/event';
import { EventSubscribe } from '../class/eventSubscribe';
import { EventSubscribers } from '../class/eventSubscribers';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private url = 'https://neiikow.fr/api/public/api/events';

  constructor(private http: HttpClient) { }

  public getEvents(currentPage: number, pageSize: number): Observable<any> {
    const pageOptions = {
      currentPage,
      pageSize,
    };
    return this.http.post<any>(this.url, pageOptions);
  }
  public getEventsByStatus(status: string, currentPage: number, pageSize: number): Observable<any> {
    const pageOptions = {
      currentPage,
      pageSize,
    };
    return this.http.post<any>(this.url + '/show/' + status, pageOptions);
  }
  public getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(this.url + '/view/' + id);
  }
  public addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.url + '/new', event);
  }
  public editEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.url + '/edit/' + event.id, event);
  }
  public deleteEvent(id: number): Observable<Event> {
    return this.http.delete<Event>(this.url + '/delete/' + id);
  }
  public getSubscribers(id: number): Observable<EventSubscribers> {
    return this.http.get<EventSubscribers>(this.url + '/subscribers/' + id);
  }
  public subscribe(eventId: number, userId: number): Observable<any> {
    const subscriber = new EventSubscribe();
    subscriber['event_id'] = eventId;
    subscriber['user_id'] = userId;
    return this.http.post<any>(this.url + '/subscribe', subscriber);
  }
}
