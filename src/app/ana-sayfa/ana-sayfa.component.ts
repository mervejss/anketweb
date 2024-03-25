import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // HttpClient'ı ekledik
import { AdminService } from '../services/admin.service';


@Component({
  selector: 'app-ana-sayfa',
  templateUrl: './ana-sayfa.component.html',
  styleUrls: ['./ana-sayfa.component.scss']
})
export class AnaSayfaComponent {

  
  title = 'anketweb';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';

  constructor(private router: Router, private http: HttpClient, public adminService: AdminService) {} // HttpClient'ı burada da ekledik
  ngOnInit() {
    
  }
  showKayitOl() {
    this.router.navigate(['/kayit-ol']);
  }
 showGirisYap() {
    this.router.navigate(['/giris-yap']);
  }

  showAdminKayitOl() {
    // Kullanıcı giriş yapmışsa yönlendir
    if (this.adminService.loggedIn()) {
      this.router.navigate(['/admin-ana-sayfa']);
    } else {
      this.router.navigate(['/admin-kayit-ol']);
    }
    //this.router.navigate(['/admin-kayit-ol']);
  }
 showAdminGirisYap() {
  // Kullanıcı giriş yapmışsa yönlendir
  if (this.adminService.loggedIn()) {
    this.router.navigate(['/admin-ana-sayfa']);
  } else {
    this.router.navigate(['/admin-giris-yap']);
  }
  //this.adminService.loggedIn()
  //this.router.navigate(['/admin-giris-yap']);
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
