import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Device } from '../../models/device';

@Component({
  selector: 'app-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceTableComponent implements OnInit {
  @Input() set devices(data: Device[] | null) {
    this.dataSource.data = [];
    if (data) {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    }
  }
  @Input() isDataLoading: boolean | null = true;
  @Output() removeDeviceEvent = new EventEmitter<string>();
  @Output() refreshDevicesEvent = new EventEmitter();
  @Output() openMeasurementsModalEvent = new EventEmitter<string>();
  @Output() copyDeviceIdEvent = new EventEmitter<string>();
  displayedColumns: string[] = [
    'id',
    'name',
    'key',
    'temperature',
    'humidity',
    'pressure',
    'operations',
  ];
  dataSource = new MatTableDataSource<Device>([]);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filterInput') filterInput!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removeDevice(deviceId: string): void {
    this.removeDeviceEvent.emit(deviceId);
  }

  refreshDevices(): void {
    this.filterInput.nativeElement.value = '';
    this.refreshDevicesEvent.emit();
  }

  openMeasurementsModal(deviceId: string): void {
    this.openMeasurementsModalEvent.emit(deviceId);
  }

  copyDeviceId(deviceId: string): void {
    this.copyDeviceIdEvent.emit(deviceId);
  }
}
