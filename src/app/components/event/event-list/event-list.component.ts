import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/class/event';
import { AuthService } from 'src/app/services/auth.service';
import { DataFormatService } from 'src/app/services/data-format.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-list',
  styleUrls: ['./event-list.component.css'],
  templateUrl: './event-list.component.html',
})
export class EventListComponent implements OnInit {
  public events: Event[];
  public pageItems: any;
  public pagin: any;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private formatService: DataFormatService) { }

  public ngOnInit(): void {
    this.getEvents(1, 10);
  }
  public isAuth(role: string): boolean {
    if (this.authService.haveRoles(role)) {
      return true;
    }
  }
  public getOptions(options: any): void {
    this.getEvents(options.currentPage, options.pageSize);
  }
  private getEvents(currentPage: number, pageSize: number): void {
    const status = this.route.snapshot.data['status'];
    this.eventService.getEventsByStatus(status, currentPage, pageSize)
      .subscribe(data => {
        if (data.events) {
          this.pagin = data.options;
          data.events.forEach(event => {
            event.createDate = this.formatService.frenchDate(event['create_date']);
            const date = event.date + ' ' + event.time;
            event.date = this.formatService.calendarDate(date);
            event.content = this.formatService.removeTags(event.content);
          });
          this.events = data.events;
        }
      });
  }
}
