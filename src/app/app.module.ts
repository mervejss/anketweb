import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Burada FormsModule'u içe aktardığınızdan emin olun
import { RouterModule } from '@angular/router'; // RouterModule'ı eklediğinizden emin olun
import { AppRoutingModule } from './app-routing.module'; // AppRoutingModule'ı import etmeyi unutmayın
import { AppComponent } from './app.component';
import { KayitOlComponent } from './normal-kullanici-kayit-ol/kayit-ol.component'; // Varsa kayit-ol component'ını da içe aktarın
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GirisYapComponent } from './normal-kullanici-giris-yap/giris-yap.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminGirisYapComponent } from './admin-giris-yap/admin-giris-yap.component';
import { AdminKayitOlComponent } from './admin-kayit-ol/admin-kayit-ol.component';
import { AdminAnaSayfaComponent } from './admin-ana-sayfa/admin-ana-sayfa.component';
import { Page1Component } from './page1/page1.component';
import { AnaSayfaComponent } from './ana-sayfa/ana-sayfa.component';

import { AdminService } from './services/admin.service';
import { AuthGuard } from './services/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AdminAnketlerPage1Component } from './admin-anketler-page1/admin-anketler-page1.component';
import { NormalKullaniciAnaSayfaComponent } from './normal-kullanici-ana-sayfa/normal-kullanici-ana-sayfa.component';
import { KullaniciAnketlerPage1Component } from './kullanici-anketler-page1/kullanici-anketler-page1.component';
import { AdminAnketEkleDuzenleComponent } from './admin-anket-ekle-duzenle/admin-anket-ekle-duzenle.component';
import { KullanicilariGoruntuleComponent } from './kullanicilari-goruntule/kullanicilari-goruntule.component';
import { KullaniciDetaylariComponent } from './kullanici-detaylari/kullanici-detaylari.component';
import { AdminAnketEkleComponent } from './admin-anket-ekle/admin-anket-ekle.component';

@NgModule({
  declarations: [
    AppComponent,
    KayitOlComponent, 
    GirisYapComponent, AdminGirisYapComponent, AdminKayitOlComponent,AdminAnaSayfaComponent, Page1Component, AnaSayfaComponent, AdminAnketlerPage1Component, NormalKullaniciAnaSayfaComponent, KullaniciAnketlerPage1Component, AdminAnketEkleDuzenleComponent, KullanicilariGoruntuleComponent, KullaniciDetaylariComponent, AdminAnketEkleComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,// FormsModule'u burada da ekleyin
    RouterModule, 
    AppRoutingModule, // AppRoutingModule'ı burada da eklemeyi unutmayın
    HttpClientModule, BrowserAnimationsModule,
    
  ],
  providers: [    AdminService, AuthGuard ,
    {
      provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
    }
    // AdminService sağlayıcısını burada belirtiyoruz
],
  bootstrap: [AppComponent]
})
export class AppModule { }


