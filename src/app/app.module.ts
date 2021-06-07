import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { RelateEasinessesComponent } from './pages/relate-easinesses/relate-easinesses.component';
import { SearchIdComponent } from './components/search-id/search-id.component';
import { AffiliateProviderComponent } from './pages/affiliate-provider/affiliate-provider.component';
import { RelateAnchorCompanyComponent } from './components/relate-anchor-company/relate-anchor-company.component';
import { CreateEditEasinessComponent } from './components/create-edit-easiness/create-edit-easiness.component';
import { ProviderDataComponent } from './components/provider-data/provider-data.component';
import { EasinessService } from './services/easiness/easiness.service';
import { ProviderService } from './services/provider/provider.service';
import { AnchorCompanyService } from './services/anchor-company/anchor-company.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RelateEasinessesComponent,
    SearchIdComponent,
    AffiliateProviderComponent,
    RelateAnchorCompanyComponent,
    CreateEditEasinessComponent,
    ProviderDataComponent
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
    MatTableModule
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
    MatTableModule
  ],
  providers: [EasinessService, ProviderService, AnchorCompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }

