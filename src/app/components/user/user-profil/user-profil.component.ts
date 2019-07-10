import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/class/user';
import { Roles } from 'src/app/enum/roles.enum';
import { AuthService } from 'src/app/services/auth.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-user-profil',
  styleUrls: ['./user-profil.component.css'],
  templateUrl: './user-profil.component.html',
})
export class UserProfilComponent implements OnInit {
  public roles = [];
  public submitted = false;
  public error: string;
  public edited: string;
  public user: User;
  private dataForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private formValidator: FormValidatorService) { }

  public ngOnInit(): void {
    for (const [key, value] of Object.entries(Roles)) {
      this.roles.push({key, value});
    }
    this.route.params.subscribe(
      (param: {id: number}) => this.userService.getUserById(param.id)
      .subscribe(
        (user: User) => {
          const payload = this.authService.getDecodedToken();
          if (payload.roles[0] !== 'ROLE_ADMIN') {
            user.roles[0] = Roles[user.roles[0]];
          }
          this.user = user;
          this.initForm(user);
    }));
  }
  public haveRoles(role: string): boolean {
    if (this.authService.haveRoles(role)) {
      return true;
    }
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
          },
          (error) => {
            this.error = error;
            this.intervalError();
          },
        );
      } else {
        this.error = "Veuillez renseigner l'ancien et le nouveau mot de passe";
        this.intervalError();
      }
    } else {
      this.edit(formData);
    }
  }
  private edit(formData: User): void {
    this.dataForm.value.roles = [this.dataForm.value.roles];
    this.authService.edit(formData).subscribe(
      (next) => {
        this.edited = String(next);
        this.intervalSuccess();
      },
      (error) => {
        this.error = error;
        this.intervalError();
      },
    );
  }
  private initForm(data?: User): void {
    this.dataForm = this.formBuilder.group({
      discord: [
        data.discord,
        [Validators.minLength(4), Validators.maxLength(4), this.formValidator.confirmDiscord],
      ],
      email: [data.email, Validators.email],
      id: data.id,
      password: ['', Validators.minLength(4)],
      passwordConf: '',
      passwordOld: ['', Validators.minLength(4)],
      picture: data.picture,
      roles: data.roles[0],
      username: [data.username, Validators.required],
    }, {
      validator: this.formValidator.confirmMatch('password', 'passwordConf'),
    });
  }
  public get f(): any { return this.dataForm.controls; }
  private intervalError(): void {
    setTimeout(
      () => {
        this.error = '';
        clearInterval();
      }, 3000,
    );
  }
  private intervalSuccess(): void {
    setTimeout(
      () => {
        this.edited = null;
        clearInterval();
      }, 3000,
    );
  }
}
