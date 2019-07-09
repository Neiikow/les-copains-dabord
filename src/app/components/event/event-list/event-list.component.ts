import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/class/event';
import { AuthService } from 'src/app/services/auth.service';
import { DataFormatService } from 'src/app/services/data-format.service';
import { EventService } from 'src/app/services/event.service';
import { PaginationService } from 'src/app/services/pagination.service';

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
    private paginService: PaginationService,
    private formatService: DataFormatService) { }

  public ngOnInit(): void {
    this.getEvents();
  }
  public isAuth(role: string): boolean {
    if (this.authService.haveRoles(role)) {
      return true;
    }
  }
  private getEvents(): void {
    const status = this.route.snapshot.data['status'];
    this.eventService.getEventsByStatus(status)
      .subscribe(events => {
        events.forEach(event => {
          const date = event.date + ' ' + event.time;
          event.date = this.formatService.frenchDate(date);
        });
        this.events = events;
        this.setPage(1, 5);
      });
  }
  private setPage(page: number, pageSize: number): void {
    this.pagin = this.paginService.getPager(this.events.length, page, pageSize);
    this.pageItems = this.events.slice(this.pagin.startIndex, this.pagin.endIndex + 1);
  }
}
