import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-kullanici-anketler-page1',
  templateUrl: './kullanici-anketler-page1.component.html',
  styleUrls: ['./kullanici-anketler-page1.component.scss']
})
export class KullaniciAnketlerPage1Component implements OnInit {

  questionData: any[] = [];
  questionOptionData: any[] = [];

  constructor(private http: HttpClient, private router: Router, private _auth: AdminService) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    this._auth.getQuestions(2)
        .subscribe(
            (res: any[]) => {
                console.log("Soru verileri alındı", res);
                this.questionData = res;
                this.getQuestionOptionsForQuestions();
            },
            err => console.log("Soru verileri alınamadı", err)
        );
}

  getQuestionOptionsForQuestions() {
    if (this.questionData && this.questionData.length > 0) {
      for (const question of this.questionData) {
        this.getQuestionOptions(question);
      }
    } else {
      console.log("Soru verileri bulunamadı veya boş.");
    }
  }

  getQuestionOptions(question: any) {
    this._auth.getQuestionOptions(question.id)
    .subscribe(
        (res: any) => {
          console.log("Seçenek verileri alındı", res);
          // Her bir sorunun seçeneklerini ilgili diziye ekleyin
          this.questionOptionData.push({ questionId: question.id, options: res });
        },
        err => console.log("Seçenek verileri alınamadı", err)
    );
  }  
 
  
  
}
