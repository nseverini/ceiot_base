import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Measurement } from '../models/measurement';

@Injectable({
  providedIn: 'root',
})
export class MeasurementService {
  url: string = `${environment.apiUrl}/measurements`;
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Measurement[]> {
    return this.httpClient.get<Measurement[]>(this.url);
  }

  getOne(measurementId: string): Observable<Measurement> {
    return this.httpClient.get<Measurement>(`${this.url}/${measurementId}`);
  }

  delete(measurementId: string): Observable<Measurement> {
    return this.httpClient.delete<Measurement>(`${this.url}/${measurementId}`);
  }
}
