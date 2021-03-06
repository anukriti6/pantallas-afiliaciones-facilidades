import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {RelateEasinessesComponent} from './pages/relate-easinesses/relate-easinesses.component';
import {SearchIdComponent} from './components/search-id/search-id.component';
import {AffiliateProviderComponent} from './pages/affiliate-provider/affiliate-provider.component';
import {RelateAnchorCompanyComponent} from './components/relate-anchor-company/relate-anchor-company.component';
import {CreateEditEasinessComponent} from './components/create-edit-easiness/create-edit-easiness.component';
import {ProviderDataComponent} from './components/provider-data/provider-data.component';
import {EasinessService} from './services/easiness/easiness.service';
import {ProviderService} from './services/provider/provider.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkTableModule} from '@angular/cdk/table';
import {InterceptorService} from './services/interceptor.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NotifierComponent} from './components/notifier/notifier.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CreateCompanyComponent} from './pages/create-company/create-company.component';
import {CompanyDataComponent} from './components/company-data/company-data.component';
import {CompanyAdcComponent} from './components/company-adc/company-adc.component';
import {AdcConsultationComponent} from './pages/adc-consultation/adc-consultation.component';
import {LoadInvoiceProviderComponent} from './pages/load-invoice-provider/load-invoice-provider.component';
import {IndividualInvoiceProviderComponent} from './components/individual-invoice-provider/individual-invoice-provider.component';
import {MassiveInvoiceProviderComponent} from './components/massive-invoice-provider/massive-invoice-provider.component';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {InvoiceApprovalComponent} from './pages/invoice-approval/invoice-approval.component';
import {SearchInvoicesComponent} from './components/search-invoices/search-invoices.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {InvoiceConfirmationComponent} from './pages/invoice-confirmation/invoice-confirmation.component';
import {SuccessDialogComponent} from './components/dialogs/success-dialog.component';
import {DeclineDialogComponent} from './components/dialogs/decline-dialog.component';
import {DialogComponent} from './components/dialogs/dialog.component';
import {InvoiceDeleteComponent} from './pages/invoice-delete/invoice-delete.component';
import {DeleteSearchInvoicesComponent} from './components/delete-search-invoices/delete-search-invoices.component';
import {InvoicePaymentProviderComponent} from './pages/invoice-payment-provider/invoice-payment-provider.component';
import {MatSortModule} from '@angular/material/sort';
import {PaymentSearchInvoicesComponent} from './components/payment-search-invoices/payment-search-invoices.component';
import {SearchProviderInvoicesComponent} from './components/search-provider-invoices/search-provider-invoices.component';
import {CreditPaymentProviderComponent} from './pages/credit-payment-provider/credit-payment-provider.component';
import {ProductSpecialistsComponent} from './pages/product-specialists/product-specialists.component';
import {ProductSpecialistsRelationComponent} from './pages/product-specialists-relation/product-specialists-relation.component';
import {AssignProductSpecialistsComponent} from './pages/assign-product-specialists/assign-product-specialists.component';
import {AssignProductSpecialistsModifyComponent} from './pages/assing-product-specialists-modify/assign-product-specialists-modify.component';
import {CompanyProviderDetailComponent} from './pages/company-provider-detail/company-provider-detail.component';
import {InvoicesProviderDetailComponent} from './pages/invoices-provider-detail/invoices-provider-detail.component';
import {PrintPaymentsComponent} from "./pages/print-payments/print-payments.component";

@NgModule({
    declarations: [
        AppComponent,
        RelateEasinessesComponent,
        SearchIdComponent,
        AffiliateProviderComponent,
        RelateAnchorCompanyComponent,
        CreateEditEasinessComponent,
        ProviderDataComponent,
        NotifierComponent,
        CreateCompanyComponent,
        CompanyDataComponent,
        CompanyAdcComponent,
        AdcConsultationComponent,
        LoadInvoiceProviderComponent,
        IndividualInvoiceProviderComponent,
        MassiveInvoiceProviderComponent,
        InvoiceApprovalComponent,
        SearchInvoicesComponent,
        InvoiceConfirmationComponent,
        SuccessDialogComponent,
        DeclineDialogComponent,
        DialogComponent,
        InvoiceDeleteComponent,
        DeleteSearchInvoicesComponent,
        InvoicePaymentProviderComponent,
        PaymentSearchInvoicesComponent,
        SearchProviderInvoicesComponent,
        CreditPaymentProviderComponent,
        ProductSpecialistsComponent,
        ProductSpecialistsRelationComponent,
        AssignProductSpecialistsComponent,
        AssignProductSpecialistsModifyComponent,
        CompanyProviderDetailComponent,
        InvoicesProviderDetailComponent,
        PrintPaymentsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatTabsModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSelectModule,
        MatDialogModule,
        MatExpansionModule,
        MatListModule,
        FormsModule,
        MatTableModule,
        FlexLayoutModule,
        MatChipsModule,
        MatTooltipModule,
        CdkTableModule,
        MatSnackBarModule,
        MatRadioModule,
        MatAutocompleteModule,
        MaterialFileInputModule,
        MatProgressBarModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatSortModule,
        MatNativeDateModule
    ],
    exports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatTabsModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSelectModule,
        MatDialogModule,
        MatExpansionModule,
        MatListModule,
        FormsModule,
        MatTableModule,
        FlexLayoutModule,
        MatChipsModule,
        MatTooltipModule,
        CdkTableModule,
        MatSnackBarModule,
        MatRadioModule,
        MatAutocompleteModule,
        MaterialFileInputModule,
        MatProgressBarModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatSortModule,
        MatNativeDateModule
    ],
    providers: [EasinessService, ProviderService, {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorService,
        multi: true
    },
        {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}],
    bootstrap: [AppComponent]
})
export class AppModule {
}

