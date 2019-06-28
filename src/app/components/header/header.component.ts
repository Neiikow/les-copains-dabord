import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html',
})
export class HeaderComponent { 
  public obs$: Observable<boolean>;

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.obs$ = this.authService.onAuth();
  }
  public logout(): void {
    this.authService.logout();
  }
}
