import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ICompanyAdc} from './companyAdcInterface';
import {ICompany} from './companyInterface';

@Injectable({
  providedIn: 'root'
})
export class AdcService {
  private companyIdsUrl = 'assets/data/companyAdcData.json';
  private companyItemUrl = 'assets/data/companyItemData.json';

  constructor(private http: HttpClient) {
  }

  getCompaniesAdcData(): Observable<ICompanyAdc[]> {
    return this.http.get<ICompanyAdc[]>(this.companyIdsUrl);
  }

  getCompaniesData(): Observable<ICompany[]> {
    return this.http.get<ICompany[]>(this.companyItemUrl);
  }
}
