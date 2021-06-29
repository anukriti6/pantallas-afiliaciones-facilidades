import {Component, OnInit} from '@angular/core';
import {IAnchorCompany} from 'src/app/services/provider/anchorCompanyInterface';
import {ILegalProvider} from 'src/app/services/provider/legalProviderInterface';
import {ICompanyData} from 'src/app/services/company/companyDataInterface';
import {CompanyService} from 'src/app/services/company/company.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html'
})
export class CreateCompanyComponent implements OnInit {
  doClean = false;
  searchError: string | null = null;
  companiesData: any[] = [];
  selectedCompany: ICompanyData | null = null;
  matched = false;

  constructor(private companyService: CompanyService) {
  }

  ngOnInit(): void {
  }

  searchId(id: number): void {
    this.companyService.getCompaniesData().subscribe((data) => {
      this.companiesData = data;
      console.log('companies', this.companiesData);
      if (this.companiesData.length) {
        console.log('companies.length', this.companiesData.length);
        for (let i = 0; i < this.companiesData.length - 1; i++) {
          console.log('this.companiesData[i].id_number', this.companiesData[i].id_number);
          console.log('id', id);
          console.log('validation', this.companiesData[i].id_number === id);
          if (this.companiesData[i].id_number === id) {
            this.matched = true;
            this.selectedCompany = this.companiesData[i];
          }
        }
        if (!this.matched) {
          this.searchError = 'Usuario no encontrado. Intente nuevamente';
          this.selectedCompany = null;
        }
      }
    });
  }

  clean(clean: boolean): void {
    this.doClean = clean;
    this.searchError = null;
    this.selectedCompany = null;
  }
}
