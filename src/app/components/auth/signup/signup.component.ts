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
  private dataForm: FormGroup;
  private submitted = false;
  private error = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private formValidator: FormValidatorService,
    private router: Router) { }

  public ngOnInit(): void {
    this.initForm();
  }
  private onSubmit(formData: User): void {
    this.submitted = true;
    if (this.dataForm.invalid) {
      return;
    }

    this.authService.register(formData).subscribe(
      (next) => {
        this.authService.login(formData).subscribe(
          (next) => {
            const decodedToken = this.authService.getDecodedToken(next.token);
            localStorage.setItem('token', next.token);
            localStorage.setItem('id', decodedToken.id);
            this.router.navigate(['/profil']);
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
