import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-page-login',
  styleUrls: ['./page-login.component.css'],
  templateUrl: './page-login.component.html',
})
export class PageLoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public router: Router) {}

  public ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/profil']);
      return;
    }
  }
}
