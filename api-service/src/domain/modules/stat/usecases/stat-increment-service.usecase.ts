import { StatRepositoryInterface } from "../repositories/stat.repository.interface";

export interface StatIncrementServiceInterface {
    handle(message: { stock: string }): Promise<void>
}

export default class StatIncrementService implements StatIncrementServiceInterface {
    constructor(private readonly statRepository: StatRepositoryInterface) { }

    async handle(message: { stock: string; }): Promise<void> {
        await this.statRepository.increment(message.stock);
    }
}