import { ConfirmChannel } from "amqplib";
import MessageBrokerRabbitClient from "./message-broker-rabbitmq.client";
import { MessageBrokerClient } from "./message-broker-rabbitmq.enum";
import { MessageBrokerRabbitPublisherConfigInterface, MessageBrokerRabbitHelperInterface, MessageBrokerRabbitPublisherInterface } from "./message-broker-rabbitmq.interface";

export default class MessageBrokerRabbitMqPublisher extends MessageBrokerRabbitClient implements MessageBrokerRabbitPublisherInterface {
    constructor(
        private readonly helper: MessageBrokerRabbitHelperInterface,
        private readonly queue: MessageBrokerRabbitPublisherConfigInterface,
    ) {
        super(MessageBrokerClient.Consumer);
    }

    async start(): Promise<void> {
        try {
            if (!super.connection) {
                super.connection = this.helper.createConnection(super.type);
            }

            if (!super.channel) {
                super.channel = this.connection?.createChannel({ json: true })
            }

            const { queue } = this;

            await super.channel?.addSetup((confirmChannel: ConfirmChannel) => {
                const assertQueues = queue.assertQueues.map((x) =>
                    confirmChannel.assertQueue(x.name, x.options),
                );

                const assertExchanges = queue.assertExchanges.map((x) =>
                    confirmChannel.assertExchange(x.name, x.type, x.options),
                );

                const binds = queue.binds.map((x) =>
                    confirmChannel.bindQueue(x.queue, x.exchange, x.pattern, x.args),
                );

                return Promise.all([assertQueues, assertExchanges, binds]);
            });

        } catch (error: any) {
            console.error(`Failed on start ${super.type}. Reason: ${error.message}`);
        }
    }

    async close(): Promise<void> {
        await super.close()
    }

    async publish(exchange: string, message: Record<any, any>, routingKey: string = '#'): Promise<void> {
        try {
            await super.channel?.publish(exchange, routingKey, message, {
                contentType: 'application/json',
            })
            console.error(`Successfully publish on exchange ${exchange}. Message: ${JSON.stringify(message)}`);
        } catch (error) {
            console.error(`Error on publishing on exchange ${exchange}`);
        }
    }
}