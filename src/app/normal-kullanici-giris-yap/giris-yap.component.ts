import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router'; // Router'ı ekledik
import { NormalKullaniciService } from '../services/normal-kullanici.service';

@Component({
    selector: 'app-giris-yap',
    templateUrl: './giris-yap.component.html',
    styleUrls: ['./giris-yap.component.css']
})
export class GirisYapComponent implements OnInit{
  

  sozlesmeOnaylandi: boolean = true; // Yeni eklenen değişken

    ngOnInit() {
        this.loginUser();
      }
      userData: any = {};

  loginUserData: any = {};
    constructor(private http: HttpClient, private router:  Router, private _auth: NormalKullaniciService) {}

    onSubmit()
    {
      if (!this.sozlesmeOnaylandi ) {
        // Eğer checkbox işaretli değilse, kullanıcıya uyarı göster
        alert('Lütfen aydınlatma metnini onaylayın.');
        return;
      }
      this.loginUser();
    }
    
    

    loginUser()
    {
      console.log(this.loginUserData);
            this._auth.loginUser(this.loginUserData)
              .subscribe(
                (res: any) => {
                  console.log("Giriş yapıldı", res);
                  localStorage.setItem('token', res.token);
                  this._auth.getUserInfo(this.loginUserData)
                  .subscribe(
                    (res: any) => {
                      console.log("Kullanici verileri alındı", res);
                      localStorage.setItem('token', res.token);
                      this.userData = res
                      this._auth.setUserData(res);
                      
                      //this._auth.setOnayDurumu(true);
                      // Admin verileri başarıyla alındı, yönlendirme yapılabilir
                      this.router.navigate(['/normal-kullanici-ana-sayfa']);
                    },
                    err => console.log("Normal Kullanici verileri alınamadı", err)
                  );
        
                },
                err => console.log(err)
              );
          
        

    }

    
    
 
    
}
