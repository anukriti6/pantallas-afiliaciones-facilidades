import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEasinessData } from './easinessDataInterface';

@Injectable({
  providedIn: 'root'
})
export class EasinessService {
  private easinessIdsUrl = 'assets/data/easinessData.json';
  constructor(private http: HttpClient) { }
  getIds(): Observable<IEasinessData[]> {
    return this.http.get<IEasinessData[]>(this.easinessIdsUrl);
  }
}
