import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgxEchartsModule } from 'ngx-echarts';

import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './components/devices/devices.component';
import { DeviceTableComponent } from './components/device-table/device-table.component';
import { DeviceFormComponent } from './components/device-form/device-form.component';
import { DeviceMeasurementsComponent } from './components/device-measurements/device-measurements.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { DeviceDetailComponent } from './components/device-detail/device-detail.component';

@NgModule({
  declarations: [
    DevicesComponent,
    DeviceTableComponent,
    DeviceFormComponent,
    DeviceMeasurementsComponent,
    DeviceDetailComponent,
  ],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ClipboardModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    SharedModule,
  ],
})
export class DevicesModule {}
