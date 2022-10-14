import mongoose, { Schema } from 'mongoose';

const DeviceSchema: Schema = new Schema(
  {
    name: {
      type: String,
    },
    key: {
      type: String,
      required: true,
    },
    last_measurement: {
      type: Schema.Types.ObjectId,
      ref: 'Measurement',
    },
  },
  {
    collection: 'devices',
  }
);

const Device = mongoose.model('Device', DeviceSchema);

export default Device;
