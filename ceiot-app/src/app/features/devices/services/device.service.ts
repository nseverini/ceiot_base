import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  url: string = `${environment.apiUrl}/devices`;
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Device[]> {
    return this.httpClient.get<Device[]>(this.url);
  }

  getOne(deviceId: string): Observable<Device> {
    return this.httpClient.get<Device>(`${this.url}/${deviceId}`);
  }

  create(device: Device): Observable<Device> {
    return this.httpClient.post<Device>(`${this.url}`, device);
  }

  update(device: Device): Observable<Device> {
    return this.httpClient.put<Device>(`${this.url}/${device._id}`, device);
  }

  delete(deviceId: string): Observable<Device> {
    return this.httpClient.delete<Device>(`${this.url}/${deviceId}`);
  }
}
