import historyEntity from '../../../domain/modules/history/entities/history.entity';
import PersistedHistory from '../../../domain/modules/history/entities/persisted-history.entity';
import PersistedHistoryEntity from '../../../domain/modules/history/entities/persisted-history.entity';
import { HistoryRepositoryInterface } from '../../../domain/modules/history/repositories/history.repository.interface';
import { PersistedHistoryInterface } from '../../../domain/modules/history/entities/persisted-history.interface';
import prismaHelper from '../../database/prisma.helper';
import { History } from '@prisma/client';

const modelToEntity = (model: History) => {
  const data: PersistedHistoryInterface = {
    id: model.id,
    date: model.date,
    symbol: model.symbol,
    name: model.name,
    open: model.open.toNumber(),
    high: model.high.toNumber(),
    low: model.low.toNumber(),
    close: model.close.toNumber(),
    userId: model.userId,
  };

  return new PersistedHistory(data);
};

export default class HistoryPrismaRepository
  implements HistoryRepositoryInterface
{
  async create(history: historyEntity): Promise<PersistedHistoryEntity> {
    const historyCreated = await prismaHelper.history.create({
      data: history.toPlain(),
    });
    return modelToEntity(historyCreated);
  }

  async find(userId: number): Promise<PersistedHistory[]> {
    const historiesFound = await prismaHelper.history.findMany({
      where: { userId },
    });
    return historiesFound.map(modelToEntity);
  }
}
