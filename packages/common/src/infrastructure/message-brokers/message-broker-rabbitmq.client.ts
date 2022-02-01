import { AmqpConnectionManager, ChannelWrapper } from 'amqp-connection-manager';
import { MessageBrokerClientType } from './message-broker-rabbitmq.enum';

export default class MessageBrokerRabbitClient {
  protected connection: AmqpConnectionManager | undefined;

  protected channel: ChannelWrapper | undefined;

  protected readonly type!: MessageBrokerClientType;

  constructor(type: MessageBrokerClientType) {
    this.type = type;
  }

  async close(): Promise<void> {
    await this.channel?.close();
    await this.connection?.close();
  }
}
