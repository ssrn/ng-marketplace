import { Injectable } from '@angular/core';
import {
  CanActivate, CanActivateChild,
  CanLoad, Route, UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, NavigationExtras, Router
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.auth.authenticated) {
      return true;
    }
    console.log('access denied!');
    this.router.navigate(['/login']);
    return false;
  }
}
