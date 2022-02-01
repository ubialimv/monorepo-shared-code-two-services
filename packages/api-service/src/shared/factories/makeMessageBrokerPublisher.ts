import { MessageBrokerRabbitMqPublisher, MessageBrokerRabbitPublisherConfigInterface } from "ubialimv-common"
import makeMessageBrokerHelper from './makeMessageBrokerHelper';
import environments from '../environments';

const config: MessageBrokerRabbitPublisherConfigInterface = {
  assertQueues: [
    {
      name: environments.STOCK_QUEUE,
      options: {
        durable: true,
        deadLetterExchange: environments.STOCK_EXCHANGE_DLQ,
      },
    },
    {
      name: environments.STOCK_DLQ,
      options: {
        durable: true,
      },
    },
  ],
  assertExchanges: [
    {
      name: environments.STOCK_EXCHANGE,
      type: 'topic',
    },
    {
      name: environments.STOCK_EXCHANGE_DLQ,
      type: 'topic',
    },
  ],
  binds: [
    {
      queue: environments.STOCK_QUEUE,
      exchange: environments.STOCK_EXCHANGE,
      pattern: '#',
    },
    {
      queue: environments.STOCK_DLQ,
      exchange: environments.STOCK_EXCHANGE_DLQ,
      pattern: '#',
    },
  ],
};

export default () =>
  new MessageBrokerRabbitMqPublisher(makeMessageBrokerHelper(), config);
