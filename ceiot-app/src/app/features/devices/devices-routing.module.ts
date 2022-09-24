import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceFormComponent } from './components/device-form/device-form.component';
import { DevicesComponent } from './components/devices/devices.component';

const routes: Routes = [
  {
    path: '',
    component: DevicesComponent,
  },
  {
    path: 'create',
    component: DeviceFormComponent,
  },
  {
    path: 'edit/:id',
    component: DeviceFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevicesRoutingModule {}
