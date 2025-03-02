import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [AuthService], // Add this to ensure the service is provided
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() layout: string = 'user';

  isAuthenticated = false;
  userName: string = '';
  darkMode = false;

  private authService = inject(AuthService);

  ngOnInit(): void {
    // Add null safety checks
    if (typeof window !== 'undefined') {
      // Safe check for authentication status
      try {
        this.isAuthenticated = this.authService?.isAuthnticated() || false;
        const user = this.authService?.getUserData();
        this.userName = user?.name || '';

        // Only subscribe if service exists
        this.authService?.currentUser$?.subscribe(user => {
          this.isAuthenticated = !!user;
          this.userName = user?.name || '';
        });
      } catch (error) {
        console.error('Auth service error:', error);
      }
    }
  }

  checkAuthStatus(): void {
    try {
      // Add null safety checks
      this.isAuthenticated = this.authService?.isAuthnticated() || false;
      const user = this.authService?.getUserData();
      this.userName = user?.name || '';
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  }

  logout(): void {
    try {
      this.authService?.logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', this.darkMode);
    }
  }
}
