// admin.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  

  private _registerUrl = "http://localhost:3000/api/admins"
  private _loginUrl = "http://localhost:3000/api/adminlogin"

  constructor(private http: HttpClient,private _router: Router) {}

 
  registerUser(user: any)
  {
    return this.http.post<any>(this._registerUrl,user)
  }

  loginUser(user: any)
  {
    return this.http.post(this._loginUrl, user)

  }
  
  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }
  
 
  
}