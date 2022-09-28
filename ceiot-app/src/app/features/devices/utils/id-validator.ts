import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Device } from '../models/device';
import { DeviceService } from '../services/device.service';

export class IdValidator {
  static createValidator(deviceService: DeviceService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return deviceService
        .getOne(control.value)
        .pipe(
          map((device: Device) => (device ? { _idAlreadyExist: true } : null))
        );
    };
  }
}
