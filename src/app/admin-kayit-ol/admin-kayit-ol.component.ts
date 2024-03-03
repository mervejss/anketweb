import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-kayit-ol',
  templateUrl: './admin-kayit-ol.component.html',
  styleUrls: ['./admin-kayit-ol.component.scss']
})
export class AdminKayitOlComponent {

  username: string = '';
  surname: string = '';
  phoneNumber: string = '';
  email: any;
  password: any;

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    const data = {
      firstName: this.username,
      lastName: this.surname,
      phoneNumber: this.phoneNumber,
      email: this.email,
      password: this.password,
    };

    this.http.post<any>('http://localhost:3000/api/admins', data, { observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        console.log('Sunucu cevabı:', response);

        if (response.body && response.body.status === 200) {
          console.log('Veritabanına kaydedildi', response);
          alert('Admin Kullanıcı başarıyla kaydedildi ! ');

          this.router.navigate(['/']);
        } else {
          console.error('Bilinmeyen bir hata oluştu.');
        }
      },
      (error) => {
        console.error('Bilinmeyen bir hata oluştu.', error);
      },
      () => {
        console.log('HTTP request completed.');
      }
    );
  }
}
