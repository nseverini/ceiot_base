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
  },
  {
    collection: 'devices',
  }
);

const Device = mongoose.model('Device', DeviceSchema);

export default Device;
