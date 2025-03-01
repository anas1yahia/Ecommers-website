import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { register } from 'module';
import { env } from 'process';
import { environments } from '../../../../environments/environments.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private HttpClient: HttpClient) { }

  register(data: any): Observable<any> {
    return this.HttpClient.post(environments.baseUrl + 'auth/signup', data);
  }
  login(data: any): Observable<any> {
    return this.HttpClient.post(environments.baseUrl + 'auth/signin', data);
  }
}


