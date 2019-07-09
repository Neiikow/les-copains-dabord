import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/class/event';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-form',
  styleUrls: ['./event-form.component.css'],
  templateUrl: './event-form.component.html',
})
export class EventFormComponent implements OnInit {
  public event: Event;
  private edit = false;
  private dataForm: any;
  private submitted = false;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    public router: Router) {}

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
          .subscribe(event => {
            const payload = this.authService.getDecodedToken();
            if ((event.author !== payload.username) && !this.authService.haveRoles('ROLE_ADMIN')) {
              this.router.navigate(['/acces-refuse']);
              return;
            }
            this.initForm(event);
          });
        this.edit = this.route.snapshot.data['edit'];
      } else {
        this.initForm();
      }
    });
  }
  private initForm(data?: Event): void {
    const payload = this.authService.getDecodedToken();
    const author = payload.username;

    this.dataForm = this.formBuilder.group({
      id: this.edit ? data.id : null,
      title: [this.edit ? data.title : null, Validators.required],
      content: [this.edit ? data.content : null, Validators.required],
      support: [this.edit ? data.support : null, Validators.required],
      status: [this.edit ? data.status : 'active'],
      author: [this.edit ? data.author : author],
      date: [this.edit ? data.date : null, Validators.required],
      time: [this.edit ? data.time : null, Validators.required],
    });
    this.event = this.dataForm.value;
  }
  public get f(): any { return this.dataForm.controls; }
}
