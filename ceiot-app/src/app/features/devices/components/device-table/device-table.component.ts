import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Device } from '../../models/device';

@Component({
  selector: 'app-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceTableComponent implements OnInit {
  @Input() devices: Device[] | null = [];

  constructor() {}

  ngOnInit(): void {}
}
