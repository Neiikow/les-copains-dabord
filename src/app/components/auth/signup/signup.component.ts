import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/services/auth.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-signup',
  styleUrls: ['./signup.component.css'],
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  public dataForm: FormGroup;
  public submitted = false;
  public error = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private formValidator: FormValidatorService,
    private router: Router) { }

  public ngOnInit(): void {
    this.initForm();
  }
  public onSubmit(formData: User): void {
    this.submitted = true;
    if (this.dataForm.invalid) {
      return;
    }

    this.authService.register(formData).subscribe(
      (next) => {
        this.authService.login(formData).subscribe(
          (next) => {
            localStorage.setItem('token', next['token']);
            localStorage.setItem('refresh_token', next['refresh_token']);
            if (this.authService.isAuthenticated()) {
              const payload = this.authService.getDecodedToken();
              this.router.navigate(['/profil/' + payload.id]);
            }
          },
          (error) => {
            this.error = error;
          },
        );
      },
      (error) => {
        this.error = error;
      },
    );
  }
  private initForm(): void {
    this.dataForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      passwordConf: ['', Validators.required],
      roles: this.formBuilder.array(['ROLE_USER']),
      username: ['', Validators.required],
    }, {
      validator: this.formValidator.confirmMatch('password', 'passwordConf'),
    });
  }
  public get f(): any { return this.dataForm.controls; }
}
