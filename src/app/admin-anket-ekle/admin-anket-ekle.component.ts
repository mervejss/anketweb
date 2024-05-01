import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-admin-anket-ekle',
  templateUrl: './admin-anket-ekle.component.html',
  styleUrls: ['./admin-anket-ekle.component.scss']
})
export class AdminAnketEkleComponent  implements OnInit {
  adminData: any;

  constructor(private _auth: AdminService,private surveyService: SurveyService) {}
  adminId: number = 5; // Varsayılan admin ID

  ngOnInit(): void {
    this.adminData = this._auth.getAdminData();
    //this._auth.getQuestions();
  }

anketAdi: any;
anketId: any;
soruIcerigi: any;
soruTipi: any;
soruId: any;

soruSeceneksoruId: any;
soruSecenekIcerigi: any;
soruSecenekSikki: any;
soruSecenekDurumu: any;

guncellenecekanketId: any;
guncelleneceksoruId: any;
guncelleneceksoruIcerigi: any;
guncelleneceksoruTipi: any;

guncellenecekseceneksoruId: any;
guncellenecekseceneksoruSecenekId: any;
guncellenecekseceneksoruSecenekIcerigi: any;
guncellenecekseceneksoruSecenekSikki: any;
guncellenecekseceneksoruSecenekDurumu: any;
  

  anketOlustur() {
    this.surveyService.createSurvey(this.anketAdi, this.adminId)
      .subscribe(
        (response) => {
          console.log('Anket oluşturuldu:', response);
          alert(`"${this.anketAdi}" isimli anket ADMIN ID: "${this.adminId}" admin tarafından başarıyla oluşturuldu!`);
          // İsteğin başarılı bir şekilde tamamlandığında burada ilgili işlemleri yapabilirsiniz
        },
        (error) => {
          console.error('Anket oluşturulurken bir hata oluştu:', error);
          // Hata durumunda burada ilgili işlemleri yapabilirsiniz
        }
      );
  }

  anketSorusuOlustur() {
    this.surveyService.createQuestion(this.anketId, this.soruIcerigi, this.soruTipi)
      .subscribe(
        (response) => {
          console.log('Soru oluşturuldu:', response);
          // İsteğin başarılı bir şekilde tamamlandığında burada ilgili işlemleri yapabilirsiniz
          alert('Soru başarıyla oluşturuldu!');
        },
        (error) => {
          console.error('Soru oluşturulurken bir hata oluştu:', error);
        }
      );
  }
 

  anketSorusuGuncelle() {
    this.surveyService.updateQuestion(this.guncelleneceksoruId, this.guncellenecekanketId, this.guncelleneceksoruIcerigi, this.guncelleneceksoruTipi)
      .subscribe(
        (response) => {
          console.log('Soru güncellendi:', response);
          // İsteğin başarılı bir şekilde tamamlandığında burada ilgili işlemleri yapabilirsiniz
          alert('Soru başarıyla güncellendi!');
        },
        (error) => {
          console.error('Soru güncellenirken bir hata oluştu:', error);
          // Hata durumunda burada ilgili işlemleri yapabilirsiniz
          alert('Soru güncellenirken bir hata oluştu.');
        }
      );
  }

  soruSecenegiOlustur() {
    this.surveyService.createQuestionOption(this.soruSeceneksoruId, this.soruSecenekIcerigi, this.soruSecenekSikki, this.soruSecenekDurumu)
      .subscribe(
        (response) => {
          console.log('Soru seçeneği oluşturuldu:', response);
          // İsteğin başarılı bir şekilde tamamlandığında burada ilgili işlemleri yapabilirsiniz
          alert('Soru seçeneği başarıyla oluşturuldu!');
        },
        (error) => {
          console.error('Soru seçeneği oluşturulurken bir hata oluştu:', error);
        }
      );
  }
  
  
  soruSecenegiGuncelle() {
    this.surveyService.updateQuestionOption(this.guncellenecekseceneksoruSecenekId, this.guncellenecekseceneksoruId, this.guncellenecekseceneksoruSecenekIcerigi, this.guncellenecekseceneksoruSecenekSikki, this.guncellenecekseceneksoruSecenekDurumu)
      .subscribe(
        (response) => {
          console.log('Soru seçeneği güncellendi:', response);
          // İsteğin başarılı bir şekilde tamamlandığında burada ilgili işlemleri yapabilirsiniz
          alert('Soru seçeneği başarıyla güncellendi!');
        },
        (error) => {
          console.error('Soru seçeneği güncellenirken bir hata oluştu:', error);
          // Hata durumunda burada ilgili işlemleri yapabilirsiniz
          alert('Soru seçeneği güncellenirken bir hata oluştu.');
        }
      );
  }
}
