import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NormalKullaniciService } from '../services/normal-kullanici.service';

@Component({
  selector: 'app-kayit-ol',
  templateUrl: './kayit-ol.component.html',
  styleUrls: ['./kayit-ol.component.css']
})
export class KayitOlComponent {
  registerUserData: any = {};


  constructor(private http: HttpClient, private Router: Router, private _auth: NormalKullaniciService) {}

 
  registerUser()
  {
    console.log(this.registerUserData)
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        console.log("kayıt edildi" + res),
        localStorage.setItem('token', res.token)
      },
      err => console.log(err)
    )
  }


}
