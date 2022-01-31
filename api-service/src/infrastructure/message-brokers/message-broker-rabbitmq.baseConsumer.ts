import { ConfirmChannel, Replies } from "amqplib";
import { MessageBrokerRabbitAssertQueueInterface } from "./message-broker-rabbitmq.interface";

export default abstract class MessageBrokerRabbitMqBaseConsumer {
    constructor(public readonly queue: MessageBrokerRabbitAssertQueueInterface) { }

    abstract start(confirmChannel: ConfirmChannel): Promise<Replies.Consume>;
}