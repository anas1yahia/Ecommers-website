import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { environments } from '../../../../environments/environments.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private authService: AuthService) { }


  Checkout(cartId: string | null, shipment: { details: string, phone: string, city: string }): Observable<any>{
    // Remove the space after "=" and specify all required URLs
    const baseUrl = "http://localhost:4200";
    const returnUrl = `?url=${baseUrl}`;
    const successUrl = `&success_url=${baseUrl}/orders`;
    const cancelUrl = `&cancel_url=${baseUrl}/cart`;

    return this.http.post(
      environments.baseUrl + `orders/checkout-session/${cartId}${returnUrl}${successUrl}${cancelUrl}`,
      {shippingAddress: shipment},
      {
        headers: {
          token: this.authService.getToken() || ''
        }
      }
    )
  }}
