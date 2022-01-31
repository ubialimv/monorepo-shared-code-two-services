import { ConfirmChannel } from "amqplib";
import environments from "../../shared/environments";
import MessageBrokerRabbitMqBaseConsumer from "./message-broker-rabbitmq.baseConsumer";
import MessageBrokerRabbitClient from "./message-broker-rabbitmq.client";
import { MessageBrokerClient } from "./message-broker-rabbitmq.enum";
import { MessageBrokerRabbitConsumerInterface, MessageBrokerRabbitHelperInterface } from "./message-broker-rabbitmq.interface";

export default class MessageBrokerRabbitMqAttachConsumers extends MessageBrokerRabbitClient implements MessageBrokerRabbitConsumerInterface {
    constructor(
        private readonly helper: MessageBrokerRabbitHelperInterface,
        private readonly consumers: MessageBrokerRabbitMqBaseConsumer[],
    ) {
        super(MessageBrokerClient.Consumer);
    }

    async attach(): Promise<void> {
        try {
            if (!super.connection) {
                super.connection = this.helper.createConnection(super.type);
            }

            if (!super.channel) {
                super.channel = this.connection?.createChannel({ json: true })
            }

            await super.channel?.addSetup((confirmChannel: ConfirmChannel) => {
                const prefetch = confirmChannel.prefetch(
                    environments.RABBITMQ_PREFETCH,
                );

                const assertQueues = this.consumers.map((consumer) =>
                    confirmChannel.assertQueue(
                        consumer.queue.name,
                        consumer.queue.options,
                    ),
                );

                const startConsumers = this.consumers.map((consumer) =>
                    consumer.start(confirmChannel),
                );

                return Promise.all([prefetch, assertQueues, startConsumers]);
            });

        } catch (error: any) {
            console.error(`Failed on start ${super.type}. Reason: ${error.message}`);
        }
    }

    async detach(): Promise<void> {
        await super.close();
    }
}