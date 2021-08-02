import {Component, OnInit} from '@angular/core';
import {IItem} from '../../services/invoice/ItemInterface';
import {InvoicesService} from '../../services/invoice/invoices.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';


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
  headers: string[] = ['select', 'company', 'identification', 'client_provider', 'invoice_number', 'invoice_value', 'observations'];
  /*'start_date', 'effective_date', 'expiration_date', 'interest'*/
  extraHeaders: FormGroup;
  selection = new SelectionModel<IItem>(true, []);


  constructor(private invoiceService: InvoicesService, fb: FormBuilder) {
    this.extraHeaders = fb.group({
      start_date: false,
      effective_date: false,
      expiration_date: false,
      interest: false
    });
  }

  ngOnInit(): void {

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
  }

  updateTable(): void {
    console.log('this.extraHeaders.value', this.extraHeaders.value);
    const keys = Object.keys(this.extraHeaders.value);
    this.headers = ['select', 'company', 'identification', 'client_provider', 'invoice_number', 'invoice_value', 'observations'];
    keys.forEach((key) => {
      const val = this.extraHeaders.value[key];
      if (val) {
        this.headers.push(key);
      }
    });
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
