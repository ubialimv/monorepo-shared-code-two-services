import { App } from 'ubialimv-common';

import makeMiddlewares from './makeMiddlewares';
import userRoute from '../../routes/user.route';
import stockRoute from '../../routes/stock.route';
import statRoute from '../../routes/stat.route';
import makeSpec from './makeSpec';
import environments from '../environments';
import makeMessageBrokerAttachConsumers from './makeMessageBrokerAttachConsumers';
import makeMessageBrokerPublisher from './makeMessageBrokerPublisher';

export default () =>
  new App({
    port: environments.APP_PORT,
    middleWares: makeMiddlewares(),
    routes: [userRoute, stockRoute, statRoute],
    spec: makeSpec(),
    messageBrokerConfig: {
      messageBrokerConsumers: makeMessageBrokerAttachConsumers(),
      messageBrokerPublisher: makeMessageBrokerPublisher(),
    },
  });
