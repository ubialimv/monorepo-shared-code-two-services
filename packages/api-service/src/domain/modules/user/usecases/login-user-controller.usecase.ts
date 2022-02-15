import jwt from 'jsonwebtoken';

import { BaseController, HttpRequest, HttpResponse } from 'ubialimv-common';
import environments from '../../../../shared/environments';
import { UserExceptions } from '../exceptions';
import { UserRepositoryInterface } from '../repositories/user.repository.interface';

export default class LoginUserController extends BaseController {
  constructor(private readonly repository: UserRepositoryInterface) {
    super();
  }

  public async handle(req: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = req.body;

      const user = await this.repository.findUserByEmail(email);

      if (!user || user.toPlain().password !== password) {
        return this.notFound(UserExceptions.USER_NOT_FOUND);
      }

      const userData = user.toResponse();

      // const token = jwt.sign({ data: userData, exp: environments.TOKEN_EXPIRATION }, environments.APP_SECRET);
      const token = jwt.sign(userData, environments.APP_SECRET, {
        expiresIn: environments.TOKEN_EXPIRATION,
      });

      return this.ok(200, { ...userData, token });
    } catch (error: any) {
      return this.serverError(error.message);
    }
  }
}
