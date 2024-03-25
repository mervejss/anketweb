import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-ana-sayfa',
  templateUrl: './admin-ana-sayfa.component.html',
  styleUrls: ['./admin-ana-sayfa.component.scss'],
})
export class AdminAnaSayfaComponent implements OnInit {
  adminInfo: any;

  constructor(public adminService: AdminService) {}

  ngOnInit(): void {
    
  }

  yeniAnketSorusuEkle(): void {
    
  }

  anketSorulariniGoruntule(): void {
    
  }
}
