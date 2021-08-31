import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {InvoicesService} from '../../services/invoice/invoices.service';
import {IItem} from '../../services/invoice/ItemInterface';
import {NotifierComponent} from '../../components/notifier/notifier.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../components/dialogs/dialog.component';


@Component({
  selector: 'app-invoice-payment-provider',
  templateUrl: './invoice-payment-provider.component.html',
})
export class InvoicePaymentProviderComponent implements OnInit {
  doClean = false;
  searchError: string | null = null;
  invoices: IItem[] = [];
  matched = false;
  selectedType: string | null = null;
  types: string[] = ['company', 'provider'];
  startDate = false;
  paymentDate = false;
  expirationDate = false;
  observations = false;
  balance = false;
  operationNumber = false;
  // tslint:disable-next-line:max-line-length
  headers: string[] = ['select', 'identification', 'company', 'identification_provider', 'client_provider', 'invoice_number', 'payment_date', 'invoice_value', 'payment'];
  /*'start_date', 'effective_date', 'expiration_date', 'interest'*/
  extraHeaders: FormGroup;
  selection = new SelectionModel<IItem>(true, []);


  constructor(private invoiceService: InvoicesService, public fb: FormBuilder, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.extraHeaders = fb.group({
      start_date: false,
      expiration_date: false,
      observations: false,
      balance: false,
      operationNumber: false
    });
  }

  ngOnInit(): void {

  }

  searchInvoices(search: any): void {
    console.log('data', search);
    this.invoiceService.getInvoices().subscribe(
      (data) => {
        this.invoices = data;
      }
    );
  }

  clean(clean: boolean): void {
    this.doClean = clean;
    this.searchError = null;
    this.invoices = [];
    this.extraHeaders = this.fb.group({
      start_date: false,
      expiration_date: false,
      observations: false,
      balance: false,
      operationNumber: false
    });
    this.selection.clear();
  }

  openModal(type: string): void {
    const selected = this.selection.selected.length;
    switch (type) {
      case 'success':
        const successDialog = this.dialog.open(DialogComponent, {
          width: '350px',
          data: {
            total: selected,
            title: '¿Está seguro de eliminar?',
            body: (selected > 1 ? 'Serán eliminadas ' : 'Será eliminada ') + selected + (selected > 1 ? ' facturas' : ' factura'),
            button: 'Eliminar'
          }
        });

        successDialog.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if (result) {
            this.snackBar.openFromComponent(NotifierComponent, {
              data: {
                message: 'Confirmación exitosa',
                dismiss: 'Cerrar',
                type: 'Alerta'
              },
              panelClass: 'alert-success'
            });
          }
        });

        break;
      case 'error':

        const errorDialog = this.dialog.open(DialogComponent, {
          width: '350px',
          data: {
            total: selected,
            title: '¿Está seguro de rechazar?',
            body: (selected > 1 ? 'Serán rechazadas ' : 'Será rechazada ') + selected + (selected > 1 ? ' facturas' : ' factura'),
            button: 'Rechazar'
          }
        });

        errorDialog.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if (result) {
            this.snackBar.openFromComponent(NotifierComponent, {
              data: {
                message: 'Rechazo Exitoso',
                dismiss: 'Cerrar',
                type: 'Alerta'
              },
              panelClass: 'alert-danger'
            });
          }
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
    this.headers = ['select', 'identification', 'company', 'identification_provider', 'client_provider', 'invoice_number', 'payment_date', 'invoice_value'];
    keys.forEach((key) => {
      const val = this.extraHeaders.value[key];
      this.headers.push(key);
      console.log('key', key);
    });
    this.headers.push('payment');
    console.log('this.headers', this.headers);
    console.log('this.observations', this.observations);
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
