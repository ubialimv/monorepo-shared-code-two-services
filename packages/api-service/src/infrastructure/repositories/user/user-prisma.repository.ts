import PersistedUser from '../../../domain/modules/user/entities/persisted-user.entity';
import User from '../../../domain/modules/user/entities/user.entity';
import { UserInterface } from '../../../domain/modules/user/entities/user.interface';
import { UserRepositoryInterface } from '../../../domain/modules/user/repositories/user.repository.interface';
import prismaHelper from '../../database/prisma.helper';

export default class UserPrismaRepository implements UserRepositoryInterface {
  async create(user: User): Promise<PersistedUser> {
    try {
      const userCreated = await prismaHelper.user.create({
        data: user.toPlain(),
      });
      return new PersistedUser(userCreated);
    } catch (error: any) {
      if (error?.code === 'P2002') {
        throw new Error('Unique constraint failed on email');
      }
      throw error;
    }
  }

  async update(
    user: Pick<UserInterface, 'email' | 'password'>,
  ): Promise<PersistedUser> {
    const userUpdated = await prismaHelper.user.update({
      data: { password: user.password },
      where: { email: user.email },
    });
    return new PersistedUser(userUpdated);
  }

  async findUserByEmail(email: string): Promise<PersistedUser | null> {
    const userFound = await prismaHelper.user.findUnique({ where: { email } });

    if (!userFound) return null;

    return new PersistedUser(userFound);
  }
}
