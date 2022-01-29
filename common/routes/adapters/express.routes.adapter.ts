import { Request, Response } from 'express';
import BaseController from '../../controller/base.controller';
import { HttpRequest, HttpResponse } from '../../http/http.interface';

export default (controller: BaseController) =>
  async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
    };

    const httpResponse: HttpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
