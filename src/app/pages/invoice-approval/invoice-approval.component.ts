import {Component, OnInit} from '@angular/core';
import {IItem} from '../../services/invoice/ItemInterface';
import {InvoicesService} from '../../services/invoice/invoices.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotifierComponent} from '../../components/notifier/notifier.component';
import {SuccessDialogComponent} from '../../components/dialogs/success-dialog.component';
import {DeclineDialogComponent} from '../../components/dialogs/decline-dialog.component';
import {DialogComponent} from '../../components/dialogs/dialog.component';

@Component({
  selector: 'app-invoice-approval',
  templateUrl: './invoice-approval.component.html',
})
export class InvoiceApprovalComponent implements OnInit {
  doClean = false;
  searchError: string | null = null;
  invoices: IItem[] = [];
  matched = false;
  selectedType: string | null = null;
  types: string[] = ['company', 'provider'];
  startDate = false;
  effectiveDate = false;
  expirationDate = false;
  interest = false;
  headers: string[] = ['select', 'company', 'identification', 'client_provider', 'invoice_number', 'invoice_value', 'start_date', 'observations'];
  /*'start_date', 'effective_date', 'expiration_date', 'interest'*/
  extraHeaders: FormGroup;
  selection = new SelectionModel<IItem>(true, []);


  constructor(private invoiceService: InvoicesService, public fb: FormBuilder, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.extraHeaders = fb.group({
      effective_date: false,
      expiration_date: false,
      interest: false
    });
  }

  ngOnInit(): void {

  }

  openModal(type: string): void {
    const selected = this.selection.selected.length;
    switch (type) {
      case 'success':
        const successDialog = this.dialog.open(DialogComponent, {
          width: '350px',
          data: {
            total: selected,
            title: '¿Está seguro de aprobar?',
            body: (selected > 1 ? 'Serán aprobadas ' : 'Será aprobada ') + selected + (selected > 1 ? ' facturas' : ' factura'),
            button: 'Aprobar'
          }
        });

        successDialog.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if (result) {
            this.snackBar.openFromComponent(NotifierComponent, {
              data: {
                message: 'Aprobación exitosa',
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

  searchInvoices(search: any): void {
    console.log('data', search);
    this.invoiceService.getInvoices().subscribe(
      (data) => {
        this.invoices = data;
        console.log('data', data);
        console.log('invoices', this.invoices);
        /*if (this.invoices.length) {
          for (let i = 0; i < this.invoices.length; i++) {
            if (this.invoices[i].idNumber === id) {
              this.matched = true;
              this.currEasinessData = this.fullEasinessData[i];
              this.searchError = null;
            }
          }
          if (!this.matched) {
            this.searchError = 'Usuario no encontrado. Intente nuevamente';
            this.currEasinessData = null;
          }
        }*/
      }
    );
  }

  clean(clean: boolean): void {
    this.doClean = clean;
    this.searchError = null;
    this.invoices = [];
    this.extraHeaders = this.fb.group({
      effective_date: false,
      expiration_date: false,
      interest: false
    });
    this.selection.clear();
  }

  updateTable(): void {
    console.log('this.extraHeaders.value', this.extraHeaders.value);
    const keys = Object.keys(this.extraHeaders.value);
    this.headers = ['select', 'company', 'identification', 'client_provider', 'invoice_number', 'invoice_value', 'start_date'];
    keys.forEach((key) => {
      const val = this.extraHeaders.value[key];
      if (val) {
        this.headers.push(key);
      }
    });
    this.headers.push('observations');
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


