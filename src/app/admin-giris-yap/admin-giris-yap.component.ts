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
  userInfo: { id: number, first_name: string, last_name: string, email: string } | null = null;

  email: string = '';
  password: string = '';
  user: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Kullanıcı bilgilerini alma
    this.authService.getUserInfo().subscribe(
      (userInfo) => {
        console.log('İlk Giriş - Kullanıcı Bilgileri:', userInfo);
        //this.userInfo = userInfo;
      },
      (error) => {
        console.error('İlk Giriş - Kullanıcı bilgileri alınırken hata oluştu:', error);
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
            const authToken = response.body.token; // Token'ı cevaptan al
            this.authService.setAuthToken(authToken); // AuthService'e token'ı set et

            alert('Başarıyla giriş yapıldı!');

            // index.js içindeki giriş yapıldıktan hemen sonra
            const storedAuthToken = this.authService.getAuthToken();
            //console.log('TOKEN ! TOKEN : ', storedAuthToken);

            if (storedAuthToken) {
              
              //console.log('TOKEN BULUNDU ! TOKEN : ', storedAuthToken);

              this.authService.getUserInfo().subscribe(
                (userInfo) => {
                  console.log('TOKEN BULUNDU !!!! ', storedAuthToken);

                  console.log('Giriş Sonrası - Kullanıcı Bilgileri:', userInfo);
                  //this.userInfo = userInfo;
                },
                (error) => {
                  console.error('Giriş Sonrası - Kullanıcı bilgileri alınırken hata oluştu:', error);
                }
              );
              this.router.navigate(['/admin-ana-sayfa']);
            }
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
