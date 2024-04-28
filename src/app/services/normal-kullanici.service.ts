//C:\angular\anketweb-main\src\app\services\normal-kullanici.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class NormalKullaniciService {

  
  private _registerUrl = "http://localhost:3000/api/users";
  private _loginUrl = "http://localhost:3000/api/login";
  private _normalKullaniciInfoUrl = "http://localhost:3000/api/normalKullaniciInfo";
  private _anketSorulari1Url = "http://localhost:3000/api/questions";
  private _anketSecenekleri1Url = "http://localhost:3000/api/questionOptions";

  _normalKullaniciData: any;
  _questionData: any;
  _questionOptionData: any;
  //_sozlesmeOnaylandi:  any;


  constructor(private http: HttpClient, private _router: Router) {
    this._normalKullaniciData = JSON.parse(localStorage.getItem('normalKullaniciData') || '{}');
    this._questionData = JSON.parse(localStorage.getItem('questionData') || '{}');
    this._questionOptionData = JSON.parse(localStorage.getItem('questionOptionData') || '{}');
    //this._sozlesmeOnaylandi = JSON.parse(localStorage.getItem('sozlesmeOnaylandi') || '{}');

  }

  /*
  setOnayDurumu(durum: boolean)
  {
    this._sozlesmeOnaylandi=durum;
    localStorage.setItem('sozlesmeOnaylandi', JSON.stringify(durum));

  }

  getOnayDurumu()
  {
    return localStorage.getItem('sozlesmeOnaylandi'); 
  }
  */
  
  getQuestions() {
    return this.http.get<any>(this._anketSorulari1Url);
  }

  
  getQuestionOptions(questionId: number) {
    return this.http.post<any>(this._anketSecenekleri1Url, { question_id: questionId });
  }
  
  
  setQuestionData(data: any) {
    this._questionData = data;
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

  getUserInfo(user: any) {
    return this.http.post(this._normalKullaniciInfoUrl, user);
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  setUserData(data: any) {
    this._normalKullaniciData = data;
    // adminData'yı localStorage'a kaydet
    localStorage.setItem('normalKullaniciData', JSON.stringify(data));
  }

  getUserData() {
    return this._normalKullaniciData;
  }
  



}
