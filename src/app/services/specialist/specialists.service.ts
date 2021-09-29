import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISpecialist } from './SpecialistInterface';

@Injectable({
  providedIn: 'root'
})
export class SpecialistsService {
  private specialistIdsUrl = 'assets/data/specialistsData.json';
  constructor(private http: HttpClient) { }
  getSpecialists(): Observable<ISpecialist[]> {
    return this.http.get<ISpecialist[]>(this.specialistIdsUrl);
  }
}
