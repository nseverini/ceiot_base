import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const ValidateId = (
  objectName: string
): ((request: Request, response: Response, next: NextFunction) => void) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const idHeader = request.params['id'];
    const idHeaderValid = mongoose.isValidObjectId(idHeader);

    let idBodyValid = true;
    const idBody = request.body._id;

    if (idBody) {
      idBodyValid = mongoose.isValidObjectId(idHeader);
    }

    if (idHeaderValid && idBodyValid) {
      return next();
    } else {
      let errorMessage = `${objectName} Not Found`;
      let errorStatus = 404;

      if (request.method == 'put' || request.method == 'delete') {
        errorMessage = `Invalid ${objectName} Id`;
        errorStatus = 400;
      }

      return response.status(errorStatus).send(errorMessage);
    }
  };
};

const ValidateId1 = (
  objectName: string,
  validateParamId: boolean,
  validateBodyId: boolean
): ((request: Request, response: Response, next: NextFunction) => void) => {
  return (request: Request, response: Response, next: NextFunction) => {
    let idHeaderValid = true;
    let idBodyValid = true;

    if (validateParamId) {
      const idHeader = request.params['id'];
      idHeaderValid = mongoose.isValidObjectId(idHeader);
    }

    if (validateBodyId) {
      const idBody = request.body._id;
      idBodyValid = mongoose.isValidObjectId(idBody);
    }

    if (idHeaderValid && idBodyValid) {
      return next();
    }

    let errorMessage =
      request.method == 'get'
        ? `${objectName} Not Found`
        : `Invalid ${objectName} Id`;
    let errorStatus = request.method == 'get' ? 404 : 400;

    return response.status(errorStatus).send(errorMessage);
  };
};

const ValidateParamId = (
  objectName: string
): ((request: Request, response: Response, next: NextFunction) => void) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const id = request.params['id'];
    const idValid = mongoose.isValidObjectId(id);

    if (!idValid) {
      let errorMessage = `${objectName} Not Found`;
      let errorStatus = 404;

      if (request.method == 'put' || request.method == 'delete') {
        errorMessage = `Invalid ${objectName} Id`;
        errorStatus = 400;
      }

      return response.status(errorStatus).send(errorMessage);
    }

    return next();
  };
};

const ValidateBodyId = (
  objectName: string
): ((request: Request, response: Response, next: NextFunction) => void) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const id = request.body._id;
    const idValid = mongoose.isValidObjectId(id);

    if (!idValid) {
      let errorMessage = `${objectName} Not Found`;
      let errorStatus = 404;

      if (request.method == 'put' || request.method == 'delete') {
        errorMessage = `Invalid ${objectName} Id`;
        errorStatus = 400;
      }

      return response.status(errorStatus).send(errorMessage);
    }

    return next();
  };
};

export default ValidateId;
// export default ValidateBodyId;
// export ValidateParamId
