//anketweb-main/src/app/admin-anket-ekle-duzenle/admin-anket-ekle-duzenle.component.ts
import { Component } from '@angular/core';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-admin-anket-ekle-duzenle',
  templateUrl: './admin-anket-ekle-duzenle.component.html',
  styleUrls: ['./admin-anket-ekle-duzenle.component.scss']
})
export class AdminAnketEkleDuzenleComponent {
   // Başlangıç değerleri verildi
  surveyId: number = 0;
  questionText: string = '';
  questionType: string = '';
  options: any[] = [];
   
  constructor(private surveyService: SurveyService) { }

  // Formdan gelen verileri işleyen fonksiyon
  // admin-anket-ekle-duzenle.component.ts
onSubmit(surveyId: number, questionText: string, questionType: string, options: any[]) {
  this.surveyService.addQuestionToSurvey(surveyId, questionText, questionType, options).subscribe(
    response => {
      console.log('Anket sorusu başarıyla eklendi.', response);
      // Başarılı ekleme durumunda kullanıcıya bilgi vermek için uygun bir işlem yapılabilir.
    },
    error => {
      console.error('Anket sorusu eklenirken bir hata oluştu.', error);
      // Hata durumunda kullanıcıya bir bildirim göstermek veya gerekli işlemleri yapmak gerekebilir.
    }
  );
}

}
