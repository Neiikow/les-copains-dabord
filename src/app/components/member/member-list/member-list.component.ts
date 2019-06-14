import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/class/member';
import { MemberService } from 'src/app/services/member.services';

@Component({
  selector: 'app-member-list',
  styleUrls: ['./member-list.component.css'],
  templateUrl: './member-list.component.html',
})
export class MemberListComponent implements OnInit {
  private members: Member[];

  constructor(
    private memberService: MemberService) { }

  public ngOnInit(): void {
    this.getMembers();
  }

  public getMembers(): void {
    this.memberService.getMembers()
      .subscribe(members => this.members = members);
  }
}
