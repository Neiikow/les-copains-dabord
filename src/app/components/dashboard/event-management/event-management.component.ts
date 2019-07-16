import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/class/event';
import { AuthService } from 'src/app/services/auth.service';
import { DataFormatService } from 'src/app/services/data-format.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-management',
  styleUrls: ['./event-management.component.css'],
  templateUrl: './event-management.component.html',
})
export class EventManagementComponent implements OnInit {
  public events: Event[];
  public pagin: any;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private formatService: DataFormatService) { }

  public ngOnInit(): void {
    this.getEvents(1, 10);
  }
  public getOptions(options: any): void {
    this.getEvents(options.currentPage, options.pageSize);
  }
  private getEvents(currentPage: number, pageSize: number): void {
    this.eventService.getEvents(currentPage, pageSize)
      .subscribe(data => {
        const events = data.events;
        this.pagin = data.options;
        events.forEach(event => {
          event.createDate = this.formatService.frenchDate(event['create_date']);
        });
        this.events = events;
      });
  }
  private delete(event: Event): void {
    if (this.authService.isAuthenticated()) {
      this.eventService.deleteEvent(event.id).subscribe(
        next => this.getEvents(this.pagin.currentPage, this.pagin.pageSize),
      );
    }
  }
}
