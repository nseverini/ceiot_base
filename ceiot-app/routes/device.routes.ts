import { Router, Request, Response } from 'express';
import Device from 'models/device.model';
import Measurement from 'models/measurement.model';
import mongoose from 'mongoose';
import { render } from 'utils/render';

const deviceRouter = Router();

deviceRouter.get('/', async (request: Request, response: Response) => {
  try {
    const devices = await Device.find().exec();
    return response.status(200).json(devices);
  } catch (error) {
    return response.status(500).json(error);
  }
});

deviceRouter.get('/color/:id', async (request: Request, response: Response) => {
  try {
    const deviceId = request.params['id'];
    const idValid = mongoose.isValidObjectId(deviceId);

    if (!idValid) {
      return response.status(404).json('Device Not Found');
    }

    const device = await Device.findById(deviceId).exec();

    if (!device) {
      return response.status(404).json('Device Not Found');
    }

    const red = '\x1b[31m';
    const green = '\x1b[32m';
    const blue = '\x1b[33m';
    const reset = '\x1b[0m';
    const template =
      'Device name ' +
      red +
      '   {{name}}' +
      reset +
      '\n' +
      '       id   ' +
      green +
      '       {{ id }} ' +
      reset +
      '\n' +
      '       key  ' +
      blue +
      '  {{ key }}' +
      reset +
      '\n';

    return response.send(
      render(template, {
        id: device._id,
        key: device['key'],
        name: device['name'],
      })
    );
  } catch (error) {
    return response.status(500).json(error);
  }
});

deviceRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const deviceId = request.params['id'];
    const idValid = mongoose.isValidObjectId(deviceId);

    if (!idValid) {
      return response.status(404).json('Device Not Found');
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
    const deviceId = request.body._id;
    if (deviceId) {
      const isValid = mongoose.isValidObjectId(deviceId);
      if (!isValid) {
        return response.status(400).json('Invalid Device Id');
      }

      const isUnique = await Device.findById(deviceId).count().exec();
      if (isUnique) {
        return response.status(400).send('Duplicated Device Id');
      }
    }

    const device = await Device.create(request.body);
    return response.status(200).json(device);
  } catch (error) {
    const errorMessage = (error as Error).message;
    const status = errorMessage.toLowerCase().includes('validation')
      ? 400
      : 500;

    return response.status(status).json(error);
  }
});

deviceRouter.get(
  '/:id/measurements',
  async (request: Request, response: Response) => {
    try {
      const deviceId = request.params['id'];
      const idValid = mongoose.isValidObjectId(deviceId);

      if (!idValid) {
        return response.status(404).json('Device Not Found');
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

    if (deviceId != request.body._id) {
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
    const errorMessage = (error as Error).message;
    const status = errorMessage.toLowerCase().includes('validation')
      ? 400
      : 500;

    return response.status(status).json(error);
  }
});

deviceRouter.delete('/:id', async (request: Request, response: Response) => {
  try {
    const deviceId = request.params['id'];
    const idValid = mongoose.isValidObjectId(deviceId);

    if (!idValid) {
      return response.status(404).send('Device Not Found');
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
