import {Component, OnInit} from '@angular/core';
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
  curProviderData: INaturalProvider | null = null;
  matched = false;

  constructor(private providerDataService: ProviderService) {
  }

  ngOnInit(): void {
  }

  searchId(id: number): void {
    this.providerDataService.getProvidersData().subscribe((data) => {
      this.providersData = data;
      if (this.providersData.length) {
        for (let i = 0; i < this.providersData.length; i++) {
          if (this.providersData[i].idNumber === id) {
            this.matched = true;
            this.curProviderData = this.providersData[i];
          }
        }
        if (!this.matched) {
          this.searchError = 'Usuario no encontrado. Intente nuevamente';
          this.curProviderData = null;
        }
      }
    });
  }

  clean(clean: boolean): void {
    this.doClean = clean;
    this.searchError = null;
    this.curProviderData = null;
  }
}
