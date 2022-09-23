import { Router, Request, Response } from 'express';
import Device from 'models/device.model';
import Measurement from 'models/measurement.model';
import mongoose from 'mongoose';

const measurementRouter = Router();

measurementRouter.get('/', async (request: Request, response: Response) => {
  try {
    const measurements = await Measurement.find().exec();
    return response.status(200).json(measurements);
  } catch (error) {
    return response.status(500).json(error);
  }
});

measurementRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const measurementId = request.params['id'];
    const idValid = mongoose.isValidObjectId(measurementId);

    if (!idValid) {
      return response.status(400).send('Invalid Measurement Id');
    }

    const measurement = await Measurement.findById(measurementId).exec();

    if (!measurement) {
      return response.status(404).json('Measurement Not Found');
    }

    return response.status(200).json(measurement);
  } catch (error) {
    return response.status(500).json(error);
  }
});

measurementRouter.post('/', async (request: Request, response: Response) => {
  try {
    const newMeasurement = request.body;
    const deviceId = newMeasurement.device;
    const idValid = mongoose.isValidObjectId(deviceId);

    if (!idValid) {
      return response.status(400).send('Invalid Device Id');
    }

    const device = await Device.findById(deviceId).exec();

    if (!newMeasurement.key || device?.['key'] !== newMeasurement.key) {
      return response.sendStatus(401);
    }

    if (!device) {
      const deviceModel = {
        _id: newMeasurement?.device,
        key: newMeasurement.key,
        name: newMeasurement?.name,
      };
      await Device.create(deviceModel);
    }

    const measurement = await Measurement.create(request.body);
    return response.status(200).json(measurement);
  } catch (error) {
    return response.status(500).json(error);
  }
});

measurementRouter.delete(
  '/:id',
  async (request: Request, response: Response) => {
    try {
      const measurementId = request.params['id'];
      const idValid = mongoose.isValidObjectId(measurementId);

      if (!idValid) {
        return response.status(400).send('Invalid Measurement Id');
      }

      const measurement = await Measurement.findById(measurementId).exec();

      if (!measurement) {
        return response.status(404).send('Measurement Not Found');
      }

      await Measurement.deleteOne({
        _id: measurementId,
      }).exec();

      return response.sendStatus(204);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
);

export default measurementRouter;
