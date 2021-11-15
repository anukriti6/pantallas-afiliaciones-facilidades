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
import {InvoicesService} from '../../services/invoice/invoices.service';
import {IProviderInvoice} from '../../services/invoice/ProviderInvoiceInterface';
import {ICompanyInvoice} from '../../services/invoice/CompanyInvoiceInterface';


@Component({
  selector: 'app-print-payments',
  templateUrl: './print-payments.component.html',
})
export class PrintPaymentsComponent implements OnInit {
  doClean = false;
  data: any = {
    product: null,
    selectedStartDate: null,
    selectedEndDate: null,
    invoice_number: null,
    operation_number: null,
  };

  invoiceTypes: string[] = ['TODOS', 'INGRESADO', 'APROBADO', 'CONFIRMADO', 'ANTICIPADO', 'DEBITADO', 'FINALIZADO', 'ELIMINADO'];
  searchError: string | null = null;
  filter: string | null = null;
    payedInvoices: IProviderInvoice[] = [];
  matched = false;
  searchType: string | null = null;
  types: string[] = ['provider','distributor'];
  paymentsHeaders: string[] = ['invoice_number', 'operation_number', 'payment_date', 'actions'];
  companyInvoiceFields: FormGroup;
  providerInvoiceFields: FormGroup;
  errorNumber: string | null = null;
  selection = new SelectionModel<IItem>(true, []);
  payedInvoicesDataSource: MatTableDataSource<IProviderInvoice>;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    this.payedInvoicesDataSource.sort = value;
  }

  // tslint:disable-next-line:max-line-length
  constructor(private invoicesService: InvoicesService, public fb: FormBuilder, private snackBar: MatSnackBar) {
    this.payedInvoicesDataSource = new MatTableDataSource(this.payedInvoices);


    this.companyInvoiceFields = fb.group({
      ruc: false,
      company: false,
      provider_id: false,
      client_provider: false,
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
        product: null,
        selectedStartDate: null,
        selectedEndDate: null,
        invoice_number: null,
        operation_number: null,
    };
    this.payedInvoices = [];

  }


  search(): void {
    this.invoicesService.getProviderInvoices().subscribe(
      (data: IProviderInvoice[]) => {
        this.payedInvoices = data;
        if (this.payedInvoices.length < 1) {
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
        /*this.providerInvoices.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });*/
        this.payedInvoicesDataSource = new MatTableDataSource(this.payedInvoices);
      }
    );
  }
  download(payment: any): void {
      this.snackBar.openFromComponent(NotifierComponent, {
          data: {
              message: 'Se descarga el comprobante de la factura '+payment.invoice_number,
              dismiss: 'Cerrar',
              type: 'Alerta'
          },
          duration: 1500,
          panelClass: 'alert-success'
      });
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
