import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem } from './ItemInterface';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  private invoicesIdsUrl = 'assets/data/invoicesData.json';
  constructor(private http: HttpClient) { }
  getInvoices(): Observable<IItem[]> {
    return this.http.get<IItem[]>(this.invoicesIdsUrl);
  }
}
