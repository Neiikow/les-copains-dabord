import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private dataForm: FormGroup;
  private submitted = false;
  private error = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  public ngOnInit(): void {
    this.initForm();
  }
  private onSubmit(formData: User): void {
    this.submitted = true;
    if (this.dataForm.invalid) {
      return;
    }

    this.userService.getUser(formData).subscribe(
      (next) => {
        console.log(next);
      },
      (error) => {
        this.error = error;
      },
    );
  }
  private initForm(): void {
    this.dataForm = this.formBuilder.group({
      password: ['', Validators.required],
      username: ['', Validators.required],
    });
  }
  public get f(): any { return this.dataForm.controls; }
}
