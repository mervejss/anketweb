import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-ana-sayfa',
  templateUrl: './admin-ana-sayfa.component.html',
  styleUrls: ['./admin-ana-sayfa.component.scss'],
})
export class AdminAnaSayfaComponent implements OnInit {
  anketSorular: any[] | undefined;
  questionText: string = '';
  surveyId: number | undefined; // surveyId özelliğini tanımladık

  constructor(public adminService: AdminService) {}

  ngOnInit(): void {
    // Admin bilgilerine erişim örneği
    console.log(this.adminService.adminInfo);
    
  }

  yeniAnketSorusuEkle(): void {
    
  }

  anketSorulariniGoruntule(): void {
    
  }
}
