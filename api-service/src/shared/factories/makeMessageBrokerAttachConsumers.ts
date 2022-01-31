import MessageBrokerRabbitMqAttachConsumers from "../../infrastructure/message-brokers/message-broker-rabbitmq.attachConsumers";
import makeMessageBrokerHelper from "./makeMessageBrokerHelper";
import makeStockConsumer from "./makeStockConsumer";

export default () => new MessageBrokerRabbitMqAttachConsumers(makeMessageBrokerHelper(), [makeStockConsumer()])