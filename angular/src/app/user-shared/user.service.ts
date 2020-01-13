import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from './user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  selectedUser: User = {
    userName: '',
    email: '',
    password: '',
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient, private router: Router) { }



    postUser(user: User){
      return this.http.post(environment.apiUrl + '/register', user);
    }
  
    login(authCredentials) {
      return this.http.post(environment.apiUrl + '/authenticate', authCredentials, this.noAuthHeader);
    }
  
    getUserProfile() {
      return this.http.get(environment.apiUrl + '/userProfile');
    }

    loginViaFacebook(fbAccessToken) {
      return this.http.post(environment.apiUrl + "/oauth/facebook", fbAccessToken);
    }

    loginViaGoogle(googleAccessToken){
      return this.http.post(environment.apiUrl + "/oauth/google", googleAccessToken);
    }
  
  
  
    setToken(token: string) {
      localStorage.setItem('token', token);
    }
  
    getToken() {
      return localStorage.getItem('token');
    }
  
    deleteToken() {
      localStorage.removeItem('token');
    }
  
    getUserPayload() {
      let token = this.getToken();
      if (token) {
        let userPayload = atob(token.split('.')[1]);
        return JSON.parse(userPayload);
      }
      else return null;
    }

    isLoggedIn() {
      let userPayload = this.getUserPayload();
      if (userPayload)
        return userPayload.exp > Date.now() / 1000;
      else return false;
    }

}
