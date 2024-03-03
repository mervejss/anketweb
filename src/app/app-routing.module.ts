import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KayitOlComponent } from './normal-kullanici-kayit-ol/kayit-ol.component';
import { GirisYapComponent } from './normal-kullanici-giris-yap/giris-yap.component';
import { AdminGirisYapComponent } from './admin-giris-yap/admin-giris-yap.component';
import { AdminKayitOlComponent } from './admin-kayit-ol/admin-kayit-ol.component';
//import { AppComponent } from './app.component';
import { AdminAnaSayfaComponent } from './admin-ana-sayfa/admin-ana-sayfa.component';
import { Page1Component } from './page1/page1.component';
import { AnaSayfaComponent } from './ana-sayfa/ana-sayfa.component';



const routes: Routes = [
  //{ path: 'ana-sayfa',  component: AppComponent },
  { path: 'kayit-ol',  component: KayitOlComponent },
  { path: 'giris-yap', component: GirisYapComponent },
  { path: 'admin-kayit-ol',  component: AdminKayitOlComponent },
  { path: 'admin-giris-yap', component: AdminGirisYapComponent },
  { path: 'admin-ana-sayfa', component: AdminAnaSayfaComponent },
  { path: 'anket-sayfası-1',  component: Page1Component },
  { path: 'ana-sayfa',  component: AnaSayfaComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
