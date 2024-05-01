import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }

  private createSurveyapiUrl = 'http://localhost:3000/api/createSurvey'; // API URL'si
  private createQuestionapiUrl = 'http://localhost:3000/api/createQuestion'; // API URL'si
  private updateQuestionapiUrl = 'http://localhost:3000/api/updateQuestion'; // API URL'si
  private createQuestionOptionapiUrl = 'http://localhost:3000/api/createQuestionOption'; // API URL'si
  private updateQuestionOptionapiUrl = 'http://localhost:3000/api/updateQuestionOption'; // API URL'si

  // Tüm anketleri getiren fonksiyon
  getAllSurveys(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/surveys');
  }


  // Yeni bir anket oluşturmak için API'yi çağıran fonksiyon
  createSurvey(survey_name: string, admin_id: number) 
  {
    return this.http.post<any>(this.createSurveyapiUrl, { survey_name, admin_id });
  }

  // Yeni bir soru oluşturmak için API'yi çağıran fonksiyon
  createQuestion(survey_id: number, question_text: string, question_type: string) 
  {
    return this.http.post<any>(this.createQuestionapiUrl, { survey_id, question_text, question_type });
  }

  // Soruyu güncellemek için API'yi çağıran fonksiyon
  updateQuestion(questionId: number, survey_id: number, question_text: string, question_type: string) 
  {
    const url = `${this.updateQuestionapiUrl}/${questionId}`; // ID'ye göre URL oluşturuluyor
    return this.http.put<any>(url, { survey_id, question_text, question_type });
  }

  // Yeni bir soru seçeneği oluşturmak için API'yi çağıran fonksiyon
  createQuestionOption(question_id: number, option_text: string, option_letter: string, is_correct: boolean) 
  {
    return this.http.post<any>(this.createQuestionOptionapiUrl, { question_id, option_text, option_letter, is_correct });
  }

    // Soru seçeneğini güncellemek için API'yi çağıran fonksiyon
  updateQuestionOption(optionId: number, question_id: number, option_text: string, option_letter: string, is_correct: boolean) 
  {
      const url = `${this.updateQuestionOptionapiUrl}/${optionId}`; // ID'ye göre URL oluşturuluyor
      return this.http.put<any>(url, { question_id, option_text, option_letter, is_correct });
  }

}
