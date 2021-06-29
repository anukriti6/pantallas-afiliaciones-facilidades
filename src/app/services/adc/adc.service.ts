import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICompanyAdc } from './companyAdcInterface';

@Injectable({
  providedIn: 'root'
})
export class AdcService {
  private companyIdsUrl = 'assets/data/companyAdcData.json';
  constructor(private http: HttpClient) { }
  getCompaniesAdcData(): Observable<ICompanyAdc[]> {
    return this.http.get<ICompanyAdc[]>(this.companyIdsUrl);
  }
}
