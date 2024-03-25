// admin-giris-yap.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';


@Component({
  selector: 'app-admin-giris-yap',
  templateUrl: './admin-giris-yap.component.html',
  styleUrls: ['./admin-giris-yap.component.scss'],
})
export class AdminGirisYapComponent implements OnInit {
  ngOnInit(){
    
  }

  loginUserData: any = {};
  constructor(private http: HttpClient, private router: Router, private _auth: AdminService) {}


  loginUser() {
    console.log(this.loginUserData);
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        (res: any) => {
          console.log("Giriş yapıldı", res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/admin-ana-sayfa'])

          // Giriş başarılı olduğunda yönlendirme yapılabilir.
        },
        err => console.log(err)
      );
  }


  
  }

  

  