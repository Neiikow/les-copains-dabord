import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user';
import { Roles } from 'src/app/enum/roles.enum';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-member-management',
  styleUrls: ['./member-management.component.css'],
  templateUrl: './member-management.component.html',
})
export class MemberManagementComponent implements OnInit {
  private users: User[];
  private roles = Roles;

  constructor(
    private userService: UserService,
    private authService: AuthService) { }

  public ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }
  private delete(user: User): void {
    if (this.authService.isAuthenticated()) {
      this.userService.deleteUser(user.id).subscribe();
      this.getUsers();
    }
  }
}
