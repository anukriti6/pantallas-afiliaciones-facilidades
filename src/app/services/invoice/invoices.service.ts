import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SIInvoice } from './smallInvoiceInterface';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  private invoicesIdsUrl = 'assets/data/invoicesData.json';
  constructor(private http: HttpClient) { }
  getInvoices(): Observable<SIInvoice[]> {
    return this.http.get<SIInvoice[]>(this.invoicesIdsUrl);
  }
}
