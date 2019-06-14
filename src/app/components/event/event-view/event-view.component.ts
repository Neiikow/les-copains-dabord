import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/class/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-view',
  styleUrls: ['./event-view.component.css'],
  templateUrl: './event-view.component.html',
})
export class EventViewComponent implements OnInit {
  private event: Event;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private location: Location) { }

  public ngOnInit(): void {
    this.route.params.subscribe((param: {id: number}) => this.getEvent(param.id));
  }
  private getEvent(id: number): void {
    this.eventService.getEventById(id)
      .subscribe(event => this.event = event);
  }
  private delete(event: Event): void {
    this.eventService.deleteEvent(event.id).subscribe();
    this.location.back();
  }
  private goBack(): void {
    this.location.back();
  }
}
