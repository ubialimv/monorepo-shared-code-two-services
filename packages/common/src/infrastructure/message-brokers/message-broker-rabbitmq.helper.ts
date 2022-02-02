import { AmqpConnectionManager, connect } from 'amqp-connection-manager';

import { MessageBrokerRabbitHelperInterface } from './message-broker-rabbitmq.interface';
import { MessageBrokerClientType } from './message-broker-rabbitmq.enum';

export default class MessageBrokerRabbitHelper
  implements MessageBrokerRabbitHelperInterface
{
  constructor(private readonly url: string) {}

  public createConnection(
    origin: MessageBrokerClientType,
  ): AmqpConnectionManager | undefined {
    let connection: AmqpConnectionManager | undefined;

    try {
      connection = connect(this.url, {
        heartbeatIntervalInSeconds: 15,
      });

      connection.on('connect', () => {
        console.log(`${origin} Connection Established - RabbitMQ`);
      });

      connection.on('disconnect', (err) => {
        console.log(`${origin} Disconnected - RabbitMQ`);
      });
    } catch (error: any) {
      console.error(`${origin} Error connecting to RabbitMQ`);
    }

    return connection;
  }
}
