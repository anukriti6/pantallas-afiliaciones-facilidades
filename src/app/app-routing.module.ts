import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffiliateProviderComponent } from './pages/affiliate-provider/affiliate-provider.component';
import { CreateCompanyComponent } from './pages/create-company/create-company.component';
import { RelateEasinessesComponent } from './pages/relate-easinesses/relate-easinesses.component';
import {AdcConsultationComponent} from './pages/adc-consultation/adc-consultation.component';
import {LoadInvoiceProviderComponent} from './pages/load-invoice-provider/load-invoice-provider.component';

const routes: Routes = [
  {
    path: 'relate-easiness',
    component: RelateEasinessesComponent
  },
  {
    path: 'affiliate-provider',
    component: AffiliateProviderComponent
  },
  {
    path: 'create-company',
    component: CreateCompanyComponent
  },
  {
    path: 'adc-consultation',
    component: AdcConsultationComponent
  },
  {
    path: 'load-invoice-provider',
    component: LoadInvoiceProviderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
