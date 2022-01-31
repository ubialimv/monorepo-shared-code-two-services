export interface MessageBrokerPublisherInterface {
    publish(
        exchange: string,
        message: Record<any, any>,
        routingKey?: string,
    ): Promise<void>;
}