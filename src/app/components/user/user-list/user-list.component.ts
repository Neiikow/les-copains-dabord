import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user';
import { Roles } from 'src/app/enum/roles.enum';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-user-list',
  styleUrls: ['./user-list.component.css'],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  public users: User[];
  private role: string;
  private pagin: any;

  constructor(
    private userService: UserService) { }

  public ngOnInit(): void {
    this.getUsers(1, 10);
  }

  public getUsers(currentPage: number, pageSize: number): void {
    this.userService.getUsers(currentPage, pageSize)
      .subscribe(data => {
        const users = data.users;
        this.pagin = data.options;
        users.forEach(user => {
          user.roles = [this.setLastRole(user.roles, user)];
        });
        this.users = users;
      });
  }
  private setLastRole(roles: [string], user: User): string {
    const role = user.roles[user.roles.length - 1];
    return Roles[role];
  }
}
