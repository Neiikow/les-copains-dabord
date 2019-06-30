import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      if (this.authService.isAuthenticated()) {
        return true;
      } else {
        this.router.navigate(['/utilisateur-inconnu']);
        return false;
      }
  }
}
/*
header ->
{
  public obs$: Observable<boolean>;

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.obs$ = this.authService.onAuth();
  }
  public logout(): void {
    this.authService.logout();
  }
}
*ngIf="(obs$ | async)" (click)="logout()"
*ngIf="!(obs$ | async)"
*/