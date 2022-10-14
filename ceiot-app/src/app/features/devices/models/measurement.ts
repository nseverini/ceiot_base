import { Device } from './device';

export interface Measurement {
  device: string | Device;
  temperature: number;
  humidity: number;
  pressure: number;
  time_received: Date;
}
