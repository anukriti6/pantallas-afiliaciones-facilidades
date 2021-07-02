import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {IInvoice} from '../../services/invoice/invoiceInterface';


@Component({
  selector: 'app-individual-invoice-provider',
  templateUrl: './individual-invoice-provider.component.html',
  styleUrls: ['./individual-invoice-provider.component.scss']
})
export class IndividualInvoiceProviderComponent implements OnInit {


  invoice: IInvoice =
    {
      id: 1,
      type: 'Factura',
      regional: 'Regional Activa',
      start_date: new Date(),
      authorization: '100005454000000000',
      value: '2500,0',
      company: 'Empresa Activa 1',
      provider: 'Proveedor Activo',
      payment_date: new Date(),
      number: '18457958413',
      observations: '',
      request: '',
      identification: '',
      identification_type: '',
      status: ''
    };
  availableSpace = '48000,00';
  totalInvoice = '2500,00';
  invoices: IInvoice[] = [
    {
      id: 1,
      type: 'Factura',
      regional: 'Regional Activa',
      start_date: new Date(),
      authorization: '100005454000000000',
      value: '2500,0',
      company: 'Empresa Activa 1',
      provider: 'Proveedor Activo',
      payment_date: new Date(),
      number: '18457958413',
      observations: 'Nota',
      request: '',
      identification: '17457542001',
      identification_type: 'R-P-C',
      status: 'Exitoso'
    },
    {
      id: 1,
      type: 'Factura',
      regional: 'Regional Activa',
      start_date: new Date(),
      authorization: '100005454000000000',
      value: '2500,0',
      company: 'Empresa Activa 2',
      provider: 'Proveedor 2',
      payment_date: new Date(),
      number: '18457958413',
      observations: 'Nota',
      request: '',
      identification: '17457542001',
      identification_type: 'R-P-C',
      status: 'Exitoso'
    },
    {
      id: 1,
      type: 'Factura',
      regional: 'Regional Activa',
      start_date: new Date(),
      authorization: '100005454000000000',
      value: '2500,0',
      company: 'Empresa Activa 3',
      provider: 'Proveedor 3',
      payment_date: new Date(),
      number: '18457958413',
      observations: 'Nota',
      request: '',
      identification: '17457542001',
      identification_type: 'R-P-C',
      status: 'Exitoso'
    },

  ];


  displayedColumns: string[] = ['authorization', 'number', 'payment_date', 'value', 'identification', 'identification_type', 'provider', 'status', 'observations'];

  @Output() Clean = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {


  }

  clean(): void {
    this.Clean.emit(true);
  }


}
