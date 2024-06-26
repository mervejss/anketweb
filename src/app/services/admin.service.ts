//C:\angular\anketweb-main\src\app\services\admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AdminService {


  private _registerUrl = "http://localhost:3000/api/admins";
  private _loginUrl = "http://localhost:3000/api/adminlogin";
  private _adminInfoUrl = "http://localhost:3000/api/admininfo";
  private _anketSorulari1Url = "http://localhost:3000/api/questions";
  private _anketSecenekleri1Url = "http://localhost:3000/api/questionOptions";

  _adminData: any;
  _questionData: any;
  _questionOptionData: any;


  constructor(private http: HttpClient, private _router: Router) {
    this._adminData = JSON.parse(localStorage.getItem('adminData') || '{}');
    this._questionData = JSON.parse(localStorage.getItem('questionData') || '{}');
    this._questionOptionData = JSON.parse(localStorage.getItem('questionOptionData') || '{}');

  }

  getQuestions(tiklananAnketId: number) {
    return this.http.post<any>(this._anketSorulari1Url, { tiklananAnketId: tiklananAnketId });
  }

  
  getQuestionOptions(questionId: number) {
    return this.http.post<any>(this._anketSecenekleri1Url, { question_id: questionId });
  }
  
  
  setQuestionData(data: any) {
    this._questionData = data;
    // adminData'yı localStorage'a kaydet
    localStorage.setItem('questionData', JSON.stringify(data));
  }

  getQuestionData() {
    return this._questionData;
  }

  registerUser(user: any) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user: any) {
    return this.http.post(this._loginUrl, user);

  }

  getAdminInfo(user: any) {
    return this.http.post(this._adminInfoUrl, user);
  }

  logoutUser() {
    localStorage.removeItem('token');
    let userData = '';
    this._router.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
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
