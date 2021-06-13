import {Component, OnInit} from '@angular/core';
import { IAnchorCompany } from 'src/app/services/provider/anchorCompanyInterface';
import {ILegalProvider} from 'src/app/services/provider/legalProviderInterface';
import {INaturalProvider} from 'src/app/services/provider/naturalProviderInterface';
import {ProviderService} from 'src/app/services/provider/provider.service';

@Component({
  selector: 'app-affiliate-provider',
  templateUrl: './affiliate-provider.component.html'
})
export class AffiliateProviderComponent implements OnInit {
  doClean = false;
  searchError: string | null = null;
  providersData: any[] = [];
  curNaturalProviderData: INaturalProvider | null = null;
  curLegalProviderData: ILegalProvider | null = null;
  anchorCompanies: IAnchorCompany[] = [];
  matched = false;

  constructor(private providerDataService: ProviderService) {
  }

  ngOnInit(): void {
  }

  searchId(id: number): void {
    this.providerDataService.getProvidersData().subscribe((data) => {
      this.providersData = data;
      if (this.providersData.length) {
        for (let i = 0; i < this.providersData.length - 1; i++) {
          if (this.providersData[i].idNumber === id) {
            this.matched = true;
            if (this.providersData[i].type == 'legal') {
              this.curNaturalProviderData = null;
              this.curLegalProviderData = this.providersData[i];
            } else {
              this.curNaturalProviderData = this.providersData[i];
              this.curLegalProviderData = null;
            }
          }
        }
        if (!this.matched) {
          this.searchError = 'Usuario no encontrado. Intente nuevamente';
          this.curNaturalProviderData = null;
          this.curLegalProviderData = null;
        }
      }
      this.anchorCompanies = this.providersData[this.providersData.length - 1].anchorCompanies;
    });
  }

  clean(clean: boolean): void {
    this.doClean = clean;
    this.searchError = null;
    this.curNaturalProviderData = null;
    this.curLegalProviderData = null;
  }
}
