import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // HttpClient'ı ekledik

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'anketweb';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';

  constructor(private router: Router, private http: HttpClient) {} // HttpClient'ı burada da ekledik

  showKayitOl() {
    this.router.navigate(['/kayit-ol']);
  }
 showGirisYap() {
    this.router.navigate(['/giris-yap']);
  }
  onSubmit() {
    const userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber
    };

    this.http.post('YOUR_BACKEND_API_ENDPOINT', userData)
      .subscribe((response) => {
        console.log('Kayıt Başarılı:', response);
      }, (error) => {
        console.error('Kayıt sırasında bir hata oluştu:', error);
      });
  }
}
