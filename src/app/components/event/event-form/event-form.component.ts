import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  private submitted = false;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location) {}

  public ngOnInit(): void {
    this.initParam();
  }
  private onSubmit(formData: Event): void {
    this.submitted = true;
    if (this.dataForm.invalid) {
      return;
    }

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
      id: this.edit ? data.id : null,
      title: [this.edit ? data.title : null, Validators.required],
      content: [this.edit ? data.content : null, Validators.required],
      support: [this.edit ? data.support : null, Validators.required],
      status: [this.edit ? data.status : 'active'],
      author: [this.edit ? data.author : null],
      date: [this.edit ? data.date : null, Validators.required],
      time: [this.edit ? data.time : null, Validators.required],
    });
    this.event = this.dataForm.value;
  }
  public get f(): any { return this.dataForm.controls; }
}
