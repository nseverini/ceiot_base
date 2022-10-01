import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { Device } from '../../models/device';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceDetailComponent implements OnInit {
  private deviceId: string | null = null;
  device$!: Observable<Device>;
  dataSource = new MatTableDataSource<Device>([]);
  displayedColumns: string[] = ['id', 'name', 'key'];
  isDataLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private metaService: Meta,
    private route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.setTags();
    this.getDeviceId();
    this.getDevice();
  }

  private setTags(): void {
    this.metaService.updateTag({
      property: 'og:title',
      content: `CEIoT - Device Detail`,
    });
    this.metaService.updateTag({
      name: 'description',
      content: `CEIoT - Device Detail`,
    });
  }

  private getDeviceId(): void {
    this.deviceId = this.route.snapshot.paramMap.get('id');
  }

  private getDevice(): void {
    this.isDataLoading$.next(true);
    this.device$ = this.deviceService.getOne(this.deviceId as string).pipe(
      tap((data: Device) => {
        this.dataSource = new MatTableDataSource([data]);
      }),
      finalize(() => this.isDataLoading$.next(false)),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
