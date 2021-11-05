import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {IItem} from '../../services/invoice/ItemInterface';
import {NotifierComponent} from '../../components/notifier/notifier.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProviderService} from '../../services/provider/provider.service';
import {AdcService} from '../../services/adc/adc.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {IProvider} from '../../services/provider/ProviderInterface';
import {ICompany} from '../../services/adc/companyInterface';


@Component({
  selector: 'app-company-provider-detail',
  templateUrl: './company-provider-detail.component.html',
})
export class CompanyProviderDetailComponent implements OnInit {
  doClean = false;
  data: any = {
    company: null,
    provider: null
  };
  companyData: any = {
    ease: 'Nombre de la facilidad',
    credit_line_approval_date: '25/02/2018',
    credit_line_expiration_date: '31/12/2025',
    approved_quota: '1,400,000',
    available_quota: '600,000',
    blocked_quota: '400,000',
    used_quota: '400,000',
  };
  searchError: string | null = null;
  filter: string | null = null;
  companies: ICompany[] = [];
  providers: IProvider[] = [];
  matched = false;
  searchType: string | null = null;
  types: string[] = ['company', 'provider'];
  filterTypes: string[] = ['ACTIVO', 'INACTIVO', 'BLOQUEADO'];
  companiesNames: string[] = ['Telas S.A.', 'Flores del Valle', 'Coca Cola S.A.', 'Renault', 'KFC', 'El Rosado'];
  providersNames: string[] = ['Aceros Ecuador', 'Supermaxi', 'Frutas S.A.', 'Metalurgica', 'Products S.A.', 'Diamo'];
  filteredCompaniesNames: string[] = [];
  filteredProvidersNames: string[] = [];
  providerHeaders: string[] = ['identification', 'provider', 'provider_advance_rate', 'payment_account', 'provider_email'];
  companyHeaders: string[] = ['company_identification', 'company_name', 'provider_advance_rate', 'payment_account', 'provider_email'];
  extraFields: FormGroup;
  selection = new SelectionModel<IItem>(true, []);
  companyDataSource: MatTableDataSource<ICompany>;
  providerDataSource: MatTableDataSource<IProvider>;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    this.companyDataSource.sort = value;
    this.providerDataSource.sort = value;
  }

  // tslint:disable-next-line:max-line-length
  constructor(private companyService: AdcService, private providerService: ProviderService, public fb: FormBuilder, private snackBar: MatSnackBar) {
    this.companyDataSource = new MatTableDataSource(this.companies);
    this.providerDataSource = new MatTableDataSource(this.providers);
    this.filteredCompaniesNames = this.companiesNames.sort();
    this.filteredProvidersNames = this.providersNames.sort();
    this.extraFields = fb.group({
      status: false,
      address: false,
      phone: false,
      cellphone: false
    });
  }

  ngOnInit(): void {}


  clean(): void {
    this.searchError = null;
    this.searchType = null;
    this.filter = null;
    this.data = {
      company: null,
      provider: null
    };
    this.companies = [];
    this.providers = [];
    this.extraFields = this.fb.group({
      status: false,
      address: false,
      phone: false,
      cellphone: false
    });
  }

  applyCompanyFilter(event: Event): void {
    if (this.filter) {
      const filterValue = this.filter;
      console.log('filterValue', filterValue);
      this.companyDataSource.filter = filterValue.trim().toLowerCase();
      if (this.companyDataSource.paginator) {
        this.companyDataSource.paginator.firstPage();
      }
    } else {
      this.companyDataSource.filter = '';
    }
  }

  applyProviderFilter(event: Event): void {
    if (this.filter) {
      const filterValue = this.filter;
      console.log('filterValue', filterValue);
      this.providerDataSource.filter = filterValue.trim().toLowerCase();
      if (this.providerDataSource.paginator) {
        this.providerDataSource.paginator.firstPage();
      }
    } else {
      this.companyDataSource.filter = '';
    }
  }


  updateTable(): void {
    console.log('this.extraHeaders.value', this.extraFields.value);
    if (this.searchType === 'provider') {
      this.companyHeaders = ['company_identification', 'company_name', 'provider_advance_rate', 'payment_account', 'provider_email'];
    } else if (this.searchType === 'company') {
      this.providerHeaders = ['identification', 'provider', 'provider_advance_rate', 'payment_account', 'provider_email'];
    }
    const keys = Object.keys(this.extraFields.value);
    keys.forEach((key) => {
      const val = this.extraFields.value[key];
      if (this.searchType === 'provider' && val) {
        this.companyHeaders.push(key);
      } else if (this.searchType === 'company' && val) {
        this.providerHeaders.push(key);
      }
    });
  }

  changeCompaniesSearch(): void {
    if (this.data.company !== null && this.data.company !== '') {
      this.filteredCompaniesNames =
        this.companiesNames.filter((item) => item.toLowerCase().includes(this.data.company.toLowerCase())).sort();
    } else {
      this.filteredCompaniesNames = this.companiesNames.sort();
    }
  }

  changeProvidersSearch(): void {
    if (this.data.provider !== null && this.data.provider !== '') {
      this.filteredProvidersNames =
        this.providersNames.filter((item) => item.toLowerCase().includes(this.data.specialist.toLowerCase())).sort();
    } else {
      this.filteredProvidersNames = this.providersNames.sort();
    }
  }

  search(): void {
    console.log('data', this.data);
    if (this.searchType === 'provider') {
      this.searchCompanies();
    } else if (this.searchType === 'company') {
      this.searchProviders();
    }
  }

  searchCompanies(): void {
    this.companyService.getCompaniesData().subscribe(
      (data: ICompany[]) => {
        this.companies = data;
        if (this.companies.length < 1) {
          this.snackBar.openFromComponent(NotifierComponent, {
            data: {
              message: 'No hay empresas',
              dismiss: 'Cerrar',
              type: 'Alerta'
            },
            duration: 1500,
            panelClass: 'alert-danger'
          });
          return;
        }
        this.companies.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        this.companyDataSource = new MatTableDataSource(this.companies);
      }
    );
  }

  searchProviders(): void {
    this.providerService.getProviderItemData().subscribe(
      (data: IProvider[]) => {
        this.providers = data;
        if (this.providers.length < 1) {
          this.snackBar.openFromComponent(NotifierComponent, {
            data: {
              message: 'No hay proveedores',
              dismiss: 'Cerrar',
              type: 'Alerta'
            },
            duration: 1500,
            panelClass: 'alert-danger'
          });
          return;
        }
        this.providers.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        this.providerDataSource = new MatTableDataSource(this.providers);
      }
    );
  }


  /** Whether the number of selected elements matches the total number of rows. */
  /*  isAllSelected(): boolean {
      const numSelected = this.selection.selected.length;
      const numRows = this.invoices.length;
      return numSelected === numRows;
    }

    /!** Selects all rows if they are not all selected; otherwise clear selection. *!/
    // tslint:disable-next-line:typedef
    masterToggle() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
      this.selection.select(...this.invoices);
    }

    /!** The label for the checkbox on the passed row *!/
    checkboxLabel(row?: IItem): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
    }*/
}
