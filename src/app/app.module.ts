import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Burada FormsModule'u içe aktardığınızdan emin olun
import { RouterModule } from '@angular/router'; // RouterModule'ı eklediğinizden emin olun
import { AppRoutingModule } from './app-routing.module'; // AppRoutingModule'ı import etmeyi unutmayın
import { AppComponent } from './app.component';
import { KayitOlComponent } from './kayit-ol/kayit-ol.component'; // Varsa kayit-ol component'ını da içe aktarın
import { HttpClientModule } from '@angular/common/http'; // HttpClientModule'i ekledik
import { GirisYapComponent } from './giris-yap/giris-yap.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    KayitOlComponent, 
    GirisYapComponent,
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


