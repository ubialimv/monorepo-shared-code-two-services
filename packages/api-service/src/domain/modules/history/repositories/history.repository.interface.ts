import History from '../entities/history.entity';
import PersistedHistory from '../entities/persisted-history.entity';

export interface HistoryRepositoryInterface {
  create(history: History): Promise<PersistedHistory>;
  find(userId: number): Promise<PersistedHistory[]>;
}
