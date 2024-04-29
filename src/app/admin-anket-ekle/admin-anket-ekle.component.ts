import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-anket-ekle',
  templateUrl: './admin-anket-ekle.component.html',
  styleUrls: ['./admin-anket-ekle.component.scss']
})
export class AdminAnketEkleComponent {



anketAdi: any;
anketId: any;
soruIcerigi: any;
soruTipi: any;
soruId: any;
soruSecenekIcerigi: any;
soruSecenekSikki: any;
soruSecenekDurumu: any;

  anketSorusuOlustur()
  {
    console.log('ANKET ID ', this.anketId);
  }
  soruSecenegiOlustur() 
  {
    console.log('SORU ID  ', this.soruId);
  }

  anketOlustur() 
  {
    console.log(this.anketAdi);
  }

  anketSorusuGuncelle() {
    throw new Error('Method not implemented.');
    }
    
    soruSecenegiGuncelle() {
      throw new Error('Method not implemented.');
      }
}
