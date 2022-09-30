import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  finalize,
  of,
  throwError,
  EMPTY,
} from 'rxjs';
import { Device } from '../../models/device';
import { DeviceService } from '../../services/device.service';
import { AlertType } from 'src/app/shared/models/alert-type';
// import { IdValidator } from '../../utils/id-validator';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceFormComponent implements OnInit {
  private deviceId: string | null = null;
  labelTitle: string = 'Create new device';
  labelSubmit: string = 'Create';
  deviceForm = this.fb.group({
    _id: [
      '',
      Validators.pattern('^[0-9a-fA-F]{24}$'),
      // IdValidator.createValidator(this.deviceService),
    ],
    name: [''],
    key: ['', Validators.required],
  });
  public AlertType = AlertType;
  isDataLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isOperationLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  errorMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private metaService: Meta,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBarService: MatSnackBar,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.getDeviceId();

    if (this.deviceId) {
      this.setLabels();
      this.getDevice();
      this.deviceForm.controls._id.disable();
    } else {
      this.isDataLoading$.next(false);
    }

    this.setTags();
  }

  private setTags(): void {
    this.metaService.updateTag({
      property: 'og:title',
      content: `CEIoT - ${this.labelTitle}`,
    });
    this.metaService.updateTag({
      name: 'description',
      content: `CEIoT - ${this.labelTitle}`,
    });
  }

  private setLabels(): void {
    this.labelSubmit = 'Update';
    this.labelTitle = 'Update device';
  }

  get _id(): AbstractControl<string | null, string | null> | null {
    return this.deviceForm.get('_id');
  }

  get name(): AbstractControl<string | null, string | null> | null {
    return this.deviceForm.get('name');
  }

  get key(): AbstractControl<string | null, string | null> | null {
    return this.deviceForm.get('key');
  }

  private getDeviceId(): void {
    this.deviceId = this.route.snapshot.paramMap.get('id');
  }

  private getDevice(): void {
    this.deviceService
      .getOne(this.deviceId as string)
      .pipe(
        finalize(() => this.isDataLoading$.next(false)),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      )
      .subscribe((device: Device) => {
        this.deviceForm.patchValue(device);
      });
  }

  submit(): void {
    this.errorMessage$.next('');
    if (this.deviceForm.valid) {
      this.isOperationLoading$.next(true);
      const device = this.removeEmptyValues(this.deviceForm.value as Device);
      const operation = this.deviceId ? 'update' : 'create';

      this.deviceService[operation](device)
        .pipe(
          finalize(() => this.isOperationLoading$.next(false)),
          catchError((error: string) => {
            // catchError((error: HttpErrorResponse) => {
            this.deviceForm.setErrors({ invalid: true });
            this.errorMessage$.next(error);
            return EMPTY;

            // this.deviceForm.setErrors({ invalid: true });
            // if (error.status == 400) {
            //   const errorMessages =
            //     typeof error?.error == 'string'
            //       ? error.error
            //       : error.error?.message;
            //   this.errorMessage$.next(errorMessages);
            // }
            // return throwError(() => error);
          })
        )
        .subscribe(() => {
          const successMessage = this.deviceId
            ? 'Device updated successfully'
            : 'Device created successfully';

          this.snackBarService.open(successMessage, undefined, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });

          this.router.navigate(['/devices']);
        });
    }
  }

  private removeEmptyValues(device: Device): Device {
    return Object.fromEntries(
      Object.entries(device).filter(
        ([_, v]) => v !== null && v !== '' && v !== undefined
      )
    ) as Device;
  }
}
