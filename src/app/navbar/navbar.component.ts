import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isHomePage(): boolean {
    return this.router.url === '/' || this.router.url === '/login' || this.router.url === '/signup';
  }

  entrar() {
    this.router.navigate(['login']);
  }

  sair() {
    alert("User logged out")
    this.authService.logout();
  }
}
