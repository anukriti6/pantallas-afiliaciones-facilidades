import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {InvoicesService} from '../../services/invoice/invoices.service';
import {IItem} from '../../services/invoice/ItemInterface';
import {SuccessDialogComponent} from '../../components/dialogs/success-dialog.component';
import {NotifierComponent} from '../../components/notifier/notifier.component';
import {DeclineDialogComponent} from '../../components/dialogs/decline-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from "../../components/dialogs/dialog.component";


@Component({
  selector: 'app-invoice-delete',
  templateUrl: './invoice-delete.component.html',
})
export class InvoiceDeleteComponent implements OnInit {
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
  headers: string[] = ['select', 'company', 'identification', 'client_provider', 'invoice_number', 'invoice_value', 'start_date', 'status', 'observations'];
  /*'start_date', 'effective_date', 'expiration_date', 'interest'*/
  extraHeaders: FormGroup;
  selection = new SelectionModel<IItem>(true, []);


  constructor(private invoiceService: InvoicesService, public fb: FormBuilder, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.extraHeaders = fb.group({
      payment_date: false,
      expiration_date: false,
      observations: false
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
      payment_date: false,
      expiration_date: false,
      observations: false
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
    this.headers = ['select', 'company', 'identification', 'client_provider', 'invoice_number', 'invoice_value', 'start_date'];
    keys.forEach((key) => {
      const val = this.extraHeaders.value[key];
      if (val && key !== 'observations') {
        this.headers.push(key);
        console.log('key', key);
      }
    });
    this.headers.push('status');
    console.log('this.headers', this.headers);
    console.log('this.observations', this.observations);
    if (this.observations) {
      this.headers.push('observations');
    }
    console.log('headers', this.headers);
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
