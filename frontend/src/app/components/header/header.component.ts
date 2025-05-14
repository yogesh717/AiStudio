import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


    constructor(public authService: AuthService, private router: Router) {}

    logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
    }

    isLoggedIn() {
      return this.authService.isLoggedIn();
    }
  }

