import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {IItem} from '../../services/invoice/ItemInterface';
import {NotifierComponent} from '../../components/notifier/notifier.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ProviderService} from '../../services/provider/provider.service';
import {AdcService} from '../../services/adc/adc.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {IProvider} from '../../services/provider/ProviderInterface';
import {ICompany} from '../../services/adc/companyInterface';


@Component({
  selector: 'app-invoices-provider-detail',
  templateUrl: './invoices-provider-detail.component.html',
})
export class InvoicesProviderDetailComponent implements OnInit {
  doClean = false;
  data: any = {
    company: null,
    provider: null,
    selectedStartDate: null,
    selectedEndDate: null,
    type: null,
    number: null,
  };

  invoiceTypes: string[] = ['TODOS', 'INGRESADO', 'APROBADO', 'CONFIRMADO', 'ANTICIPADO', 'DEBITADO', 'FINALIZADO', 'ELIMINADO'];
  searchError: string | null = null;
  filter: string | null = null;
  providerInvoices: ICompany[] = [];
  companyInvoices: IProvider[] = [];
  matched = false;
  searchType: string | null = null;
  types: string[] = ['company', 'provider'];
  filterTypes: string[] = ['ACTIVO', 'INACTIVO', 'BLOQUEADO'];
  companiesNames: string[] = ['Telas S.A.', 'Flores del Valle', 'Coca Cola S.A.', 'Renault', 'KFC', 'El Rosado'];
  providersNames: string[] = ['Aceros Ecuador', 'Supermaxi', 'Frutas S.A.', 'Metalurgica', 'Products S.A.', 'Diamo'];
  filteredCompaniesNames: string[] = [];
  filteredProvidersNames: string[] = [];
  companyInvoicesHeaders: string[] = ['invoice_number', 'invoice_amount', 'start_date', 'payment_date', 'credit_operation_number', 'credit_expiration_date', 'default_days', 'status'];
  providerInvoicesHeaders: string[] = ['invoice_number', 'invoice_amount', 'start_date', 'advance_date', 'payment_date', 'status'];
  companyInvoiceFields: FormGroup;
  providerInvoiceFields: FormGroup;
  errorNumber: string | null = null;
  selection = new SelectionModel<IItem>(true, []);
  providerInvoicesDataSource: MatTableDataSource<ICompany>;
  companyInvoicesDataSource: MatTableDataSource<IProvider>;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    this.providerInvoicesDataSource.sort = value;
    this.companyInvoicesDataSource.sort = value;
  }

  // tslint:disable-next-line:max-line-length
  constructor(private companyService: AdcService, private providerService: ProviderService, public fb: FormBuilder, private snackBar: MatSnackBar) {
    this.providerInvoicesDataSource = new MatTableDataSource(this.providerInvoices);
    this.companyInvoicesDataSource = new MatTableDataSource(this.companyInvoices);
    this.filteredCompaniesNames = this.companiesNames.sort();
    this.filteredProvidersNames = this.providersNames.sort();
    this.companyInvoiceFields = fb.group({
      ruc: false,
      company: false,
      provider_id: false,
      client_provider: false,
      start_date: false,
      solca: false,
      credit_cuota: false,
      interest_value: false,
      default_interest: false,
    });
    this.providerInvoiceFields = fb.group({
      ruc: false,
      company: false,
      provider_id: false,
      client_provider: false,
      advance_provider_cuota: false,
      advance_value: false,
      solca: false
    });
  }

  ngOnInit(): void {

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


  clean(): void {
    this.searchError = null;
    this.searchType = null;
    this.filter = null;
    this.data = {
      company: null,
      provider: null
    };
    this.providerInvoices = [];
    this.companyInvoices = [];
    this.companyInvoiceFields = this.fb.group({
      ruc: false,
      company: false,
      provider_id: false,
      client_provider: false,
      start_date: false,
      solca: false,
      credit_cuota: false,
      interest_value: false,
      default_interest: false,
    });
    this.providerInvoiceFields = this.fb.group({
      ruc: false,
      company: false,
      provider_id: false,
      client_provider: false,
      advance_provider_cuota: false,
      advance_value: false,
      solca: false
    });
  }

  applyCompanyFilter(event: Event): void {
    if (this.filter) {
      const filterValue = this.filter;
      console.log('filterValue', filterValue);
      this.providerInvoicesDataSource.filter = filterValue.trim().toLowerCase();
      if (this.providerInvoicesDataSource.paginator) {
        this.providerInvoicesDataSource.paginator.firstPage();
      }
    } else {
      this.providerInvoicesDataSource.filter = '';
    }
  }

  applyProviderFilter(event: Event): void {
    if (this.filter) {
      const filterValue = this.filter;
      console.log('filterValue', filterValue);
      this.companyInvoicesDataSource.filter = filterValue.trim().toLowerCase();
      if (this.companyInvoicesDataSource.paginator) {
        this.companyInvoicesDataSource.paginator.firstPage();
      }
    } else {
      this.companyInvoicesDataSource.filter = '';
    }
  }


  updateProviderInvoicesTable(): void {
    console.log('this.extraHeaders.value', this.providerInvoiceFields.value);
    // tslint:disable-next-line:max-line-length
    this.providerInvoicesHeaders = ['invoice_number', 'invoice_amount', 'start_date', 'advance_date', 'payment_date', 'status'];
    const keys = Object.keys(this.providerInvoiceFields.value);
    keys.forEach((key) => {
      const val = this.providerInvoiceFields.value[key];
      if (val) {
        this.providerInvoicesHeaders.push(key);
      }
    });
  }

  updateCompanyInvoicesTable(): void {
    console.log('this.extraHeaders.value', this.companyInvoiceFields.value);
    this.companyInvoicesHeaders = ['invoice_number', 'invoice_amount', 'start_date', 'payment_date', 'credit_operation_number', 'credit_expiration_date', 'default_days', 'status'];
    const keys = Object.keys(this.companyInvoiceFields.value);
    keys.forEach((key) => {
      const val = this.companyInvoiceFields.value[key];
      if (val) {
        this.companyInvoicesHeaders.push(key);
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
      this.searchProviderInvoices();
    } else if (this.searchType === 'company') {
      this.searchCompanyInvoices();
    }
  }

  searchProviderInvoices(): void {
    this.companyService.getCompaniesData().subscribe(
      (data: ICompany[]) => {
        this.providerInvoices = data;
        if (this.providerInvoices.length < 1) {
          this.snackBar.openFromComponent(NotifierComponent, {
            data: {
              message: 'No hay facturas',
              dismiss: 'Cerrar',
              type: 'Alerta'
            },
            duration: 1500,
            panelClass: 'alert-danger'
          });
          return;
        }
        this.providerInvoices.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        this.providerInvoicesDataSource = new MatTableDataSource(this.providerInvoices);
      }
    );
  }

  searchCompanyInvoices(): void {
    this.providerService.getProviderItemData().subscribe(
      (data: IProvider[]) => {
        this.companyInvoices = data;
        if (this.companyInvoices.length < 1) {
          this.snackBar.openFromComponent(NotifierComponent, {
            data: {
              message: 'No hay facturas',
              dismiss: 'Cerrar',
              type: 'Alerta'
            },
            duration: 1500,
            panelClass: 'alert-danger'
          });
          return;
        }
        this.companyInvoices.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        this.companyInvoicesDataSource = new MatTableDataSource(this.companyInvoices);
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
