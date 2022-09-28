import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { AlertType } from '../../models/alert-type';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit {
  @Input() message: string | null = null;
  @Input() type: AlertType = AlertType['alert--danger'];
  public AlertType = AlertType;

  constructor() {}

  ngOnInit(): void {}
}
