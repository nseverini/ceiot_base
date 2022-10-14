import 'zone.js/dist/zone-node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { Request, Response } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

import { AppServerModule } from './src/main.server';

import * as mongoose from 'mongoose';
import { json, urlencoded } from 'body-parser';
import * as compression from 'compression';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
const bodyParserErrorHandler = require('express-body-parser-error-handler');

import deviceRoutes from './routes/device.routes';
import measurementRoutes from './routes/measurement.routes';
import adminRoutes from './routes/admin.routes';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  dotenv.config();
  const server = express();
  server.use(cors());
  server.use(compression());
  server.use(json());
  server.use(urlencoded({ extended: true }));
  server.use(bodyParserErrorHandler());
  const distFolder = join(process.cwd(), 'dist/ceiot-app/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  const connectionString = process.env['MONGODB_URL'] as string;
  mongoose
    .connect(connectionString)
    .then(() => console.log('Database connected successfully!'))
    .catch((err) => console.error(err));

  server.use('/api/admin', adminRoutes);
  server.use('/api/devices', deviceRoutes);
  server.use('/api/measurements', measurementRoutes);

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.use('/api/*', (request: Request, response: Response) => {
    return response.sendStatus(404);
  });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
