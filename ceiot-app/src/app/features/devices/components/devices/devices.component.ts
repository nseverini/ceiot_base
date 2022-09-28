import { Clipboard } from '@angular/cdk/clipboard';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta } from '@angular/platform-browser';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  throwError,
} from 'rxjs';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { ConfirmationDialogData } from 'src/app/shared/models/confirmation-dialog-data';
import { DeviceMeasurementsDialogData } from 'src/app/shared/models/device-measurements-dialog-data';
import { Device } from '../../models/device';
import { DeviceService } from '../../services/device.service';
import { DeviceMeasurementsComponent } from '../device-measurements/device-measurements.component';
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevicesComponent implements OnInit {
  devices$!: Observable<Device[]>;
  isDataLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor(
    private metaService: Meta,
    private dialog: MatDialog,
    private clipboardService: Clipboard,
    private snackBarService: MatSnackBar,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.getDevices();
    this.setTags();
  }

  private setTags(): void {
    this.metaService.updateTag({
      property: 'og:title',
      content: 'CEIoT - Devices',
    });
    this.metaService.updateTag({
      name: 'description',
      content: 'CEIoT - Devices',
    });
  }

  confirmationRemoveDevice(deviceId: string): void {
    const confirmationDialog: ConfirmationDialogData = {
      title: 'Delete device',
      message: 'Are you sure you want to delete this device?',
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: confirmationDialog,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removeDevice(deviceId);
      }
    });
  }

  private removeDevice(deviceId: string): void {
    this.deviceService
      .delete(deviceId)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      )
      .subscribe(() => {
        this.getDevices();
      });
  }

  getDevices(): void {
    this.isDataLoading$.next(true);
    this.devices$ = this.deviceService.getAll().pipe(
      finalize(() => this.isDataLoading$.next(false)),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  openMeasurementsModal(deviceId: string): void {
    const deviceMeasurementsDialog: DeviceMeasurementsDialogData = {
      deviceId,
    };
    this.dialog.open(DeviceMeasurementsComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      height: '80%',
      width: '80%',
      data: deviceMeasurementsDialog,
    });
  }

  copyDeviceId(deviceId: string): void {
    this.clipboardService.copy(deviceId);

    this.snackBarService.open(
      'Device Id copied to clipboard successfully',
      undefined,
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      }
    );
  }
}
