import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RolesGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    const roles = route.data.roles;
    const decodedToken = this.authService.getDecodedToken();

    if (!this.authService.isAuthenticated() || !decodedToken.roles.find((value: string) => value === roles)) {
      this.router.navigate(['/acces-refuse']);
      return false;
    }
    return true;
  }
}
