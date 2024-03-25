import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';


@Component({
  selector: 'app-admin-ana-sayfa',
  templateUrl: './admin-ana-sayfa.component.html',
  styleUrls: ['./admin-ana-sayfa.component.scss'],
})
export class AdminAnaSayfaComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private _auth: AdminService) {}


  ngOnInit(): void {

  }
  
  

  yeniAnketSorusuEkle(): void {
    
  }

  anketSorulariniGoruntule(): void {
    
  }
}
