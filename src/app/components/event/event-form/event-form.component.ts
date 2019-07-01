import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/class/event';
import { EventService } from 'src/app/services/event.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';

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
    private authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formValidator: FormValidatorService,
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
    const payload = this.authService.getDecodedToken(this.authService.getToken());
    const author = payload.username;
    const date = this.formValidator.getDate();

    this.dataForm = this.formBuilder.group({
      id: this.edit ? data.id : null,
      title: [this.edit ? data.title : null, Validators.required],
      content: [this.edit ? data.content : null, Validators.required],
      support: [this.edit ? data.support : null, Validators.required],
      status: [this.edit ? data.status : 'active'],
      author: [this.edit ? data.author : author],
      date: [this.edit ? data.date : null, Validators.required],
      time: [this.edit ? data.time : null, Validators.required],
      create_date: [this.edit ? data.createDate : date],
    });
    this.event = this.dataForm.value;
  }
  public get f(): any { return this.dataForm.controls; }
}
