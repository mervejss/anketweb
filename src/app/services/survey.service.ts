import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }

  // Tüm anketleri getiren fonksiyon
  getAllSurveys(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/surveys');
  }
}
