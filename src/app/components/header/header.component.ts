import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private id: number;

  constructor(private authService: AuthService) {}

  public logout(): void {
    this.id = null;
    this.authService.logout();
  }
  public haveRoles(role: string): boolean {
    if (this.authService.haveRoles(role)) {
      return true;
    }
  }
  public isAuth(): boolean {
    if (this.authService.isAuthenticated()) {
      const payload = this.authService.getDecodedToken();
      this.id = payload.id;
      return true;
    }
  }
}
