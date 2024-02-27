import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KayitOlComponent } from './normal-kullanici-kayit-ol/kayit-ol.component';
import { GirisYapComponent } from './normal-kullanici-giris-yap/giris-yap.component';
import { AdminGirisYapComponent } from './admin-giris-yap/admin-giris-yap.component';
import { AdminKayitOlComponent } from './admin-kayit-ol/admin-kayit-ol.component';
const routes: Routes = [
  { path: 'kayit-ol',  component: KayitOlComponent },
  { path: 'giris-yap', component: GirisYapComponent },
  { path: 'admin-kayit-ol',  component: AdminKayitOlComponent },
  { path: 'admin-giris-yap', component: AdminGirisYapComponent },
  // Diğer yönlendirmeleri de burada belirleyebilirsiniz
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
