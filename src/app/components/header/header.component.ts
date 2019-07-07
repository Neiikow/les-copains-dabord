import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  public logout(): void {
    this.authService.logout();
  }
  public haveRoles(role: string): boolean {
    if (this.authService.haveRoles(role)) {
      return true;
    }
  }
  public isAuth(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
  }
}
