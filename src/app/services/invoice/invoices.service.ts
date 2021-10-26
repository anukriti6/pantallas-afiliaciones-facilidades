import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem } from './ItemInterface';
import {IProviderInvoice} from './ProviderInvoiceInterface';
import {ICompanyInvoice} from './CompanyInvoiceInterface';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  private invoicesIdsUrl = 'assets/data/invoicesData.json';
  private providerInvoicesIdsUrl = 'assets/data/providerInvoicesData.json';
  private companyInvoicesIdsUrl = 'assets/data/companyInvoicesData.json';
  constructor(private http: HttpClient) { }
  getInvoices(): Observable<IItem[]> {
    return this.http.get<IItem[]>(this.invoicesIdsUrl);
  }
  getProviderInvoices(): Observable<IProviderInvoice[]> {
    return this.http.get<IProviderInvoice[]>(this.providerInvoicesIdsUrl);
  }
  getCompanyInvoices(): Observable<ICompanyInvoice[]> {
    return this.http.get<ICompanyInvoice[]>(this.companyInvoicesIdsUrl);
  }
}
