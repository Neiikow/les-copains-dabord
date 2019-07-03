import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/class/event';
import { EventSubscribers } from 'src/app/class/eventSubscribers';
import { EventService } from 'src/app/services/event.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-event-view',
  styleUrls: ['./event-view.component.css'],
  templateUrl: './event-view.component.html',
})
export class EventViewComponent implements OnInit {
  private event: Event;
  private subscribers: EventSubscribers;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private location: Location,
    private authService: AuthService) { }

  public ngOnInit(): void {
    this.route.params.subscribe((param: {id: number}) => this.getEvent(param.id));
  }
  private getEvent(id: number): void {
    this.eventService.getEventById(id)
      .subscribe(event => {
        this.event = event;
        this.getSubscribers();
      });
  }
  private getSubscribers(): void {
    this.eventService.getSubscribers(this.event.id)
      .subscribe(subs => this.subscribers = subs);
  }
  private subscribe(): void {
    const payload = this.authService.getDecodedToken();
    this.eventService.subscribe(this.event.id, payload.id).subscribe(n => this.getSubscribers());
  }
  private delete(event: Event): void {
    this.eventService.deleteEvent(event.id).subscribe();
    this.location.back();
  }
  private goBack(): void {
    this.location.back();
  }
}
