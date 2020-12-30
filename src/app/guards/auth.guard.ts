import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor (private authService: AuthService, private router: Router) {
  }
  canActivate(): boolean {

    if (!this.authService.isAuthentificated()) {
      this.router.navigate([''])
      return false;
    }
    return true;
  }
  canActivateChild(): boolean{
    return this.canActivate();
    return true;
  }
}
