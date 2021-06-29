import {Component, OnInit} from '@angular/core';
import {ICompanyAdc} from 'src/app/services/adc/companyAdcInterface';
import {AdcService} from 'src/app/services/adc/adc.service';

@Component({
  selector: 'app-adc-consultation',
  templateUrl: './adc-consultation.component.html'
})
export class AdcConsultationComponent implements OnInit {
  doClean = false;
  searchError: string | null = null;
  companiesData: any[] = [];
  selectedCompany: ICompanyAdc | null = null;
  matched = false;

  constructor(private adcService: AdcService) {
  }

  ngOnInit(): void {
  }

  searchId(id: number): void {
    this.adcService.getCompaniesAdcData().subscribe((data) => {
      this.companiesData = data;
      console.log('companies', this.companiesData);
      if (this.companiesData.length) {
        for (let i = 0; i < this.companiesData.length - 1; i++) {
          if (this.companiesData[i].id_number === id) {
            this.matched = true;
            this.selectedCompany = this.companiesData[i];
          }
        }
        if (!this.matched) {
          this.searchError = 'Empresa no encontrada. Intente nuevamente';
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
