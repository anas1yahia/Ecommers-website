import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environments } from '../../../../environments/environments.prod';
import { AuthService } from '../../../core/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getLoggedUserCart(): Observable<any> {
    // Skip API calls during SSR
    if (!isPlatformBrowser(this.platformId)) {
      return of({ data: { products: [], totalCartPrice: 0 } });
    }

    // Only add headers in browser context
    let headers = new HttpHeaders();
    const token = this.authService.getToken();
    if (token) {
      headers = headers.set('token', token);
    }

    return this.http.get(`${environments.baseUrl}cart`, { headers });
  }



  addToCart(productId: string): Observable<any> {
    // Skip API calls during SSR
    if (!isPlatformBrowser(this.platformId)) {
      return of({ data: { products: [], totalCartPrice: 0 } });
    }

    let headers = new HttpHeaders();
    const token = this.authService.getToken();
    if (token) {
      headers = headers.set('token', token);
    }

    return this.http.post(`${environments.baseUrl}cart`,
      { productId },
      { headers }
    );
  }


  RemoveCartItem(id: string): Observable<any> {
    // Skip API calls during SSR
    if (!isPlatformBrowser(this.platformId)) {
      return of({ data: { products: [], totalCartPrice: 0 } });
    }

    let headers = new HttpHeaders();
    const token = this.authService.getToken();
    if (token) {
      headers = headers.set('token', token);
    }

    return this.http.delete(`${environments.baseUrl}cart/${id}`, { headers });
  }

  UpdateCart(productId: string, quantity: number): Observable<any> {
    // Skip API calls during SSR
    if (!isPlatformBrowser(this.platformId)) {
      return of({ data: { products: [], totalCartPrice: 0 } });
    }

    let headers = new HttpHeaders();
    const token = this.authService.getToken();
    if (token) {
      headers = headers.set('token', token);
    }

    return this.http.put(`${environments.baseUrl}cart/${productId}`,
      { count: quantity },
      { headers }
    );
  }

  ClearCart(): Observable<any> {
    // Skip API calls during SSR
    if (!isPlatformBrowser(this.platformId)) {
      return of({ data: { products: [], totalCartPrice: 0 } });
    }

    let headers = new HttpHeaders();
    const token = this.authService.getToken();
    if (token) {
      headers = headers.set('token', token);
    }

    return this.http.delete(`${environments.baseUrl}cart`, { headers });
  }
}
