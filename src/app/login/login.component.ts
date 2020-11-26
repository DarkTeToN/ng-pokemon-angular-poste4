import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  message: string = 'Vous êtes déconnecté. (admin/admin)';
  name: string;
  password: string;

  constructor(public authService: AuthService,
    private router: Router) { }

  setMessage() {
    this.message = this.authService.isLoggedIn ? 'Vous êtes connecté' : 'Identifiant ou mot de passe incorrect';
  }

  login() {
    this.message = 'Tentative de connexion en cours';
    this.authService.login(this.name, this.password).subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : "/pokemon/all";
        this.router.navigate([redirect]);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
