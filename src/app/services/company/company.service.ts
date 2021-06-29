import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICompanyData } from './companyDataInterface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private companyIdsUrl = 'assets/data/companyData.json';
  constructor(private http: HttpClient) { }
  getCompaniesData(): Observable<ICompanyData[]> {
    return this.http.get<ICompanyData[]>(this.companyIdsUrl);
  }
}
