import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  onSubmit() {
    const data = {
      firstName: this.username,
      lastName: this.surname,
      phoneNumber: this.phoneNumber,
      email: this.email,
      password: this.password,
    };

    this.http.post<any>('http://localhost:3000/api/admins', data).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 201) {
          console.log('Veritabanına kaydedildi', response);
          // Gerekli işlemleri burada gerçekleştirebilirsiniz.
        } else {
          console.error('Bilinmeyen bir hata oluştu.');
        }
      },
      (error) => {
        console.error('Bilinmeyen bir hata oluştu.', error);
      }
    );
  }
}
