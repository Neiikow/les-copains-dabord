import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public dataForm: FormGroup;
  public id = false;
  public submitted = false;
  public error = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router) { }

  public ngOnInit(): void {
    this.initForm();
  }
  public onSubmit(formData: User): void {
    this.submitted = true;
    if (this.dataForm.invalid) {
      return;
    }

    this.authService.login(formData).subscribe(
      (next) => {
        localStorage.setItem('token', next.token);
        if (this.authService.isAuthenticated()) {
          const payload = this.authService.getDecodedToken();
          this.router.navigate(['/profil/' + payload.id]);
        }
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
