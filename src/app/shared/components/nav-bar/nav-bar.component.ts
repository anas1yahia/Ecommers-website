import { CardService } from './../../../features/product/services/card.service';
import { Component, Input, OnInit, OnDestroy, inject, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [AuthService],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  @Input() layout: string = 'user';

  isAuthenticated = false;
  userName: string = '';
  darkMode = false;

  cartItemCount: number = 0;
  showMobileMenu: boolean = false;
  showMobileSearch: boolean = false;
  userEmail: string = 'user@example.com';

  private authService = inject(AuthService);
  private isBrowser: boolean;
$index: any;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  private readonly cartService = inject(CardService)
  private readonly id = inject(PLATFORM_ID)

 ngOnInit(): void {
    // Check authentication only in browser environment
    if (this.isBrowser) {
      try {
        this.isAuthenticated = this.authService?.isAuthnticated() || false;
        const user = this.authService?.getUserData();
        this.userName = user?.name || '';

        // Only subscribe if service exists
        this.authService?.currentUser$?.subscribe(user => {
          this.isAuthenticated = !!user;
          this.userName = user?.name || '';
        });

        // Add event listener only in browser
        window.addEventListener('scroll', this.handleScroll);
      } catch (error) {
        console.error('Auth service error:', error);
      }
    }

    this.cartService.counter.subscribe({
      next: (count) => {
        this.cartItemCount = count
      }
    })
    if (typeof localStorage !== 'undefined') {
      this.cartService.getLoggedUserCart().subscribe({
        next: (count) => {
          this.cartService.counter.next(count.numOfCartItems)
        }
      });
    }

  }


  closeMobileMenu() {
    this.showMobileMenu = false;
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  toggleMobileSearch() {
    this.showMobileSearch = !this.showMobileSearch;
  }

  handleScroll = () => {
    if (!this.isBrowser) return;

    const nav = document.getElementById('main-nav');
    if (nav) {
      if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    }
  }



  ngOnDestroy() {
    // Remove event listener only in browser
    if (this.isBrowser) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  checkAuthStatus(): void {
    try {
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
    if (this.isBrowser) {
      document.documentElement.classList.toggle('dark', this.darkMode);

      localStorage.setItem('darkMode', this.darkMode ? 'true' : 'false');
    }
  }
}
