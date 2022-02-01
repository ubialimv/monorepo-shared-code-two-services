import { BaseController, HttpRequest, HttpResponse } from 'ubialimv-common';
import { HistoryRepositoryInterface } from '../../history/repositories/history.repository.interface';
import { UserExceptions } from '../exceptions';
import { UserRepositoryInterface } from '../repositories/user.repository.interface';

export default class HistoryUserController extends BaseController {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly historyRepository: HistoryRepositoryInterface,
  ) {
    super();
  }

  public async handle(req: HttpRequest): Promise<HttpResponse> {
    try {
      const { email } = req.context;

      const user = await this.userRepository.findUserByEmail(email);

      if (!user) {
        return this.badRequest(UserExceptions.USER_NOT_FOUND);
      }

      const histories = await this.historyRepository.find(user.toPlain().id);

      return this.ok(
        200,
        histories.map((x) => x.toResponse()),
      );
    } catch (error: any) {
      return this.serverError(error.message);
    }
  }
}
