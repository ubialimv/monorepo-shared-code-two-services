import PersistedUser from '../entities/persisted-user.entity';
import User from '../entities/user.entity';
import { UserInterface } from '../entities/user.interface';

export interface UserRepositoryInterface {
  create(user: User): Promise<PersistedUser>;
  update(
    user: Pick<UserInterface, 'email' | 'password'>,
  ): Promise<PersistedUser>;
  findUserByEmail(email: string): Promise<PersistedUser | null>;
}
