import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './components/devices/devices.component';
import { DeviceTableComponent } from './components/device-table/device-table.component';

@NgModule({
  declarations: [DevicesComponent, DeviceTableComponent],
  imports: [CommonModule, DevicesRoutingModule],
})
export class DevicesModule {}
