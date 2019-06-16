import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private dataForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router) { }

  public ngOnInit(): void {
    this.initForm();
  }
  private initForm(): void {
    this.dataForm = this.formBuilder.group({
      discord: '',
      email: '',
      id: '',
      name: '',
      password: '',
      picture: '',
      role: 'membre',
    });
  }
}
