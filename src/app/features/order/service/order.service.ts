import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { environments } from '../../../../environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  Checkout(cartId: string, shipmment:{details: string, number: string, city: string}) {
    return this.http.post(environments.baseUrl + 'order/checkout-session', {cartId, shipmment},
      {headers: {
        token : this.authService.getToken() || ''
      }})
  }
}
