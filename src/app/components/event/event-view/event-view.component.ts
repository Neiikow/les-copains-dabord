import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/class/event';
import { EventSubscribers } from 'src/app/class/eventSubscribers';
import { EventService } from 'src/app/services/event.service';
import { AuthService } from 'src/app/services/auth.service';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-event-view',
  styleUrls: ['./event-view.component.css'],
  templateUrl: './event-view.component.html',
})
export class EventViewComponent implements OnInit {
  private event: Event;
  private subscribers: EventSubscribers;
  private isSub = false;

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
      .subscribe(subs => {
        const keys = Object.keys(subs);
        const payload = this.authService.getDecodedToken();
        if (keys.length > 0) {
          this.subscribers = subs;
          for (let i = 0; i < keys.length; i++) {
            if (subs[i].id === payload.id) {
                this.isSub = true;
            }
          }
        }
      });
  }
  private subscribe(): void {
    const payload = this.authService.getDecodedToken();
    this.eventService.subscribe(this.event.id, payload.id).subscribe(n => this.getSubscribers());
  }
  private delete(event: Event): void {
    this.eventService.deleteEvent(event.id).subscribe();
    this.location.back();
  }
  private isAuth(role: string): boolean {
    if (this.authService.haveRoles(role)) {
      return true;
    }
    const payload = this.authService.getDecodedToken();
    if (this.event.author === payload.username) {
      return true;
    }
  }
  private goBack(): void {
    this.location.back();
  }
}
