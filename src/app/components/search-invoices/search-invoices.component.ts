import {Component, OnInit, Output, EventEmitter, Input, SimpleChanges} from '@angular/core';


@Component({
  selector: 'app-search-invoices',
  templateUrl: './search-invoices.component.html',
})
export class SearchInvoicesComponent implements OnInit {
  doClean = false;
  selectedType: string | null = null;
  types: string[] = ['company', 'provider'];
  companySearch = '';
  filteredCompanyNames: string[] = [];
  companyNames: string[] = ['Coca cola', 'la industrial', 'Renault'];
  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;
  identification: number | null = null;
  number: number | null = null;
  data: any = {
    identification: null,
    company: null,
    selectedType: null,
    selectedEndDate: null,
    selectedStartDate: null,
    number: null
  };


  @Input() set clean(clean: boolean) {
    this.doClean = clean;
    this.cleanFields(this.doClean);
  }

  get clean(): boolean {
    return this.doClean;
  }

  @Input() searchError: string | null = null;
  @Output() searchObj = new EventEmitter<any>();
  typeIds: string[] = ['RUC', 'Cédula de identidad'];
  typeId: string | null = null;
  id: number | null = null;
  errorId: string | null = null;
  errorNumber: string | null = null;

  constructor() {
  }

  ngOnInit(): void {
    this.typeId = this.typeIds[0];
    this.filteredCompanyNames = this.companyNames;
  }

  changedCompanySearch(): void {
    console.log('companySearch', this.data.company !== null && this.data.company !== '');
    if (this.data.company !== null && this.data.company !== '') {
      this.filteredCompanyNames = this.companyNames.filter((item) => item.includes(this.data.company));
      console.log('filteredCompanyNames', this.filteredCompanyNames);
    } else {
      this.filteredCompanyNames = this.companyNames;
      console.log('filteredCompanyNames', this.filteredCompanyNames);
    }
  }

  validateId(length: number): void {
    const element = this.typeId === this.typeIds[0] ? document.getElementById('idRuc') : document.getElementById('id');
    if (this.id != null) {
      if (this.id.toString().length < length || this.id.toString().length > length) {
        this.errorId = 'La longitud de la identificación debe ser de ' + length + ' caracteres';
        if (element) {
          element.style.borderColor = '#FF0000';
        }
      } else {
        this.errorId = null;
        if (element) {
          element.style.borderColor = '#c1c1c1';
        }
      }
    } else {
      if (element) {
        element.style.borderColor = '#c1c1c1';
      }
    }
  }

  validateNumber(length: number): void {
    const element = document.getElementById('number');
    if (this.data.number != null) {
      if (this.data.number.toString().length > length) {
        this.errorNumber = 'La longitud de la identificación debe ser de maximo' + length + ' caracteres';
        if (element) {
          element.style.borderColor = '#FF0000';
        }
      } else {
        this.errorNumber = null;
        if (element) {
          element.style.borderColor = '#c1c1c1';
        }
      }
    } else {
      if (element) {
        element.style.borderColor = '#c1c1c1';
      }
    }
  }

  changedSelection(): void {
    this.id = null;
    this.errorId = null;
  }

  search(): void {
    console.log('data', this.data);
    this.searchObj.emit(this.data);

  }

  cleanFields(clean: boolean): void {
    if (clean) {
      this.data = {
        identification: null,
        company: null,
        selectedType: null,
        selectedEndDate: null,
        selectedStartDate: null,
        number: null
      };
    }
  }
}
