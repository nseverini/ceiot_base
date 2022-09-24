import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './components/devices/devices.component';
import { DeviceTableComponent } from './components/device-table/device-table.component';
import { DeviceFormComponent } from './components/device-form/device-form.component';

@NgModule({
  declarations: [DevicesComponent, DeviceTableComponent, DeviceFormComponent],
  imports: [CommonModule, DevicesRoutingModule, ReactiveFormsModule],
})
export class DevicesModule {}
