import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { environments } from '../../../../environments/environments.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient: HttpClient, private auth : AuthService) { }

  addToCart(productId: string): Observable<any>{
   return this.httpClient.post(environments.baseUrl + "cart",
    {productId, },
    {
      headers: {
        token : this.auth.getToken()!,
      },}

  );
  }


  UpdateCart(productId: string, quantity: number): Observable<any>{
    return this.httpClient.put(environments.baseUrl + "cart/" + productId,
     { quantity},
     {
       headers: {
         token : this.auth.getToken()!,
       },}

   );
   }



  getLoggedUserCart(): Observable<any>{
    return this.httpClient.get(environments.baseUrl + "cart" ,

     {
       headers: {
         token : this.auth.getToken()!,
       },}

   );
   }

  RemoveCartItem(productId: string, ): Observable<any>{
    return this.httpClient.delete(environments.baseUrl + "cart/" + productId,

     {
       headers: {
         token : this.auth.getToken()!,
       },}

   );
   }

   ClearCart(): Observable<any>{
    return this.httpClient.get(environments.baseUrl + "cart" ,

     {
       headers: {
         token : this.auth.getToken()!,
       },}

   );
   }
}
