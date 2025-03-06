import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { environments } from '../../../../environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient: HttpClient, private auth : AuthService) { }

  addToCart(productId: string){
   return this.httpClient.post(environments.baseUrl + "cart",
    {productId, },
    {
      headers: {
        token : this.auth.getToken()!,
      },}

  );
  }


  UpdateCart(productId: string, quantity: number){
    return this.httpClient.put(environments.baseUrl + "cart/" + productId,
     { quantity},
     {
       headers: {
         token : this.auth.getToken()!,
       },}

   );
   }



  getLoggedUserCart(){
    return this.httpClient.get(environments.baseUrl + "cart" ,

     {
       headers: {
         token : this.auth.getToken()!,
       },}

   );
   }

  RemoveCartItem(productId: string, ){
    return this.httpClient.delete(environments.baseUrl + "cart/" + productId,

     {
       headers: {
         token : this.auth.getToken()!,
       },}

   );
   }

   ClearCart(){
    return this.httpClient.get(environments.baseUrl + "cart" ,

     {
       headers: {
         token : this.auth.getToken()!,
       },}

   );
   }
}
