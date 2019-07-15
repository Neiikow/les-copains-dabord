import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user';
import { Roles } from 'src/app/enum/roles.enum';
import { AuthService } from 'src/app/services/auth.service';
import { DataFormatService } from 'src/app/services/data-format.service';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-member-management',
  styleUrls: ['./member-management.component.css'],
  templateUrl: './member-management.component.html',
})
export class MemberManagementComponent implements OnInit {
  public users: User[];
  private rolesEnum = Roles;
  private pagin: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private formatService: DataFormatService) { }

  public ngOnInit(): void {
    this.getUsers(1, 10);
  }

  public getUsers(currentPage: number, pageSize: number): void {
    this.userService.getUsers(currentPage, pageSize)
    .subscribe(data => {
      const users = data.users;
      this.pagin = data.options;
      users.forEach(user => {
        user.createDate = this.formatService.frenchDate(user.createDate);
        user.roles = Roles[user.roles[0]];
      });
      this.users = users;
    });
  }
  private delete(user: User): void {
    if (this.authService.isAuthenticated()) {
      this.userService.deleteUser(user.id).subscribe(
        next => this.getUsers(this.pagin.currentPage, this.pagin.pageSize),
      );
    }
  }
}
