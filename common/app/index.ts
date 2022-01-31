import express, {
  Application,
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';
import * as swaggerUI from 'swagger-ui-express';

import loadYamlFile from '../helpers/loadYamlFile';

export interface RoutesInterface {
  (router: Router): void;
}

export interface ErrorHandlerInterface {
  (err: any, req: Request, res: Response, next: NextFunction): void;
}

export default class App {
  private readonly application: Application;

  private readonly port: number;

  constructor(props: {
    port: number;
    middleWares: any[];
    routes: RoutesInterface[];
    spec?: string;
    errorHandler?: ErrorHandlerInterface;
  }) {
    this.application = express();
    this.port = props.port;

    this.loadSpec(props.spec);
    this.useMiddlewares(props.middleWares);
    this.useRoutes(props.routes);
    this.loadErrorHandler(props.errorHandler);
  }

  private useMiddlewares(middleWares: any[]) {
    middleWares.forEach((middleWare: any) => this.application.use(middleWare));
  }

  private useRoutes(routes: RoutesInterface[]) {
    const router = express.Router();
    routes.forEach((route) => route(router));
    this.application.use(router);
  }

  private loadSpec(spec?: string) {
    if (spec !== undefined) {
      const fileLoaded = loadYamlFile(spec);

      if (fileLoaded !== undefined) {
        this.application.use(
          '/docs',
          swaggerUI.serve,
          swaggerUI.setup(fileLoaded),
        );
      }
    }
  }

  private loadErrorHandler(errorHandler?: ErrorHandlerInterface) {
    if (typeof errorHandler === 'function') {
      this.application.use(errorHandler);
    }
  }

  public listen() {
    return this.application.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}
