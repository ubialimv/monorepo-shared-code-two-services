import { BaseController, HttpRequest, HttpResponse } from 'ubialimv-common';
import randomPassword from '../../../../shared/randomPassword';
import User from '../entities/user.entity';
import { UserRepositoryInterface } from '../repositories/user.repository.interface';

export default class RegisterUserController extends BaseController {
  constructor(private readonly repository: UserRepositoryInterface) {
    super();
  }

  public async handle(req: HttpRequest): Promise<HttpResponse> {
    try {
      const user = new User({...req.body, password: randomPassword()});

      const createdUser = await this.repository.create(user);

      return this.ok(200, createdUser.toPlain());
    } catch (error: any) {
      return this.serverError(error.message);
    }
  }
}
