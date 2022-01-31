import { ConfirmChannel, Replies } from "amqplib";
import { StatIncrementServiceInterface } from "../../domain/modules/stat/usecases/stat-increment-service.usecase";
import MessageBrokerRabbitMqBaseConsumer from "../../infrastructure/message-brokers/message-broker-rabbitmq.baseConsumer";
import { MessageBrokerRabbitAssertQueueInterface } from "../../infrastructure/message-brokers/message-broker-rabbitmq.interface";

export default class StockRabbitMqConsumer extends MessageBrokerRabbitMqBaseConsumer {
    constructor(
        private readonly service: StatIncrementServiceInterface,
        public readonly queue: MessageBrokerRabbitAssertQueueInterface,
    ) {
        super(queue)
    }

    async start(confirmChannel: ConfirmChannel): Promise<Replies.Consume> {
        return confirmChannel.consume(this.queue.name, async (message) => {
            if (message) {
                try {
                    await this.service.handle(message as any);
                    confirmChannel.ack(message);

                    console.log(`${this.queue.name} consumed successfully. Message: ${JSON.stringify(message)}`);
                } catch (error: any) {
                    console.error(`${this.queue.name} consume error. Reason: ${error.message}`);
                    confirmChannel.nack(message, false, false);
                }
            }
        })
    }
}