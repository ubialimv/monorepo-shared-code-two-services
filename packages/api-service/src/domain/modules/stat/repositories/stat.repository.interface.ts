import PersistedStat from '../entities/persisted-stat.entity';

export interface StatRepositoryInterface {
  find(limit: number): Promise<PersistedStat[]>;
  increment(stock: string): Promise<void>;
}
