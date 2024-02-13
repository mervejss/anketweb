import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KayitOlComponent } from './kayit-ol/kayit-ol.component';
import { GirisYapComponent } from './giris-yap/giris-yap.component';

const routes: Routes = [
  { path: 'kayit-ol',  component: KayitOlComponent },
  { path: 'giris-yap', component: GirisYapComponent },

  // Diğer yönlendirmeleri de burada belirleyebilirsiniz
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
