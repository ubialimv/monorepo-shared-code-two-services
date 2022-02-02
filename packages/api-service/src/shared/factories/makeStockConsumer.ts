import StockRabbitMqConsumer from '../../application/consumers/stock-rabbitmq.consumer';
import { MessageBrokerRabbitAssertQueueInterface } from 'ubialimv-common';
import makeStatIncrementService from './makeStatIncrementService';
import environments from '../environments';

let consumer: StockRabbitMqConsumer | undefined;

const config: MessageBrokerRabbitAssertQueueInterface = {
  name: environments.STOCK_QUEUE,
  options: {
    durable: true,
    deadLetterExchange: environments.STOCK_EXCHANGE_DLQ,
  },
};

if (!consumer) {
  consumer = new StockRabbitMqConsumer(makeStatIncrementService(), config);
}
export default () => consumer!;
  
