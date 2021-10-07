import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IProvider} from './ProviderInterface';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private providerDataUrl = 'assets/data/providerData.json';
  private providerItemDataUrl = 'assets/data/providerItemData.json';

  constructor(private http: HttpClient) {
  }

  getProvidersData(): Observable<any[]> {
    return this.http.get<any[]>(this.providerDataUrl);
  }

  getProviderItemData(): Observable<IProvider[]> {
    return this.http.get<IProvider[]>(this.providerItemDataUrl);
  }
}
