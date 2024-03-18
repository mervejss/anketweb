// admin-ana-sayfa.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-ana-sayfa',
  templateUrl: './admin-ana-sayfa.component.html',
  styleUrls: ['./admin-ana-sayfa.component.scss'],
})
export class AdminAnaSayfaComponent implements OnInit {
  userInfo: { id: number} | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log('ngOnInit is called');
    this.authService.getUserInfo().subscribe(
      (userInfo) => {
        console.log('Giriş Sonrası - Kullanıcı Bilgileri:', userInfo);
        this.userInfo = userInfo;
      },
      (error) => {
        console.error('Giriş Sonrası - Kullanıcı bilgileri alınırken hata oluştu:', error);
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
