import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, 
    public router: Router) { }

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const roles = next.firstChild.data['roles'] as Array<string>;
    console.log(roles);

    if (roles) {
      const match = this.authService.roleMatch(roles);
      if (match) {
        return true;
      } else {
        this.router.navigate(['/dashboard']);
        //this.alertify.error("you're not authrozed to access this page!");
      }
    }


    if (!this.authService.loggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}