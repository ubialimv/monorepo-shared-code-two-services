import { UserRepositoryInterface } from '../repositories/user.repository.interface';

export interface AccessLevelUserServiceInterface {
  isRoot(email: string): Promise<boolean | null>;
}

export default class AccessLevelUserService
  implements AccessLevelUserServiceInterface
{
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async isRoot(email: string): Promise<boolean | null> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) return null;

    return user.toPlain().root;
  }
}
