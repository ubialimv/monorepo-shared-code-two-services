import PersistedStatEntity from '../../../domain/modules/stat/entities/persisted-stat.entity';
import { StatRepositoryInterface } from '../../../domain/modules/stat/repositories/stat.repository.interface';
import prismaHelper from '../../database/prisma.helper';

export default class StatPrismaRepository implements StatRepositoryInterface {
  async find(limit: number): Promise<PersistedStatEntity[]> {
    const stats = await prismaHelper.stats.findMany({
      orderBy: { timesRequested: 'desc' },
      take: limit,
    });
    return stats.map((x) => new PersistedStatEntity(x));
  }

  async increment(stock: string): Promise<void> {
    await prismaHelper.stats.upsert({
      where: { stock },
      create: {
        stock,
        timesRequested: 1
      },
      update: {
        timesRequested: {
          increment: 1
        }
      }
    })
  }
}
