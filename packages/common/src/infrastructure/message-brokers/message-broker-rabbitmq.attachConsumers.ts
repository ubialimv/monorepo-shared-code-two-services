import { ConfirmChannel } from 'amqplib';
import MessageBrokerRabbitMqBaseConsumer from './message-broker-rabbitmq.baseConsumer';
import MessageBrokerRabbitClient from './message-broker-rabbitmq.client';
import { MessageBrokerClientType } from './message-broker-rabbitmq.enum';
import {
  MessageBrokerRabbitConsumerInterface,
  MessageBrokerRabbitHelperInterface,
} from './message-broker-rabbitmq.interface';

export default class MessageBrokerRabbitMqAttachConsumers
  extends MessageBrokerRabbitClient
  implements MessageBrokerRabbitConsumerInterface
{
  constructor(
    private readonly helper: MessageBrokerRabbitHelperInterface,
    private readonly consumers: MessageBrokerRabbitMqBaseConsumer[],
    private readonly prefetch: number,
  ) {
    super(MessageBrokerClientType.Consumer);
  }

  async attach(): Promise<void> {
    try {
      if (!this.connection) {
        this.connection = this.helper.createConnection(this.type);
      }

      if (!this.channel) {
        this.channel = this.connection?.createChannel({ json: true });
      }

      await this.channel?.addSetup((confirmChannel: ConfirmChannel) => {
        const prefetch = confirmChannel.prefetch(this.prefetch);

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
      console.error(`Failed on start ${this.type}. Reason: ${error.message}`);
    }
  }

  async detach(): Promise<void> {
    await this.close();
  }
}
