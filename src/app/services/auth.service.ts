import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authSub = new Subject<boolean>();

  public onAuth(): Observable<boolean> {
    return this.authSub.asObservable();
  }

  public login(): void {
    this.authSub.next(true);
  }

  public logout(): void {
    this.authSub.next(false);
  }
}
