import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { register } from 'module';
import { env } from 'process';
import { environments } from '../../../../environments/environments.prod';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private HttpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  register(data: any): Observable<any> {
    return this.HttpClient.post(environments.baseUrl + 'auth/signup', data);
  }
  login(data: any): Observable<any> {
    return this.HttpClient.post(environments.baseUrl + 'auth/signin', data);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isAuthnticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    // During SSR, consider user not authenticated
    return false;
  }

}


