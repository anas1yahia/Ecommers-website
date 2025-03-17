import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environments } from '../../../../environments/environments.prod';
import { Observable, BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

interface User {
  name: string;
  email: string;
  id: string;
  // Add other user fields as needed
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    // Load user data on initialization
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.currentUserSubject.next(JSON.parse(userData));
      }
    }
  }

  register(data: any): Observable<any> {
    return this.httpClient.post(environments.baseUrl + 'auth/signup', data);
  }

  login(data: any): Observable<any> {
    return this.httpClient.post(environments.baseUrl + 'auth/signin', data);
  }

  saveToken(token: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

 isAuthnticated(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!this.getToken();
    }
    return false;
  }

  saveUserData(user: User): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }
  }

  getUserData(): User | null {
    if (typeof localStorage !== 'undefined') {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }



  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.currentUserSubject.next(null);
      this.router.navigate(['/home']);
    }
  }
}
