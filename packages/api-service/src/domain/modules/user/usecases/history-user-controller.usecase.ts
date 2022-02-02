import { BaseController, HttpRequest, HttpResponse } from 'ubialimv-common';
import { HistoryRepositoryInterface } from '../../history/repositories/history.repository.interface';

export default class HistoryUserController extends BaseController {
  constructor(
    private readonly historyRepository: HistoryRepositoryInterface,
  ) {
    super();
  }

  public async handle(req: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = req.context;

      const histories = await this.historyRepository.find(id);

      return this.ok(
        200,
        histories.map((x) => x.toResponse()),
      );
    } catch (error: any) {
      return this.serverError(error.message);
    }
  }
}
