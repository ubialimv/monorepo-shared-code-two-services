import { AmqpConnectionManager } from "amqp-connection-manager";
import { Options } from "amqplib";
import { MessageBrokerClient } from "./message-broker-rabbitmq.enum";

export interface MessageBrokerRabbitHelperInterface {
    createConnection(origin: MessageBrokerClient): AmqpConnectionManager | undefined;
}

export interface MessageBrokerRabbitPublisherInterface {
    start(): Promise<void>;
    close(): Promise<void>;
    publish(
        exchange: string,
        message: Record<any, any>,
        routingKey?: string,
    ): Promise<void>;
}

export interface MessageBrokerRabbitConsumerInterface {
    attach(): Promise<void>;
    detach(): Promise<void>;
}

export interface MessageBrokerRabbitAssertQueueInterface {
    name: string;
    options?: Options.AssertQueue;
}

export interface MessageBrokerRabbitAssertExchangeInterface {
    name: string;
    type: string;
    options?: Options.AssertExchange;
}

export interface MessageBrokerRabbitBindInterface {
    queue: string;
    exchange: string;
    pattern: string;
    args?: any;
}

export interface MessageBrokerRabbitPublisherConfigInterface {
    assertQueues: MessageBrokerRabbitAssertQueueInterface[];
    assertExchanges: MessageBrokerRabbitAssertExchangeInterface[];
    binds: MessageBrokerRabbitBindInterface[];
}