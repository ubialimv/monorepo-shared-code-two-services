import { MessageBrokerRabbitHelper } from 'ubialimv-common';

import environments from '../environments';

export default () => new MessageBrokerRabbitHelper(environments.RABBITMQ_URL);
