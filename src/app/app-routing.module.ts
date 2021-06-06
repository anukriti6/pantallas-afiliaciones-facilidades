import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffiliateProviderComponent } from './pages/affiliate-provider/affiliate-provider.component';
import { RelateEasinessesComponent } from './pages/relate-easinesses/relate-easinesses.component';

const routes: Routes = [
  {
    path: 'relate-easiness',
    component: RelateEasinessesComponent
  },
  {
    path: 'affiliate-provider',
    component: AffiliateProviderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
