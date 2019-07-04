import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/class/event';
import { EventService } from 'src/app/services/event.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-event-management',
  styleUrls: ['./event-management.component.css'],
  templateUrl: './event-management.component.html',
})
export class EventManagementComponent implements OnInit {
  private events: Event[];

  constructor(
    private eventService: EventService,
    private authService: AuthService) { }

  public ngOnInit(): void {
    this.getEvents();
  }
  private getEvents(): void {
    this.eventService.getEvents()
      .subscribe(events => this.events = events);
  }
  private delete(event: Event): void {
    if (this.authService.isAuthenticated()) {
      this.eventService.deleteEvent(event.id).subscribe(next => {
        this.getEvents();
      });
    }
  }
}
