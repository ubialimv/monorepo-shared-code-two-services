import {
    AmqpConnectionManager,
    connect,
} from 'amqp-connection-manager';

import { MessageBrokerRabbitHelperInterface } from './message-broker-rabbitmq.interface';
import { MessageBrokerClient } from './message-broker-rabbitmq.enum';
import environments from '../../shared/environments';

export default class MessageBrokerRabbitHelper implements MessageBrokerRabbitHelperInterface {
    public createConnection(origin: MessageBrokerClient): AmqpConnectionManager | undefined {
        let connection: AmqpConnectionManager | undefined;

        try {
            connection = connect(environments.RABBITMQ_URL, {
                heartbeatIntervalInSeconds: 15,
            });

            connection.on('connect', () => {
                console.log(`${origin} Connection Established - RabbitMQ`)
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