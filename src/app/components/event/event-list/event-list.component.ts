import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/class/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-list',
  styleUrls: ['./event-list.component.css'],
  templateUrl: './event-list.component.html',
})
export class EventListComponent implements OnInit {
  private events: Event[];

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.getEvents();
  }

  private getEvents(): void {
    const status = this.route.snapshot.data['status'];
    this.eventService.getEventsByStatus(status)
      .subscribe(events => this.events = events);
  }
}
