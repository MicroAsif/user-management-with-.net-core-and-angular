import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate  {

  constructor(public authService: AuthService, public router: Router) { }
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}