import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // HttpClient'ı ekledik
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'anketweb';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';

  constructor(private router: Router, private http: HttpClient, private adminService: AdminService) {} // HttpClient'ı burada da ekledik

  ngOnInit(): void {
   
  }
  showKayitOl() {
    this.router.navigate(['/kayit-ol']);
  }
 showGirisYap() {
    this.router.navigate(['/giris-yap']);
  }

  showAdminKayitOl() {
    this.router.navigate(['/admin-kayit-ol']);
  }
 showAdminGirisYap() {
    this.router.navigate(['/admin-giris-yap']);
}

showSistemCikisYap() {
  this.adminService.logoutUser()
  
}

showSistemGiris() {
  this.router.navigate(['/ana-sayfa']);
}
showAnaSayfa() {
  this.router.navigate(['/']);
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
