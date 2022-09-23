import { Router, Request, Response } from 'express';
import Device from 'models/device.model';
import Measurement from 'models/measurement.model';
import mongoose from 'mongoose';

const deviceRouter = Router();

deviceRouter.get('/', async (request: Request, response: Response) => {
  try {
    const devices = await Device.find().exec();
    return response.status(200).json(devices);
  } catch (error) {
    return response.status(500).json(error);
  }
});

deviceRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const deviceId = request.params['id'];
    const idValid = mongoose.isValidObjectId(deviceId);

    if (!idValid) {
      return response.status(400).send('Invalid Device Id');
    }

    const device = await Device.findById(deviceId).exec();

    if (!device) {
      return response.status(404).json('Device Not Found');
    }

    return response.status(200).json(device);
  } catch (error) {
    return response.status(500).json(error);
  }
});

deviceRouter.post('/', async (request: Request, response: Response) => {
  try {
    const device = await Device.create(request.body);
    return response.status(200).json(device);
  } catch (error) {
    return response.status(500).json(error);
  }
});

deviceRouter.get(
  '/:id/measurements',
  async (request: Request, response: Response) => {
    try {
      const deviceId = request.params['id'];
      const idValid = mongoose.isValidObjectId(deviceId);

      if (!idValid) {
        return response.status(400).send('Invalid Device Id');
      }

      const device = await Device.findById(deviceId).exec();

      if (!device) {
        return response.status(404).json('Device Not Found');
      }

      const measurements = await Measurement.find({ device: deviceId }).exec();

      return response.status(200).json(measurements);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
);

deviceRouter.put('/:id', async (request: Request, response: Response) => {
  try {
    const deviceId = request.params['id'];
    const idValid = mongoose.isValidObjectId(deviceId);

    if (!idValid) {
      return response.status(400).send('Invalid Device Id');
    }

    const device = await Device.findByIdAndUpdate(
      deviceId,
      { $set: request.body },
      { new: true }
    ).exec();

    if (!device) {
      return response.status(404).json('Device Not Found');
    }

    return response.status(200).json(device);
  } catch (error) {
    return response.status(500).json(error);
  }
});

deviceRouter.delete('/:id', async (request: Request, response: Response) => {
  try {
    const deviceId = request.params['id'];
    const idValid = mongoose.isValidObjectId(deviceId);

    if (!idValid) {
      return response.status(400).send('Invalid Device Id');
    }

    const session = await Device.startSession();
    const device = await Device.findById(deviceId).exec();

    if (!device) {
      return response.status(404).send('Device Not Found');
    }

    await session.withTransaction(async () => {
      await Device.deleteOne({
        _id: deviceId,
      }).exec();

      await Measurement.deleteMany({
        device: deviceId,
      }).exec();
    });

    session.endSession();

    return response.sendStatus(204);
  } catch (error) {
    return response.status(500).json(error);
  }
});

export default deviceRouter;
