import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private providerDataUrl: string = 'assets/data/providerData.json';
  constructor(private http: HttpClient) {}
  getProvidersData():Observable <any[]> {
    return this.http.get<any[]>(this.providerDataUrl);
  }
}
