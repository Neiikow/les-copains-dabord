import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/class/user';
import { Roles } from 'src/app/enum/roles.enum';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { UserService } from 'src/app/services/user.services';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profil',
  styleUrls: ['./user-profil.component.css'],
  templateUrl: './user-profil.component.html',
})
export class UserProfilComponent implements OnInit {
  private dataForm: FormGroup;
  private submitted = false;
  private error = false;
  private edited = false;
  private user: User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private formValidator: FormValidatorService) { }

  public ngOnInit(): void {
    const payload = this.authService.getDecodedToken();
    const id = payload.id;
    this.userService.getUserById(id)
      .subscribe((user: User) => {
        this.user = user;
        this.initForm(user);
    });
  }
  private onSubmit(formData: User): void {
    this.submitted = true;
    if (this.dataForm.invalid) {
      return ;
    }
    if (this.dataForm.value.password || this.dataForm.value.passwordOld) {
      if (this.dataForm.value.password && this.dataForm.value.passwordOld) {
        const passwordNew = this.dataForm.value.password;
        const passwordOld = this.dataForm.value.passwordOld;

        formData.password = passwordOld;
        this.authService.passwordOldMatch(formData).subscribe(
          (next) => {
            formData.password = passwordNew;
            this.edit(formData);
            return;
          },
          (error) => {
            this.error = error;
            return;
          },
        );
      } else {
        this.error = true;
        return;
      }
    } else {
      this.edit(formData);
    }
  }
  private edit(formData): void {
    this.authService.edit(formData).subscribe(
      (next) => {
        this.edited = next;
      },
      (error) => {
        this.error = error;
      },
    );
  }
  private initForm(data?: User): void {
    this.dataForm = this.formBuilder.group({
      id: data.id,
      discord: [data.discord, Validators.maxLength(4)],
      email: [data.email, Validators.email],
      password: ['', Validators.minLength(4)],
      passwordConf: '',
      passwordOld: ['', Validators.minLength(4)],
      picture: data.picture,
      roles: this.formBuilder.array([Roles[data.roles[data.roles.length - 1]]]),
      username: [data.username, Validators.required],
    }, {
      validator: this.formValidator.confirmMatch('password', 'passwordConf'),
    });
  }
  public get f(): any { return this.dataForm.controls; }
}
