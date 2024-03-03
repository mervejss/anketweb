// admin-giris-yap.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-giris-yap',
  templateUrl: './admin-giris-yap.component.html',
  styleUrls: ['./admin-giris-yap.component.scss'],
})
export class AdminGirisYapComponent implements OnInit {
  email: string = '';
  password: string = '';
  user: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Sayfa yüklendiğinde kullanıcı bilgilerini çek
    this.authService.getUserInfo().subscribe(
      (userInfo) => {
        this.user = userInfo;
      },
      (error) => {
        console.error('Kullanıcı bilgileri alınırken hata oluştu:', error);
      }
    );
  }

  onSubmit() {
    const data = {
      email: this.email,
      password: this.password,
    };

    this.http.post<any>('http://localhost:3000/api/adminlogin', data, { observe: 'response' })
      .subscribe(
        (response: HttpResponse<any>) => {
          if (response.body && response.body.status === 200) {
            this.authService.setAuthToken(response.body.token); // Token'i sakla
            alert('Başarıyla giriş yapıldı!');

            // Kullanıcı bilgilerini alma
            this.authService.getUserInfo().subscribe(
              (userInfo) => {
                console.log('Kullanıcı Bilgileri:', userInfo);
              },
              (error) => {
                console.error('Kullanıcı bilgileri alınırken hata oluştu:', error);
              }
            );

            this.router.navigate(['/admin-ana-sayfa']);
          } else {
            console.error('Hatalı giriş bilgileri !! Bilgilerinizi kontrol ediniz !');
          }
        },
        (error) => {
          console.error('Bilinmeyen bir hata oluştu.', error);
        }
      );
  }
}
