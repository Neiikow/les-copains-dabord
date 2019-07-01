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
  private users: User[];
  private roles = Roles;

  constructor(
    private userService: UserService) { }

  public ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
        users.forEach(user => {
          this.setLastRole(user.roles);
        });
        this.users = users;
      });
  }
  private setLastRole(roles): void {
    
  }
}
