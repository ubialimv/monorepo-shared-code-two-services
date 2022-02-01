import { MessageBrokerRabbitMqAttachConsumers } from "ubialimv-common";

import makeMessageBrokerHelper from './makeMessageBrokerHelper';
import makeStockConsumer from './makeStockConsumer';
import environments from "../environments";

export default () =>
  new MessageBrokerRabbitMqAttachConsumers(makeMessageBrokerHelper(), [
    makeStockConsumer(),
  ],
    environments.RABBITMQ_PREFETCH);
