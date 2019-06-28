import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-user-profil',
  styleUrls: ['./user-profil.component.css'],
  templateUrl: './user-profil.component.html',
})
export class UserProfilComponent implements OnInit {
  private dataForm: FormGroup;
  private submitted = false;
  private error = false;
  private user: User;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private formValidator: FormValidatorService,
    private router: Router) { }

  public ngOnInit(): void {
    this.userService.getUserById(Number(localStorage.getItem('id')))
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
    this.userService.editUser(formData).subscribe();
  }
  private initForm(data?: User): void {
    this.dataForm = this.formBuilder.group({
      discord: [data.discord, [Validators.min(1000), Validators.max(9999)]],
      email: [data.email, Validators.email],
      password: ['', Validators.minLength(4)],
      passwordConf: '',
      passwordOld: ['', Validators.minLength(4)],
      picture: data.picture,
      roles: this.formBuilder.array(data.roles),
      username: data.username,
    }, {
      validator: this.formValidator.confirmMatch('password', 'passwordConf'),
    });
  }
  public get f(): any { return this.dataForm.controls; }
}
