import { Measurement } from './measurement';

export interface Device {
  _id: string;
  name?: string;
  key: string;
  last_measurement?: string | Measurement;
}
