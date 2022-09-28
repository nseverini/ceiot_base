import mongoose, { Schema } from 'mongoose';

const MeasurementSchema: Schema = new Schema(
  {
    device: {
      type: Schema.Types.ObjectId,
      ref: 'Device',
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    pressure: {
      type: Number,
      required: true,
    },
    time_sent: {
      type: Date,
      required: true,
    },
    time_received: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  {
    collection: 'measurements',
  }
);

const Measurement = mongoose.model('Measurement', MeasurementSchema);

export default Measurement;
