import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {IInvoice} from '../../services/invoice/invoiceInterface';

import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-massive-invoice-provider',
  templateUrl: './massive-invoice-provider.component.html'
})
export class MassiveInvoiceProviderComponent implements OnInit {


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
  uploading = false;
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
      observations: 'Creado Exitosamente',
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
      observations: 'Falta Empresa',
      request: '',
      identification: '17457542001',
      identification_type: 'R-P-C',
      status: 'Fallido'
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
      observations: 'Creado Exitosamente',
      request: '',
      identification: '17457542001',
      identification_type: 'R-P-C',
      status: 'Exitoso'
    },
    {
      id: 1,
      type: 'Factura',
      regional: 'Regional 4',
      start_date: new Date(),
      authorization: '100005454000000000',
      value: '2500,0',
      company: 'Empresa Activa 3',
      provider: 'Proveedor 5',
      payment_date: new Date(),
      number: '18457958413',
      observations: 'Falta valor',
      request: '',
      identification: '17457542001',
      identification_type: 'R-P-C',
      status: 'Fallido'
    },
    {
      id: 1,
      type: 'Factura',
      regional: 'Regional 3',
      start_date: new Date(),
      authorization: '100005454000000000',
      value: '2500,0',
      company: 'Empresa Activa 3',
      provider: 'Proveedor 7',
      payment_date: new Date(),
      number: '18457958413',
      observations: 'Datos Incorrectos',
      request: '',
      identification: '17457542001',
      identification_type: 'R-P-C',
      status: 'Fallido'
    },

  ];
  percentage = 0;


  displayedColumns: string[] = ['authorization', 'number', 'payment_date', 'value', 'identification', 'identification_type', 'provider', 'status', 'observations'];

  @Output() Clean = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {


  }

  clean(): void {
    this.Clean.emit(true);
  }

  open_file(): void {
    const element = document.getElementById('file_input');
    console.log('file_input', element);
    if (element) {
      element.click();
    }
  }

  upload(): void {
    this.uploading = true;
    const count = setInterval(() => {
      if (this.percentage < 100) {
        this.percentage++;
      } else {
        clearInterval(count);
        this.percentage = 0;
        this.uploading = false;
      }
    }, 150);

  }


}
