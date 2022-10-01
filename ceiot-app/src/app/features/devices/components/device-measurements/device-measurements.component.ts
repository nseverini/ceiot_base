import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EChartsOption } from 'echarts';
import {
  catchError,
  Observable,
  throwError,
  tap,
  finalize,
  BehaviorSubject,
} from 'rxjs';
import { DeviceMeasurementsDialogData } from 'src/app/shared/models/device-measurements-dialog-data';
import { Measurement } from '../../models/measurement';
import { DeviceService } from '../../services/device.service';
import { AlertType } from 'src/app/shared/models/alert-type';

@Component({
  selector: 'app-device-measurements',
  templateUrl: './device-measurements.component.html',
  styleUrls: ['./device-measurements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceMeasurementsComponent implements OnInit {
  measurements$!: Observable<Measurement[]>;
  isDataLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  chartOption!: EChartsOption;
  noMeasurementsMessage: string = 'Device without measurements';
  public AlertType = AlertType;

  constructor(
    private dialogRef: MatDialogRef<DeviceMeasurementsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DeviceMeasurementsDialogData,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.getMeasurements();
  }

  private getMeasurements(): void {
    this.measurements$ = this.deviceService
      .getAllMeasurementsFromDevice(this.data.deviceId)
      .pipe(
        tap((measurements: Measurement[]) => {
          let arrayDate: string[] = [];
          let arrayTemperature: number[] = [];
          let arrayPressure: number[] = [];
          let arrayHumidity: number[] = [];
          const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          };

          measurements.forEach((measurement: Measurement) => {
            const dateFormatted = new Date(
              measurement.time_sent
            ).toLocaleDateString('en-US', options);
            const dateParts = dateFormatted
              .substring(0, dateFormatted.indexOf(','))
              .split(' ')
              .reverse()
              .join(' ');
            const dateFormattedComplex =
              dateParts + dateFormatted.substr(dateFormatted.indexOf(',') + 1);

            arrayDate.push(dateFormatted);
            arrayTemperature.push(measurement.temperature);
            arrayPressure.push(measurement.pressure);
            arrayHumidity.push(measurement.humidity);
          });

          this.chartOption = {
            xAxis: {
              type: 'category',
              data: arrayDate,
              boundaryGap: false,
            },
            yAxis: {
              type: 'value',
            },
            toolbox: {
              feature: {
                saveAsImage: { show: true },
              },
            },
            tooltip: {
              trigger: 'axis',
            },
            legend: {
              show: true,
              data: ['Temperature', 'Humidity', 'Pressure'],
              top: 'bottom',
            },
            dataZoom: {
              show: true,
            },
            series: [
              {
                name: 'Temperature',
                data: arrayTemperature,
                type: 'line',
                smooth: true,
                tooltip: {
                  valueFormatter: (value) => `${value}°C`,
                },
                markPoint: {
                  data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' },
                  ],
                },
                markLine: {
                  data: [{ type: 'average', name: 'Avg' }],
                },
              },
              {
                name: 'Pressure',
                data: arrayPressure,
                type: 'line',
                smooth: true,
                tooltip: {
                  valueFormatter: (value) => `${value} Pa`,
                },
                markPoint: {
                  data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' },
                  ],
                },
                markLine: {
                  data: [{ type: 'average', name: 'Avg' }],
                },
              },
              {
                name: 'Humidity',
                data: arrayHumidity,
                type: 'line',
                smooth: true,
                tooltip: {
                  valueFormatter: (value) => `${value}%`,
                },
                markPoint: {
                  data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' },
                  ],
                },
                markLine: {
                  data: [{ type: 'average', name: 'Avg' }],
                },
              },
            ],
          };
        }),
        finalize(() => this.isDataLoading$.next(false)),
        catchError((error: HttpErrorResponse) => {
          this.dialogRef.close();
          return throwError(() => error);
        })
      );
  }
}
