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
  private _adminInfoUrl = "http://localhost:3000/api/admininfo"
  _adminData: any;

  constructor(private http: HttpClient,private _router: Router,) {
    this._adminData = JSON.parse(localStorage.getItem('adminData') || '{}');

  }

 
  registerUser(user: any)
  {
    return this.http.post<any>(this._registerUrl,user)
  }

  loginUser(user: any)
  {
    return this.http.post(this._loginUrl, user)
    
  }

  getAdminInfo(user: any)
  {
    return this.http.post(this._adminInfoUrl, user)
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
  
  setAdminData(data: any) {
    this._adminData = data;
    // adminData'yı localStorage'a kaydet
    localStorage.setItem('adminData', JSON.stringify(data));
  }

  getAdminData() {
    return this._adminData;
  }
}