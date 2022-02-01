import { App } from 'ubialimv-common';

import makeMiddlewares from './makeMiddlewares';
import stockRoute from '../../routes/stock.route';
import makeSpec from './makeSpec';
import environments from './environments';

export default () =>
  new App({
    port: environments.APP_PORT,
    middleWares: makeMiddlewares(),
    routes: [stockRoute],
    spec: makeSpec(),
  });
