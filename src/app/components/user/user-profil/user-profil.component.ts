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
    this.authService.edit(formData).subscribe(
      (next) => {
        //this.edited = next;
      },
      (error) => {
        this.error = error;
      },
    );
  }
  private initForm(data?: User): void {
    this.dataForm = this.formBuilder.group({
      discord: [data.discord ? data.discord : null, [Validators.min(1000), Validators.max(9999)]],
      email: [data.email, Validators.email],
      password: ['', Validators.minLength(4)],
      passwordConf: '',
      passwordOld: ['', Validators.minLength(4)],
      picture: data.picture,
      roles: Roles[data.roles[data.roles.length - 1]],
      username: data.username,
    }, {
      validator: this.formValidator.confirmMatch('password', 'passwordConf'),
    });
  }
  public get f(): any { return this.dataForm.controls; }
}
