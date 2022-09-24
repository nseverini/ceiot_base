import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from '../../models/device';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceFormComponent implements OnInit {
  private deviceId: string | null = null;
  labelSubmit: string = 'Create';
  deviceForm = this.fb.group({
    _id: ['', Validators.pattern('^[0-9a-fA-F]{24}$')],
    name: [''],
    key: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.getDeviceId();

    if (this.deviceId) {
      this.getDevice();
      this.labelSubmit = 'Update';
    }
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
      .subscribe((device: Device) => {
        this.deviceForm.patchValue(device);
      });
  }

  submit(): void {
    if (this.deviceForm.valid) {
      const device = this.removeEmptyValues(this.deviceForm.value as Device);
      const operation = this.deviceId ? 'update' : 'create';
      const successMessage = this.deviceId
        ? 'Device updated successfully'
        : 'Device created successfully';

      this.deviceService[operation](device).subscribe(() => {
        alert(successMessage);
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
