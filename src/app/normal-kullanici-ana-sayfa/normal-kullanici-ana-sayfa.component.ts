import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NormalKullaniciService } from '../services/normal-kullanici.service';

@Component({
  selector: 'app-normal-kullanici-ana-sayfa',
  templateUrl: './normal-kullanici-ana-sayfa.component.html',
  styleUrls: ['./normal-kullanici-ana-sayfa.component.scss']
})
export class NormalKullaniciAnaSayfaComponent implements OnInit {

  normalKullaniciData: any;
  aktifSayfa: string = ''; // Aktif sayfa bilgisini tutacak değişken



  constructor(private http: HttpClient, private router: Router, private _auth: NormalKullaniciService) {}
  

  ngOnInit(): void {
    this.normalKullaniciData = this._auth.getUserData();
    this._auth.getQuestions();
  }
 
 
  yeniAnketSorusuEkle(): void {
      this.aktifSayfa = 'admin-anket-duzenle'; // Başında / olmadan rotayı belirtin

  }

  anketSorulariniGoruntule(): void {
    this.aktifSayfa = 'kullanici-anketler-page1'; // Başında / olmadan rotayı belirtin
    console.log('ANKET SORULARI GÖRÜNTÜLE FONK ÇALIŞTI !!! -> ', this.aktifSayfa);
    //this.router.navigate([this.aktifSayfa]); // Yönlendirme için rotayı belirtin
}


}
