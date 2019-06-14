import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/class/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-form',
  styleUrls: ['./event-form.component.css'],
  templateUrl: './event-form.component.html',
})
export class EventFormComponent implements OnInit {
  private edit = false;
  private dataForm: any;
  private event: Event;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location) {}

  public ngOnInit(): void {
    this.initParam();
  }
  private onSubmit(formData: Event): void {
    if (this.edit) {
      this.eventService.editEvent(formData).subscribe(e => this.location.back());
    } else {
      this.eventService.addEvent(formData).subscribe(e => this.location.back());
    }
  }
  private initParam(): void {
    this.route.params.subscribe((param: {id: number}) => {
      if (param.id) {
        this.eventService.getEventById(param.id)
          .subscribe(article => {
            this.initForm(article);
          });
        this.edit = this.route.snapshot.data['edit'];
      } else {
        this.initForm();
      }
    });
  }
  private initForm(data?: Event): void {
    this.dataForm = this.formBuilder.group({
      id: [this.edit ? data.id : null],
      title: [this.edit ? data.title : null],
      content: [this.edit ? data.content : null],
      support: [this.edit ? data.support : null],
      status: [this.edit ? data.status : 'active'],
      author: [this.edit ? data.author : null],
      date: [this.edit ? data.date : null],
      time: [this.edit ? data.time : null],
    });
    this.event = this.dataForm.value;
  }
}
