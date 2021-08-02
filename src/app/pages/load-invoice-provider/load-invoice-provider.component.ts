import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-load-invoice-provider',
  templateUrl: './load-invoice-provider.component.html'
})
export class LoadInvoiceProviderComponent implements OnInit {
  doClean = false;
  selectedType: string | null = null;
  types: string[] = ['individual', 'massive'];
  constructor() {}

  ngOnInit(): void {}

  selectType(type: string | null): void {
    this.selectedType = type;
  }

  clean(clean: boolean): void {
    this.doClean = clean;
    this.selectedType = null;
  }
}
