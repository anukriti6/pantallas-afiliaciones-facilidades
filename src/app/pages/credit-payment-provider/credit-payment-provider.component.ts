import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {InvoicesService} from '../../services/invoice/invoices.service';
import {IItem} from '../../services/invoice/ItemInterface';
import {NotifierComponent} from '../../components/notifier/notifier.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../components/dialogs/dialog.component';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-credit-payment-provider',
  templateUrl: './credit-payment-provider.component.html',
})
export class CreditPaymentProviderComponent implements OnInit, AfterViewInit {
  doClean = false;
  searchError: string | null = null;
  invoices: IItem[] = [];
  matched = false;
  selectedType: string | null = null;
  types: string[] = ['company', 'provider'];
  items: string[] = ['success', 'error'];
  accounts: string[] = ['14785-343-232', '535-34322-3434', '3432-3432-34546'];
  account = '';
  startDate = false;
  paymentDate = false;
  expirationDate = false;
  observations = false;
  canPay = false;
  email = '';
  total: number | null = null;
  accountBalance: number | null = null;
  dateFilterStart: Date | null = null;
  dateFilterEnd: Date | null = null;
  providerIcon = 'sort_by_alpha';
  icon = 'sort_by_alpha';
  availableBalance = true;
  balance = false;
  company = false;
  // tslint:disable-next-line:variable-name
  client_provider = false;
  // tslint:disable-next-line:variable-name
  concession_date = false;
  // tslint:disable-next-line:max-line-length
  headers: string[] = ['select', 'invoice_number', 'operation_number', 'default_days', 'expiration_date', 'invoice_value', 'balance'];
  headersTotal: string[] = ['payment'];
  /*'start_date', 'effective_date', 'expiration_date', 'interest'*/
  extraHeaders: FormGroup;
  selection = new SelectionModel<IItem>(true, []);
  dataSource: MatTableDataSource<IItem>;

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    this.dataSource.sort = value;
  }

  constructor(private invoiceService: InvoicesService, public fb: FormBuilder, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource(this.invoices);

    this.extraHeaders = fb.group({
      company: false,
      client_provider: false,
      concession_date: false
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('filterValue', filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  searchInvoices(search: any): void {
    console.log('data', search);
    this.invoiceService.getInvoices().subscribe(
      (data) => {
        this.invoices = data;
        this.dataSource = new MatTableDataSource(this.invoices);
      }
    );
  }

  clean(clean: boolean): void {
    this.doClean = clean;
    this.searchError = null;
    this.invoices = [];
    this.extraHeaders = this.fb.group({
      company: false,
      client_provider: false,
      concession_date: false
    });
    this.account = '';
    this.selection.clear();
  }

  calculate(): void {
    this.total = 0;
    this.selection.selected.forEach((item) => {
      // @ts-ignore
      this.total += item.payment;
    });
    this.accountBalance = this.availableBalance ? (this.total + 1000) : (this.total - 100);
    const element = document.getElementById('account_balance');
    if (this.availableBalance) {
      this.canPay = true;
      if (element) {
        element.style.borderColor = '#c1c1c1';
      }
      this.snackBar.openFromComponent(NotifierComponent, {
        data: {
          message: 'Saldo Disponible',
          dismiss: 'Cerrar',
          type: 'Aviso'
        },
        panelClass: 'alert-success'
      });
    } else {
      if (element) {
        element.style.borderColor = '#FF0000';
      }
      this.canPay = false;
      this.snackBar.openFromComponent(NotifierComponent, {
        data: {
          message: 'Saldo No Disponible',
          dismiss: 'Cerrar',
          type: 'Aviso'
        },
        panelClass: 'alert-danger'
      });
    }
    this.availableBalance = !this.availableBalance;
  }

  sortData(e: any): void {
    switch (e.direction) {
      case 'asc':
        this.icon = 'arrow_circle_up';
        break;
      case 'desc':
        this.icon = 'arrow_circle_down';
        break;
      default:
        this.icon = 'sort_by_alpha';
        break;
    }
  }

  openModal(): void {
    const type = this.items[Math.floor(Math.random() * this.items.length)];
    const selected = this.selection.selected.length;
    switch (type) {
      case 'success':
        const successDialog = this.dialog.open(DialogComponent, {
          width: '350px',
          data: {
            total: selected,
            title: 'Pago Exitoso',
            body: (selected > 1 ? 'Fueron pagadas ' : 'fue pagada ') + selected + (selected > 1 ? ' facturas' : ' factura'),
            question: '¿Desea descargar comprobantes?',
            button: 'Si',
            dismiss: 'No'
          }
        });

        successDialog.afterClosed().subscribe(result => {
          if (!result) {
            this.clean(true);
          }
          console.log('The dialog was closed', result);
        });

        break;
      case 'error':

        const errorDialog = this.dialog.open(DialogComponent, {
          width: '350px',
          data: {
            total: selected,
            title: 'Error en Pago',
            body: (selected > 1 ? 'No fueron pagadas ' : 'No fue pagada ') + selected + (selected > 1 ? ' facturas' : ' factura'),
            button: 'Aceptar'
          }
        });

        errorDialog.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
        });

        break;
      default:
        console.log('default');
        break;

    }
  }


  updateTable(): void {
    console.log('this.extraHeaders.value', this.extraHeaders.value);
    const keys = Object.keys(this.extraHeaders.value);
    this.headers = ['select', 'invoice_number', 'operation_number', 'default_days', 'expiration_date', 'invoice_value', 'balance'];
    keys.forEach((key) => {
      const val = this.extraHeaders.value[key];
      switch (key) {
        case 'company':
          if (val) {
            this.headers.splice(1, 0, key);
            console.log('this.headers', this.headers);
          }
          break;
        case 'client_provider':
          if (val) {
            const index = this.headers.findIndex(header => header === 'company');
            if (index >= 0) {
              this.headers.splice(2, 0, key);
            } else {
              this.headers.splice(1, 0, key);
            }
            console.log('this.headers', this.headers);
          }
          break;

        case 'concession_date':
          if (val) {
            const defaultIndex = this.headers.findIndex(header => header === 'default_days');
            if (defaultIndex >= 0) {
              this.headers.splice(defaultIndex, 0, key);
            }
            console.log('this.headers', this.headers);
          }

          break;

        default:
          if (val) {
            this.headers.push(key);
            console.log('key', key);
          }
          break;

      }

    });
    // this.headers.push('payment');
    console.log('this.headers', this.headers);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.invoices.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // tslint:disable-next-line:typedef
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.invoices);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IItem): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
  }
}
