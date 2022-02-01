import { ConfirmChannel, Replies } from 'amqplib';
import {
  MessageBrokerRabbitMqBaseConsumer,
  MessageBrokerRabbitAssertQueueInterface,
} from 'ubialimv-common';

import { StatIncrementServiceInterface } from '../../domain/modules/stat/usecases/stat-increment-service.usecase';

export default class StockRabbitMqConsumer extends MessageBrokerRabbitMqBaseConsumer {
  constructor(
    private readonly service: StatIncrementServiceInterface,
    public readonly queue: MessageBrokerRabbitAssertQueueInterface,
  ) {
    super(queue);
  }

  async start(confirmChannel: ConfirmChannel): Promise<Replies.Consume> {
    return confirmChannel.consume(this.queue.name, async (message) => {
      if (message) {
        try {
          const payload = JSON.parse(message.content.toString());
          await this.service.handle(payload);
          confirmChannel.ack(message);

          console.log(
            `${
              this.queue.name
            } consumed successfully. Message: ${JSON.stringify(payload)}`,
          );
        } catch (error: any) {
          console.log(error);
          console.error(
            `${this.queue.name} consume error. Reason: ${error.message}`,
          );
          confirmChannel.nack(message, false, false);
        }
      }
    });
  }
}
