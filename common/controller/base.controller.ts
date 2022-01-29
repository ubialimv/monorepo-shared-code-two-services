import GeneralError from '../errors/general.error';
import { HttpRequest, HttpResponse } from '../http/http.interface';

export default abstract class BaseController {
  public abstract handle(req: HttpRequest): Promise<HttpResponse>;

  public ok<T>(statusCode: number, data?: T): HttpResponse {
    const response: HttpResponse = { statusCode };

    if (data) {
      response.body = data;
    }

    return response;
  }

  public badRequest(error: Error): HttpResponse {
    return {
      statusCode: 400,
      body: error.message,
    };
  }

  public serverError(message: string): HttpResponse {
    return {
      statusCode: 500,
      body: new GeneralError(message),
    };
  }

  public NotFound(message: string): HttpResponse {
    return {
      statusCode: 404,
      body: new GeneralError(message),
    };
  }

  public BusinessError(message: string): HttpResponse {
    return {
      statusCode: 422,
      body: new GeneralError(message),
    };
  }
}
