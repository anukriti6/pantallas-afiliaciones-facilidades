import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffiliateProviderComponent } from './pages/affiliate-provider/affiliate-provider.component';
import { CreateCompanyComponent } from './pages/create-company/create-company.component';
import { RelateEasinessesComponent } from './pages/relate-easinesses/relate-easinesses.component';
import {AdcConsultationComponent} from './pages/adc-consultation/adc-consultation.component';
import {LoadInvoiceProviderComponent} from './pages/load-invoice-provider/load-invoice-provider.component';
import {InvoiceApprovalComponent} from './pages/invoice-approval/invoice-approval.component';
import {InvoiceConfirmationComponent} from './pages/invoice-confirmation/invoice-confirmation.component';
import {InvoiceDeleteComponent} from './pages/invoice-delete/invoice-delete.component';
import {InvoicePaymentProviderComponent} from './pages/invoice-payment-provider/invoice-payment-provider.component';
import {CreditPaymentProviderComponent} from './pages/credit-payment-provider/credit-payment-provider.component';

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
    path: 'load-provider-invoices',
    component: LoadInvoiceProviderComponent
  },
  {
    path: 'approve-provider-invoices',
    component: InvoiceApprovalComponent
  },
  {
    path: 'confirm-provider-invoices',
    component: InvoiceConfirmationComponent
  },
  {
    path: 'delete-provider-invoices',
    component: InvoiceDeleteComponent
  },
  {
    path: 'pay-provider-invoices',
    component: InvoicePaymentProviderComponent
  },
  {
    path: 'pay-distributor-invoices',
    component: CreditPaymentProviderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
