import StockRabbitMqConsumer from "../../application/consumers/stock-rabbitmq.consumer";
import { MessageBrokerRabbitAssertQueueInterface } from "../../infrastructure/message-brokers/message-broker-rabbitmq.interface";
import makeStatIncrementService from "./makeStatIncrementService";
import environments from "../environments";

const config: MessageBrokerRabbitAssertQueueInterface = {
    name: environments.STOCK_QUEUE,
    options: {
        durable: true,
        deadLetterExchange: environments.STOCK_EXCHANGE_DLQ
    }
}

export default () => new StockRabbitMqConsumer(makeStatIncrementService(), config);