import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private dataForm: any;

  constructor(
    private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.initForm();
  }
  private initForm(): void {
    this.dataForm = this.formBuilder.group({
      discord: '',
      email: '',
      id: '',
      password: '',
      picture: '',
      roles: ['ROLE_USER'],
      username: '',
    });
  }
}
