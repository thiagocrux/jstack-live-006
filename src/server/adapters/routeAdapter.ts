import { Request, Response } from 'express';

import { IController } from '../../interfaces/IController';

export function routeAdapter(controller: IController) {
  return async (request: Request, response: Response) => {
    const { statusCode, body } = await controller.handle({
      body: request.body,
      params: request.params,
    });

    response.status(statusCode).json(body);
  };
}
