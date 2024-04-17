//anketweb-main/src/app/services/survey.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private apiUrl = '/api/surveys/:surveyId/questions'; // Sunucu API'sinin URL'si

  constructor(private http: HttpClient) { }

  // Yeni anket sorusu eklemek için POST isteği gönderen fonksiyon
  addQuestionToSurvey(surveyId: number, questionText: string, questionType: string, options: any[]): Observable<any> {
    const url = `${this.apiUrl}/surveys/${surveyId}/questions`;
    const body = { question_text: questionText, question_type: questionType, options: options };
    return this.http.post<any>(url, body);
  }
  

}
