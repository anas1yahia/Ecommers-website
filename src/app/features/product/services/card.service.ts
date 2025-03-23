import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environments } from '../../../../environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  counter= new BehaviorSubject<number>(0);
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getLoggedUserCart(): Observable<any> {
    // Skip API calls during SSR
    if (!isPlatformBrowser(this.platformId)) {
      return of({ data: { products: [], totalCartPrice: 0 } });
    }

    // No need for headers - interceptor will handle it
    return this.http.get(`${environments.baseUrl}cart`);
  }

  addToCart(productId: string): Observable<any> {
    if (!isPlatformBrowser(this.platformId)) {
      return of({ data: { products: [], totalCartPrice: 0 } });
    }

    return this.http.post(`${environments.baseUrl}cart`, { productId });
  }

  RemoveCartItem(id: string): Observable<any> {
    // Skip API calls during SSR
    if (!isPlatformBrowser(this.platformId)) {
      return of({ data: { products: [], totalCartPrice: 0 } });
    }

    return this.http.delete(`${environments.baseUrl}cart/${id}`);
  }

  UpdateCart(productId: string, quantity: number): Observable<any> {
    // Skip API calls during SSR
    if (!isPlatformBrowser(this.platformId)) {
      return of({ data: { products: [], totalCartPrice: 0 } });
    }

    return this.http.put(`${environments.baseUrl}cart/${productId}`, { count: quantity });
  }

  ClearCart(): Observable<any> {
    // Skip API calls during SSR
    if (!isPlatformBrowser(this.platformId)) {
      return of({ data: { products: [], totalCartPrice: 0 } });
    }

    return this.http.delete(`${environments.baseUrl}cart`);
  }
}1
