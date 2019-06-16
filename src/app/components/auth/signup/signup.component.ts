import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from 'src/app/class/member';
import { MemberService } from 'src/app/services/member.services';

@Component({
  selector: 'app-signup',
  styleUrls: ['./signup.component.css'],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  private dataForm: any;

  constructor(
    private memberService: MemberService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  public ngOnInit(): void {
    this.initForm();
  }
  private onSubmit(formData: Member): void {
    this.memberService.addMember(formData).subscribe(e => this.router.navigate(['/profil']));
  }
  private initForm(): void {
    this.dataForm = this.formBuilder.group({
      discord: '',
      email: '',
      id: '',
      name: '',
      password: '',
      passwordConf: '',
      picture: '',
      role: 'membre',
    });
  }
}
