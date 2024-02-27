import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Burada FormsModule'u içe aktardığınızdan emin olun
import { RouterModule } from '@angular/router'; // RouterModule'ı eklediğinizden emin olun
import { AppRoutingModule } from './app-routing.module'; // AppRoutingModule'ı import etmeyi unutmayın
import { AppComponent } from './app.component';
import { KayitOlComponent } from './normal-kullanici-kayit-ol/kayit-ol.component'; // Varsa kayit-ol component'ını da içe aktarın
import { HttpClientModule } from '@angular/common/http'; // HttpClientModule'i ekledik
import { GirisYapComponent } from './normal-kullanici-giris-yap/giris-yap.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminGirisYapComponent } from './admin-giris-yap/admin-giris-yap.component';
import { AdminKayitOlComponent } from './admin-kayit-ol/admin-kayit-ol.component';

@NgModule({
  declarations: [
    AppComponent,
    KayitOlComponent, 
    GirisYapComponent, AdminGirisYapComponent, AdminKayitOlComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,// FormsModule'u burada da ekleyin
    RouterModule, 
    AppRoutingModule, // AppRoutingModule'ı burada da eklemeyi unutmayın
    HttpClientModule, BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


