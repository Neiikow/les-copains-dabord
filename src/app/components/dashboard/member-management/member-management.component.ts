import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-member-management',
  styleUrls: ['./member-management.component.css'],
  templateUrl: './member-management.component.html',
})
export class MemberManagementComponent implements OnInit {
  private users: User[];

  constructor(
    private userService: UserService) { }

  public ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }
}
