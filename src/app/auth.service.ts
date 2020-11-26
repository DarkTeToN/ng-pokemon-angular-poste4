import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  redirectUrl: string; // où rediriger l'utilisateur apres authentification

  login(user: string, pass: string): Observable<boolean> {
    let isLoggedIn = (user === 'admin' && pass === 'admin');

    return of(true).pipe(
      delay(1000),
      tap(() => this.isLoggedIn = isLoggedIn)
    );
  }

  logout() {

  }
}
