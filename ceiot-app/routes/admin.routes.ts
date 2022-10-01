import { Router, Request, Response } from 'express';
import Device from 'models/device.model';
import Measurement from 'models/measurement.model';
import mongoose from 'mongoose';
const fs = require('fs');
import { render } from 'utils/render';

const adminRouter = Router();

adminRouter.get('/:command', async (request: Request, response: Response) => {
  try {
    const command = request.params['command'];
    const query = request.query;

    if (!command) {
      return response.status(404).json('Command Not Found');
    }

    let msg = 'done';

    switch (command) {
      case 'clear':
        if (query['db'] == 'mongo') {
          msg = 'clearing mongo';
          /* UNIMPLEMENTED */
        } else if (query['db'] == 'psql') {
          msg = 'clearing psql';
          /* UNIMPLEMENTED */
        } else {
          msg = 'unknown db ' + query['db'];
        }
        break;
      case 'save':
        if (query['db'] == 'mongo') {
          msg = 'saving mongo to ' + query['file'];
          /* UNIMPLEMENTED */
        } else if (query['db'] == 'psql') {
          msg = 'saving psql ' + query['file'];
          /* UNIMPLEMENTED */
        } else {
          msg = 'unknown db ' + query['db'];
        }
        break;
      case 'show':
        msg = fs.readFileSync('../fixtures/' + query['file']);
        break;
      default:
        msg = 'Command: ' + command + ' not implemented';
    }

    const template =
      '<html>' +
      '<head><title>Admin</title></head>' +
      '<body>' +
      '{{ msg }}' +
      '</body>' +
      '</html>';

    return response.send(render(template, { msg: msg }));
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
});

export default adminRouter;
