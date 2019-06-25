import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private dataForm: FormGroup;
  private submitted = false;

  constructor(
    private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.initForm();
  }
  private onSubmit(formData: User): void {
    this.submitted = true;
    if (this.dataForm.invalid) {
      return;
    }

    alert('Bon retour ' + this.dataForm.value.username + ' !');
    //this.userService.addUser(formData).subscribe(e => this.router.navigate(['/profil']));
  }
  private initForm(): void {
    this.dataForm = this.formBuilder.group({
      password: ['', Validators.required],
      username: ['', Validators.required],
    });
  }
  public get f(): any { return this.dataForm.controls; }
}
