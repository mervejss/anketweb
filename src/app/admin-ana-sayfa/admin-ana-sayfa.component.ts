// admin-ana-sayfa.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-ana-sayfa',
  templateUrl: './admin-ana-sayfa.component.html',
  styleUrls: ['./admin-ana-sayfa.component.scss'],
})
export class AdminAnaSayfaComponent implements OnInit {
  userInfo: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Kullanıcı bilgilerini alma
    this.authService.getUserInfo().subscribe(
      (userInfo) => {
        this.userInfo = userInfo;
        console.log('Kullanıcı Bilgileri:', this.userInfo);
      },
      (error) => {
        console.error('Kullanıcı bilgileri alınırken hata oluştu:', error);
      }
    );
  }
  
  yeniAnketSorusuEkle() {
    // Yeni anket sorusu ekleme işlemleri
  }

  anketSorulariniGoruntule() {
    // Anket sorularını görüntüleme işlemleri
  }
}
