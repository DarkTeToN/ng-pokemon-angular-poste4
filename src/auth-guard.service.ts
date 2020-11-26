import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './app/auth.service';

@Injectable()

export class AuthGuardService implements CanActivate {

constructor(private _authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
       if (this._authService.isLoggedIn) return true;
       this._authService.redirectUrl = state.url;
       this.router.navigate(['/login']);
       return false;
    }

}